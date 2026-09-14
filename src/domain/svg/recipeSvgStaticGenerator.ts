import fs from 'node:fs';
import path from 'node:path';
import { recipeToSvgOptions, generateTortillaSvg, type TortillaSvgOptions } from './tortillaSvgGenerator';
import { INGREDIENT_SVG_REGISTRY } from './ingredients';

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

      // Ensure valid standalone XML document
      const standaloneSvg = rawSvg.startsWith('<?xml')
        ? rawSvg
        : `<?xml version="1.0" encoding="UTF-8"?>\n${rawSvg}`;

      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, standaloneSvg, 'utf-8');
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
    showBadge: true,
    animated: false, // Pure vector presentation for static files
    ...overrides,
  });

  const svgContent = generateTortillaSvg(options);

  // Ensure valid standalone XML document
  const standaloneSvg = svgContent.startsWith('<?xml')
    ? svgContent
    : `<?xml version="1.0" encoding="UTF-8"?>\n${svgContent}`;

  const savedFiles: string[] = [];

  for (const dir of outputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const targetFile = path.join(dir, `${recipeId}.svg`);
    fs.writeFileSync(targetFile, standaloneSvg, 'utf-8');
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
      fs.writeFileSync(aliasFile, standaloneSvg, 'utf-8');
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
