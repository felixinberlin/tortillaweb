import { describe, it, expect } from "vitest";
import {
  generateTortillaSvg,
  recipeToSvgOptions,
  builderConfigToSvgOptions,
} from "../src/domain/svg/tortillaSvgGenerator";
import { createTortillaConfiguration } from "../src/domain/builder/configCalculator";
import type { RawRecipeInput } from "../src/lib/translator/types";

describe("Interactive SVG Recipe Visualizer & Ingredient Hyperlinks", () => {
  const sampleConcebollistaRecipe: RawRecipeInput = {
    name: "Tortilla Clásica de Santander con Cebolla Pochada",
    description: "Receta tradicional con patata pochada lentamente y cebolla caramelizada.",
    ingredients: [
      "6 huevos camperos",
      "700g patatas Monalisa",
      "1 cebolla dulce picada",
      "Aceite de oliva virgen extra",
      "Sal marina",
    ],
    instructions: [
      "Pochar las patatas y la cebolla en AOVE",
      "Batir los huevos ligeramente",
      "Mezclar y reposar 3 minutos",
      "Cuajar 1 minuto por cada lado a fuego medio",
    ],
  };

  const samplePuristaRecipe: RawRecipeInput = {
    name: "Tortilla Purista de Betanzos",
    description: "Patata crujiente y yema desbordante sin cebolla.",
    ingredients: [
      "8 huevos camperos",
      "500g patata Kennebec",
      "Aceite de oliva virgen extra",
      "Sal fina",
    ],
    instructions: [
      "Freír las patatas finas",
      "Mezclar con los huevos batidos",
      "Voltear en sartén caliente sin cuajar el centro",
    ],
  };

  describe("Ingredient-level Link Routing (Spanish)", () => {
    it("should link potato, egg, olive oil, onion, skillet, and science when onion is present", () => {
      const options = recipeToSvgOptions(sampleConcebollistaRecipe, {
        interactive: true,
        lang: "es",
        presentation: "skillet_top",
      });

      const svg = generateTortillaSvg(options);

      // Verify Links
      expect(svg).toContain('href="/es/ingredientes/patata"');
      expect(svg).toContain('href="/es/ingredientes/huevo"');
      expect(svg).toContain('href="/es/ingredientes/aceite-de-oliva"');
      expect(svg).toContain('href="/es/facciones/concebollistas"');
      expect(svg).toContain('href="/es/utensilios"');
      expect(svg).toContain('href="/es/science"');

      // Verify Accessibility and Interaction attributes
      expect(svg).toContain('role="link"');
      expect(svg).toContain('aria-label=');
      expect(svg).toContain('<title>');
      expect(svg).toContain('cursor: pointer');
    });

    it("should omit onion link when recipe is purista (no onion in recipe)", () => {
      const options = recipeToSvgOptions(samplePuristaRecipe, {
        interactive: true,
        lang: "es",
      });

      const svg = generateTortillaSvg(options);

      expect(svg).toContain('href="/es/ingredientes/patata"');
      expect(svg).toContain('href="/es/ingredientes/huevo"');
      expect(svg).not.toContain('href="/es/facciones/concebollistas"');
    });
  });

  describe("Multilingual Routing & Localized Tooltips", () => {
    it("should generate proper English routes and tooltips", () => {
      const options = recipeToSvgOptions(sampleConcebollistaRecipe, {
        interactive: true,
        lang: "en",
        presentation: "skillet_top",
      });

      const svg = generateTortillaSvg(options);

      expect(svg).toContain('href="/en/ingredients/potato"');
      expect(svg).toContain('href="/en/ingredients/egg"');
      expect(svg).toContain('href="/en/ingredients/olive-oil"');
      expect(svg).toContain('href="/en/factions/concebollistas"');
      expect(svg).toContain('href="/en/utensilios"');
      expect(svg).toContain('aria-label="Potato: The Potato Monograph and varieties"');
      expect(svg).toContain('aria-label="Egg: Egg Monograph and thermal coagulation"');
    });

    it("should generate proper German routes and tooltips", () => {
      const options = recipeToSvgOptions(sampleConcebollistaRecipe, {
        interactive: true,
        lang: "de",
        presentation: "skillet_top",
      });

      const svg = generateTortillaSvg(options);

      expect(svg).toContain('href="/de/zutaten/kartoffel"');
      expect(svg).toContain('href="/de/zutaten/ei"');
      expect(svg).toContain('href="/de/zutaten/olivenoel"');
      expect(svg).toContain('href="/de/faktionen/concebollistas"');
      expect(svg).toContain('href="/de/utensilios"');
      expect(svg).toContain('aria-label="Kartoffel: Kartoffel-Monographie und Sorten"');
      expect(svg).toContain('aria-label="Ei: Ei-Monographie und Stockungstemperatur"');
    });
  });

  describe("Presentation Views with Interactivity", () => {
    it("should render interactive links across sliced_pincho wedge cross-section", () => {
      const svg = generateTortillaSvg({
        title: "Pincho de Tortilla Melosa",
        presentation: "sliced_pincho",
        doneness: "melosa",
        onion: true,
        interactive: true,
        lang: "es",
      });

      expect(svg).toContain('href="/es/ingredientes/patata"');
      expect(svg).toContain('href="/es/ingredientes/huevo"');
      expect(svg).toContain('href="/es/ingredientes/aceite-de-oliva"');
      expect(svg).toContain('href="/es/facciones/concebollistas"');
      expect(svg).toContain('href="/es/utensilios"');
      expect(svg).toContain("_interactiveLink");
    });

    it("should render interactive links across duo_pan_slice view", () => {
      const svg = generateTortillaSvg({
        title: "Duo Sartén y Pincho",
        presentation: "duo_pan_slice",
        doneness: "liquid",
        onion: true,
        interactive: true,
        lang: "es",
      });

      expect(svg).toContain('href="/es/ingredientes/patata"');
      expect(svg).toContain('href="/es/ingredientes/huevo"');
      expect(svg).toContain('href="/es/facciones/concebollistas"');
      expect(svg).toContain('href="/es/utensilios"');
    });
  });

  describe("Builder Configuration to Interactive SVG", () => {
    it("should properly propagate interactive flag from builder config", () => {
      const config = createTortillaConfiguration({
        eggs: 6,
        potatoesGrams: 600,
        texture: "melosa",
        extras: [{ id: "onion", quantity: 120 }],
      });

      const options = builderConfigToSvgOptions(config, {
        interactive: true,
        lang: "es",
        presentation: "skillet_top",
      });

      const svg = generateTortillaSvg(options);

      expect(svg).toContain('href="/es/ingredientes/patata"');
      expect(svg).toContain('href="/es/ingredientes/huevo"');
      expect(svg).toContain('href="/es/facciones/concebollistas"');
      expect(svg).toContain('href="/es/utensilios"');
    });
  });

  describe("Non-interactive Mode Integrity", () => {
    it("should produce clean SVG without anchor tags or interactive CSS when interactive is false", () => {
      const svg = generateTortillaSvg({
        title: "Tortilla Estática",
        interactive: false,
        lang: "es",
        onion: true,
      });

      expect(svg).not.toContain('<a href=');
      expect(svg).not.toContain('role="link"');
      expect(svg).not.toContain('cursor: pointer');
      expect(svg).not.toContain('_interactiveLink');
    });
  });
});
