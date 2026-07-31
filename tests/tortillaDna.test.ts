import { describe, it, expect } from "vitest";
import { normalizeRecipe } from "../src/domain/tortilla-dna/normalizeRecipe";
import { compareRecipes } from "../src/domain/tortilla-dna/compareRecipes";
import { classifyRecipe } from "../src/domain/tortilla-dna/classifyRecipe";

describe("Tortilla DNA & Recipe Comparator Domain Foundation", () => {
  const classicRecipe = {
    id: "clasica",
    title: { es: "Tortilla Clásica", en: "Classic Omelette", de: "Klassische Tortilla" },
    source: { type: "chef" as const, name: "Tradición Familiar", year: 1980 },
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
    source: { type: "restaurant" as const, name: "Mesón O Potiño", reference: "Betanzos" },
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
    source: { type: "user" as const, name: "Manuel" },
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 600, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 6, unit: "unit" },
      { ingredientId: "oil", name: "Aceite de Oliva", amount: 150, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 6, unit: "g" },
      { ingredientId: "onion", name: "Cebolla", amount: 200, unit: "g" },
    ],
  };

  const scaled6Eggs = {
    id: "batch-6-eggs",
    title: "Batch 6 Eggs",
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 600, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 6, unit: "unit" },
      { ingredientId: "oil", name: "Aceite", amount: 150, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 6, unit: "g" },
    ],
  };

  const scaled12Eggs = {
    id: "batch-12-eggs",
    title: "Batch 12 Eggs",
    ingredients: [
      { ingredientId: "potato", name: "Patata", amount: 1200, unit: "g" },
      { ingredientId: "egg", name: "Huevo", amount: 12, unit: "unit" },
      { ingredientId: "oil", name: "Aceite", amount: 300, unit: "ml" },
      { ingredientId: "salt", name: "Sal", amount: 12, unit: "g" },
    ],
  };

  it("produces identical DNA ratios for 6 eggs + 600g potato vs 12 eggs + 1200g potato", () => {
    const dna6 = normalizeRecipe(scaled6Eggs);
    const dna12 = normalizeRecipe(scaled12Eggs);

    expect(dna6.ratios.potato?.quantity).toBe(100);
    expect(dna12.ratios.potato?.quantity).toBe(100);

    expect(dna6.ratios.oil?.quantity).toBe(25);
    expect(dna12.ratios.oil?.quantity).toBe(25);

    expect(dna6.ratios.salt?.quantity).toBe(1);
    expect(dna12.ratios.salt?.quantity).toBe(1);

    const comparison = compareRecipes(scaled6Eggs, scaled12Eggs);
    expect(comparison.dnaComparison.potatoDifference.difference).toBe(0);
    expect(comparison.dnaComparison.potatoDifference.percentageDifference).toBe(0);
  });

  it("normalizes classic tortilla recipe accurately", () => {
    const dna = normalizeRecipe(classicRecipe);

    expect(dna.recipeId).toBe("clasica");
    expect(dna.eggCount).toBe(6);
    expect(dna.source?.type).toBe("chef");
    expect(dna.source?.name).toBe("Tradición Familiar");
    expect(dna.ratios.potato?.quantity).toBe(100); // 600 / 6 = 100g
    expect(dna.ratios.oil?.quantity).toBe(25);      // 150 / 6 = 25ml
    expect(dna.classification.potatoIntensity).toBe("balanced");
    expect(dna.classification.oilIntensity).toBe("medium");
  });

  it("classifies Betanzos style as egg dominant", () => {
    const dna = normalizeRecipe(betanzosRecipe);

    expect(dna.eggCount).toBe(10);
    expect(dna.ratios.potato?.quantity).toBe(60); // 600 / 10 = 60g (<100g)
    expect(dna.classification.potatoIntensity).toBe("eggDominant");
    expect(dna.classification.eggDominance).toBe("high");
    expect(dna.source?.type).toBe("restaurant");
  });

  it("compares onion vs no-onion recipes correctly", () => {
    const noOnionDna = normalizeRecipe(classicRecipe);
    const onionDna = normalizeRecipe(conCebollaRecipe);

    expect(noOnionDna.classification.onionPresence).toBe("none");
    expect(onionDna.classification.onionPresence).toBe("heavy");

    const comparison = compareRecipes(classicRecipe, conCebollaRecipe);
    expect(comparison.dnaComparison.onionDifference.recipeA).toBe(0);
    expect(comparison.dnaComparison.onionDifference.recipeB).toBeCloseTo(33.33, 1);
    expect(comparison.dnaComparison.onionDifference.difference).toBeCloseTo(33.33, 1);
  });

  it("classifies potato-heavy and oil-rich tortillas", () => {
    const heavyPotatoRecipe = {
      id: "heavy-potato",
      title: "Heavy Potato Tortilla",
      ingredients: [
        { ingredientId: "potato", name: "Patata", amount: 900, unit: "g" },
        { ingredientId: "egg", name: "Huevo", amount: 5, unit: "unit" }, // 180g / egg (>150g)
        { ingredientId: "oil", name: "Aceite", amount: 200, unit: "ml" }, // 40ml / egg (>35ml)
      ],
    };

    const dna = normalizeRecipe(heavyPotatoRecipe);

    expect(dna.ratios.potato?.quantity).toBe(180);
    expect(dna.classification.potatoIntensity).toBe("potatoHeavy");
    expect(dna.ratios.oil?.quantity).toBe(40);
    expect(dna.classification.oilIntensity).toBe("rich");
  });

  it("classifyRecipe function directly evaluates thresholds correctly", () => {
    const lightOilClassification = classifyRecipe({
      potato: { ingredientId: "potato", name: "Patata", quantity: 120, totalQuantity: 600, unit: "g" },
      oil: { ingredientId: "oil", name: "Aceite", quantity: 15, totalQuantity: 75, unit: "ml" },
      onion: { ingredientId: "onion", name: "Cebolla", quantity: 0, totalQuantity: 0, unit: "g" },
    });

    expect(lightOilClassification.oilIntensity).toBe("light");
    expect(lightOilClassification.potatoIntensity).toBe("balanced");
    expect(lightOilClassification.onionPresence).toBe("none");
  });
});
