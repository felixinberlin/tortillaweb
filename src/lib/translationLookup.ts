import { getCollection } from 'astro:content';
import { TAXONOMY_ROUTING_MAP } from './taxonomy';
import {
  STATIC_ROUTE_TRANSLATIONS,
  type TranslationMap,
  type LookupResult,
  findTranslationURL,
} from './translationFinder';

export { STATIC_ROUTE_TRANSLATIONS, type TranslationMap, type LookupResult, findTranslationURL };

let cachedLookup: LookupResult | null = null;

/**
 * Server-only function to build or return cached full translation lookup table across all content collections and static routes.
 */
export async function getTranslationLookup(): Promise<LookupResult> {
  if (cachedLookup) return cachedLookup;

  const translationMap: TranslationMap = { ...STATIC_ROUTE_TRANSLATIONS };
  const urlToKey: Record<string, string> = {};

  // Register static routes into urlToKey
  for (const [key, map] of Object.entries(STATIC_ROUTE_TRANSLATIONS)) {
    for (const [, url] of Object.entries(map)) {
      if (url) urlToKey[url] = key;
    }
  }

  // 1. Recipes collection
  try {
    const recipes = await getCollection('recipes');
    for (const r of recipes) {
      const key = r.data.contentId || r.data.translationKey || `recipe.${r.data.id}` || r.data.id;
      if (!translationMap[key]) translationMap[key] = {};

      const languages = ['es', 'en', 'de'] as const;
      for (const lang of languages) {
        const slug = r.data.slug[lang] || r.data.slug.es;
        if (slug) {
          const url = `/${lang}/recipes/${slug}`;
          translationMap[key][lang] = url;
          urlToKey[url] = key;
        }
      }
    }
  } catch (e) {
    console.error('Error loading recipes for translation lookup:', e);
  }

  // 2. Ingredients collection (Markdown articles)
  try {
    const ingredients = await getCollection('ingredients');
    for (const entry of ingredients) {
      if (!entry.data.slug) continue;
      const parts = entry.data.slug.split('/');
      const routeSegment = parts[0];

      let lang: 'es' | 'en' | 'de' = entry.data.locale || 'es';
      if (!entry.data.locale) {
        if (routeSegment === 'ingredients' || entry.id.includes('.en')) lang = 'en';
        else if (routeSegment === 'zutaten' || entry.id.includes('.de')) lang = 'de';
      }

      const fallbackKey = parts[1] ? `ingredient.${parts[1]}` : entry.id;
      const key = entry.data.contentId || entry.data.translationKey || (parts.length > 2 ? `ingredient.${parts[1]}-${parts[2]}` : fallbackKey);
      if (!translationMap[key]) translationMap[key] = {};

      const url = `/${lang}/${entry.data.slug}`;
      translationMap[key][lang] = url;
      urlToKey[url] = key;
    }
  } catch (e) {
    console.error('Error loading ingredients for translation lookup:', e);
  }

  // 3. Taxonomies collection
  try {
    const taxonomies = await getCollection('taxonomies');
    for (const tax of taxonomies) {
      const key = tax.data.contentId || tax.data.translationKey || `${tax.data.type}.${tax.data.id}` || tax.data.id;
      if (!translationMap[key]) translationMap[key] = {};

      const languages = ['es', 'en', 'de'] as const;
      for (const lang of languages) {
        const routePrefix = (TAXONOMY_ROUTING_MAP[lang] || TAXONOMY_ROUTING_MAP['es'])[tax.data.type];
        const slug = tax.data.slug[lang] || tax.data.slug.es;
        if (routePrefix && slug) {
          const url = `/${lang}/${routePrefix}/${slug}`;
          translationMap[key][lang] = url;
          urlToKey[url] = key;
        }
      }
    }
  } catch (e) {
    console.error('Error loading taxonomies for translation lookup:', e);
  }

  // 4. History collection
  try {
    const historyEntries = await getCollection('history');
    for (const entry of historyEntries) {
      const key = entry.data.contentId || entry.data.translationKey || 'history.tortilla';
      const lang: 'es' | 'en' | 'de' = (entry.data.locale || entry.data.lang || 'es') as any;
      if (!translationMap[key]) translationMap[key] = {};
      const url = `/${lang}/history`;
      translationMap[key][lang] = url;
      urlToKey[url] = key;
    }
  } catch (e) {
    console.error('Error loading history for translation lookup:', e);
  }

  cachedLookup = { translationMap, urlToKey };
  return cachedLookup;
}
