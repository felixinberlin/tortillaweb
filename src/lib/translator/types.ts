/**
 * Schema.org Recipe Translator Types & Interfaces
 * Standalone TypeScript definitions for Recipe JSON-LD structured data translation.
 */

export interface TranslatorConfig {
  /** Base URL for absolute link and image resolution. Default: 'https://recipe.org' */
  baseUrl?: string;
  /** Name of the publishing site or organization. Default: 'Recipe Translator' */
  siteName?: string;
  /** Default author name or organization. Default: 'Recipe Translator' */
  defaultAuthorName?: string;
  /** Default author URL. */
  defaultAuthorUrl?: string;
  /** Default language code (e.g., 'es', 'en', 'de', 'fr'). Default: 'es' */
  defaultLanguage?: string;
  /** Default category if none provided. Default: 'Main Course' */
  defaultCategory?: string;
  /** Default cuisine if none provided. Default: 'International' */
  defaultCuisine?: string;
  /** Default image placeholder path or absolute URL */
  defaultImage?: string;
}

export interface InstructionStepInput {
  step?: string;
  text: string;
  name?: string;
  image?: string;
  url?: string;
}

export interface RawRecipeInput {
  name: string;
  description: string;
  image?: string | string[];
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  totalTimeMinutes?: number;
  yieldServings?: number | string;
  authorName?: string;
  authorUrl?: string;
  ingredients: string[];
  instructions: (string | InstructionStepInput)[];
  category?: string;
  cuisine?: string;
  keywords?: string[] | string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  nutrition?: {
    calories?: string;
    proteinContent?: string;
    fatContent?: string;
    carbohydrateContent?: string;
    servingSize?: string;
  };
}

export interface RecipeSchemaJSONLD {
  '@context': 'https://schema.org';
  '@type': 'Recipe';
  name: string;
  description: string;
  image: string[];
  author: {
    '@type': 'Organization' | 'Person';
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield: string;
  recipeCategory: string;
  recipeCuisine: string;
  keywords?: string;
  recipeIngredient: string[];
  recipeInstructions: Array<{
    '@type': 'HowToStep';
    position: number;
    name?: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  url?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  nutrition?: {
    '@type': 'NutritionInformation';
    calories?: string;
    proteinContent?: string;
    fatContent?: string;
    carbohydrateContent?: string;
    servingSize?: string;
  };
}

export interface CooklangExportOptions {
  /** Include metadata header lines (>> key: value). Default: true */
  includeMetadata?: boolean;
  /** Include cookware tags like #sartén{24%cm}. Default: true */
  includeCookware?: boolean;
  /** Primary language code to resolve localized strings ('es' | 'en' | 'de'). Default: 'es' */
  lang?: string;
  /** Author name override for metadata header */
  authorName?: string;
  /** Custom website or source URL for metadata header */
  sourceUrl?: string;
}

export interface SchemaValidationIssue {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface SchemaValidationResult {
  valid: boolean;
  issues: SchemaValidationIssue[];
}
