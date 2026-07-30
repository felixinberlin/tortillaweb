import type { LocalizedString } from "@/types/taxonomy";

export type { LocalizedString };

export interface RecipeSource {
  type: "chef" | "restaurant" | "book" | "user";
  name: string;
  reference?: string;
  year?: number;
}

export interface AmountPerEgg {
  ingredientId: string;
  name: string | LocalizedString;
  quantity: number;      // normalized quantity per 1 egg
  totalQuantity: number; // total quantity in recipe
  unit: string;          // standard unit ("g", "ml", "unit", etc.)
}

export interface TortillaClassification {
  potatoIntensity: "eggDominant" | "balanced" | "potatoHeavy";
  potatoIntensityLabel: string;
  oilIntensity: "light" | "medium" | "rich";
  oilIntensityLabel: string;
  onionPresence: "none" | "moderate" | "heavy";
  onionPresenceLabel: string;
  eggDominance: "high" | "medium" | "low";
  eggDominanceLabel: string;
}

export interface RecipeDNA {
  recipeId: string;
  recipeName: string;
  localizedName?: LocalizedString;
  eggCount: number;
  source?: RecipeSource;
  ratios: {
    potato?: AmountPerEgg;
    onion?: AmountPerEgg;
    oil?: AmountPerEgg;
    salt?: AmountPerEgg;
    peppers?: AmountPerEgg;
    blackPepper?: AmountPerEgg;
    [ingredientId: string]: AmountPerEgg | undefined;
  };
  classification: TortillaClassification;
}

export interface RawIngredientInput {
  id?: string;
  ingredientId?: string;
  name?: string | LocalizedString;
  amount?: number;
  quantity?: number;
  cookingAmount?: number;
  estimatedAbsorbedAmount?: number;
  absorbedAmount?: number;
  unit?: string;
  notes?: string | LocalizedString;
}

export interface OilUsageInput {
  cookingAmount?: number;
  estimatedAbsorbedAmount?: number;
  amount?: number;
  unit?: string;
}

export interface RawRecipeInput {
  id?: string;
  recipeId?: string;
  slug?: string | LocalizedString;
  title?: string | LocalizedString;
  recipeName?: string | LocalizedString;
  name?: string | LocalizedString;
  source?: RecipeSource;
  ingredients?: RawIngredientInput[];
  oilUsage?: OilUsageInput;
  technique?: {
    hasOnion?: boolean;
    finalTexture?: "runny" | "creamy" | "firm";
    potatoCooking?: "confit" | "double_stage_fry" | "boil_fry" | "chips";
    [key: string]: any;
  };
  [key: string]: any;
}

export interface IngredientComparison {
  ingredientId: string;
  name: string;
  localizedName?: LocalizedString;
  recipeA: number;
  recipeB: number;
  recipeAValue: number; // Alias for UI flexibility
  recipeBValue: number; // Alias for UI flexibility
  unit: string;
  difference: number;
  percentageDifference: number;
}

export interface DNAComparisonSummary {
  potatoDifference: {
    recipeA: number;
    recipeB: number;
    difference: number;
    percentageDifference: number;
    unit: string;
  };
  oilDifference: {
    recipeA: number;
    recipeB: number;
    difference: number;
    percentageDifference: number;
    unit: string;
  };
  onionDifference: {
    recipeA: number;
    recipeB: number;
    difference: number;
    percentageDifference: number;
    unit: string;
  };
}

export interface ComparisonProfileSummary {
  potatoIntensity: { a: string; b: string };
  oilIntensity: { a: string; b: string };
  onionPresence: { a: string; b: string };
  eggDominance: { a: string; b: string };
}

export interface RecipeComparisonResult {
  recipeA: RecipeDNA;
  recipeB: RecipeDNA;
  ingredients: IngredientComparison[];
  dnaComparison: DNAComparisonSummary;
  profile: ComparisonProfileSummary;
}
