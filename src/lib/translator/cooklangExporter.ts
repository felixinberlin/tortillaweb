/**
 * Standard Cooklang Exporter
 *
 * Implements standard Cooklang v1 specification (https://cooklang.org)
 * for exporting recipes and calculator states into plaintext `.cook` format.
 */

import type {
  RawRecipeInput,
  CooklangExportOptions,
} from './types';
import type { TortillaConfiguration } from '@/domain/builder/types';
import { getIngredientModifier } from '@/domain/builder/ingredientRegistry';

/**
 * Formats an ingredient into standard Cooklang syntax.
 * - `@name{amount%unit}` -> e.g., `@Patatas Monalisa{600%g}`
 * - `@name{amount}`      -> e.g., `@Huevos camperos{6}`
 * - `@multi word name{}` -> e.g., `@Aceite de oliva virgen extra{}`
 */
export function formatCooklangIngredient(
  name: string,
  amount?: number | string,
  unit?: string
): string {
  const cleanName = name.trim();
  if (amount !== undefined && amount !== null && amount !== '') {
    if (unit && unit.trim() && unit.trim() !== 'unit' && unit.trim() !== 'unidades') {
      return `@${cleanName}{${amount}%${unit.trim()}}`;
    }
    return `@${cleanName}{${amount}}`;
  }
  return `@${cleanName}{}`;
}

/**
 * Formats cookware into standard Cooklang syntax.
 * - `#name{amount%unit}` -> e.g., `#Sartén antiadherente{24%cm}`
 * - `#name{}`            -> e.g., `#Bol grande{}`
 */
export function formatCooklangCookware(
  name: string,
  amount?: number | string,
  unit?: string
): string {
  const cleanName = name.trim();
  if (amount !== undefined && amount !== null && amount !== '') {
    if (unit && unit.trim()) {
      return `#${cleanName}{${amount}%${unit.trim()}}`;
    }
    return `#${cleanName}{${amount}}`;
  }
  return `#${cleanName}{}`;
}

/**
 * Formats a timer duration into standard Cooklang syntax.
 * - `~{time%unit}` -> e.g., `~{20%minutes}`
 */
export function formatCooklangTimer(
  time: number | string,
  unit: string = 'minutes'
): string {
  return `~{${time}%${unit}}`;
}

/**
 * Parses a single ingredient line or raw ingredient text into a Cooklang ingredient tag.
 * E.g., "600g Patatas Agria" -> "@Patatas Agria{600%g}"
 * "150ml Aceite de Oliva" -> "@Aceite de Oliva{150%ml}"
 * "6 Huevos camperos" -> "@Huevos camperos{6}"
 */
export function convertTextIngredientToCooklang(text: string): string {
  const cleanText = text.trim();
  if (!cleanText) return '';

  // Known measurement units
  const KNOWN_UNITS = new Set(['g', 'kg', 'mg', 'ml', 'l', 'cl', 'dl', 'oz', 'lb', 'tbsp', 'tsp', 'cup']);

  // Match pattern like "600g Patatas Agria" or "150 ml Aceite"
  const amountUnitMatch = cleanText.match(/^(\d+(?:[.,]\d+)?)\s*([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)\s+(.+)$/);
  if (amountUnitMatch) {
    const amount = amountUnitMatch[1].replace(',', '.');
    const possibleUnit = amountUnitMatch[2].toLowerCase();
    const restName = amountUnitMatch[3];

    if (KNOWN_UNITS.has(possibleUnit)) {
      return formatCooklangIngredient(restName, amount, possibleUnit);
    }
    // If not a known unit, the possibleUnit is part of the name, e.g., "6 Huevos camperos"
    const fullName = `${amountUnitMatch[2]} ${restName}`;
    return formatCooklangIngredient(fullName, amount);
  }

  // Match pattern like "6 Huevos camperos"
  const amountOnlyMatch = cleanText.match(/^(\d+(?:[.,]\d+)?)\s+(.+)$/);
  if (amountOnlyMatch) {
    const amount = amountOnlyMatch[1].replace(',', '.');
    const name = amountOnlyMatch[2];
    return formatCooklangIngredient(name, amount);
  }

  // Fallback to name without amount
  return formatCooklangIngredient(cleanText);
}

/**
 * Exports a generic RawRecipeInput into a standard Cooklang (.cook) formatted string.
 */
export function exportToCooklang(
  recipe: RawRecipeInput,
  options?: CooklangExportOptions
): string {
  const includeMetadata = options?.includeMetadata ?? true;
  const lines: string[] = [];

  // Metadata headers (>> key: value)
  if (includeMetadata) {
    lines.push(`>> title: ${recipe.name}`);
    if (recipe.description) {
      lines.push(`>> description: ${recipe.description}`);
    }
    if (recipe.yieldServings) {
      lines.push(`>> servings: ${recipe.yieldServings}`);
    }
    if (recipe.prepTimeMinutes) {
      lines.push(`>> prep time: ${recipe.prepTimeMinutes} minutes`);
    }
    if (recipe.cookTimeMinutes) {
      lines.push(`>> cook time: ${recipe.cookTimeMinutes} minutes`);
    }
    if (recipe.category) {
      lines.push(`>> category: ${recipe.category}`);
    }
    if (recipe.cuisine) {
      lines.push(`>> cuisine: ${recipe.cuisine}`);
    }
    const author = options?.authorName || recipe.authorName || 'tortilladepatatas.org';
    lines.push(`>> author: ${author}`);

    const source = options?.sourceUrl || recipe.url || recipe.authorUrl;
    if (source) {
      lines.push(`>> source: ${source}`);
    }
    lines.push(''); // Blank line separating headers
  }

  // Ingredients section comment
  lines.push('-- Ingredients');
  for (const ing of recipe.ingredients) {
    lines.push(convertTextIngredientToCooklang(ing));
  }
  lines.push('');

  // Instructions section
  lines.push('-- Instructions');
  recipe.instructions.forEach((inst, index) => {
    let stepTitle = `Paso ${index + 1}`;
    let stepText = '';

    if (typeof inst === 'string') {
      stepText = inst;
    } else {
      stepTitle = inst.step || inst.name || `Paso ${index + 1}`;
      stepText = inst.text;
    }

    lines.push(`${stepTitle}: ${stepText}`);
  });

  return lines.join('\n');
}

/**
 * Exports a dynamic TortillaConfiguration builder model into standard Cooklang (.cook) format.
 */
export function exportTortillaConfigToCooklang(
  config: TortillaConfiguration,
  options?: CooklangExportOptions
): string {
  const langKey = (options?.lang || 'es').startsWith('es')
    ? 'es'
    : (options?.lang || 'es').startsWith('de')
    ? 'de'
    : 'en';

  const isEs = langKey === 'es';
  const isDe = langKey === 'de';

  const { calculatedProfile, ingredients, preferences } = config;
  const lines: string[] = [];

  const title = isEs
    ? `Tortilla Personalizada (${calculatedProfile.estimatedServings} raciones)`
    : isDe
    ? `Individuelle Tortilla (${calculatedProfile.estimatedServings} Portionen)`
    : `Custom Spanish Omelette (${calculatedProfile.estimatedServings} servings)`;

  const ratioCat = calculatedProfile.ratioCategory[langKey] || calculatedProfile.ratioCategory.es || '';

  // Metadata headers
  if (options?.includeMetadata !== false) {
    lines.push(`>> title: ${title}`);
    lines.push(`>> servings: ${calculatedProfile.estimatedServings}`);
    lines.push(`>> prep time: 15 minutes`);
    lines.push(`>> cook time: 20 minutes`);
    lines.push(`>> pan size: ${calculatedProfile.recommendedPanSizeCm} cm`);
    lines.push(`>> category: Main Course`);
    lines.push(`>> cuisine: Spanish`);
    lines.push(`>> author: ${options?.authorName || 'tortilladepatatas.org - Tortilla Creator'}`);
    if (options?.sourceUrl) {
      lines.push(`>> source: ${options.sourceUrl}`);
    }
    lines.push('');
  }

  // Ingredients
  lines.push('-- Ingredients');
  for (const ing of ingredients) {
    if (ing.entityId === 'egg') {
      const sizeLabel = ing.size ? ing.size.toUpperCase() : 'L';
      const eggName = isEs ? 'Huevos' : isDe ? 'Eier' : 'Eggs';
      lines.push(formatCooklangIngredient(eggName, ing.quantity, sizeLabel));
    } else if (ing.entityId === 'potato') {
      const potatoName = isEs ? 'Patatas' : isDe ? 'Kartoffeln' : 'Potatoes';
      lines.push(formatCooklangIngredient(potatoName, ing.quantity, 'g'));
    } else if (ing.entityId === 'oil') {
      const oilName = isEs ? 'Aceite de Oliva Virgen Extra' : isDe ? 'Natives Olivenöl Extra' : 'Extra Virgin Olive Oil';
      lines.push(formatCooklangIngredient(oilName, calculatedProfile.estimatedAbsorbedOilMl, 'ml'));
    } else {
      const mod = getIngredientModifier(ing.entityId);
      const name = mod ? mod.name[langKey] : ing.entityId;
      lines.push(formatCooklangIngredient(name, ing.quantity, ing.unit));
    }
  }

  // Check if salt is explicitly added; if not, add calculated salt
  if (!ingredients.some((i) => i.entityId === 'salt')) {
    const eggCount = ingredients.find((i) => i.entityId === 'egg')?.quantity || 6;
    const saltGrams = Math.max(1, Math.round(eggCount * 0.8));
    const saltName = isEs ? 'Sal' : isDe ? 'Salz' : 'Salt';
    lines.push(formatCooklangIngredient(saltName, saltGrams, 'g'));
  }

  lines.push('');

  // Cookware section
  if (options?.includeCookware !== false) {
    lines.push('-- Cookware');
    const panName = isEs ? 'Sartén antiadherente' : isDe ? 'Antihaftpfanne' : 'Non-stick skillet';
    lines.push(formatCooklangCookware(panName, calculatedProfile.recommendedPanSizeCm, 'cm'));
    lines.push('');
  }

  // Instructions section
  lines.push('-- Instructions');

  // Summary note
  lines.push(`-- Proporción: ${ratioCat}. Textura: ${preferences.texture || 'jugosa'}.`);

  const adviceList = calculatedProfile.cookingAdvice[langKey] || calculatedProfile.cookingAdvice.es || [];
  adviceList.forEach((stepText, idx) => {
    const stepLabel = isEs ? `Paso ${idx + 1}` : isDe ? `Schritt ${idx + 1}` : `Step ${idx + 1}`;
    lines.push(`${stepLabel}: ${stepText}`);
  });

  return lines.join('\n');
}
