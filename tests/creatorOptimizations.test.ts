import { describe, it, expect } from 'vitest';
import { OPTIONAL_INGREDIENTS, getIngredientModifier } from '../src/domain/builder/ingredientRegistry';
import { createTortillaConfiguration } from '../src/domain/builder/configCalculator';
import { generateRecipe } from '../src/domain/builder/generateRecipe';

describe('Creator Optimizations & Selection Logic Tests', () => {
  it('should not preselect onion by default in a new tortilla configuration', () => {
    const defaultConfig = createTortillaConfiguration({
      eggs: 6,
      potatoesGrams: 600,
    });

    const hasOnion = defaultConfig.ingredients.some(
      (i) => i.entityId === 'onion' && i.quantity > 0
    );

    expect(hasOnion).toBe(false);
    expect(defaultConfig.ingredients.length).toBe(3); // Only eggs, potatoes, oil
  });

  it('should support toggling optional ingredients active and inactive', () => {
    // 1. Initial configuration without extras
    let extras: { id: string; quantity: number }[] = [];
    let config = createTortillaConfiguration({ eggs: 6, potatoesGrams: 600, extras });

    expect(config.ingredients.some((i) => i.entityId === 'chorizo')).toBe(false);

    // 2. Activate Chorizo
    const chorizoMod = getIngredientModifier('chorizo');
    expect(chorizoMod).toBeDefined();

    extras = [{ id: 'chorizo', quantity: chorizoMod!.defaultQuantity }];
    config = createTortillaConfiguration({ eggs: 6, potatoesGrams: 600, extras });

    expect(config.ingredients.some((i) => i.entityId === 'chorizo' && i.quantity > 0)).toBe(true);

    // 3. Deactivate Chorizo
    extras = extras.filter((e) => e.id !== 'chorizo');
    config = createTortillaConfiguration({ eggs: 6, potatoesGrams: 600, extras });

    expect(config.ingredients.some((i) => i.entityId === 'chorizo')).toBe(false);
  });

  it('should allow searching optional ingredients across multilingual names', () => {
    const searchByName = (query: string) => {
      const q = query.toLowerCase().trim();
      return OPTIONAL_INGREDIENTS.filter((item) => {
        return (
          item.name.es.toLowerCase().includes(q) ||
          item.name.en.toLowerCase().includes(q) ||
          item.name.de.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.ingredientId.toLowerCase().includes(q)
        );
      });
    };

    // Spanish search for "cebolla"
    const onionResults = searchByName('cebolla');
    expect(onionResults.map((i) => i.ingredientId)).toContain('onion');

    // English search for "cheese"
    const cheeseResults = searchByName('cheese');
    expect(cheeseResults.map((i) => i.ingredientId)).toContain('cheese');

    // Search by category "meat"
    const meatResults = searchByName('meat');
    expect(meatResults.length).toBeGreaterThan(0);
  });

  it('should generate accurate recipe metadata without onion when onion is deactivated', () => {
    const recipe = generateRecipe({
      config: createTortillaConfiguration({
        eggs: 6,
        potatoesGrams: 600,
        extras: [{ id: 'garlic', quantity: 15 }], // Garlic added, no onion
      }),
    });

    expect(recipe.technique.hasOnion).toBe(false);
    expect(recipe.ingredients.some((i) => i.ingredientId === 'garlic')).toBe(true);
    expect(recipe.ingredients.some((i) => i.ingredientId === 'onion')).toBe(false);
  });
});
