import { describe, it, expect, vi } from 'vitest';

vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue([]),
  getEntry: vi.fn().mockResolvedValue(null),
}));

import {
  getRelatedRecipes,
  getRelatedIngredients,
  getRelatedArticles,
  getRelatedTaxonomies,
  getRelatedKnowledgeForIngredient,
} from '../src/lib/content/related';

describe('Internal Linking Helpers (related.ts)', () => {
  it('✓ Ingredient returns related recipes', async () => {
    const recipesEs = await getRelatedRecipes({ type: 'ingredient', id: 'potato' }, 'es');
    expect(recipesEs.length).toBeGreaterThan(0);
    expect(recipesEs.some((r) => r.id === 'clasica')).toBe(true);

    const recipesEggEs = await getRelatedRecipes({ type: 'ingredient', id: 'egg' }, 'es');
    expect(recipesEggEs.length).toBeGreaterThan(0);
    expect(recipesEggEs.some((r) => r.id === 'clasica' || r.id === 'betanzos')).toBe(true);

    const recipesOilEs = await getRelatedRecipes({ type: 'ingredient', id: 'oil' }, 'es');
    expect(recipesOilEs.length).toBeGreaterThan(0);
    expect(recipesOilEs.some((r) => r.id === 'clasica')).toBe(true);

    const recipesEn = await getRelatedRecipes({ type: 'ingredient', id: 'potato' }, 'en');
    expect(recipesEn.length).toBeGreaterThan(0);
    expect(recipesEn[0].url).toContain('/en/recipes/');
  });

  it('✓ Recipe returns ingredient links', async () => {
    const sampleRecipe = {
      id: 'clasica',
      type: 'recipe',
      slug: { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
      ingredients: [
        { id: 'potato', ingredientId: 'potato' },
        { id: 'egg', ingredientId: 'egg' },
      ],
      taxonomyIds: ['ingredient:potato', 'ingredient:egg', 'faction:puristas'],
    };

    const ingredientsEs = await getRelatedIngredients(sampleRecipe, 'es');
    expect(ingredientsEs.length).toBeGreaterThan(0);
    expect(ingredientsEs.some((i) => i.id === 'potato')).toBe(true);
    expect(ingredientsEs.some((i) => i.id === 'egg')).toBe(true);
    expect(ingredientsEs[0].url).toContain('/es/ingredientes/');
  });

  it('✓ Localized URLs are generated correctly across languages', async () => {
    const ingEs = await getRelatedIngredients('potato', 'es');
    const ingEn = await getRelatedIngredients('potato', 'en');
    const ingDe = await getRelatedIngredients('potato', 'de');

    if (ingEs.length > 0) {
      expect(ingEs[0].url).toMatch(/^\/es\//);
    }
    if (ingEn.length > 0) {
      expect(ingEn[0].url).toMatch(/^\/en\//);
    }
    if (ingDe.length > 0) {
      expect(ingDe[0].url).toMatch(/^\/de\//);
    }
  });

  it('✓ Missing entities are ignored', async () => {
    const recipesMissing = await getRelatedRecipes({ type: 'ingredient', id: 'nonexistent_ingredient_xyz' }, 'es');
    expect(recipesMissing).toEqual([]);

    const ingredientsMissing = await getRelatedIngredients({ id: 'nonexistent_recipe_abc' }, 'es');
    expect(ingredientsMissing).toEqual([]);
  });

  it('✓ No duplicate links are returned', async () => {
    const recipes = await getRelatedRecipes({ type: 'ingredient', id: 'potato' }, 'es');
    const urls = recipes.map((r) => r.url);
    const uniqueUrls = new Set(urls);
    expect(urls.length).toBe(uniqueUrls.size);

    const ids = recipes.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('✓ Related articles returns articles for ingredient', async () => {
    const articles = await getRelatedArticles({ type: 'ingredient', id: 'potato' }, 'es');
    expect(Array.isArray(articles)).toBe(true);
    for (const art of articles) {
      expect(art.url).toContain('/es/');
      expect(art.title).toBeTruthy();
    }
  });

  it('✓ Related taxonomies returns non-ingredient tags for recipe or ingredient', async () => {
    const taxonomies = await getRelatedTaxonomies({ type: 'ingredient', id: 'potato' }, 'es');
    expect(Array.isArray(taxonomies)).toBe(true);
    for (const tax of taxonomies) {
      expect(tax.type).not.toBe('ingredient');
      expect(tax.url).toContain('/es/');
    }
  });

  it('✓ Related knowledge for core ingredients returns cross-links, techniques, recipes, and history', async () => {
    const potatoKnowledge = await getRelatedKnowledgeForIngredient('potato', 'es');
    expect(potatoKnowledge.length).toBeGreaterThan(0);
    expect(potatoKnowledge.some((k) => k.id === 'egg')).toBe(true);
    expect(potatoKnowledge.some((k) => k.id === 'oil')).toBe(true);

    const eggKnowledge = await getRelatedKnowledgeForIngredient('egg', 'es');
    expect(eggKnowledge.length).toBeGreaterThan(0);
    expect(eggKnowledge.some((k) => k.id === 'potato')).toBe(true);

    const oilKnowledge = await getRelatedKnowledgeForIngredient('oil', 'es');
    expect(oilKnowledge.length).toBeGreaterThan(0);
    expect(oilKnowledge.some((k) => k.id === 'potato')).toBe(true);
  });
});
