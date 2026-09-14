import fs from "node:fs";
import path from "node:path";
import { generateTortillaSvg, recipeToSvgOptions } from "./tortillaSvgGenerator";
import type { TortillaSvgOptions } from "./types";

export interface StaticRecipeSvgResult {
  recipeId: string;
  outputPath: string;
  relativeUrl: string;
  bytes: number;
  options: TortillaSvgOptions;
}

export interface GenerateAllOptions {
  recipesDir?: string;
  outputDir?: string;
  distOutputDir?: string;
  clean?: boolean;
}

/**
 * Resolves recipe ID from file path or recipe object
 */
export function getRecipeId(recipeData: any, filePath?: string): string {
  if (recipeData?.id && typeof recipeData.id === "string") {
    return recipeData.id.toLowerCase().trim();
  }
  if (recipeData?.slug?.es && typeof recipeData.slug.es === "string") {
    return recipeData.slug.es.toLowerCase().trim();
  }
  if (filePath) {
    const base = path.basename(filePath, path.extname(filePath));
    return base.toLowerCase().trim();
  }
  return "tortilla";
}

/**
 * Generates the permanent static SVG string for a given recipe data object
 */
export function generateStaticSvgForRecipe(
  recipeData: any,
  overrides?: Partial<TortillaSvgOptions>
): { svg: string; options: TortillaSvgOptions } {
  const recipeId = getRecipeId(recipeData);
  const options = recipeToSvgOptions(recipeData, {
    id: `recipe_svg_${recipeId}`,
    presentation: "skillet_top",
    theme: "kitchen_dark",
    animated: false, // Permanent static SVGs default to high-fidelity static rendering
    showBadge: true,
    ...overrides,
  });

  const svg = generateTortillaSvg(options);
  return { svg, options };
}

/**
 * Generates and writes a permanent static SVG file to disk for a given recipe
 */
export function writeStaticSvgForRecipe(
  recipeInput: string | any,
  outputDir = "public/images/recipes",
  distOutputDir?: string
): StaticRecipeSvgResult | null {
  try {
    let recipeData: any;
    let filePath: string | undefined;

    if (typeof recipeInput === "string") {
      filePath = recipeInput;
      if (!fs.existsSync(filePath)) {
        console.warn(`[Recipe SVG] Recipe file not found: ${filePath}`);
        return null;
      }
      const raw = fs.readFileSync(filePath, "utf-8");
      recipeData = JSON.parse(raw);
    } else {
      recipeData = recipeInput;
    }

    const recipeId = getRecipeId(recipeData, filePath);
    const { svg, options } = generateStaticSvgForRecipe(recipeData);

    // Ensure public output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `${recipeId}.svg`;
    const outputPath = path.join(outputDir, filename);

    fs.writeFileSync(outputPath, svg, "utf-8");
    const bytes = Buffer.byteLength(svg, "utf-8");

    // Also write to dist if present (e.g. during or after production builds)
    if (distOutputDir && fs.existsSync(distOutputDir)) {
      const distPath = path.join(distOutputDir, filename);
      fs.writeFileSync(distPath, svg, "utf-8");
    }

    const relativeUrl = `/images/recipes/${filename}`;

    return {
      recipeId,
      outputPath,
      relativeUrl,
      bytes,
      options,
    };
  } catch (error) {
    console.error(`[Recipe SVG] Error generating static SVG for recipe:`, error);
    return null;
  }
}

/**
 * Generates permanent static SVGs for ALL recipes found in the recipes content directory
 */
export function generateAllStaticRecipeSvgs(
  options: GenerateAllOptions = {}
): StaticRecipeSvgResult[] {
  const recipesDir = options.recipesDir || "src/content/recipes";
  const outputDir = options.outputDir || "public/images/recipes";
  const distOutputDir = options.distOutputDir || "dist/images/recipes";

  if (!fs.existsSync(recipesDir)) {
    console.warn(`[Recipe SVG] Directory not found: ${recipesDir}`);
    return [];
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith(".json"));
  const results: StaticRecipeSvgResult[] = [];

  for (const file of files) {
    const fullPath = path.join(recipesDir, file);
    const result = writeStaticSvgForRecipe(fullPath, outputDir, distOutputDir);
    if (result) {
      results.push(result);
    }
  }

  console.log(
    `[Recipe SVG] Successfully generated ${results.length} permanent static SVGs in '${outputDir}'.`
  );

  return results;
}
