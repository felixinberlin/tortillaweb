import type { Taxonomy, Recipe, ResolvedTaxonomyBadge } from '@/types/taxonomy';
import { ROUTES } from './routes';

const rawRecipes = Object.values(
  import.meta.glob('/src/content/recipes/*.json', { eager: true })
).map((mod: any) => (mod.default || mod) as Recipe);

const rawTaxonomies = [
  ...Object.values(import.meta.glob('/src/content/taxonomies/**/*.json', { eager: true })),
  ...Object.values(import.meta.glob('/src/content/persons/**/*.json', { eager: true })),
  ...Object.values(import.meta.glob('/src/content/people/**/*.json', { eager: true })),
].map((mod: any) => (mod.default || mod) as Taxonomy);

export const TAXONOMY_ROUTING_MAP: Record<string, Record<string, string>> = {
  es: {
    faction: ROUTES.factions.slug.es,
    ingredient: ROUTES.ingredients.slug.es,
    technique: ROUTES.techniques.slug.es,
    style: ROUTES.estilos.slug.es,
    region: ROUTES.regiones.slug.es,
    person: ROUTES.personas.slug.es,
    utensil: 'utensilios',
    'cooking-method': 'metodos-coccion',
    texture: 'texturas',
    event: 'eventos',
    glossary: 'glosario',
    difficulty: 'dificultad',
  },
  en: {
    faction: ROUTES.factions.slug.en,
    ingredient: ROUTES.ingredients.slug.en,
    technique: ROUTES.techniques.slug.en,
    style: ROUTES.estilos.slug.en,
    region: ROUTES.regiones.slug.en,
    person: ROUTES.personas.slug.en,
    utensil: 'utensils',
    'cooking-method': 'cooking-methods',
    texture: 'textures',
    event: 'events',
    glossary: 'glossary',
    difficulty: 'difficulty',
  },
  de: {
    faction: ROUTES.factions.slug.de,
    ingredient: ROUTES.ingredients.slug.de,
    technique: ROUTES.techniques.slug.de,
    style: ROUTES.estilos.slug.de,
    region: ROUTES.regiones.slug.de,
    person: ROUTES.personas.slug.de,
    utensil: 'utensilien',
    'cooking-method': 'kochmethoden',
    texture: 'texturen',
    event: 'events',
    glossary: 'glossar',
    difficulty: 'schwierigkeit',
  },
};

export const TAXONOMY_TYPE_LABELS: Record<string, Record<string, string>> = {
  ingredient: ROUTES.ingredients.label,
  faction: ROUTES.factions.label,
  technique: ROUTES.techniques.label,
  style: ROUTES.estilos.label,
  region: ROUTES.regiones.label,
  person: ROUTES.personas.label,
  utensil: { es: 'Utensilios', en: 'Utensils', de: 'Utensilien' },
  'cooking-method': { es: 'Métodos de Cocción', en: 'Cooking Methods', de: 'Kochmethoden' },
  texture: { es: 'Texturas', en: 'Textures', de: 'Texturen' },
  event: { es: 'Eventos', en: 'Events', de: 'Events' },
  glossary: { es: 'Glosario', en: 'Glossary', de: 'Glossar' },
  difficulty: { es: 'Dificultad', en: 'Difficulty', de: 'Schwierigkeit' },
};


/**
 * Resolves localized display label for a taxonomy type or route segment.
 */
export function getTaxonomyTypeLabel(typeOrRoute: string, lang: string = 'es'): string {
  const canonical = getTaxonomyTypeFromRoute(typeOrRoute, lang) || typeOrRoute;
  const labels = TAXONOMY_TYPE_LABELS[canonical];
  if (labels && labels[lang]) {
    return labels[lang];
  }
  return typeOrRoute.charAt(0).toUpperCase() + typeOrRoute.slice(1);
}

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
  return rawTaxonomies;
}

/**
 * Retrieves all recipe records.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  return rawRecipes;
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
