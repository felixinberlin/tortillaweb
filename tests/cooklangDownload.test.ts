import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportToCooklang, exportTortillaConfigToCooklang } from '../src/lib/translator/cooklangExporter';
import type { RawRecipeInput } from '../src/lib/translator/types';
import { createTortillaConfiguration, parseConfigurationFromUrl } from '../src/domain/builder/configCalculator';
import { getAllRecipes } from '../src/lib/taxonomy';

describe('Cooklang Recipe & Builder Download Flow Integration', () => {
  let createdObjectURLs: string[] = [];

  beforeEach(() => {
    createdObjectURLs = [];

    // Mock URL.createObjectURL and revokeObjectURL
    if (typeof globalThis.URL.createObjectURL !== 'function') {
      globalThis.URL.createObjectURL = vi.fn((_blob: Blob) => {
        const id = `blob:http://localhost/${Math.random().toString(36).slice(2)}`;
        createdObjectURLs.push(id);
        return id;
      });
    } else {
      vi.spyOn(globalThis.URL, 'createObjectURL').mockImplementation((_blob: Blob) => {
        const id = `blob:http://localhost/${Math.random().toString(36).slice(2)}`;
        createdObjectURLs.push(id);
        return id;
      });
    }

    if (typeof globalThis.URL.revokeObjectURL !== 'function') {
      globalThis.URL.revokeObjectURL = vi.fn();
    } else {
      vi.spyOn(globalThis.URL, 'revokeObjectURL').mockImplementation(() => {});
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Builder App Custom Recipe Download Payload Generation', () => {
    it('should generate valid downloadable .cook blob payload from builder configuration', () => {
      const searchParams = new URLSearchParams('eggs=8&eggSize=l&potatoes=700&texture=jugosa&technique=confitada&extras=onion:100');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const config = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(config, {
        lang: 'es',
        authorName: 'tortilladepatatas.org - Tortilla Creator',
        sourceUrl: 'https://tortilladepatatas.org/es/builder?eggs=8&potatoes=700',
      });

      expect(cookText).toBeDefined();
      expect(typeof cookText).toBe('string');
      expect(cookText.length).toBeGreaterThan(100);

      // Verify essential Cooklang headers
      expect(cookText).toContain('>> title: Tortilla Personalizada');
      expect(cookText).toContain('>> servings: 5');
      expect(cookText).toContain('>> pan size:');

      // Verify ingredients with Cooklang syntax
      expect(cookText).toContain('@Huevos{8%LARGE}');
      expect(cookText).toContain('@Patatas{700%g}');
      expect(cookText).toContain('@Cebolla dulce{100%g}');

      // Verify cookware and instructions
      expect(cookText).toContain('#Sartén antiadherente{24%cm}');
      expect(cookText).toContain('Paso 1:');

      // Create blob simulation
      const blob = new Blob([cookText], { type: 'text/plain;charset=utf-8' });
      expect(blob.type).toBe('text/plain;charset=utf-8');
      expect(blob.size).toBeGreaterThan(0);
    });

    it('should support downloading builder recipe in English and German languages', () => {
      const parsedConfig = parseConfigurationFromUrl(new URLSearchParams('eggs=6&potatoes=600'));
      const config = createTortillaConfiguration(parsedConfig);

      const cookEn = exportTortillaConfigToCooklang(config, { lang: 'en' });
      expect(cookEn).toContain('>> title: Custom Spanish Omelette');
      expect(cookEn).toContain('@Eggs{6%LARGE}');
      expect(cookEn).toContain('@Potatoes{600%g}');

      const cookDe = exportTortillaConfigToCooklang(config, { lang: 'de' });
      expect(cookDe).toContain('>> title: Individuelle Tortilla');
      expect(cookDe).toContain('@Eier{6%LARGE}');
      expect(cookDe).toContain('@Kartoffeln{600%g}');
    });
  });

  describe('Recipes Section Content Download Payload Generation', () => {
    it('should generate downloadable .cook file for every recipe in the taxonomy database', async () => {
      const recipes = await getAllRecipes();
      expect(recipes.length).toBeGreaterThan(0);

      for (const recipe of recipes) {
        const rawRecipe: RawRecipeInput = {
          name: recipe.title.es,
          description: recipe.description.es,
          prepTimeMinutes: recipe.prepTimeMinutes || 15,
          cookTimeMinutes: recipe.cookTimeMinutes || 20,
          yieldServings: recipe.yieldServings || 4,
          category: 'Main Course',
          cuisine: 'Spanish',
          authorName: recipe.author?.name || 'tortilladepatatas.org',
          url: `https://tortilladepatatas.org/es/recipes/${recipe.slug.es}`,
          ingredients: recipe.ingredients ? recipe.ingredients.map((i) => typeof i === 'string' ? i : `${i.amount}${i.unit === 'unit' ? '' : i.unit} ${i.name.es}`) : [],
          instructions: recipe.instructions ? recipe.instructions.map((i) => ({ step: i.step.es, text: i.text.es })) : [],
        };

        const cookText = exportToCooklang(rawRecipe);

        expect(cookText).toContain(`>> title: ${recipe.title.es}`);
        expect(cookText).toContain('-- Ingredients');
        expect(cookText).toContain('-- Instructions');
        expect(cookText.length).toBeGreaterThan(50);
      }
    });

    it('should format filename correctly from recipe slug or title', () => {
      const sanitizeFilename = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      expect(sanitizeFilename('Tortilla Clásica de Patatas')).toBe('tortilla-cl-sica-de-patatas');
      expect(sanitizeFilename('tortilla-de-betanzos')).toBe('tortilla-de-betanzos');
      expect(sanitizeFilename('Tortilla & Bacon Special')).toBe('tortilla-bacon-special');
    });
  });
});
