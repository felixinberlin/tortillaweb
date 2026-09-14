#!/usr/bin/env node
import { generateAllStaticSvgs } from '../src/domain/svg/recipeSvgStaticGenerator';

console.log('[generateRecipeSvgs] Starting permanent static SVG generation...');
const startTime = Date.now();

try {
  const result = generateAllStaticSvgs();
  const elapsed = Date.now() - startTime;
  console.log(`[generateRecipeSvgs] Successfully generated:`);
  console.log(`  - ${result.recipeCount} recipe SVGs in public/images/recipes/generated/ and public/images/recipes/`);
  console.log(`  - ${result.ingredientCount} ingredient SVGs in public/images/ingredients/`);
  console.log(`[generateRecipeSvgs] Completed in ${elapsed}ms.`);
} catch (error) {
  console.error('[generateRecipeSvgs] Failed to generate SVGs:', error);
  process.exit(1);
}
