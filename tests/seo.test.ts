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

describe('SEO & Schema Generator Unit Tests', () => {
  it('should generate correct canonical URLs', () => {
    expect(getCanonicalUrl('es/recipes')).toBe('https://tortilladepatatas.org/es/recipes');
    expect(getCanonicalUrl('/en/science')).toBe('https://tortilladepatatas.org/en/science');
    expect(getCanonicalUrl('/')).toBe('https://tortilladepatatas.org/');
  });

  it('should generate accurate hreflang tags for root and subpaths', () => {
    const rootHreflangs = getHreflangs('/');
    expect(rootHreflangs).toEqual([
      { lang: 'es', href: 'https://tortilladepatatas.org/es' },
      { lang: 'en', href: 'https://tortilladepatatas.org/en' },
      { lang: 'de', href: 'https://tortilladepatatas.org/de' },
      { lang: 'x-default', href: 'https://tortilladepatatas.org/es' },
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
    expect(org.knowsAbout).toContain('Salmonella Inactivation 70°C for 2 minutes');
  });

  it('should generate WebSite schema with multilingual indicators', () => {
    const ws = generateWebSiteSchema();
    expect(ws['@type']).toBe('WebSite');
    expect(ws.inLanguage).toEqual(['es', 'en', 'de']);
    expect(ws.name).toContain('tortilladepatatas.org');
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
    expect(recipeSchema.keywords).toContain('70°C for 2 minutes');
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
