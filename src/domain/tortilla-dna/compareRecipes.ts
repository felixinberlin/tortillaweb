import type {
  RawRecipeInput,
  RecipeDNA,
  IngredientComparison,
  RecipeComparisonResult,
  DNAComparisonSummary,
} from "./types";
import { normalizeRecipe } from "./normalizeRecipe";

export function compareRecipes(
  recipeAInput: RawRecipeInput | RecipeDNA,
  recipeBInput: RawRecipeInput | RecipeDNA
): RecipeComparisonResult {
  const profileA: RecipeDNA =
    "ratios" in recipeAInput && "classification" in recipeAInput
      ? (recipeAInput as RecipeDNA)
      : normalizeRecipe(recipeAInput as RawRecipeInput);

  const profileB: RecipeDNA =
    "ratios" in recipeBInput && "classification" in recipeBInput
      ? (recipeBInput as RecipeDNA)
      : normalizeRecipe(recipeBInput as RawRecipeInput);

  const allIngredientIds = Array.from(
    new Set([...Object.keys(profileA.ratios), ...Object.keys(profileB.ratios)])
  );

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
      name: typeof name === "object" ? name.es || name.en || "Ingrediente" : name,
      recipeA: valA,
      recipeB: valB,
      recipeAValue: valA,
      recipeBValue: valB,
      unit,
      difference,
      percentageDifference,
    });
  }

  const getDiffFor = (ingId: string, defaultUnit: string) => {
    const item = ingredients.find((i) => i.ingredientId === ingId);
    return {
      recipeA: item ? item.recipeA : 0,
      recipeB: item ? item.recipeB : 0,
      difference: item ? item.difference : 0,
      percentageDifference: item ? item.percentageDifference : 0,
      unit: item ? item.unit : defaultUnit,
    };
  };

  const dnaComparison: DNAComparisonSummary = {
    potatoDifference: getDiffFor("potato", "g"),
    oilDifference: getDiffFor("oil", "ml"),
    onionDifference: getDiffFor("onion", "g"),
  };

  return {
    recipeA: profileA,
    recipeB: profileB,
    ingredients,
    dnaComparison,
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
