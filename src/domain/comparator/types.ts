import type { LocalizedString } from "@/types/taxonomy";

export type { LocalizedString };

export interface RawIngredientInput {
  id?: string;
  ingredientId?: string;
  name?: string | LocalizedString;
  amount?: number;
  quantity?: number;
  unit?: string;
  notes?: string | LocalizedString;
}

export interface RawRecipeInput {
  id?: string;
  recipeId?: string;
  slug?: string | LocalizedString;
  title?: string | LocalizedString;
  recipeName?: string | LocalizedString;
  name?: string | LocalizedString;
  ingredients?: RawIngredientInput[];
  [key: string]: any;
}

export interface NormalizedIngredientRatio {
  ingredientId: string;
  name: string | LocalizedString;
  quantity: number;      // normalized quantity per 1 egg
  totalQuantity: number; // total quantity in recipe
  unit: string;          // normalized standard unit ("g", "ml", "unit", etc.)
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

export interface RecipeProfile {
  recipeId: string;
  recipeName: string;
  localizedName?: LocalizedString;
  eggCount: number;
  ratios: {
    potato?: NormalizedIngredientRatio;
    onion?: NormalizedIngredientRatio;
    oil?: NormalizedIngredientRatio;
    salt?: NormalizedIngredientRatio;
    peppers?: NormalizedIngredientRatio;
    blackPepper?: NormalizedIngredientRatio;
    [ingredientId: string]: NormalizedIngredientRatio | undefined;
  };
  classification: TortillaClassification;
}

export interface IngredientComparison {
  ingredientId: string;
  name: string | LocalizedString;
  localizedName?: LocalizedString;
  recipeAValue: number;
  recipeBValue: number;
  unit: string;
  difference: number;
  percentageDifference: number;
}

export interface ComparisonProfileSummary {
  potatoIntensity: { a: string; b: string };
  oilIntensity: { a: string; b: string };
  onionPresence: { a: string; b: string };
  eggDominance: { a: string; b: string };
}

export interface RecipeComparisonResult {
  recipeA: RecipeProfile;
  recipeB: RecipeProfile;
  ingredients: IngredientComparison[];
  profile: ComparisonProfileSummary;
}
