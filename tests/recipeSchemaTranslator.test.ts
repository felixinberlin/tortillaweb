import { describe, it, expect } from 'vitest';
import {
  translateToRecipeSchema,
  formatIsoDuration,
  parseIsoDuration,
  resolveFullUrl,
  validateRecipeSchema,
  exportToJsonLdScript,
  DEFAULT_TRANSLATOR_CONFIG,
  type RawRecipeInput,
} from '../src/lib/translator';

describe('Standalone Recipe.org Schema.org Translator Engine', () => {
  describe('ISO 8601 Duration Utilities', () => {
    it('should format minutes to ISO 8601 duration strings accurately', () => {
      expect(formatIsoDuration(0)).toBe('PT0M');
      expect(formatIsoDuration(15)).toBe('PT15M');
      expect(formatIsoDuration(60)).toBe('PT1H');
      expect(formatIsoDuration(90)).toBe('PT1H30M');
      expect(formatIsoDuration(125)).toBe('PT2H5M');
      expect(formatIsoDuration(-10)).toBe('PT0M');
      expect(formatIsoDuration(NaN)).toBe('PT0M');
    });

    it('should parse ISO 8601 duration strings back to total minutes', () => {
      expect(parseIsoDuration('PT15M')).toBe(15);
      expect(parseIsoDuration('PT1H')).toBe(60);
      expect(parseIsoDuration('PT1H30M')).toBe(90);
      expect(parseIsoDuration('PT2H5M')).toBe(125);
      expect(parseIsoDuration('')).toBe(0);
      expect(parseIsoDuration('INVALID')).toBe(0);
    });
  });

  describe('URL Resolution', () => {
    it('should expand relative paths using specified base URL', () => {
      expect(resolveFullUrl('/images/recipe.jpg', 'https://recipe.org')).toBe('https://recipe.org/images/recipe.jpg');
      expect(resolveFullUrl('images/recipe.jpg', 'https://recipe.org/')).toBe('https://recipe.org/images/recipe.jpg');
    });

    it('should preserve absolute HTTP/HTTPS URLs', () => {
      expect(resolveFullUrl('https://cdn.example.com/photo.jpg', 'https://recipe.org')).toBe('https://cdn.example.com/photo.jpg');
    });
  });

  describe('translateToRecipeSchema', () => {
    it('should translate raw recipe model into compliant Schema.org Recipe JSON-LD', () => {
      const input: RawRecipeInput = {
        name: 'Guacamole Tradicional',
        description: 'Auténtico guacamole mexicano preparado en molcajete con aguacates frescos.',
        image: '/images/guacamole.jpg',
        prepTimeMinutes: 10,
        cookTimeMinutes: 0,
        yieldServings: 4,
        ingredients: [
          '3 aguacates maduros',
          '1 tomate picado',
          '1/2 cebolla morada picada',
          '1 manojo de cilantro fresco',
          '1 zumo de lima',
          'Sal y pimienta al gusto',
        ],
        instructions: [
          'Chafar la pulpa del aguacate en un tazón.',
          'Añadir la cebolla, el tomate, el cilantro y el zumo de lima.',
          'Sazonar con sal y mezclar suavemente.',
        ],
        category: 'Appetizer',
        cuisine: 'Mexican',
        keywords: ['guacamole', 'aguacate', 'mexicano', 'botana'],
        url: '/recetas/guacamole',
      };

      const schema = translateToRecipeSchema(input, {
        baseUrl: 'https://recetas.org',
        defaultAuthorName: 'Chef Alejandro',
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Recipe');
      expect(schema.name).toBe('Guacamole Tradicional');
      expect(schema.description).toBe('Auténtico guacamole mexicano preparado en molcajete con aguacates frescos.');
      expect(schema.image).toEqual(['https://recetas.org/images/guacamole.jpg']);
      expect(schema.author).toEqual({
        '@type': 'Organization',
        name: 'Chef Alejandro',
        url: 'https://recetas.org',
      });
      expect(schema.prepTime).toBe('PT10M');
      expect(schema.cookTime).toBe('PT0M');
      expect(schema.totalTime).toBe('PT10M');
      expect(schema.recipeYield).toBe('4 raciones');
      expect(schema.recipeCategory).toBe('Appetizer');
      expect(schema.recipeCuisine).toBe('Mexican');
      expect(schema.keywords).toBe('guacamole, aguacate, mexicano, botana');
      expect(schema.recipeIngredient).toHaveLength(6);
      expect(schema.recipeInstructions).toHaveLength(3);
      expect(schema.recipeInstructions[0]).toEqual({
        '@type': 'HowToStep',
        position: 1,
        name: 'Paso 1',
        text: 'Chafar la pulpa del aguacate en un tazón.',
      });
      expect(schema.url).toBe('https://recetas.org/recetas/guacamole');
      expect(schema.mainEntityOfPage).toEqual({
        '@type': 'WebPage',
        '@id': 'https://recetas.org/recetas/guacamole',
      });
    });

    it('should support structured instruction steps and optional nutrition objects', () => {
      const input: RawRecipeInput = {
        name: 'Gazpacho Andaluz',
        description: 'Sopa fría tradicional andaluza.',
        ingredients: ['1kg tomates maduros', '1 pimiento verde', '1 pepino', '1 diente de ajo', '50ml AOVE'],
        instructions: [
          { step: 'Triturar', text: 'Triturar los vegetales con el aceite de oliva.' },
          { step: 'Enfriar', text: 'Servir muy frío en tazón o vaso.' },
        ],
        nutrition: {
          calories: '180 kcal',
          proteinContent: '3g',
          fatContent: '12g',
        },
      };

      const schema = translateToRecipeSchema(input);

      expect(schema.recipeInstructions[0]).toEqual({
        '@type': 'HowToStep',
        position: 1,
        name: 'Triturar',
        text: 'Triturar los vegetales con el aceite de oliva.',
      });

      expect(schema.nutrition).toEqual({
        '@type': 'NutritionInformation',
        calories: '180 kcal',
        proteinContent: '3g',
        fatContent: '12g',
        carbohydrateContent: undefined,
        servingSize: undefined,
      });
    });

    it('should use default fallback values when non-mandatory fields are omitted', () => {
      const input: RawRecipeInput = {
        name: 'Pan con Tomate',
        description: 'Sencillo y delicioso pan con tomate.',
        ingredients: ['Pan rústico', 'Tomate maduro', 'AOVE', 'Sal'],
        instructions: ['Frotar el tomate sobre el pan y añadir aceite y sal.'],
      };

      const schema = translateToRecipeSchema(input);

      expect(schema.author.name).toBe(DEFAULT_TRANSLATOR_CONFIG.defaultAuthorName);
      expect(schema.recipeCategory).toBe(DEFAULT_TRANSLATOR_CONFIG.defaultCategory);
      expect(schema.recipeCuisine).toBe(DEFAULT_TRANSLATOR_CONFIG.defaultCuisine);
      expect(schema.image).toEqual([DEFAULT_TRANSLATOR_CONFIG.defaultImage]);
    });
  });

  describe('validateRecipeSchema', () => {
    it('should validate complete Schema.org Recipe JSON-LD as valid', () => {
      const input: RawRecipeInput = {
        name: 'Paella Valenciana',
        description: 'Arroz tradicional con pollo y verduras.',
        ingredients: ['400g arroz bombe', '300g pollo', 'Bajoqueta y garrofó'],
        instructions: ['Sofrreír los ingredientes y cocer el arroz.'],
      };

      const schema = translateToRecipeSchema(input);
      const result = validateRecipeSchema(schema);

      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should flag errors when mandatory Schema.org properties are missing', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: '',
        image: [],
        recipeIngredient: [],
      };

      const result = validateRecipeSchema(invalidSchema);

      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.field === 'name' && i.severity === 'error')).toBe(true);
      expect(result.issues.some((i) => i.field === 'image' && i.severity === 'error')).toBe(true);
      expect(result.issues.some((i) => i.field === 'recipeIngredient' && i.severity === 'error')).toBe(true);
      expect(result.issues.some((i) => i.field === 'recipeInstructions' && i.severity === 'error')).toBe(true);
    });
  });

  describe('exportToJsonLdScript', () => {
    it('should format schema into an HTML script tag with escaped HTML brackets', () => {
      const schema = translateToRecipeSchema({
        name: 'Pollo al Curry <Especial>',
        description: 'Receta sabrosa con especias <curry> e ingredientes frescos.',
        ingredients: ['Pollo', 'Curry en polvo', 'Leche de coco'],
        instructions: ['Mezclar y cocinar.'],
      });

      const scriptHtml = exportToJsonLdScript(schema);

      expect(scriptHtml).toContain('<script type="application/ld+json">');
      expect(scriptHtml).toContain('</script>');
      expect(scriptHtml).not.toContain('<Especial>');
      expect(scriptHtml).toContain('\\u003cEspecial>');
    });
  });
});
