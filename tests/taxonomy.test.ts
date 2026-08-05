import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue([]),
  getEntry: vi.fn().mockResolvedValue(null),
}));

import { 
  getTaxonomyUrl, 
  getTaxonomyTypeFromRoute,
  getTaxonomyTypeLabel
} from '../src/lib/taxonomy';

describe('Taxonomy Unique ID & Taxonomy Integrity Tests', () => {
  const rootDir = process.cwd();
  const taxonomiesDir = path.join(rootDir, 'src', 'content', 'taxonomies');

  function getAllTaxonomyItems() {
    const items: any[] = [];
    const subdirs = fs.readdirSync(taxonomiesDir);
    for (const subdir of subdirs) {
      const dirPath = path.join(taxonomiesDir, subdir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.json'));
        for (const file of files) {
          const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
          items.push(JSON.parse(content));
        }
      }
    }
    const extraDirs = [
      path.join(rootDir, 'src', 'content', 'persons'),
      path.join(rootDir, 'src', 'content', 'people'),
    ];
    for (const extraDir of extraDirs) {
      if (fs.existsSync(extraDir)) {
        const files = fs.readdirSync(extraDir).filter((f) => f.endsWith('.json'));
        for (const file of files) {
          const content = fs.readFileSync(path.join(extraDir, file), 'utf-8');
          items.push(JSON.parse(content));
        }
      }
    }
    return items;
  }

  it('should ensure taxonomyId / id is unique across the entire taxonomy dataset', () => {
    const items = getAllTaxonomyItems();
    const seenIds = new Set<string>();
    const duplicateIds: string[] = [];

    for (const item of items) {
      if (seenIds.has(item.id)) {
        duplicateIds.push(item.id);
      }
      seenIds.add(item.id);
    }

    expect(duplicateIds).toEqual([]);
  });

  it('should correctly configure cherryPepper ingredient', () => {
    const items = getAllTaxonomyItems();
    const cherryPepper = items.find((item) => item.id === 'cherryPepper');
    expect(cherryPepper).toBeDefined();
    expect(cherryPepper?.image).toBe('/images/ingredients/pepper_editorial_card.jpg');

    // Test localized URLs for cherryPepper
    const esUrl = getTaxonomyUrl('ingredient', cherryPepper?.slug.es || 'cherryPepper', 'es');
    const enUrl = getTaxonomyUrl('ingredient', cherryPepper?.slug.en || 'cherryPepper', 'en');
    const deUrl = getTaxonomyUrl('ingredient', cherryPepper?.slug.de || 'cherryPepper', 'de');

    expect(esUrl).toBe('/es/ingredientes/cherryPepper');
    expect(enUrl).toBe('/en/ingredients/cherryPepper');
    expect(deUrl).toBe('/de/zutaten/cherryPepper');
  });

  it('should resolve taxonomy type from localized route segments without 404s', () => {
    expect(getTaxonomyTypeFromRoute('ingredientes', 'es')).toBe('ingredient');
    expect(getTaxonomyTypeFromRoute('ingredients', 'en')).toBe('ingredient');
    expect(getTaxonomyTypeFromRoute('zutaten', 'de')).toBe('ingredient');

    expect(getTaxonomyTypeFromRoute('facciones', 'es')).toBe('faction');
    expect(getTaxonomyTypeFromRoute('factions', 'en')).toBe('faction');
    expect(getTaxonomyTypeFromRoute('faktionen', 'de')).toBe('faction');

    expect(getTaxonomyTypeFromRoute('tecnicas', 'es')).toBe('technique');
    expect(getTaxonomyTypeFromRoute('techniques', 'en')).toBe('technique');
    expect(getTaxonomyTypeFromRoute('techniken', 'de')).toBe('technique');

    expect(getTaxonomyTypeFromRoute('estilos', 'es')).toBe('style');
    expect(getTaxonomyTypeFromRoute('styles', 'en')).toBe('style');
    expect(getTaxonomyTypeFromRoute('stile', 'de')).toBe('style');

    expect(getTaxonomyTypeFromRoute('regiones', 'es')).toBe('region');
    expect(getTaxonomyTypeFromRoute('regions', 'en')).toBe('region');
    expect(getTaxonomyTypeFromRoute('regionen', 'de')).toBe('region');

    expect(getTaxonomyTypeFromRoute('personas', 'es')).toBe('person');
    expect(getTaxonomyTypeFromRoute('people', 'en')).toBe('person');
    expect(getTaxonomyTypeFromRoute('personen', 'de')).toBe('person');
  });

  it('should return correct display labels for taxonomy breadcrumbs', () => {
    expect(getTaxonomyTypeLabel('ingredient', 'es')).toBe('Ingredientes');
    expect(getTaxonomyTypeLabel('ingredient', 'en')).toBe('Ingredients');
    expect(getTaxonomyTypeLabel('ingredient', 'de')).toBe('Zutaten');

    expect(getTaxonomyTypeLabel('faction', 'es')).toBe('Facciones');
    expect(getTaxonomyTypeLabel('faction', 'en')).toBe('Factions');
    expect(getTaxonomyTypeLabel('faction', 'de')).toBe('Fraktionen');
  });
});
