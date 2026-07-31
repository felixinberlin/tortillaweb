import { describe, it, expect } from "vitest";
import { generateRecipe } from "../src/domain/builder/generateRecipe";
import { normalizeRecipe } from "../src/domain/tortilla-dna/normalizeRecipe";
import { compareRecipes } from "../src/domain/tortilla-dna/compareRecipes";
import { getReferenceRecipes } from "../src/domain/recipes/referenceRecipes";

describe("Builder & Tortilla DNA Integration Engine", () => {
  it("generates a complete structured Recipe object with technique metadata from builder choices", () => {
    const recipe = generateRecipe({
      diners: 4,
      hasOnion: true,
      doneness: "jugosa",
      potatoCut: "pochada",
    });

    expect(recipe.id).toBe("user-custom-tortilla");
    expect(recipe.servings).toBe(4);
    expect(recipe.panSizeCm).toBe(24);

    // Technique checks
    expect(recipe.technique.hasOnion).toBe(true);
    expect(recipe.technique.finalTexture).toBe("creamy");
    expect(recipe.technique.potatoCooking).toBe("confit");

    // Oil usage separation
    expect(recipe.oilUsage?.cookingAmount).toBe(480); // 480 ml used in pan
    expect(recipe.oilUsage?.estimatedAbsorbedAmount).toBe(120); // 120 ml absorbed by eggs & potatoes

    // Ingredients
    expect(recipe.ingredients).toHaveLength(5);
    const eggIng = recipe.ingredients.find((i) => i.ingredientId === "egg");
    const potatoIng = recipe.ingredients.find((i) => i.ingredientId === "potato");
    expect(eggIng?.amount).toBe(6);
    expect(potatoIng?.amount).toBe(600);
  });

  it("normalizes a builder recipe into a Tortilla DNA profile using absorbed oil", () => {
    const recipe = generateRecipe({
      diners: 4,
      hasOnion: false,
      doneness: "betanzos",
      potatoCut: "pochada",
    });

    const dna = normalizeRecipe(recipe);

    expect(dna.eggCount).toBe(6);
    expect(dna.ratios.potato?.quantity).toBe(100); // 600g / 6 eggs = 100g/egg
    expect(dna.ratios.oil?.quantity).toBe(20);     // Uses absorbed oil: 120ml / 6 eggs = 20ml/egg
    expect(dna.classification.oilIntensity).toBe("medium"); // 20-35ml/egg = medium
    expect(dna.classification.onionPresence).toBe("none");
  });

  it("compares a user builder recipe against reference recipes correctly", () => {
    const userRecipe = generateRecipe({
      diners: 4,
      hasOnion: true,
      doneness: "jugosa",
    });

    const referenceRecipes = getReferenceRecipes();
    expect(referenceRecipes.length).toBeGreaterThanOrEqual(4);

    const betanzos = referenceRecipes.find((r) => r.id === "betanzos");
    expect(betanzos).toBeDefined();

    if (betanzos) {
      const comparison = compareRecipes(userRecipe, betanzos);

      expect(comparison.recipeA.eggCount).toBe(6);
      expect(comparison.recipeB.eggCount).toBe(8); // 8 eggs in betanzos recipe

      // Compare potato ratios per egg
      expect(comparison.dnaComparison.potatoDifference.recipeA).toBe(100); // 600g / 6 = 100g
      expect(comparison.dnaComparison.potatoDifference.recipeB).toBe(62.5); // 500g / 8 = 62.5g
      expect(comparison.dnaComparison.potatoDifference.difference).toBe(-37.5);
    }
  });

  it("maps different doneness and potato cuts to appropriate technique profiles", () => {
    const betanzosCustom = generateRecipe({
      diners: 2,
      hasOnion: false,
      doneness: "betanzos",
      potatoCut: "crujiente",
    });

    expect(betanzosCustom.technique.finalTexture).toBe("runny");
    expect(betanzosCustom.technique.potatoCooking).toBe("double_stage_fry");

    const firmCustom = generateRecipe({
      diners: 6,
      hasOnion: true,
      doneness: "cuajada",
    });

    expect(firmCustom.technique.finalTexture).toBe("firm");
    expect(firmCustom.technique.potatoCooking).toBe("confit");
  });
});
