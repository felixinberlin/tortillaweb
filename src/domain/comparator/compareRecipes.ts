import type {
  RawRecipeInput,
  RecipeProfile,
  IngredientComparison,
  RecipeComparisonResult,
} from "./types";
import { normalizeRecipe } from "./normalizeRecipe";

export function compareRecipes(
  recipeAInput: RawRecipeInput | RecipeProfile,
  recipeBInput: RawRecipeInput | RecipeProfile
): RecipeComparisonResult {
  // Normalize both inputs if not already normalized profiles
  const profileA: RecipeProfile =
    "ratios" in recipeAInput && "classification" in recipeAInput
      ? (recipeAInput as RecipeProfile)
      : normalizeRecipe(recipeAInput as RawRecipeInput);

  const profileB: RecipeProfile =
    "ratios" in recipeBInput && "classification" in recipeBInput
      ? (recipeBInput as RecipeProfile)
      : normalizeRecipe(recipeBInput as RawRecipeInput);

  // Union of all ingredient IDs from both recipes
  const allIngredientIds = Array.from(
    new Set([...Object.keys(profileA.ratios), ...Object.keys(profileB.ratios)])
  );

  // Preferred order of display
  const preferredOrder = ["potato", "egg", "oil", "salt", "onion", "peppers", "blackPepper"];
  allIngredientIds.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const ingredients: IngredientComparison[] = [];

  for (const ingId of allIngredientIds) {
    const ratioA = profileA.ratios[ingId];
    const ratioB = profileB.ratios[ingId];

    const valA = ratioA ? ratioA.quantity : 0;
    const valB = ratioB ? ratioB.quantity : 0;
    const unit = ratioA?.unit || ratioB?.unit || (ingId === "oil" ? "ml" : ingId === "egg" ? "unit" : "g");
    const name = ratioA?.name || ratioB?.name || ingId;

    const difference = Number((valB - valA).toFixed(2));

    let percentageDifference = 0;
    if (valA > 0) {
      percentageDifference = Number((((valB - valA) / valA) * 100).toFixed(1));
    } else if (valB > 0) {
      percentageDifference = 100;
    }

    ingredients.push({
      ingredientId: ingId,
      name,
      recipeAValue: valA,
      recipeBValue: valB,
      unit,
      difference,
      percentageDifference,
    });
  }

  return {
    recipeA: profileA,
    recipeB: profileB,
    ingredients,
    profile: {
      potatoIntensity: {
        a: profileA.classification.potatoIntensityLabel,
        b: profileB.classification.potatoIntensityLabel,
      },
      oilIntensity: {
        a: profileA.classification.oilIntensityLabel,
        b: profileB.classification.oilIntensityLabel,
      },
      onionPresence: {
        a: profileA.classification.onionPresenceLabel,
        b: profileB.classification.onionPresenceLabel,
      },
      eggDominance: {
        a: profileA.classification.eggDominanceLabel,
        b: profileB.classification.eggDominanceLabel,
      },
    },
  };
}
