import type { Recipe, RecipeTechnique, OilUsage } from "../recipes/Recipe";
import { calculateIngredients, type RecipeCalculationOptions } from "./ingredientCalculator";
import type { TortillaConfiguration } from "./types";
import { getIngredientModifier } from "./ingredientRegistry";

export interface BuilderOptions extends Partial<RecipeCalculationOptions> {
  config?: TortillaConfiguration;
  diners?: number;
  hasOnion?: boolean;
  doneness?: "betanzos" | "jugosa" | "cuajada";
  potatoCut?: "pochada" | "crujiente";
}

export function generateRecipe(options: BuilderOptions): Recipe {
  if (options.config) {
    const config = options.config;
    const { calculatedProfile, preferences } = config;

    const eggIng = config.ingredients.find((i) => i.entityId === "egg");
    const hasOnion = config.ingredients.some((i) => i.entityId === "onion" && i.quantity > 0);

    const eggCount = eggIng?.quantity || 6;

    const finalTextureMap: Record<string, RecipeTechnique["finalTexture"]> = {
      betanzos: "runny",
      runny: "runny",
      jugosa: "creamy",
      creamy: "creamy",
      cuajada: "firm",
      firm: "firm",
    };

    const finalTexture = finalTextureMap[preferences.texture || "jugosa"] || "creamy";
    const potatoCooking: RecipeTechnique["potatoCooking"] =
      preferences.potatoTechnique === "crujiente" || preferences.potatoTechnique === "crispy"
        ? "double_stage_fry"
        : "confit";

    const technique: RecipeTechnique = {
      hasOnion,
      finalTexture,
      potatoCooking,
    };

    const oilUsage: OilUsage = {
      cookingAmount: calculatedProfile.estimatedFryingOilMl,
      estimatedAbsorbedAmount: calculatedProfile.estimatedAbsorbedOilMl,
      unit: "ml",
    };

    const ingredients = config.ingredients.map((ing) => {
      if (ing.entityId === "egg") {
        return {
          id: "egg",
          ingredientId: "egg",
          name: { es: `Huevos (${ing.size?.toUpperCase() || "L"})`, en: `Eggs (${ing.size?.toUpperCase() || "L"})`, de: `Eier (${ing.size?.toUpperCase() || "L"})` },
          amount: ing.quantity,
          quantity: ing.quantity,
          unit: "unit",
        };
      }
      if (ing.entityId === "potato") {
        return {
          id: "potato",
          ingredientId: "potato",
          name: { es: `Patatas (${calculatedProfile.potatoUnits} unidades)`, en: `Potatoes (≈${calculatedProfile.potatoUnits} units)`, de: `Kartoffeln (≈${calculatedProfile.potatoUnits} Stk)` },
          amount: ing.quantity,
          quantity: ing.quantity,
          unit: "g",
        };
      }
      if (ing.entityId === "oil") {
        return {
          id: "oil",
          ingredientId: "oil",
          name: { es: "Aceite de Oliva Virgen Extra", en: "Extra Virgin Olive Oil", de: "Natives Olivenöl Extra" },
          amount: calculatedProfile.estimatedAbsorbedOilMl,
          quantity: calculatedProfile.estimatedAbsorbedOilMl,
          cookingAmount: calculatedProfile.estimatedFryingOilMl,
          estimatedAbsorbedAmount: calculatedProfile.estimatedAbsorbedOilMl,
          unit: "ml",
          notes: {
            es: `${calculatedProfile.estimatedFryingOilMl} ml para freír (${calculatedProfile.estimatedAbsorbedOilMl} ml absorbidos)`,
            en: `${calculatedProfile.estimatedFryingOilMl} ml for frying (${calculatedProfile.estimatedAbsorbedOilMl} ml absorbed)`,
            de: `${calculatedProfile.estimatedFryingOilMl} ml zum Frittieren (${calculatedProfile.estimatedAbsorbedOilMl} ml aufgenommen)`,
          },
        };
      }
      const mod = getIngredientModifier(ing.entityId);
      return {
        id: ing.entityId,
        ingredientId: ing.entityId,
        name: mod ? mod.name : { es: ing.entityId, en: ing.entityId, de: ing.entityId },
        amount: ing.quantity,
        quantity: ing.quantity,
        unit: ing.unit,
      };
    });

    // Add salt if missing
    if (!ingredients.some((i) => i.id === "salt")) {
      const saltGrams = Math.max(1, Math.round(eggCount * 0.8));
      ingredients.push({
        id: "salt",
        ingredientId: "salt",
        name: { es: "Sal", en: "Salt", de: "Salz" },
        amount: saltGrams,
        quantity: saltGrams,
        unit: "g",
      });
    }

    return {
      id: "user-custom-tortilla",
      recipeId: "user-custom-tortilla",
      title: {
        es: `Mi Tortilla Personalizada (${calculatedProfile.estimatedServings} raciones)`,
        en: `My Custom Tortilla (${calculatedProfile.estimatedServings} servings)`,
        de: `Meine Eigene Tortilla (${calculatedProfile.estimatedServings} Portionen)`,
      },
      servings: calculatedProfile.estimatedServings,
      panSizeCm: calculatedProfile.recommendedPanSizeCm,
      technique,
      ingredients,
      oilUsage,
      source: {
        type: "user",
        name: "Tortilla Creator",
      },
    };
  }

  // Legacy fallback for diners calculation
  const diners = options.diners ?? 4;
  const hasOnion = options.hasOnion ?? true;
  const doneness = options.doneness ?? "jugosa";
  const potatoCut = options.potatoCut ?? "pochada";

  const calc = calculateIngredients({
    diners,
    hasOnion,
    doneness,
    potatoCut,
  });

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
