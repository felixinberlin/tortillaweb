#!/usr/bin/env node
import { generateAllStaticSvgs } from '../src/domain/svg/recipeSvgStaticGenerator';
import { execSync } from 'node:child_process';
import path from 'node:path';

console.log('[generateRecipeSvgs] Starting permanent static SVG generation...');
const startTime = Date.now();

try {
  const result = generateAllStaticSvgs();
  console.log(`[generateRecipeSvgs] Generated ${result.recipeCount} recipe SVGs and ${result.ingredientCount} ingredient SVGs.`);

  // Also trigger Faction and Persona SVG generators
  try {
    execSync('npx tsx scripts/generateFactionSvgs.ts', { stdio: 'inherit' });
    execSync('npx tsx scripts/generatePersonaSvgs.ts', { stdio: 'inherit' });
  } catch (subErr) {
    console.warn('[generateRecipeSvgs] Sub-script warning:', subErr);
  }

  const elapsed = Date.now() - startTime;
  console.log(`[generateRecipeSvgs] All vector assets generated in ${elapsed}ms.`);
} catch (error) {
  console.error('[generateRecipeSvgs] Failed to generate SVGs:', error);
  process.exit(1);
}

