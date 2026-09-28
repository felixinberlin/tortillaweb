import { describe, it, expect } from 'vitest';
import {
  getCanonicalUrl,
  getHreflangs,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateRecipeSchema,
  generateArticleSchema,
  generatePersonSchema,
  generateFAQSchema,
  generateCollectionPageSchema,
  SITE_URL,
} from '../src/lib/seo';
import {
  createRecipeSchema,
  validateRecipeSchema,
  formatIsoDuration,
  parseIsoDuration,
} from '../src/lib/seo/recipeSchema';
import clasicaRecipe from '../src/content/recipes/clasica.json';
import betanzosRecipe from '../src/content/recipes/betanzos.json';
import cebollaRecipe from '../src/content/recipes/concebolla.json';

describe('SEO & Schema Generator Unit Tests', () => {
  it('should generate correct canonical URLs', () => {
    expect(getCanonicalUrl('es/recipes')).toBe('https://tortilladepatatas.org/es/recipes');
    expect(getCanonicalUrl('/en/science')).toBe('https://tortilladepatatas.org/en/science');
    expect(getCanonicalUrl('/')).toBe('https://tortilladepatatas.org/');
  });

  it('should generate accurate hreflang tags for root and subpaths', () => {
    const rootHreflangs = getHreflangs('/');
    expect(rootHreflangs).toEqual([
      { lang: 'es', href: 'https://tortilladepatatas.org/' },
      { lang: 'en', href: 'https://tortilladepatatas.org/en' },
      { lang: 'de', href: 'https://tortilladepatatas.org/de' },
      { lang: 'x-default', href: 'https://tortilladepatatas.org/' },
    ]);

    const nestedHreflangs = getHreflangs('/es/recipes/clasica');
    expect(nestedHreflangs).toEqual([
      { lang: 'es', href: 'https://tortilladepatatas.org/es/recipes/clasica' },
      { lang: 'en', href: 'https://tortilladepatatas.org/en/recipes/clasica' },
      { lang: 'de', href: 'https://tortilladepatatas.org/de/recipes/clasica' },
      { lang: 'x-default', href: 'https://tortilladepatatas.org/es/recipes/clasica' },
    ]);
  });

  it('should generate Organization schema with required safety knowledge keywords', () => {
    const org = generateOrganizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(org.name).toBe('tortilladepatatas.org');
    expect(org.knowsAbout).toContain('Pasteurización y Seguridad del Huevo');
    expect(org.logo).toBeDefined();
  });

  it('should generate WebSite schema with multilingual indicators and search action', () => {
    const ws = generateWebSiteSchema();
    expect(ws['@type']).toBe('WebSite');
    expect(ws.inLanguage).toEqual(['es', 'en', 'de']);
    expect(ws.name).toContain('tortilladepatatas.org');
    expect(ws.potentialAction).toBeDefined();
  });

  it('should generate Breadcrumb schema correctly', () => {
    const breadcrumbs = generateBreadcrumbSchema([
      { name: 'Inicio', url: '/es' },
      { name: 'Recetas', url: '/es/recipes' },
    ]);
    expect(breadcrumbs['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.itemListElement).toHaveLength(2);
    expect(breadcrumbs.itemListElement[0].item).toBe('https://tortilladepatatas.org/es');
    expect(breadcrumbs.itemListElement[1].item).toBe('https://tortilladepatatas.org/es/recipes');
  });

  it('should generate Recipe schema with valid ISO duration strings', () => {
    const recipeSchema = generateRecipeSchema({
      name: 'Tortilla Clásica de Patatas',
      description: 'Receta tradicional con patatas pochadas y cuajado suave.',
      image: '/images/recipes/clasica.jpg',
      ingredients: ['6 huevos L', '800g patatas Monalisa', 'Salt'],
      instructions: [{ step: 'Paso 1', text: 'Pelar y cortar patatas.' }],
      prepTimeMinutes: 20,
      cookTimeMinutes: 25,
      yieldServings: 4,
    });

    expect(recipeSchema['@type']).toBe('Recipe');
    expect(recipeSchema.prepTime).toBe('PT20M');
    expect(recipeSchema.cookTime).toBe('PT25M');
    expect(recipeSchema.totalTime).toBe('PT45M');
    expect(recipeSchema.recipeYield).toBe('4 raciones');
    expect(recipeSchema.keywords).toContain('cuajado perfecto');
  });

  describe('createRecipeSchema (Issue #8 - Schema.org JSON-LD for Recipes)', () => {
    it('should generate valid Schema.org/Recipe JSON-LD for Tortilla Clásica (Spanish)', () => {
      const schema = createRecipeSchema(clasicaRecipe, { lang: 'es' });
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Recipe');
      expect(schema.name).toBe('Tortilla Clásica sin Cebolla');
      expect(schema.description).toContain('patata, huevo, aceite y sal');
      expect(schema.prepTime).toBe('PT15M');
      expect(schema.cookTime).toBe('PT25M');
      expect(schema.totalTime).toBe('PT40M');
      expect(schema.recipeYield).toBe('4 raciones');
      expect(schema.yieldCount).toBe('4');
      expect(schema.recipeCategory).toBe('Plato principal');
      expect(schema.recipeCuisine).toBe('Española');
      expect(schema.keywords).toBeTruthy();
      expect(typeof schema.keywords).toBe('string');
      expect(schema.keywords!.length).toBeGreaterThan(0);
      expect(schema.image[0]).toBe('https://tortilladepatatas.org/images/recipes/clasica.svg');
      expect(schema.recipeIngredient.length).toBeGreaterThan(0);
      expect(schema.recipeInstructions.length).toBeGreaterThan(0);
      expect(schema.recipeInstructions[0]['@type']).toBe('HowToStep');
      expect(schema.recipeInstructions[0].name).toBe('Cortar las patatas');

      const validation = validateRecipeSchema(schema);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
      expect(validation.warnings).toHaveLength(0);
    });

    it('should verify all 5 Google Search Console Recipe rich result fields across all recipes', async () => {
      const { getAllRecipes } = await import('../src/lib/taxonomy');
      const allRecipes = await getAllRecipes();
      expect(allRecipes.length).toBeGreaterThanOrEqual(25);

      for (const r of allRecipes) {
        for (const lang of ['es', 'en', 'de'] as const) {
          const schema = createRecipeSchema(r, { lang });
          // Field 1: keywords
          expect(schema.keywords, `Recipe ${r.id} missing keywords in ${lang}`).toBeDefined();
          expect(typeof schema.keywords).toBe('string');
          expect(schema.keywords!.length).toBeGreaterThan(0);

          // Field 2: recipeIngredient
          expect(schema.recipeIngredient, `Recipe ${r.id} missing recipeIngredient in ${lang}`).toBeDefined();
          expect(Array.isArray(schema.recipeIngredient)).toBe(true);
          expect(schema.recipeIngredient.length).toBeGreaterThan(0);

          // Field 3: recipeCategory
          expect(schema.recipeCategory, `Recipe ${r.id} missing recipeCategory in ${lang}`).toBeDefined();
          expect(schema.recipeCategory.length).toBeGreaterThan(0);

          // Field 4: prepTime
          expect(schema.prepTime, `Recipe ${r.id} missing prepTime in ${lang}`).toBeDefined();
          expect(schema.prepTime).toMatch(/^PT\d+M$/);

          // Field 5: cookTime
          expect(schema.cookTime, `Recipe ${r.id} missing cookTime in ${lang}`).toBeDefined();
          expect(schema.cookTime).toMatch(/^PT\d+M$/);

          const validation = validateRecipeSchema(schema);
          expect(validation.valid).toBe(true);
          expect(validation.errors).toHaveLength(0);
          expect(validation.warnings).not.toContain('keywords is recommended');
          expect(validation.warnings).not.toContain('prepTime is recommended');
          expect(validation.warnings).not.toContain('cookTime is recommended');
          expect(validation.warnings).not.toContain('recipeCategory is recommended');
        }
      }
    });

    it('should generate valid multilingual Schema.org/Recipe JSON-LD for Tortilla de Betanzos (English & German)', () => {
      const schemaEn = createRecipeSchema(betanzosRecipe, { lang: 'en' });
      expect(schemaEn.name).toBe('Runny Betanzos-Style Spanish Omelette');
      expect(schemaEn.recipeYield).toBe('4 servings');
      expect(schemaEn.recipeCategory).toBe('Main Course');
      expect(schemaEn.recipeCuisine).toBe('Spanish');
      expect(schemaEn.inLanguage).toBe('en');
      expect(schemaEn.url).toContain('/en/recipes/betanzos-style-spanish-omelette');

      const valEn = validateRecipeSchema(schemaEn);
      expect(valEn.valid).toBe(true);

      const schemaDe = createRecipeSchema(betanzosRecipe, { lang: 'de' });
      expect(schemaDe.name).toBe('Saftige Betanzos-Tortilla');
      expect(schemaDe.recipeYield).toBe('4 Portionen');
      expect(schemaDe.recipeCategory).toBe('Hauptgericht');
      expect(schemaDe.recipeCuisine).toBe('Spanisch');
      expect(schemaDe.inLanguage).toBe('de');
      expect(schemaDe.url).toContain('/de/recipes/betanzos-tortilla');

      const valDe = validateRecipeSchema(schemaDe);
      expect(valDe.valid).toBe(true);
    });

    it('should generate valid Schema.org/Recipe JSON-LD with optional rating and nutrition for Tortilla con Cebolla', () => {
      const schema = createRecipeSchema(cebollaRecipe, {
        lang: 'es',
        calories: '320 kcal',
        rating: {
          ratingValue: 4.95,
          reviewCount: 230,
        },
      });

      expect(schema.name).toBe('Tortilla Clásica con Cebolla');
      expect(schema.nutrition?.calories).toBe('320 kcal');
      expect(schema.aggregateRating?.ratingValue).toBe(4.95);
      expect(schema.aggregateRating?.reviewCount).toBe(230);
      expect(schema.aggregateRating?.bestRating).toBe(5);

      const validation = validateRecipeSchema(schema);
      expect(validation.valid).toBe(true);
    });

    it('should correctly format and parse ISO durations', () => {
      expect(formatIsoDuration(15)).toBe('PT15M');
      expect(formatIsoDuration(60)).toBe('PT1H');
      expect(formatIsoDuration(75)).toBe('PT1H15M');
      expect(formatIsoDuration(0)).toBe('PT0M');

      expect(parseIsoDuration('PT15M')).toBe(15);
      expect(parseIsoDuration('PT1H')).toBe(60);
      expect(parseIsoDuration('PT1H15M')).toBe(75);
    });
  });

  it('should generate Article, Person, FAQ and CollectionPage schemas', () => {
    const article = generateArticleSchema({
      headline: 'Ciencia del Cuajado',
      description: 'Coagulación del huevo y Salmonella',
      url: '/es/science',
    });
    expect(article['@type']).toBe('Article');
    expect(article.headline).toBe('Ciencia del Cuajado');

    const person = generatePersonSchema({
      name: 'Chef Manuel',
      jobTitle: 'Maestro Tortillero',
      description: 'Experto gastronómico',
    });
    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Chef Manuel');

    const faq = generateFAQSchema([
      { question: '¿Con o sin cebolla?', answer: 'Es un debate tradicional.' },
    ]);
    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity[0].name).toBe('¿Con o sin cebolla?');

    const collection = generateCollectionPageSchema({
      name: 'Catálogo de Recetas',
      description: 'Recetas de tortilla de patatas',
      url: `${SITE_URL}/es/recipes`,
      items: [{ name: 'Clásica', url: `${SITE_URL}/es/recipes/clasica` }],
    });
    expect(collection['@type']).toBe('CollectionPage');
  });
});
