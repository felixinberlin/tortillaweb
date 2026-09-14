import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  generateStaticSvgForRecipe,
  writeStaticSvgForRecipe,
} from "../src/domain/svg/staticRecipeSvgGenerator";
import { generateAllStaticSvgs } from "../src/domain/svg/recipeSvgStaticGenerator";

describe("Static Permanent Recipe SVG Generator", () => {
  const tempOutputDir = path.resolve(process.cwd(), "public/images/recipes/test-generated");

  it("should generate a valid permanent static SVG string for a purist recipe (no onion)", () => {
    const mockPuristRecipe = {
      id: "test-purista",
      title: { es: "Tortilla Purista sin Cebolla" },
      taxonomyIds: ["faction:puristas", "ingredient:potato", "ingredient:egg"],
      ingredients: [
        { id: "potato", amount: 500, unit: "g" },
        { id: "egg", amount: 6, unit: "unit" },
      ],
    };

    const { svg, options } = generateStaticSvgForRecipe(mockPuristRecipe);

    expect(options.onion).toBe(false);
    expect(options.eggCount).toBe(6);
    expect(options.potatoWeightG).toBe(500);
    expect(svg).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(svg).toContain("<svg");
    expect(svg).toContain("xmlns=\"http://www.w3.org/2000/svg\"");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Tortilla Purista sin Cebolla");
  });

  it("should generate a valid permanent static SVG for a Betanzos recipe (liquid doneness, no onion)", () => {
    const mockBetanzos = {
      id: "test-betanzos",
      title: { es: "Tortilla de Betanzos Genuina" },
      taxonomyIds: ["region:betanzos", "style:juicy"],
      ingredients: [
        { id: "potato", amount: 450, unit: "g" },
        { id: "egg", amount: 8, unit: "unit" },
      ],
    };

    const { svg, options } = generateStaticSvgForRecipe(mockBetanzos);

    expect(options.doneness).toBe("liquid");
    expect(options.onion).toBe(false);
    expect(options.eggCount).toBe(8);
    expect(options.potatoWeightG).toBe(450);
    expect(svg).toContain("</svg>");
  });

  it("should write a permanent static SVG file to disk when a new recipe is added", () => {
    if (!fs.existsSync(tempOutputDir)) {
      fs.mkdirSync(tempOutputDir, { recursive: true });
    }

    const newRecipe = {
      id: "nueva-receta-trufa",
      title: { es: "Tortilla Silvestre con Trufa" },
      taxonomyIds: ["ingredient:trufa", "ingredient:mushroom"],
      ingredients: [
        { id: "potato", amount: 600, unit: "g" },
        { id: "egg", amount: 6, unit: "unit" },
        { id: "trufa", amount: 20, unit: "g" },
      ],
    };

    const result = writeStaticSvgForRecipe(newRecipe, tempOutputDir);

    expect(result).not.toBeNull();
    expect(result?.recipeId).toBe("nueva-receta-trufa");
    expect(fs.existsSync(result!.outputPath)).toBe(true);

    const fileContent = fs.readFileSync(result!.outputPath, "utf-8");
    expect(fileContent.length).toBeGreaterThan(1000);
    expect(fileContent).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(fileContent).toContain("<svg");
    expect(fileContent).toContain("</svg>");

    // Clean up temporary test output file
    if (fs.existsSync(result!.outputPath)) {
      fs.unlinkSync(result!.outputPath);
    }
    if (fs.existsSync(tempOutputDir)) {
      fs.rmdirSync(tempOutputDir);
    }
  });

  it("should ensure all 24 existing content recipes have static permanent SVGs on disk", () => {
    // Generate for all recipes
    const genResult = generateAllStaticSvgs();
    expect(genResult.recipeCount).toBeGreaterThanOrEqual(24);
    expect(genResult.ingredientCount).toBeGreaterThanOrEqual(14);

    // Verify each file exists in public/images/recipes/generated and public/images/recipes
    const sampleRecipes = ["clasica", "betanzos", "concebolla", "express", "paisana", "vegana"];
    for (const id of sampleRecipes) {
      const generatedFile = path.resolve(process.cwd(), `public/images/recipes/generated/${id}.svg`);
      const directFile = path.resolve(process.cwd(), `public/images/recipes/${id}.svg`);

      expect(fs.existsSync(generatedFile)).toBe(true);
      expect(fs.existsSync(directFile)).toBe(true);

      const content = fs.readFileSync(generatedFile, "utf-8");
      expect(content).toContain("<svg");
      expect(content).toContain("xmlns=\"http://www.w3.org/2000/svg\"");
      expect(content).toContain("</svg>");
    }
  });
});
