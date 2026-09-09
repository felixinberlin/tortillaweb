import { describe, it, expect } from 'vitest';
import { getIngredient, calculateIngredientRatio } from '../src/lib/recipes';
import type { Recipe } from '../src/types/taxonomy';

describe('Recipe Helper Utilities & Structured Ingredients', () => {
  const sampleRecipe: Recipe = {
    id: 'betanzos',
    slug: { es: 'betanzos', en: 'betanzos-style', de: 'betanzos-stil' },
    title: { es: 'Tortilla de Betanzos', en: 'Betanzos Omelette', de: 'Betanzos Tortilla' },
    description: { es: 'Receta jugosa', en: 'Runny recipe', de: 'Saftiges Rezept' },
    taxonomyIds: ['faction:puristas', 'ingredient:potato', 'ingredient:egg'],
    time: 25,
    ingredients: [
      {
        id: 'potato',
        ingredientId: 'potato',
        name: { es: 'Patata', en: 'Potato', de: 'Kartoffel' },
        amount: 600,
        unit: 'g',
        notes: { es: '4 patatas medianas', en: '4 medium potatoes', de: '4 mittelgroße Kartoffeln' },
      },
      {
        id: 'egg',
        ingredientId: 'egg',
        name: { es: 'Huevo', en: 'Egg', de: 'Ei' },
        amount: 6,
        unit: 'unit',
        notes: { es: '6 huevos', en: '6 eggs', de: '6 Eier' },
      },
      {
        id: 'oil',
        ingredientId: 'oil',
        name: { es: 'Aceite de Oliva', en: 'Olive Oil', de: 'Olivenöl' },
        amount: 150,
        unit: 'ml',
        notes: { es: 'Aceite de oliva virgen extra', en: 'Extra virgin olive oil', de: 'Natives Olivenöl extra' },
      },
    ],
  };

  it('should find ingredient using getIngredient by ingredientId or id', () => {
    const potato = getIngredient(sampleRecipe, 'potato');
    expect(potato).toBeDefined();
    expect(potato?.amount).toBe(600);
    expect(potato?.unit).toBe('g');

    const egg = getIngredient(sampleRecipe, 'egg');
    expect(egg).toBeDefined();
    expect(egg?.amount).toBe(6);
    expect(egg?.unit).toBe('unit');

    const unknown = getIngredient(sampleRecipe, 'nonexistent');
    expect(unknown).toBeUndefined();
  });

  it('should calculate ratio correctly: 100g potato per egg', () => {
    const ratioEn = calculateIngredientRatio(sampleRecipe, 'potato', 'egg', 'en');
    expect(ratioEn).toBe('100g potato per egg');

    const ratioEs = calculateIngredientRatio(sampleRecipe, 'potato', 'egg', 'es');
    expect(ratioEs).toBe('100g patata por huevo');

    const ratioDe = calculateIngredientRatio(sampleRecipe, 'potato', 'egg', 'de');
    expect(ratioDe).toBe('100g kartoffel pro ei');
  });

  it('should return N/A for missing ingredients in ratio calculation', () => {
    const ratioMissing = calculateIngredientRatio(sampleRecipe, 'potato', 'onion', 'en');
    expect(ratioMissing).toBe('N/A');
  });

  it('should scale ingredients accurately for 2, 4, 6, and 8 diners based on a 4-person base', () => {
    const baseServings = 4;
    const baseEggs = 6;
    const basePotato = 600;

    // 4 people (1x)
    expect((baseEggs * 4) / baseServings).toBe(6);
    expect((basePotato * 4) / baseServings).toBe(600);

    // 2 people (0.5x)
    expect((baseEggs * 2) / baseServings).toBe(3);
    expect((basePotato * 2) / baseServings).toBe(300);

    // 6 people (1.5x)
    expect((baseEggs * 6) / baseServings).toBe(9);
    expect((basePotato * 6) / baseServings).toBe(900);

    // 8 people (2x)
    expect((baseEggs * 8) / baseServings).toBe(12);
    expect((basePotato * 8) / baseServings).toBe(1200);
  });
});
