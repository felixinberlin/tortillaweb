import {
  calculateIngredients as domainCalculateIngredients,
  type RecipeCalculationOptions,
  type RecipeCalculationResult,
} from "../domain/builder/ingredientCalculator";

export type { RecipeCalculationOptions, RecipeCalculationResult };

export function calculateIngredients(options: RecipeCalculationOptions): RecipeCalculationResult {
  return domainCalculateIngredients(options);
}
