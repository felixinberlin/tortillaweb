import type { RawIngredientInput, RecipeSource } from "../tortilla-dna/types";

export interface OilUsage {
  cookingAmount: number;           // Total oil used in cooking/frying (e.g., 480 ml)
  estimatedAbsorbedAmount: number; // Oil actually consumed in final tortilla (e.g., 120 ml)
  unit: string;
}

export interface RecipeTechnique {
  hasOnion: boolean;
  finalTexture: "runny" | "creamy" | "firm"; // runny = Betanzos, creamy = jugosa, firm = cuajada
  potatoCooking: "confit" | "double_stage_fry" | "boil_fry" | "chips";
}

export interface Recipe {
  id: string;
  recipeId?: string;
  title: string | { es: string; en: string; de: string };
  recipeName?: string;
  servings: number;
  panSizeCm: number;
  technique: RecipeTechnique;
  ingredients: RawIngredientInput[];
  oilUsage?: OilUsage;
  source?: RecipeSource;
}
