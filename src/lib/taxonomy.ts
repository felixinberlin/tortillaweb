import { getCollection } from 'astro:content';
import type { Taxonomy, Recipe, ResolvedTaxonomyBadge } from '@/types/taxonomy';

export const TAXONOMY_ROUTING_MAP: Record<string, Record<string, string>> = {
  es: {
    faction: 'facciones',
    ingredient: 'ingredientes',
    technique: 'tecnicas',
    style: 'estilos',
    region: 'regiones',
    person: 'personas',
    restaurant: 'restaurantes',
    utensil: 'utensilios',
    'cooking-method': 'metodos-coccion',
    texture: 'texturas',
    event: 'eventos',
    glossary: 'glosario',
    difficulty: 'dificultad',
  },
  en: {
    faction: 'factions',
    ingredient: 'ingredients',
    technique: 'techniques',
    style: 'styles',
    region: 'regions',
    person: 'people',
    restaurant: 'restaurants',
    utensil: 'utensils',
    'cooking-method': 'cooking-methods',
    texture: 'textures',
    event: 'events',
    glossary: 'glossary',
    difficulty: 'difficulty',
  },
  de: {
    faction: 'faktionen',
    ingredient: 'zutaten',
    technique: 'techniken',
    style: 'stile',
    region: 'regionen',
    person: 'personen',
    restaurant: 'restaurants',
    utensil: 'utensilien',
    'cooking-method': 'kochmethoden',
    texture: 'texturen',
    event: 'events',
    glossary: 'glossar',
    difficulty: 'schwierigkeit',
  },
};

/**
 * Resolves localized URL prefix for a taxonomy type.
 */
export function getTaxonomyRoutePrefix(type: string, lang: string = 'es'): string {
  const langMap = TAXONOMY_ROUTING_MAP[lang] || TAXONOMY_ROUTING_MAP['es'];
  return langMap[type] || type;
}

/**
 * Builds localized URL for a taxonomy item.
 */
export function getTaxonomyUrl(type: string, slug: string, lang: string = 'es'): string {
  const prefix = getTaxonomyRoutePrefix(type, lang);
  return `/${lang}/${prefix}/${slug}`;
}

/**
 * Reverses a localized taxonomy route segment back to the canonical taxonomy type.
 */
export function getTaxonomyTypeFromRoute(routeSegment: string, lang: string = 'es'): string | undefined {
  const langMap = TAXONOMY_ROUTING_MAP[lang] || TAXONOMY_ROUTING_MAP['es'];
  for (const [canonicalType, mappedRoute] of Object.entries(langMap)) {
    if (mappedRoute === routeSegment) {
      return canonicalType;
    }
  }
  // Fallback check across all languages
  for (const lMap of Object.values(TAXONOMY_ROUTING_MAP)) {
    for (const [canonicalType, mappedRoute] of Object.entries(lMap)) {
      if (mappedRoute === routeSegment) {
        return canonicalType;
      }
    }
  }
  return undefined;
}

/**
 * Retrieves all taxonomy records.
 */
export async function getAllTaxonomies(): Promise<Taxonomy[]> {
  const collection = await getCollection('taxonomies');
  return collection.map((item: any) => item.data as Taxonomy);
}

/**
 * Retrieves all recipe records.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  const collection = await getCollection('recipes');
  return collection.map((item: any) => item.data as Recipe);
}

/**
 * Finds a taxonomy by type and id.
 */
export async function getTaxonomyById(type: string, id: string): Promise<Taxonomy | undefined> {
  const taxonomies = await getAllTaxonomies();
  return taxonomies.find((t) => t.type === type && t.id === id);
}

/**
 * Finds recipes associated with a taxonomy.
 */
export async function getRecipesForTaxonomy(type: string, id: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  const targetTag = `${type}:${id}`;
  
  const aliasTags: Record<string, string[]> = {
    'faction:concebollistas': ['faction:cebollistas', 'faction:concebollistas'],
    'faction:cebollistas': ['faction:cebollistas', 'faction:concebollistas'],
    'faction:con-cosas': ['faction:modernistas', 'faction:con-cosas'],
    'faction:modernistas': ['faction:modernistas', 'faction:con-cosas'],
  };

  const matches = aliasTags[targetTag] || [targetTag];

  return recipes.filter((r) => matches.some((tag) => r.taxonomyIds.includes(tag)));
}

/**
 * Resolves all taxonomy tags on a recipe into rich badge data.
 */
export async function resolveRecipeBadges(taxonomyIds: string[], lang: string = 'es'): Promise<ResolvedTaxonomyBadge[]> {
  const taxonomies = await getAllTaxonomies();
  const badges: ResolvedTaxonomyBadge[] = [];

  for (const tag of taxonomyIds) {
    const [type, id] = tag.split(':');
    if (!type || !id) continue;

    const match = taxonomies.find((t) => t.type === type && t.id === id);
    if (match) {
      const slug = match.slug[lang as keyof typeof match.slug] || match.slug.es;
      const title = match.title[lang as keyof typeof match.title] || match.title.es;
      badges.push({
        id: match.id,
        type: match.type,
        title,
        icon: match.icon,
        url: getTaxonomyUrl(match.type, slug, lang),
      });
    }
  }

  return badges;
}

/**
 * Validates that all taxonomy references in recipes exist.
 */
export async function validateTaxonomyReferences(): Promise<{ valid: boolean; errors: string[] }> {
  const recipes = await getAllRecipes();
  const taxonomies = await getAllTaxonomies();
  const validTags = new Set(taxonomies.map((t) => `${t.type}:${t.id}`));
  const errors: string[] = [];

  for (const recipe of recipes) {
    for (const tag of recipe.taxonomyIds) {
      if (!validTags.has(tag)) {
        errors.push(`Recipe '${recipe.id}' references unknown taxonomy '${tag}'`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('❌ Taxonomy Reference Errors:', errors);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
