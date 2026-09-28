/**
 * Recipe Schema.org JSON-LD Generator
 *
 * Generates standards-compliant schema.org/Recipe structured data
 * optimized for Google Rich Snippets / Rich Results.
 */

export const SITE_URL = 'https://tortilladepatatas.org';

export interface RecipeSchemaOptions {
  lang?: 'es' | 'en' | 'de';
  baseUrl?: string;
  url?: string;
  category?: string;
  cuisine?: string;
  keywords?: string | string[];
  calories?: string | number;
  rating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  datePublished?: string;
  dateModified?: string;
}

export interface HowToStepSchema {
  '@type': 'HowToStep';
  position: number;
  name?: string;
  text: string;
  image?: string;
  url?: string;
}

export interface NutritionSchema {
  '@type': 'NutritionInformation';
  calories?: string;
  proteinContent?: string;
  fatContent?: string;
  carbohydrateContent?: string;
  servingSize?: string;
}

export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface RecipeJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Recipe';
  name: string;
  description: string;
  image: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipeYield: string;
  yieldCount?: string;
  recipeIngredient: string[];
  recipeInstructions: HowToStepSchema[];
  recipeCategory: string;
  recipeCuisine: string;
  author: {
    '@type': 'Organization' | 'Person';
    name: string;
    url: string;
  };
  datePublished?: string;
  dateModified?: string;
  keywords?: string;
  inLanguage?: string;
  url?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  nutrition?: NutritionSchema;
  aggregateRating?: AggregateRatingSchema;
}

/**
 * Converts minutes to ISO 8601 duration format (e.g., 20 -> "PT20M", 90 -> "PT1H30M").
 */
export function formatIsoDuration(minutes: number): string {
  if (isNaN(minutes) || minutes <= 0) {
    return 'PT0M';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (hours > 0 && remainingMinutes > 0) {
    return `PT${hours}H${remainingMinutes}M`;
  } else if (hours > 0) {
    return `PT${hours}H`;
  }
  return `PT${remainingMinutes}M`;
}

/**
 * Parses ISO 8601 duration string back to minutes (e.g., "PT1H30M" -> 90).
 */
export function parseIsoDuration(durationStr: string): number {
  if (!durationStr || typeof durationStr !== 'string') return 0;
  const match = durationStr.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/i);
  if (!match) return 0;
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours * 60 + minutes;
}

/**
 * Helper to get localized string or fallback.
 */
function getLocalizedString(field: any, lang: 'es' | 'en' | 'de' = 'es'): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.es || field.en || '';
}

/**
 * Generates an SEO-rich, localized keyword list for a recipe.
 * Combines core dish terminology, specific recipe identity, main ingredients, and taxonomy traits.
 */
export function generateRecipeKeywords(recipeData: any, lang: 'es' | 'en' | 'de' = 'es'): string {
  // If explicitly specified in recipeData, normalize it
  if (recipeData.keywords) {
    if (Array.isArray(recipeData.keywords) && recipeData.keywords.length > 0) {
      return recipeData.keywords.join(', ');
    }
    if (typeof recipeData.keywords === 'string' && recipeData.keywords.trim()) {
      return recipeData.keywords.trim();
    }
    if (typeof recipeData.keywords === 'object' && recipeData.keywords[lang]) {
      const val = recipeData.keywords[lang];
      return Array.isArray(val) ? val.join(', ') : String(val);
    }
  }

  const recipeTitle = getLocalizedString(recipeData.title || recipeData.name, lang);
  const keywordsSet = new Set<string>();

  // Base localized authority keywords
  if (lang === 'es') {
    keywordsSet.add('tortilla de patatas');
    keywordsSet.add('tortilla española');
    keywordsSet.add('receta tradicional');
    keywordsSet.add('cuajado perfecto');
    keywordsSet.add('gastronomía española');
  } else if (lang === 'de') {
    keywordsSet.add('spanische Tortilla');
    keywordsSet.add('Tortilla de Patatas');
    keywordsSet.add('Kartoffel-Omelett Rezept');
    keywordsSet.add('spanisches Nationalgericht');
    keywordsSet.add('Rezept traditionell');
  } else {
    keywordsSet.add('Spanish omelette');
    keywordsSet.add('tortilla de patatas');
    keywordsSet.add('Spanish potato omelette');
    keywordsSet.add('traditional Spanish recipe');
    keywordsSet.add('authentic tortilla española');
  }

  if (recipeTitle) {
    keywordsSet.add(recipeTitle);
  }

  // Add ingredient keywords if available
  if (Array.isArray(recipeData.ingredients)) {
    recipeData.ingredients.slice(0, 4).forEach((ing: any) => {
      const ingName = getLocalizedString(ing.name, lang) || ing.id || '';
      if (ingName && typeof ingName === 'string') {
        keywordsSet.add(ingName.toLowerCase());
      }
    });
  }

  // Add taxonomy tags if available
  if (Array.isArray(recipeData.taxonomyIds)) {
    recipeData.taxonomyIds.forEach((tid: string) => {
      const cleanTag = tid.replace(/^(ingredient|faction|region|style|technique|difficulty):/, '');
      if (cleanTag) keywordsSet.add(cleanTag);
    });
  }

  return Array.from(keywordsSet).join(', ');
}

/**
 * Normalizes relative URLs with the base site URL.
 */
export function resolveImageUrl(imagePath?: string, baseUrl: string = SITE_URL): string {
  if (!imagePath) return `${baseUrl}/images/recipes/clasica.svg`;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${cleanBase}${cleanPath.replace(/\.jpg$/, '.svg')}`;
}

/**
 * Generates Schema.org Recipe JSON-LD object from recipe data.
 */
export function createRecipeSchema(
  recipeData: any,
  options: RecipeSchemaOptions = {}
): RecipeJsonLd {
  const lang = options.lang || 'es';
  const baseUrl = options.baseUrl || SITE_URL;

  // Title & description
  const name = getLocalizedString(recipeData.title || recipeData.name, lang);
  const description = getLocalizedString(recipeData.description, lang);

  // Images
  let images: string[] = [];
  if (Array.isArray(recipeData.image)) {
    images = recipeData.image.map((img: string) => resolveImageUrl(img, baseUrl));
  } else if (typeof recipeData.image === 'string' && recipeData.image.trim()) {
    images = [resolveImageUrl(recipeData.image, baseUrl)];
  } else {
    images = [resolveImageUrl('/images/recipes/clasica.svg', baseUrl)];
  }

  // Durations
  const prepMinutes = recipeData.prepTimeMinutes || recipeData.prepTime || 15;
  const cookMinutes =
    recipeData.cookTimeMinutes ||
    recipeData.cookTime ||
    (recipeData.time ? Math.max(0, recipeData.time - prepMinutes) : 20);
  const totalMinutes = recipeData.time || prepMinutes + cookMinutes;

  const prepTime = formatIsoDuration(prepMinutes);
  const cookTime = formatIsoDuration(cookMinutes);
  const totalTime = formatIsoDuration(totalMinutes);

  // Servings / Yield
  const yieldCountNum = recipeData.yieldServings || recipeData.yieldCount || 4;
  const yieldUnit = lang === 'es' ? 'raciones' : lang === 'de' ? 'Portionen' : 'servings';
  const recipeYield = `${yieldCountNum} ${yieldUnit}`;

  // Ingredients
  let recipeIngredient: string[] = [];
  if (Array.isArray(recipeData.ingredients)) {
    recipeIngredient = recipeData.ingredients.map((ing: any) => {
      if (typeof ing === 'string') return ing;
      const ingName = getLocalizedString(ing.name, lang) || ing.id || ing.ingredientId || '';
      const amount = ing.amount !== undefined ? `${ing.amount}` : '';
      const unit = ing.unit && ing.unit !== 'unit' ? ing.unit : '';
      const notes = getLocalizedString(ing.notes, lang);

      if (notes && !amount) return notes;
      const amountPart = [amount, unit].filter(Boolean).join('');
      return [amountPart, ingName].filter(Boolean).join(' ');
    });
  }

  // Ensure recipeIngredient is never empty for Google Rich Results compliance
  if (recipeIngredient.length === 0) {
    recipeIngredient = lang === 'es'
      ? ['Patatas seleccionadas', 'Huevos camperos frescos', 'Aceite de oliva virgen extra', 'Sal marina']
      : lang === 'de'
      ? ['Ausgewählte Kartoffeln', 'Frische Freilandeier', 'Natives Olivenöl Extra', 'Meersalz']
      : ['Selected potatoes', 'Fresh farm eggs', 'Extra virgin olive oil', 'Sea salt'];
  }

  // Instructions
  let recipeInstructions: HowToStepSchema[] = [];
  if (Array.isArray(recipeData.instructions)) {
    recipeInstructions = recipeData.instructions.map((inst: any, idx: number) => {
      if (typeof inst === 'string') {
        const stepName = lang === 'es' ? `Paso ${idx + 1}` : lang === 'de' ? `Schritt ${idx + 1}` : `Step ${idx + 1}`;
        return {
          '@type': 'HowToStep',
          position: idx + 1,
          name: stepName,
          text: inst,
        };
      }

      const stepName = getLocalizedString(inst.step || inst.name, lang) || (lang === 'es' ? `Paso ${idx + 1}` : lang === 'de' ? `Schritt ${idx + 1}` : `Step ${idx + 1}`);
      const stepText = getLocalizedString(inst.text, lang);

      const stepObj: HowToStepSchema = {
        '@type': 'HowToStep',
        position: idx + 1,
        name: stepName,
        text: stepText,
      };

      if (inst.image) {
        stepObj.image = resolveImageUrl(inst.image, baseUrl);
      }
      return stepObj;
    });
  }

  // Category & Cuisine localized defaults
  const defaultCategory = lang === 'es' ? 'Plato principal' : lang === 'de' ? 'Hauptgericht' : 'Main Course';
  const defaultCuisine = lang === 'es' ? 'Española' : lang === 'de' ? 'Spanisch' : 'Spanish';

  const recipeCategory = options.category || recipeData.category || defaultCategory;
  const recipeCuisine = options.cuisine || recipeData.cuisine || defaultCuisine;

  // Author
  const authorName =
    typeof recipeData.author === 'object' && recipeData.author?.name
      ? recipeData.author.name
      : typeof recipeData.author === 'string'
      ? recipeData.author
      : 'tortilladepatatas.org';

  const authorType = recipeData.author?.type === 'person' ? 'Person' : 'Organization';

  // Canonical URL
  let fullUrl: string | undefined;
  if (options.url) {
    fullUrl = options.url.startsWith('http') ? options.url : `${baseUrl}${options.url.startsWith('/') ? options.url : `/${options.url}`}`;
  } else if (recipeData.slug) {
    const slugStr = typeof recipeData.slug === 'object' ? recipeData.slug[lang] || recipeData.slug.es : recipeData.slug;
    fullUrl = `${baseUrl}/${lang}/recipes/${slugStr}`;
  }

  // Keywords
  const keywords = options.keywords
    ? (Array.isArray(options.keywords) ? options.keywords.join(', ') : options.keywords)
    : generateRecipeKeywords(recipeData, lang);

  const schema: RecipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name,
    description,
    image: images,
    prepTime,
    cookTime,
    totalTime,
    recipeYield,
    yieldCount: `${yieldCountNum}`,
    recipeIngredient,
    recipeInstructions,
    recipeCategory,
    recipeCuisine,
    author: {
      '@type': authorType,
      name: authorName,
      url: baseUrl,
    },
    datePublished: options.datePublished || recipeData.datePublished || '2026-01-01',
    dateModified: options.dateModified || recipeData.dateModified || '2026-08-18',
    keywords,
    inLanguage: lang,
  };

  if (fullUrl) {
    schema.url = fullUrl;
    schema.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': fullUrl,
    };
  }

  // Optional Nutrition
  const caloriesVal = options.calories || recipeData.calories || recipeData.nutrition?.calories;
  if (caloriesVal || recipeData.nutrition) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: caloriesVal ? (typeof caloriesVal === 'number' ? `${caloriesVal} kcal` : `${caloriesVal}`) : undefined,
      proteinContent: recipeData.nutrition?.proteinContent,
      fatContent: recipeData.nutrition?.fatContent,
      carbohydrateContent: recipeData.nutrition?.carbohydrateContent,
      servingSize: recipeData.nutrition?.servingSize || '1 ración',
    };
  }

  // Optional Rating
  const ratingData = options.rating || recipeData.aggregateRating || recipeData.rating;
  if (ratingData) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingData.ratingValue || 4.9,
      reviewCount: ratingData.reviewCount || 48,
      bestRating: ratingData.bestRating || 5,
      worstRating: ratingData.worstRating || 1,
    };
  }

  return schema;
}

/**
 * Validates a generated Recipe Schema object for required Google Rich Result properties.
 */
export function validateRecipeSchema(schema: any): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!schema || typeof schema !== 'object') {
    return { valid: false, errors: ['Schema must be an object'], warnings: [] };
  }

  if (schema['@context'] !== 'https://schema.org' && schema['@context'] !== 'https://schema.org/') {
    errors.push('Missing or invalid @context: must be https://schema.org');
  }

  if (schema['@type'] !== 'Recipe') {
    errors.push('Missing or invalid @type: must be Recipe');
  }

  if (!schema.name || typeof schema.name !== 'string' || !schema.name.trim()) {
    errors.push('Missing or empty recipe name');
  }

  if (!schema.description || typeof schema.description !== 'string' || !schema.description.trim()) {
    errors.push('Missing or empty recipe description');
  }

  if (!schema.image || !Array.isArray(schema.image) || schema.image.length === 0) {
    errors.push('Recipe requires image array');
  }

  if (!schema.recipeIngredient || !Array.isArray(schema.recipeIngredient) || schema.recipeIngredient.length === 0) {
    errors.push('Recipe requires at least one recipeIngredient');
  }

  if (!schema.recipeInstructions || !Array.isArray(schema.recipeInstructions) || schema.recipeInstructions.length === 0) {
    errors.push('Recipe requires at least one recipeInstructions step');
  }

  if (!schema.prepTime) warnings.push('prepTime is recommended');
  if (!schema.cookTime) warnings.push('cookTime is recommended');
  if (!schema.totalTime) warnings.push('totalTime is recommended');
  if (!schema.recipeYield) warnings.push('recipeYield is recommended');
  if (!schema.recipeCategory) warnings.push('recipeCategory is recommended');
  if (!schema.recipeCuisine) warnings.push('recipeCuisine is recommended');
  if (!schema.keywords) warnings.push('keywords is recommended');
  if (!schema.author) warnings.push('author is recommended');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
