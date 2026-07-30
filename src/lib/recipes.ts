import type { Recipe, RecipeIngredient } from '@/types/taxonomy';

/**
 * Finds a structured ingredient in a recipe by ingredientId or id.
 */
export function getIngredient(recipe: Recipe, ingredientId: string): RecipeIngredient | undefined {
  if (!recipe || !recipe.ingredients) return undefined;
  return recipe.ingredients.find(
    (ing) => ing.ingredientId === ingredientId || ing.id === ingredientId
  );
}

/**
 * Calculates the ratio of one ingredient relative to a base ingredient in a recipe.
 * Returns a human-readable string such as "100g potato per egg".
 */
export function calculateIngredientRatio(
  recipe: Recipe,
  ingredientId: string,
  baseIngredientId: string,
  lang: 'es' | 'en' | 'de' = 'en'
): string {
  const target = getIngredient(recipe, ingredientId);
  const base = getIngredient(recipe, baseIngredientId);

  if (!target || !base || base.amount === 0) {
    return 'N/A';
  }

  const rawRatio = target.amount / base.amount;
  const ratio = Number.isInteger(rawRatio) ? rawRatio : Math.round(rawRatio * 10) / 10;

  const targetName = (target.name && (target.name[lang] || target.name.en || target.name.es)) || target.ingredientId;
  const baseName = (base.name && (base.name[lang] || base.name.en || base.name.es)) || base.ingredientId;

  const perWord = lang === 'es' ? 'por' : lang === 'de' ? 'pro' : 'per';

  return `${ratio}${target.unit} ${targetName.toLowerCase()} ${perWord} ${baseName.toLowerCase()}`;
}
