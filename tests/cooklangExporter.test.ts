import { describe, it, expect } from 'vitest';
import {
  formatCooklangIngredient,
  formatCooklangCookware,
  formatCooklangTimer,
  convertTextIngredientToCooklang,
  exportToCooklang,
  exportTortillaConfigToCooklang,
} from '../src/lib/translator/cooklangExporter';
import type { RawRecipeInput } from '../src/lib/translator/types';
import { createTortillaConfiguration, parseConfigurationFromUrl } from '../src/domain/builder/configCalculator';

describe('Standard Cooklang Exporter Module', () => {
  describe('Cooklang Syntax Formatters', () => {
    it('should format ingredients according to Cooklang v1 specification', () => {
      expect(formatCooklangIngredient('Patatas Monalisa', 600, 'g')).toBe('@Patatas Monalisa{600%g}');
      expect(formatCooklangIngredient('Huevos camperos', 6)).toBe('@Huevos camperos{6}');
      expect(formatCooklangIngredient('Sal fina')).toBe('@Sal fina{}');
      expect(formatCooklangIngredient('Aceite de oliva', 150, 'ml')).toBe('@Aceite de oliva{150%ml}');
      expect(formatCooklangIngredient('Pimienta negra', 'al gusto', 'g')).toBe('@Pimienta negra{al gusto%g}');
      expect(formatCooklangIngredient('  Ajo  ', 2, ' dientes ')).toBe('@Ajo{2%dientes}');
    });

    it('should format cookware according to Cooklang v1 specification', () => {
      expect(formatCooklangCookware('Sartén antiadherente', 24, 'cm')).toBe('#Sartén antiadherente{24%cm}');
      expect(formatCooklangCookware('Molcajete')).toBe('#Molcajete{}');
      expect(formatCooklangCookware('Bol de cristal', 1, 'unidad')).toBe('#Bol de cristal{1%unidad}');
    });

    it('should format timers according to Cooklang v1 specification', () => {
      expect(formatCooklangTimer(20)).toBe('~{20%minutes}');
      expect(formatCooklangTimer(15, 'min')).toBe('~{15%min}');
      expect(formatCooklangTimer(45, 'seconds')).toBe('~{45%seconds}');
    });

    it('should convert raw text ingredients into Cooklang tags', () => {
      expect(convertTextIngredientToCooklang('600g Patatas Monalisa')).toBe('@Patatas Monalisa{600%g}');
      expect(convertTextIngredientToCooklang('150ml Aceite de Oliva')).toBe('@Aceite de Oliva{150%ml}');
      expect(convertTextIngredientToCooklang('6 Huevos camperos')).toBe('@Huevos camperos{6}');
      expect(convertTextIngredientToCooklang('Sal fina al gusto')).toBe('@Sal fina al gusto{}');
      expect(convertTextIngredientToCooklang('')).toBe('');
      expect(convertTextIngredientToCooklang('   ')).toBe('');
      expect(convertTextIngredientToCooklang('1kg Cebolla dulce')).toBe('@Cebolla dulce{1%kg}');
      expect(convertTextIngredientToCooklang('200g Panceta ibérica')).toBe('@Panceta ibérica{200%g}');
    });
  });

  describe('exportToCooklang with RawRecipeInput', () => {
    it('should generate valid Cooklang plaintext file format with metadata and instructions', () => {
      const recipe: RawRecipeInput = {
        name: 'Tortilla Clásica de Patatas',
        description: 'Receta tradicional española con patatas, huevos y aceite de oliva.',
        prepTimeMinutes: 15,
        cookTimeMinutes: 20,
        yieldServings: 4,
        category: 'Main Course',
        cuisine: 'Spanish',
        authorName: 'tortilladepatatas.org',
        url: 'https://tortilladepatatas.org/es/recipes/clasica',
        ingredients: [
          '600g Patatas Monalisa',
          '6 Huevos camperos',
          '150ml Aceite de oliva virgen extra',
          '6g Sal fina',
        ],
        instructions: [
          'Pelar y cortar las patatas en láminas finas.',
          'Confitar las patatas en aceite a fuego medio.',
          'Mezclar con los huevos batidos y la sal.',
          'Cuajar en la sartén hasta dorar por ambos lados.',
        ],
      };

      const cookText = exportToCooklang(recipe);

      expect(cookText).toContain('>> title: Tortilla Clásica de Patatas');
      expect(cookText).toContain('>> description: Receta tradicional');
      expect(cookText).toContain('>> servings: 4');
      expect(cookText).toContain('>> prep time: 15 minutes');
      expect(cookText).toContain('>> cook time: 20 minutes');
      expect(cookText).toContain('>> category: Main Course');
      expect(cookText).toContain('>> cuisine: Spanish');
      expect(cookText).toContain('>> author: tortilladepatatas.org');
      expect(cookText).toContain('>> source: https://tortilladepatatas.org/es/recipes/clasica');
      expect(cookText).toContain('@Patatas Monalisa{600%g}');
      expect(cookText).toContain('@Huevos camperos{6}');
      expect(cookText).toContain('@Aceite de oliva virgen extra{150%ml}');
      expect(cookText).toContain('@Sal fina{6%g}');
      expect(cookText).toContain('Paso 1: Pelar y cortar las patatas');
    });

    it('should support object instructions with custom step titles', () => {
      const recipe: RawRecipeInput = {
        name: 'Tortilla con Cebolla Caramelizada',
        ingredients: ['500g Patatas', '5 Huevos', '150g Cebolla'],
        instructions: [
          { step: 'Cebolla', text: 'Caramelizar la cebolla a fuego muy lento.' },
          { step: 'Patatas', text: 'Freír las patatas suavemente.' },
          { step: 'Cuajado', text: 'Mezclar todo con el huevo y cuajar 1 minuto por lado.' },
        ],
      };

      const cookText = exportToCooklang(recipe, { includeMetadata: false });

      expect(cookText).not.toContain('>> title:');
      expect(cookText).toContain('-- Ingredients');
      expect(cookText).toContain('@Patatas{500%g}');
      expect(cookText).toContain('Cebolla: Caramelizar la cebolla a fuego muy lento.');
      expect(cookText).toContain('Patatas: Freír las patatas suavemente.');
      expect(cookText).toContain('Cuajado: Mezclar todo con el huevo');
    });

    it('should allow author and source URL overrides via options', () => {
      const recipe: RawRecipeInput = {
        name: 'Tortilla Minimalista',
        ingredients: ['400g Patatas', '4 Huevos'],
        instructions: ['Cocinar y servise.'],
      };

      const cookText = exportToCooklang(recipe, {
        authorName: 'Chef Master',
        sourceUrl: 'https://example.com/recipe',
      });

      expect(cookText).toContain('>> author: Chef Master');
      expect(cookText).toContain('>> source: https://example.com/recipe');
    });
  });

  describe('exportTortillaConfigToCooklang with Builder Model', () => {
    it('should export dynamic calculator TortillaConfiguration into Cooklang format in Spanish', () => {
      const searchParams = new URLSearchParams('eggs=10&eggSize=xl&potatoes=850&texture=jugosa&technique=pochada&extras=bacon:60');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const tortillaConfig = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(tortillaConfig, {
        lang: 'es',
        authorName: 'Tortilla Builder',
        sourceUrl: 'https://tortilladepatatas.org/es/builder?eggs=10&potatoes=850',
      });

      expect(cookText).toContain('>> title: Tortilla Personalizada (6 raciones)');
      expect(cookText).toContain('>> author: Tortilla Builder');
      expect(cookText).toContain('>> pan size: 28 cm');
      expect(cookText).toContain('@Huevos{10%XL}');
      expect(cookText).toContain('@Patatas{850%g}');
      expect(cookText).toContain('@Aceite de Oliva Virgen Extra{');
      expect(cookText).toContain('Bacon');
      expect(cookText).toContain('#Sartén antiadherente{28%cm}');
      expect(cookText).toContain('Paso 1:');
    });

    it('should export dynamic calculator TortillaConfiguration into Cooklang format in English', () => {
      const searchParams = new URLSearchParams('eggs=6&eggSize=m&potatoes=600&texture=cuajada&extras=onion:120');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const tortillaConfig = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(tortillaConfig, {
        lang: 'en',
        authorName: 'Spanish Omelette App',
      });

      expect(cookText).toContain('>> title: Custom Spanish Omelette (4 servings)');
      expect(cookText).toContain('>> category: Main Course');
      expect(cookText).toContain('>> cuisine: Spanish');
      expect(cookText).toContain('@Eggs{6%LARGE}');
      expect(cookText).toContain('@Potatoes{600%g}');
      expect(cookText).toContain('@Extra Virgin Olive Oil{');
      expect(cookText).toContain('#Non-stick skillet{');
      expect(cookText).toContain('Step 1:');
    });

    it('should export dynamic calculator TortillaConfiguration into Cooklang format in German', () => {
      const searchParams = new URLSearchParams('eggs=8&potatoes=700');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const tortillaConfig = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(tortillaConfig, {
        lang: 'de',
        authorName: 'Tortilla De Patatas DE',
      });

      expect(cookText).toContain('>> title: Individuelle Tortilla');
      expect(cookText).toContain('@Eier{8%LARGE}');
      expect(cookText).toContain('@Kartoffeln{700%g}');
      expect(cookText).toContain('@Natives Olivenöl Extra{');
      expect(cookText).toContain('#Antihaftpfanne{');
      expect(cookText).toContain('Schritt 1:');
    });

    it('should auto-add calculated salt if salt is not in the ingredients list', () => {
      const searchParams = new URLSearchParams('eggs=5&potatoes=500');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const tortillaConfig = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(tortillaConfig, { lang: 'es' });

      expect(cookText).toContain('@Sal{4%g}');
    });

    it('should disable cookware section when includeCookware is set to false', () => {
      const searchParams = new URLSearchParams('eggs=6&potatoes=600');
      const parsedConfig = parseConfigurationFromUrl(searchParams);
      const tortillaConfig = createTortillaConfiguration(parsedConfig);

      const cookText = exportTortillaConfigToCooklang(tortillaConfig, {
        includeCookware: false,
      });

      expect(cookText).not.toContain('-- Cookware');
      expect(cookText).not.toContain('#Sartén antiadherente');
    });
  });
});
