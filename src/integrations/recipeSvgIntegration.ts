import type { AstroIntegration } from 'astro';
import { generateAllStaticSvgs, watchRecipeDirectory } from '../domain/svg/recipeSvgStaticGenerator';

/**
 * Astro Integration to automatically generate permanent static SVGs for recipes and ingredients.
 *
 * 1. Generates on dev server startup & build start.
 * 2. In dev mode, watches `src/content/recipes/` so whenever a new recipe is added,
 *    its permanent static SVG is generated instantly into `public/images/recipes/generated/`
 *    and `public/images/recipes/`.
 */
export function recipeSvgIntegration(): AstroIntegration {
  let stopWatcher: (() => void) | null = null;

  return {
    name: 'recipe-svg-static-generator',
    hooks: {
      'astro:config:setup': () => {
        try {
          const result = generateAllStaticSvgs();
          console.log(`[RecipeSvgIntegration] Ready: ${result.recipeCount} recipe SVGs & ${result.ingredientCount} ingredient SVGs.`);
        } catch (err) {
          console.error('[RecipeSvgIntegration] Failed initial SVG generation:', err);
        }
      },
      'astro:server:setup': () => {
        try {
          stopWatcher = watchRecipeDirectory();
          console.log('[RecipeSvgIntegration] Recipe directory watcher active for new recipe additions.');
        } catch (err) {
          console.error('[RecipeSvgIntegration] Failed to start recipe watcher:', err);
        }
      },
      'astro:build:start': () => {
        try {
          const result = generateAllStaticSvgs();
          console.log(`[RecipeSvgIntegration] Pre-build: Verified ${result.recipeCount} static recipe SVGs.`);
        } catch (err) {
          console.error('[RecipeSvgIntegration] Build step SVG generation failed:', err);
        }
      },
      'astro:server:done': () => {
        if (stopWatcher) {
          stopWatcher();
          stopWatcher = null;
        }
      },
    },
  };
}

export default recipeSvgIntegration;
