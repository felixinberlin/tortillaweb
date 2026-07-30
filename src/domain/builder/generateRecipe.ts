import type { Recipe, RecipeTechnique, OilUsage } from "../recipes/Recipe";
import { calculateIngredients, type RecipeCalculationOptions } from "./ingredientCalculator";

export interface BuilderOptions extends RecipeCalculationOptions {}

export function generateRecipe(options: BuilderOptions): Recipe {
  const { diners, hasOnion, doneness, potatoCut = "pochada" } = options;
  const calc = calculateIngredients(options);

  // Map doneness to standard technique texture
  const finalTextureMap: Record<string, RecipeTechnique["finalTexture"]> = {
    betanzos: "runny",
    jugosa: "creamy",
    cuajada: "firm",
  };

  const finalTexture = finalTextureMap[doneness] || "creamy";
  const potatoCooking: RecipeTechnique["potatoCooking"] =
    potatoCut === "crujiente" ? "double_stage_fry" : "confit";

  const technique: RecipeTechnique = {
    hasOnion,
    finalTexture,
    potatoCooking,
  };

  const oilUsage: OilUsage = {
    cookingAmount: calc.oilUsed,
    estimatedAbsorbedAmount: calc.oilAbsorbed,
    unit: "ml",
  };

  const ingredients = [
    {
      id: "egg",
      ingredientId: "egg",
      name: { es: "Huevos grandes L/XL", en: "Large Eggs", de: "Große Eier" },
      amount: calc.eggCount,
      quantity: calc.eggCount,
      unit: "unit",
    },
    {
      id: "potato",
      ingredientId: "potato",
      name: { es: "Patatas Monalisa", en: "Monalisa Potatoes", de: "Monalisa Kartoffeln" },
      amount: calc.potatoGrams,
      quantity: calc.potatoGrams,
      unit: "g",
    },
    ...(hasOnion
      ? [
          {
            id: "onion",
            ingredientId: "onion",
            name: { es: "Cebolla dulce", en: "Sweet Onion", de: "Süße Zwiebel" },
            amount: calc.onionGrams,
            quantity: calc.onionGrams,
            unit: "g",
          },
        ]
      : []),
    {
      id: "oil",
      ingredientId: "oil",
      name: { es: "Aceite de Oliva Virgen Extra", en: "Extra Virgin Olive Oil", de: "Natives Olivenöl Extra" },
      amount: calc.oilAbsorbed,
      quantity: calc.oilAbsorbed,
      cookingAmount: calc.oilUsed,
      estimatedAbsorbedAmount: calc.oilAbsorbed,
      unit: "ml",
      notes: {
        es: `${calc.oilUsed} ml para freír (${calc.oilAbsorbed} ml absorbidos)`,
        en: `${calc.oilUsed} ml for frying (${calc.oilAbsorbed} ml absorbed)`,
        de: `${calc.oilUsed} ml zum Frittieren (${calc.oilAbsorbed} ml aufgenommen)`,
      },
    },
    {
      id: "salt",
      ingredientId: "salt",
      name: { es: "Sal", en: "Salt", de: "Salz" },
      amount: calc.saltGrams,
      quantity: calc.saltGrams,
      unit: "g",
    },
  ];

  return {
    id: "user-custom-tortilla",
    recipeId: "user-custom-tortilla",
    title: {
      es: `Mi Tortilla Personalizada (${diners} personas)`,
      en: `My Custom Spanish Omelette (${diners} servings)`,
      de: `Meine Eigene Tortilla (${diners} Personen)`,
    },
    servings: diners,
    panSizeCm: calc.panSizeCm,
    technique,
    ingredients,
    oilUsage,
    source: {
      type: "user",
      name: "Tortilla Creator",
    },
  };
}
