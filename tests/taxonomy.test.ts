import { describe, it, expect, vi } from 'vitest';

// Mock astro:content so pure taxonomy mapping functions can be tested in Vitest
vi.mock('astro:content', () => {
  return {
    getCollection: vi.fn().mockResolvedValue([]),
  };
});

import {
  getTaxonomyRoutePrefix,
  getTaxonomyUrl,
  getTaxonomyTypeFromRoute,
  TAXONOMY_ROUTING_MAP,
} from '../src/lib/taxonomy';

describe('Taxonomy Routing & Mapping Unit Tests', () => {
  it('should resolve correct taxonomy route prefixes per language', () => {
    expect(getTaxonomyRoutePrefix('faction', 'es')).toBe('facciones');
    expect(getTaxonomyRoutePrefix('faction', 'en')).toBe('factions');
    expect(getTaxonomyRoutePrefix('faction', 'de')).toBe('faktionen');

    expect(getTaxonomyRoutePrefix('ingredient', 'es')).toBe('ingredientes');
    expect(getTaxonomyRoutePrefix('ingredient', 'en')).toBe('ingredients');
    expect(getTaxonomyRoutePrefix('ingredient', 'de')).toBe('zutaten');
  });

  it('should construct correct localized URLs', () => {
    expect(getTaxonomyUrl('faction', 'concebollistas', 'es')).toBe('/es/facciones/concebollistas');
    expect(getTaxonomyUrl('ingredient', 'potato', 'en')).toBe('/en/ingredients/potato');
    expect(getTaxonomyUrl('technique', 'sanftgaren', 'de')).toBe('/de/techniken/sanftgaren');
  });

  it('should reverse lookup canonical taxonomy type from localized route segment', () => {
    expect(getTaxonomyTypeFromRoute('facciones', 'es')).toBe('faction');
    expect(getTaxonomyTypeFromRoute('ingredients', 'en')).toBe('ingredient');
    expect(getTaxonomyTypeFromRoute('faktionen', 'de')).toBe('faction');
    expect(getTaxonomyTypeFromRoute('zutaten', 'de')).toBe('ingredient');
  });

  it('should handle fallback reverse lookups across all languages', () => {
    expect(getTaxonomyTypeFromRoute('facciones')).toBe('faction');
    expect(getTaxonomyTypeFromRoute('ingredients')).toBe('ingredient');
    expect(getTaxonomyTypeFromRoute('zutaten')).toBe('ingredient');
  });

  it('should cover all 13 canonical taxonomy types for es, en, and de', () => {
    const expectedTypes = [
      'faction',
      'ingredient',
      'technique',
      'style',
      'region',
      'person',
      'restaurant',
      'utensil',
      'cooking-method',
      'texture',
      'event',
      'glossary',
      'difficulty',
    ];

    for (const lang of ['es', 'en', 'de']) {
      const langMap = TAXONOMY_ROUTING_MAP[lang];
      expect(Object.keys(langMap)).toHaveLength(13);
      for (const type of expectedTypes) {
        expect(langMap[type]).toBeTruthy();
      }
    }
  });
});
