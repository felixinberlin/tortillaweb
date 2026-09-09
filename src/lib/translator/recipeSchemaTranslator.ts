/**
 * Independent Recipe.org Schema.org Translator Engine
 *
 * Standalone module to translate raw recipe models or user custom calculator states
 * into compliant Schema.org JSON-LD `Recipe` objects for Rich Snippets / Google Search.
 */

import type {
  TranslatorConfig,
  RawRecipeInput,
  RecipeSchemaJSONLD,
  SchemaValidationResult,
  SchemaValidationIssue,
} from './types';

/** Default configuration values for independence */
export const DEFAULT_TRANSLATOR_CONFIG: Required<TranslatorConfig> = {
  baseUrl: 'https://recipe.org',
  siteName: 'Recipe.org',
  defaultAuthorName: 'Recipe.org Culinary Team',
  defaultAuthorUrl: 'https://recipe.org',
  defaultLanguage: 'es',
  defaultCategory: 'Main Course',
  defaultCuisine: 'Spanish',
  defaultImage: 'https://recipe.org/images/default-recipe.jpg',
};

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
 * Normalizes URL or path against configured base URL
 */
export function resolveFullUrl(pathOrUrl?: string, baseUrl: string = DEFAULT_TRANSLATOR_CONFIG.baseUrl): string {
  if (!pathOrUrl) return baseUrl;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Translates a generic recipe input model into a complete Schema.org JSON-LD Recipe object.
 */
export function translateToRecipeSchema(
  input: RawRecipeInput,
  options?: TranslatorConfig
): RecipeSchemaJSONLD {
  const config: Required<TranslatorConfig> = {
    ...DEFAULT_TRANSLATOR_CONFIG,
    ...options,
  };

  // Image handling
  let images: string[] = [];
  if (Array.isArray(input.image) && input.image.length > 0) {
    images = input.image.map((img) => resolveFullUrl(img, config.baseUrl));
  } else if (typeof input.image === 'string' && input.image.trim()) {
    images = [resolveFullUrl(input.image, config.baseUrl)];
  } else {
    images = [resolveFullUrl(config.defaultImage, config.baseUrl)];
  }

  // Durations
  const prepMinutes = input.prepTimeMinutes ?? 15;
  const cookMinutes = input.cookTimeMinutes ?? 20;
  const totalMinutes = input.totalTimeMinutes ?? (prepMinutes + cookMinutes);

  const prepTime = formatIsoDuration(prepMinutes);
  const cookTime = formatIsoDuration(cookMinutes);
  const totalTime = formatIsoDuration(totalMinutes);

  // Yields
  const recipeYield = typeof input.yieldServings === 'number'
    ? `${input.yieldServings} raciones`
    : input.yieldServings || '4 raciones';

  // Instructions normalization
  const recipeInstructions = input.instructions.map((inst, index) => {
    if (typeof inst === 'string') {
      return {
        '@type': 'HowToStep' as const,
        position: index + 1,
        name: `Paso ${index + 1}`,
        text: inst,
      };
    }
    const stepObj: {
      '@type': 'HowToStep';
      position: number;
      name?: string;
      text: string;
      image?: string;
      url?: string;
    } = {
      '@type': 'HowToStep' as const,
      position: index + 1,
      text: inst.text,
    };

    if (inst.step || inst.name) {
      stepObj.name = inst.step || inst.name;
    }
    if (inst.image) {
      stepObj.image = resolveFullUrl(inst.image, config.baseUrl);
    }
    if (inst.url) {
      stepObj.url = resolveFullUrl(inst.url, config.baseUrl);
    }
    return stepObj;
  });

  // Keywords
  let keywordsStr: string | undefined;
  if (Array.isArray(input.keywords)) {
    keywordsStr = input.keywords.join(', ');
  } else if (typeof input.keywords === 'string') {
    keywordsStr = input.keywords;
  }

  // Author URL resolution
  const authorUrl = input.authorUrl
    ? resolveFullUrl(input.authorUrl, config.baseUrl)
    : config.defaultAuthorUrl === DEFAULT_TRANSLATOR_CONFIG.defaultAuthorUrl
    ? config.baseUrl
    : resolveFullUrl(config.defaultAuthorUrl, config.baseUrl);

  // Main object
  const schema: RecipeSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: input.name,
    description: input.description,
    image: images,
    author: {
      '@type': 'Organization',
      name: input.authorName || config.defaultAuthorName,
      url: authorUrl,
    },
    datePublished: input.datePublished || new Date().toISOString().split('T')[0],
    prepTime,
    cookTime,
    totalTime,
    recipeYield,
    recipeCategory: input.category || config.defaultCategory,
    recipeCuisine: input.cuisine || config.defaultCuisine,
    recipeIngredient: input.ingredients,
    recipeInstructions,
  };

  if (input.dateModified) {
    schema.dateModified = input.dateModified;
  }

  if (keywordsStr) {
    schema.keywords = keywordsStr;
  }

  if (input.url) {
    const fullUrl = resolveFullUrl(input.url, config.baseUrl);
    schema.url = fullUrl;
    schema.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': fullUrl,
    };
  }

  if (input.nutrition) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: input.nutrition.calories,
      proteinContent: input.nutrition.proteinContent,
      fatContent: input.nutrition.fatContent,
      carbohydrateContent: input.nutrition.carbohydrateContent,
      servingSize: input.nutrition.servingSize,
    };
  }

  return schema;
}

/**
 * Validates a generated Schema.org Recipe JSON-LD object according to Google Rich Result recommendations.
 */
export function validateRecipeSchema(schema: unknown): SchemaValidationResult {
  const issues: SchemaValidationIssue[] = [];

  if (!schema || typeof schema !== 'object') {
    return {
      valid: false,
      issues: [{ field: 'root', message: 'Schema must be a non-null object', severity: 'error' }],
    };
  }

  const obj = schema as Record<string, any>;

  if (obj['@context'] !== 'https://schema.org') {
    issues.push({
      field: '@context',
      message: 'Must be "https://schema.org"',
      severity: 'error',
    });
  }

  if (obj['@type'] !== 'Recipe') {
    issues.push({
      field: '@type',
      message: 'Must be "Recipe"',
      severity: 'error',
    });
  }

  if (!obj.name || typeof obj.name !== 'string' || !obj.name.trim()) {
    issues.push({
      field: 'name',
      message: 'Recipe name is required and must be a non-empty string',
      severity: 'error',
    });
  }

  if (!obj.image || !Array.isArray(obj.image) || obj.image.length === 0) {
    issues.push({
      field: 'image',
      message: 'Recipe requires at least one image URL in an array',
      severity: 'error',
    });
  }

  if (!obj.recipeIngredient || !Array.isArray(obj.recipeIngredient) || obj.recipeIngredient.length === 0) {
    issues.push({
      field: 'recipeIngredient',
      message: 'Recipe requires at least one ingredient',
      severity: 'error',
    });
  }

  if (!obj.recipeInstructions || !Array.isArray(obj.recipeInstructions) || obj.recipeInstructions.length === 0) {
    issues.push({
      field: 'recipeInstructions',
      message: 'Recipe requires at least one instruction step',
      severity: 'error',
    });
  }

  if (!obj.prepTime) {
    issues.push({
      field: 'prepTime',
      message: 'prepTime is recommended for Google Rich Results',
      severity: 'warning',
    });
  }

  if (!obj.cookTime) {
    issues.push({
      field: 'cookTime',
      message: 'cookTime is recommended for Google Rich Results',
      severity: 'warning',
    });
  }

  if (!obj.author) {
    issues.push({
      field: 'author',
      message: 'author is recommended for Google Rich Results',
      severity: 'warning',
    });
  }

  const hasError = issues.some((i) => i.severity === 'error');

  return {
    valid: !hasError,
    issues,
  };
}

/**
 * Safely converts a Recipe Schema object into an HTML `<script type="application/ld+json">` tag string.
 */
export function exportToJsonLdScript(schema: RecipeSchemaJSONLD): string {
  const jsonString = JSON.stringify(schema, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${jsonString}\n</script>`;
}
