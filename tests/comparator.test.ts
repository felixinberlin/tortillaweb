import { describe, it, expect } from "vitest";
import { normalizeRecipe } from "../src/domain/comparator/normalizeRecipe";
import { compareRecipes } from "../src/domain/comparator/compareRecipes";

describe("Tortilla Recipe Comparator Domain Module", () => {
  const classicRecipe = {
    id: "clasica",
    title: { es: "Tortilla Clásica", en: "Classic Tortilla", de: "Klassische Tortilla" },
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 600, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 6, unit: "unit" },
      { ingredientId: "oil", name: "Aceite de Oliva", amount: 150, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 6, unit: "g" },
    ],
  };

  const betanzosRecipe = {
    id: "betanzos",
    title: { es: "Tortilla de Betanzos", en: "Betanzos Style", de: "Betanzos Stil" },
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 600, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 10, unit: "unit" },
      { ingredientId: "oil", name: "Aceite de Oliva", amount: 150, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 5, unit: "g" },
    ],
  };

  const conCebollaRecipe = {
    id: "concebolla",
    title: { es: "Tortilla Con Cebolla", en: "Tortilla With Onion", de: "Tortilla Mit Zwiebel" },
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 600, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 6, unit: "unit" },
      { ingredientId: "oil", name: "Aceite de Oliva", amount: 150, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 6, unit: "g" },
      { ingredientId: "onion", name: "Cebolla", amount: 200, unit: "g" },
    ],
  };

  const scaledRecipe4Eggs = {
    id: "small-batch",
    title: "Small Batch (4 eggs)",
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 400, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 4, unit: "unit" },
      { ingredientId: "oil", name: "Aceite", amount: 100, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 4, unit: "g" },
    ],
  };

  const scaledRecipe8Eggs = {
    id: "large-batch",
    title: "Large Batch (8 eggs)",
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 800, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 8, unit: "unit" },
      { ingredientId: "oil", name: "Aceite", amount: 200, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 8, unit: "g" },
    ],
  };

  it("normalizes a classic recipe correctly per egg", () => {
    const profile = normalizeRecipe(classicRecipe);

    expect(profile.recipeId).toBe("clasica");
    expect(profile.eggCount).toBe(6);
    expect(profile.ratios.potato?.quantity).toBe(100); // 600g / 6 = 100g/egg
    expect(profile.ratios.oil?.quantity).toBe(25);      // 150ml / 6 = 25ml/egg
    expect(profile.ratios.salt?.quantity).toBe(1);      // 6g / 6 = 1g/egg
    expect(profile.ratios.onion?.quantity).toBe(0);     // 0g onion
  });

  it("normalizes Betanzos style as egg dominant (low potato per egg)", () => {
    const profile = normalizeRecipe(betanzosRecipe);

    expect(profile.eggCount).toBe(10);
    expect(profile.ratios.potato?.quantity).toBe(60); // 600g / 10 = 60g/egg (< 100g)
    expect(profile.classification.potatoIntensity).toBe("eggDominant");
    expect(profile.classification.eggDominance).toBe("high");
  });

  it("handles onion vs no onion recipes accurately", () => {
    const noOnionProfile = normalizeRecipe(classicRecipe);
    const onionProfile = normalizeRecipe(conCebollaRecipe);

    expect(noOnionProfile.classification.onionPresence).toBe("none");
    expect(onionProfile.classification.onionPresence).toBe("heavy"); // 200g / 6 eggs = 33.33g/egg (> 30g)

    const comparison = compareRecipes(classicRecipe, conCebollaRecipe);

    const onionComp = comparison.ingredients.find((i) => i.ingredientId === "onion");
    expect(onionComp).toBeDefined();
    expect(onionComp?.recipeAValue).toBe(0);
    expect(onionComp?.recipeBValue).toBeCloseTo(33.33, 1);
    expect(onionComp?.difference).toBeCloseTo(33.33, 1);
  });

  it("produces identical normalized ratios regardless of egg batch scale", () => {
    const profile4 = normalizeRecipe(scaledRecipe4Eggs);
    const profile8 = normalizeRecipe(scaledRecipe8Eggs);

    expect(profile4.ratios.potato?.quantity).toBe(100);
    expect(profile8.ratios.potato?.quantity).toBe(100);

    expect(profile4.ratios.oil?.quantity).toBe(25);
    expect(profile8.ratios.oil?.quantity).toBe(25);

    expect(profile4.ratios.salt?.quantity).toBe(1);
    expect(profile8.ratios.salt?.quantity).toBe(1);

    const comparison = compareRecipes(scaledRecipe4Eggs, scaledRecipe8Eggs);
    const potatoComp = comparison.ingredients.find((i) => i.ingredientId === "potato");

    expect(potatoComp?.difference).toBe(0);
    expect(potatoComp?.percentageDifference).toBe(0);
  });

  it("classifies potato heavy tortillas correctly (>150g potato per egg)", () => {
    const heavyPotatoRecipe = {
      id: "heavy",
      title: "Potato Heavy Tortilla",
      ingredients: [
        { ingredientId: "potato", name: "Patata", amount: 1000, unit: "g" },
        { ingredientId: "egg", name: "Huevo", amount: 5, unit: "unit" }, // 200g potato / egg
      ],
    };

    const profile = normalizeRecipe(heavyPotatoRecipe);
    expect(profile.ratios.potato?.quantity).toBe(200);
    expect(profile.classification.potatoIntensity).toBe("potatoHeavy");
    expect(profile.classification.eggDominance).toBe("low");
  });
});
