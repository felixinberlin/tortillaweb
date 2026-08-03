import type { SupportedLocale } from '../routes/types';
import { routeResolver } from '../routes/resolver';
import { getAllRecipes, getAllTaxonomies } from '../taxonomy';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

export interface EntityQueryInput {
  type?: string;
  canonicalType?: string;
  id?: string;
  taxonomyIds?: string[];
  ingredients?: Array<{ id?: string; ingredientId?: string; [key: string]: any }>;
  slug?: Record<string, string> | string;
  [key: string]: any;
}

export interface RelatedLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  type?: string;
  image?: string;
  badge?: string;
}

function deduplicateLinks(links: RelatedLink[]): RelatedLink[] {
  const seenUrls = new Set<string>();
  const seenIds = new Set<string>();
  const result: RelatedLink[] = [];

  for (const link of links) {
    if (!link || !link.url || !link.title) continue;
    const cleanUrl = link.url.replace(/\/$/, '');
    if (seenUrls.has(cleanUrl) || seenIds.has(link.id)) {
      continue;
    }
    seenUrls.add(cleanUrl);
    seenIds.add(link.id);
    result.push(link);
  }

  return result;
}

function parseEntityInput(input: EntityQueryInput | string): { type: string; id: string; raw: any } {
  if (typeof input === 'string') {
    if (input.includes(':')) {
      const [type, id] = input.split(':');
      return { type, id, raw: input };
    }
    return { type: 'ingredient', id: input, raw: input };
  }

  let type = input.type || input.canonicalType || 'ingredient';
  let id = input.id || '';

  if (!id && typeof input.slug === 'string') {
    id = input.slug;
  } else if (!id && input.slug && typeof input.slug === 'object') {
    id = input.slug.es || Object.values(input.slug)[0] || '';
  }

  if (id.includes(':')) {
    const parts = id.split(':');
    type = parts[0];
    id = parts[1];
  }

  return { type, id, raw: input };
}

interface RawArticle {
  id: string;
  title: string;
  description: string;
  ingredient?: string;
  slug: string;
  locale?: string;
}

async function getArticles(): Promise<RawArticle[]> {
  const articles: RawArticle[] = [];

  try {
    const ingCol = await getCollection('ingredients' as any);
    if (ingCol && ingCol.length > 0) {
      for (const item of ingCol) {
        articles.push({
          id: item.id || item.data?.slug || '',
          title: item.data?.title || '',
          description: item.data?.description || '',
          ingredient: item.data?.ingredient || (item.id ? item.id.split('/')[0] : ''),
          slug: item.data?.slug || item.id || '',
          locale: item.data?.locale || 'es',
        });
      }
    }
  } catch {
    // FS fallback
  }

  if (articles.length === 0) {
    try {
      const ingDir = path.join(process.cwd(), 'src', 'content', 'ingredients');
      if (fs.existsSync(ingDir)) {
        const subdirs = fs.readdirSync(ingDir);
        for (const subdir of subdirs) {
          const sPath = path.join(ingDir, subdir);
          if (fs.statSync(sPath).isDirectory()) {
            const files = fs.readdirSync(sPath).filter((f) => f.endsWith('.md'));
            for (const file of files) {
              const content = fs.readFileSync(path.join(sPath, file), 'utf-8');
              const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
              const descMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
              const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
              const ingMatch = content.match(/ingredient:\s*["']?([^"'\n]+)["']?/);
              const locMatch = content.match(/locale:\s*["']?([^"'\n]+)["']?/);

              const slugVal = slugMatch ? slugMatch[1] : `ingredientes/${subdir}/${file.replace(/\.(es|en|de)\.md$/, '')}`;
              articles.push({
                id: `${subdir}-${file.replace('.md', '')}`,
                title: titleMatch ? titleMatch[1] : subdir,
                description: descMatch ? descMatch[1] : '',
                ingredient: ingMatch ? ingMatch[1] : subdir,
                slug: slugVal,
                locale: locMatch ? locMatch[1] : (file.includes('.en.') ? 'en' : file.includes('.de.') ? 'de' : 'es'),
              });
            }
          }
        }
      }
    } catch {
      // ignore
    }
  }

  return articles;
}

/**
 * Retrieves recipes related to an entity (ingredient, recipe, faction, etc.)
 */
export async function getRelatedRecipes(
  entity: EntityQueryInput | string,
  lang: SupportedLocale = 'es'
): Promise<RelatedLink[]> {
  const { type, id, raw } = parseEntityInput(entity);
  const recipes = await getAllRecipes();
  const results: RelatedLink[] = [];

  for (const recipe of recipes) {
    if (!recipe || !recipe.id) continue;

    let isMatch = false;

    if (type === 'ingredient') {
      const tagMatch = recipe.taxonomyIds?.some(
        (tag) => tag === `ingredient:${id}` || tag === id
      );
      const ingMatch = recipe.ingredients?.some(
        (ing) => ing.ingredientId === id || ing.id === id
      );
      isMatch = Boolean(tagMatch || ingMatch);
    } else if (type === 'recipe') {
      if (recipe.id !== id) {
        if (typeof raw === 'object' && raw.taxonomyIds && Array.isArray(raw.taxonomyIds)) {
          const shared = recipe.taxonomyIds?.filter((t) => raw.taxonomyIds.includes(t));
          if (shared && shared.length > 0) {
            isMatch = true;
          }
        } else {
          isMatch = true;
        }
      }
    } else {
      const tagMatch = recipe.taxonomyIds?.some(
        (tag) => tag === `${type}:${id}` || tag === id
      );
      isMatch = Boolean(tagMatch);
    }

    if (isMatch) {
      const titleStr = recipe.title?.[lang] || recipe.title?.es || recipe.id;
      const descStr = recipe.description?.[lang] || recipe.description?.es || '';
      const url = routeResolver.urlFor({ type: 'recipe', slug: recipe.slug }, lang);

      results.push({
        id: recipe.id,
        title: titleStr,
        description: descStr,
        url,
        type: 'recipe',
        image: recipe.image,
      });
    }
  }

  return deduplicateLinks(results);
}

/**
 * Retrieves ingredient taxonomies related to a recipe, ingredient, or taxonomy.
 */
export async function getRelatedIngredients(
  entity: EntityQueryInput | string,
  lang: SupportedLocale = 'es'
): Promise<RelatedLink[]> {
  const { type, id, raw } = parseEntityInput(entity);
  const taxonomies = await getAllTaxonomies();
  const ingredientTaxonomies = taxonomies.filter((t) => t.type === 'ingredient');
  const results: RelatedLink[] = [];

  const targetIngIds = new Set<string>();

  if (type === 'recipe' || (typeof raw === 'object' && raw.ingredients)) {
    if (raw.ingredients && Array.isArray(raw.ingredients)) {
      for (const ing of raw.ingredients) {
        if (ing.ingredientId) targetIngIds.add(ing.ingredientId);
        else if (ing.id) targetIngIds.add(ing.id);
      }
    }
    if (raw.taxonomyIds && Array.isArray(raw.taxonomyIds)) {
      for (const tag of raw.taxonomyIds) {
        if (tag.startsWith('ingredient:')) {
          targetIngIds.add(tag.replace('ingredient:', ''));
        }
      }
    }
  } else if (type === 'ingredient') {
    const recipes = await getAllRecipes();
    for (const r of recipes) {
      const containsTarget =
        r.taxonomyIds?.includes(`ingredient:${id}`) ||
        r.ingredients?.some((ing) => ing.ingredientId === id || ing.id === id);

      if (containsTarget) {
        r.ingredients?.forEach((ing) => {
          const ingId = ing.ingredientId || ing.id;
          if (ingId && ingId !== id) {
            targetIngIds.add(ingId);
          }
        });
        r.taxonomyIds?.forEach((tag) => {
          if (tag.startsWith('ingredient:')) {
            const ingId = tag.replace('ingredient:', '');
            if (ingId !== id) {
              targetIngIds.add(ingId);
            }
          }
        });
      }
    }
  } else {
    const recipes = await getAllRecipes();
    for (const r of recipes) {
      if (r.taxonomyIds?.includes(`${type}:${id}`)) {
        r.ingredients?.forEach((ing) => {
          if (ing.ingredientId) targetIngIds.add(ing.ingredientId);
        });
      }
    }
  }

  for (const ingTax of ingredientTaxonomies) {
    if (targetIngIds.has(ingTax.id)) {
      const titleStr = ingTax.title?.[lang] || ingTax.title?.es || ingTax.id;
      const descStr = ingTax.description?.[lang] || ingTax.description?.es || '';
      const url = routeResolver.urlFor({ type: 'ingredient', slug: ingTax.slug }, lang);

      results.push({
        id: ingTax.id,
        title: titleStr,
        description: descStr,
        url,
        type: 'ingredient',
        image: ingTax.image,
      });
    }
  }

  return deduplicateLinks(results);
}

/**
 * Retrieves articles related to an ingredient or entity.
 */
export async function getRelatedArticles(
  entity: EntityQueryInput | string,
  lang: SupportedLocale = 'es'
): Promise<RelatedLink[]> {
  const { type, id } = parseEntityInput(entity);
  const articles = await getArticles();
  const results: RelatedLink[] = [];

  const filteredArticles = articles.filter((art) => {
    const langMatch = !art.locale || art.locale === lang;
    if (!langMatch) return false;

    if (type === 'ingredient') {
      return art.ingredient === id || art.slug.includes(id);
    }
    return art.slug.includes(id) || art.ingredient === id;
  });

  for (const art of filteredArticles) {
    const url = routeResolver.urlFor(art.slug, lang);
    results.push({
      id: art.id,
      title: art.title,
      description: art.description,
      url,
      type: 'article',
    });
  }

  return deduplicateLinks(results);
}

/**
 * Retrieves taxonomy tags (factions, techniques, regions, etc.) related to an entity.
 */
export async function getRelatedTaxonomies(
  entity: EntityQueryInput | string,
  lang: SupportedLocale = 'es'
): Promise<RelatedLink[]> {
  const { type, id, raw } = parseEntityInput(entity);
  const taxonomies = await getAllTaxonomies();
  const results: RelatedLink[] = [];

  const matchedTaxonomyIds = new Set<string>();

  if (typeof raw === 'object' && raw.taxonomyIds && Array.isArray(raw.taxonomyIds)) {
    for (const tag of raw.taxonomyIds) {
      matchedTaxonomyIds.add(tag);
    }
  } else if (type === 'ingredient') {
    const recipes = await getAllRecipes();
    for (const r of recipes) {
      const containsTarget =
        r.taxonomyIds?.includes(`ingredient:${id}`) ||
        r.ingredients?.some((ing) => ing.ingredientId === id || ing.id === id);

      if (containsTarget) {
        r.taxonomyIds?.forEach((tag) => {
          if (!tag.startsWith('ingredient:')) {
            matchedTaxonomyIds.add(tag);
          }
        });
      }
    }
  }

  for (const tax of taxonomies) {
    const fullTag = `${tax.type}:${tax.id}`;
    if ((matchedTaxonomyIds.has(fullTag) || matchedTaxonomyIds.has(tax.id)) && !(tax.type === type && tax.id === id)) {
      const titleStr = tax.title?.[lang] || tax.title?.es || tax.id;
      const descStr = tax.description?.[lang] || tax.description?.es || '';
      const url = routeResolver.urlFor({ type: tax.type, slug: tax.slug }, lang);

      results.push({
        id: tax.id,
        title: titleStr,
        description: descStr,
        url,
        type: tax.type,
        image: tax.image,
      });
    }
  }

  return deduplicateLinks(results);
}

export interface KnowledgeItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  url: string;
  relationship?: string;
  badge?: string;
}

/**
 * Resolves a comprehensive knowledge graph of related items for an ingredient entity.
 */
export async function getRelatedKnowledgeForIngredient(
  ingredientId: string,
  lang: SupportedLocale = 'es'
): Promise<KnowledgeItem[]> {
  const taxonomies = await getAllTaxonomies();
  const recipes = await getAllRecipes();
  const targetTax = taxonomies.find((t) => t.id === ingredientId && t.type === 'ingredient');

  const items: KnowledgeItem[] = [];
  const seenIds = new Set<string>();

  // 1. Process declared `related` array from content model
  if (targetTax && targetTax.related && Array.isArray(targetTax.related)) {
    for (const rel of targetTax.related) {
      if (!rel || !rel.id) continue;

      if (rel.type === 'ingredient') {
        const found = taxonomies.find((t) => t.id === rel.id && t.type === 'ingredient');
        if (found) {
          items.push({
            id: found.id,
            type: 'ingredient',
            title: found.title?.[lang] || found.title?.es || found.id,
            description: found.description?.[lang] || found.description?.es || '',
            url: routeResolver.urlFor({ type: 'ingredient', slug: found.slug }, lang),
            relationship: rel.relationship,
          });
          seenIds.add(`ingredient:${found.id}`);
        }
      } else if (rel.type === 'technique') {
        const found = taxonomies.find((t) => t.id === rel.id && t.type === 'technique');
        if (found) {
          items.push({
            id: found.id,
            type: 'technique',
            title: found.title?.[lang] || found.title?.es || found.id,
            description: found.description?.[lang] || found.description?.es || '',
            url: routeResolver.urlFor({ type: 'technique', slug: found.slug }, lang),
            relationship: rel.relationship,
          });
          seenIds.add(`technique:${found.id}`);
        }
      } else if (rel.type === 'recipe') {
        const found = recipes.find((r) => r.id === rel.id);
        if (found) {
          items.push({
            id: found.id,
            type: 'recipe',
            title: found.title?.[lang] || found.title?.es || found.id,
            description: found.description?.[lang] || found.description?.es || '',
            url: routeResolver.urlFor({ type: 'recipe', slug: found.slug }, lang),
            relationship: rel.relationship,
          });
          seenIds.add(`recipe:${found.id}`);
        }
      } else if (rel.type === 'history' || rel.type === 'culture') {
        const historyUrl = routeResolver.urlFor('history', lang);
        const historyTitle = {
          es: 'La Historia de la Tortilla de Patatas',
          en: 'History of the Spanish Omelette',
          de: 'Geschichte der Spanischen Tortilla',
        }[lang] || 'Historia';
        const historyDesc = {
          es: 'Un recorrido por la evolución de la patata, el huevo y el aceite desde el siglo XVI hasta la actualidad.',
          en: 'A journey through the evolution of potato, egg, and oil from the 16th century to modern days.',
          de: 'Eine Reise durch die Entwicklung von Kartoffel, Ei und Öl vom 16. Jahrhundert bis heute.',
        }[lang] || '';

        items.push({
          id: 'history',
          type: 'history',
          title: historyTitle,
          description: historyDesc,
          url: historyUrl,
          relationship: rel.relationship,
        });
        seenIds.add('history:history');
      }
    }
  }

  // 2. Ensure Core Pillar Ingredient-to-Ingredient cross-links exist
  const corePillars = ['potato', 'egg', 'oil'];
  for (const pillarId of corePillars) {
    if (pillarId !== ingredientId && !seenIds.has(`ingredient:${pillarId}`)) {
      const found = taxonomies.find((t) => t.id === pillarId && t.type === 'ingredient');
      if (found) {
        items.push({
          id: found.id,
          type: 'ingredient',
          title: found.title?.[lang] || found.title?.es || found.id,
          description: found.description?.[lang] || found.description?.es || '',
          url: routeResolver.urlFor({ type: 'ingredient', slug: found.slug }, lang),
          relationship: 'core_pillar',
        });
        seenIds.add(`ingredient:${found.id}`);
      }
    }
  }

  // 3. Fallbacks for related recipes
  const relatedRecipes = await getRelatedRecipes({ type: 'ingredient', id: ingredientId }, lang);
  for (const r of relatedRecipes) {
    if (!seenIds.has(`recipe:${r.id}`)) {
      items.push({
        id: r.id,
        type: 'recipe',
        title: r.title,
        description: r.description,
        url: r.url,
        relationship: 'featured_recipe',
      });
      seenIds.add(`recipe:${r.id}`);
    }
  }

  // Deduplicate
  const uniqueItems: KnowledgeItem[] = [];
  const urlsSeen = new Set<string>();

  for (const item of items) {
    if (item && item.url && !urlsSeen.has(item.url)) {
      urlsSeen.add(item.url);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

