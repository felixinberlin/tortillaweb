import fs from 'node:fs';
import path from 'node:path';
import { recipeToSvgOptions, generateTortillaSvg, type TortillaSvgOptions } from './tortillaSvgGenerator';
import { INGREDIENT_SVG_REGISTRY } from './ingredients';
import { optimizeSvg } from './svgOptimizer';

function writeFileIfChanged(filePath: string, content: string): boolean {
  if (fs.existsSync(filePath)) {
    try {
      const existing = fs.readFileSync(filePath, 'utf-8');
      if (existing === content) {
        return false;
      }
    } catch {
      // Fall through to write
    }
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

export interface GeneratorOptions {
  recipesDir?: string;
  outputRecipeDir?: string;
  outputIngredientDir?: string;
  forceOverwrite?: boolean;
}

export interface GenerationResult {
  recipeCount: number;
  ingredientCount: number;
  generatedRecipes: string[];
  generatedIngredients: string[];
}

/**
 * Mapping of ingredient file names to module registry IDs
 */
export const INGREDIENT_FILE_MAPPINGS: Record<string, string> = {
  'aceite.svg': 'olive_oil',
  'olive-oil.svg': 'olive_oil',
  'olive_oil.svg': 'olive_oil',
  'patata.svg': 'potato',
  'potato.svg': 'potato',
  'kartoffel.svg': 'potato',
  'huevo.svg': 'egg',
  'egg.svg': 'egg',
  'sal.svg': 'salt',
  'salt.svg': 'salt',
  'trufa.svg': 'truffle',
  'truffle.svg': 'truffle',
  'pimiento.svg': 'peppers',
  'peppers.svg': 'peppers',
  'pepper.svg': 'peppers',
  'cebolla.svg': 'onion',
  'onion.svg': 'onion',
  'chorizo.svg': 'chorizo',
  'jamon.svg': 'jamon',
  'ham.svg': 'jamon',
  'queso.svg': 'cheese',
  'cheese.svg': 'cheese',
  'setas.svg': 'mushrooms',
  'mushrooms.svg': 'mushrooms',
  'mushroom.svg': 'mushrooms',
  'ajo.svg': 'garlic',
  'garlic.svg': 'garlic',
  'sobrasada.svg': 'sobrasada',
  'garbanzo.svg': 'chickpea',
  'chickpea.svg': 'chickpea',
  'potato_editorial_card.svg': 'potato',
  'potato_ingredient_card.svg': 'potato',
  'egg_editorial_card.svg': 'egg',
  'egg_ingredient_card.svg': 'egg',
  'olive_oil_editorial_card.svg': 'olive_oil',
  'olive_oil_aromatics_card.svg': 'olive_oil',
  'garlic_editorial_card.svg': 'garlic',
  'garlic_ingredient_card.svg': 'garlic',
  'onion_editorial_card.svg': 'onion',
  'onion_ingredient_card.svg': 'onion',
  'pepper_editorial_card.svg': 'peppers',
  'pepper_ingredient_card.svg': 'peppers',
  'peppers_editorial_card.svg': 'peppers',
  'salt_editorial_card.svg': 'salt',
  'salt_ingredient_card.svg': 'salt',
  'black_pepper_editorial_card.svg': 'salt',
};

/**
 * Generates all permanent static ingredient SVGs required by equipment & ingredient views
 */
export function generateAllIngredientSvgs(
  outputDir = path.resolve(process.cwd(), 'public/images/ingredients')
): string[] {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generated: string[] = [];

  for (const [filename, moduleId] of Object.entries(INGREDIENT_FILE_MAPPINGS)) {
    const mod = INGREDIENT_SVG_REGISTRY[moduleId];
    if (mod) {
      const rawSvg = mod.renderSvgString({
        theme: 'kitchen_dark',
        showBadge: false,
        width: 320,
        height: 240,
      });

      // Optimize and ensure valid standalone XML document
      const standaloneSvg = optimizeSvg(rawSvg, {
        xmlDeclaration: true,
        stripComments: true,
        minifyWhitespace: true,
        cleanEmptyAttributes: true,
        ensureA11y: true,
        title: `Ingrediente: ${moduleId}`,
      });

      const filePath = path.join(outputDir, filename);
      writeFileIfChanged(filePath, standaloneSvg);
      generated.push(filename);
    }
  }

  return generated;
}

/**
 * Generates a permanent static SVG for a single recipe
 */
export function generateRecipeSvg(
  recipeData: any,
  recipeId: string,
  outputDirs: string[],
  overrides?: Partial<TortillaSvgOptions>
): string[] {
  const options = recipeToSvgOptions(recipeData, {
    theme: 'kitchen_dark',
    showBadge: false,
    animated: false, // Pure vector presentation for static files
    width: 600,
    height: 400,
    ...overrides,
  });

  const svgContent = generateTortillaSvg(options);

  // Optimize and ensure valid standalone XML document
  const standaloneSvg = optimizeSvg(svgContent, {
    xmlDeclaration: true,
    stripComments: true,
    minifyWhitespace: true,
    cleanEmptyAttributes: true,
    ensureA11y: true,
    title: options.title || recipeData?.title?.es || recipeId,
  });

  const savedFiles: string[] = [];

  for (const dir of outputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const targetFile = path.join(dir, `${recipeId}.svg`);
    writeFileIfChanged(targetFile, standaloneSvg);
    savedFiles.push(targetFile);

    // Also write aliases if recipe has alternate slug or custom image basename
    const aliases = new Set<string>();
    if (recipeData?.slug?.es && recipeData.slug.es !== recipeId) {
      aliases.add(recipeData.slug.es);
    }
    if (recipeData?.image && typeof recipeData.image === 'string') {
      const imgBase = path.basename(recipeData.image, path.extname(recipeData.image));
      if (imgBase && imgBase !== recipeId) {
        aliases.add(imgBase);
      }
    }

    for (const alias of aliases) {
      const aliasFile = path.join(dir, `${alias}.svg`);
      writeFileIfChanged(aliasFile, standaloneSvg);
      savedFiles.push(aliasFile);
    }
  }

  return savedFiles;
}

/**
 * Reads all recipes and generates permanent static SVGs for each recipe and ingredient
 */
export function generateAllStaticSvgs(options: GeneratorOptions = {}): GenerationResult {
  const root = process.cwd();
  const recipesDir = options.recipesDir || path.resolve(root, 'src/content/recipes');
  const outputGeneratedDir = options.outputRecipeDir || path.resolve(root, 'public/images/recipes/generated');
  const outputRecipesDir = path.resolve(root, 'public/images/recipes');
  const outputIngredientDir = options.outputIngredientDir || path.resolve(root, 'public/images/ingredients');

  const generatedRecipes: string[] = [];

  if (fs.existsSync(recipesDir)) {
    const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(recipesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const recipeData = JSON.parse(content);
        const fileBase = file.replace('.json', '');
        const recipeId = recipeData.id || fileBase;

        // Generate into public/images/recipes/generated/ and public/images/recipes/
        generateRecipeSvg(recipeData, recipeId, [outputGeneratedDir, outputRecipesDir]);
        if (fileBase !== recipeId) {
          generateRecipeSvg(recipeData, fileBase, [outputGeneratedDir, outputRecipesDir]);
        }
        generatedRecipes.push(`${recipeId}.svg`);
      } catch (err) {
        console.error(`[RecipeSvgGenerator] Error generating SVG for ${file}:`, err);
      }
    }
  }

  const generatedIngredients = generateAllIngredientSvgs(outputIngredientDir);

  return {
    recipeCount: generatedRecipes.length,
    ingredientCount: generatedIngredients.length,
    generatedRecipes,
    generatedIngredients,
  };
}

/**
 * Watches the recipes directory in development mode and generates permanent static SVGs
 * as soon as any recipe file is added, edited, or saved.
 */
export function watchRecipeDirectory(
  recipesDir = path.resolve(process.cwd(), 'src/content/recipes'),
  outputGeneratedDir = path.resolve(process.cwd(), 'public/images/recipes/generated'),
  outputRecipesDir = path.resolve(process.cwd(), 'public/images/recipes')
): () => void {
  if (!fs.existsSync(recipesDir)) {
    return () => {};
  }

  let debounceTimer: NodeJS.Timeout | null = null;

  const watcher = fs.watch(recipesDir, (eventType, filename) => {
    if (!filename || !filename.endsWith('.json')) return;

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const filePath = path.join(recipesDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const recipeData = JSON.parse(content);
          const recipeId = recipeData.id || filename.replace('.json', '');
          generateRecipeSvg(recipeData, recipeId, [outputGeneratedDir, outputRecipesDir]);
          console.log(`[RecipeSvgGenerator] Auto-generated static SVG for new/updated recipe: ${recipeId}.svg`);
        } catch (e) {
          console.warn(`[RecipeSvgGenerator] Waiting for valid JSON on ${filename}...`);
        }
      }
    }, 150);
  });

  return () => {
    watcher.close();
  };
}
