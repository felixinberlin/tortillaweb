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
import { getRouteIdFromCanonicalType, getRouteUrl } from '../src/lib/routes';
import { NAV_STRUCTURE, FOOTER_ROUTE_IDS } from '../src/lib/navigation/menus';

describe('Hidden Taxonomy & Navigation Integration Tests (Regions & Personas)', () => {
  const rootDir = process.cwd();

  it('should verify Regions and Personas are removed from primary navigation files', () => {
    // 1. Header JSON check
    const headerPath = path.join(rootDir, 'src', 'content', 'navigation', 'header.json');
    const headerData = JSON.parse(fs.readFileSync(headerPath, 'utf-8'));
    const headerKeys = headerData.items.map((item: any) => item.key);

    expect(headerKeys).not.toContain('regiones');
    expect(headerKeys).not.toContain('personas');

    // 2. Primary menu configuration check
    const fundamentosRouteIds = NAV_STRUCTURE.fundamentos.routeIds as string[];
    expect(fundamentosRouteIds).not.toContain('regiones');
    expect(fundamentosRouteIds).not.toContain('personas');
    expect(FOOTER_ROUTE_IDS as string[]).not.toContain('personas');
    expect(FOOTER_ROUTE_IDS as string[]).not.toContain('regiones');

    // 3. Encyclopedia index check
    const enciclopediaPath = path.join(rootDir, 'src', 'content', 'pages', 'enciclopedia-index.json');
    const enciclopediaData = JSON.parse(fs.readFileSync(enciclopediaPath, 'utf-8'));
    const sectionIds = enciclopediaData.sections.map((s: any) => s.id);

    expect(sectionIds).not.toContain('regiones');
    expect(sectionIds).not.toContain('personas');

    // 4. Footer component source check
    const footerPath = path.join(rootDir, 'src', 'components', 'layout', 'Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf-8');

    expect(footerContent).not.toContain('/personas');
    expect(footerContent).not.toContain('/regiones');
  });

  it('should continue supporting routing and taxonomy resolution for hidden taxonomies (region and person)', () => {
    // Test route ID resolution
    expect(getRouteIdFromCanonicalType('region')).toBe('regiones');
    expect(getRouteIdFromCanonicalType('person')).toBe('personas');

    // Test route type lookup from localized URL segments
    expect(getTaxonomyTypeFromRoute('regiones', 'es')).toBe('region');
    expect(getTaxonomyTypeFromRoute('regions', 'en')).toBe('region');
    expect(getTaxonomyTypeFromRoute('regionen', 'de')).toBe('region');

    expect(getTaxonomyTypeFromRoute('personas', 'es')).toBe('person');
    expect(getTaxonomyTypeFromRoute('people', 'en')).toBe('person');
    expect(getTaxonomyTypeFromRoute('personen', 'de')).toBe('person');

    // Test label generation
    expect(getTaxonomyTypeLabel('region', 'es')).toBe('Regiones');
    expect(getTaxonomyTypeLabel('person', 'es')).toBe('Personajes');
  });

  it('should generate valid localized URLs for region and person taxonomy pages', () => {
    // Region URLs
    expect(getTaxonomyUrl('region', 'betanzos', 'es')).toBe('/es/regiones/betanzos');
    expect(getTaxonomyUrl('region', 'betanzos', 'en')).toBe('/en/regions/betanzos');
    expect(getTaxonomyUrl('region', 'betanzos', 'de')).toBe('/de/regionen/betanzos');

    // Person URLs
    expect(getTaxonomyUrl('person', 'ferran-adria', 'es')).toBe('/es/personas/ferran-adria');
    expect(getTaxonomyUrl('person', 'ferran-adria', 'en')).toBe('/en/people/ferran-adria');
    expect(getTaxonomyUrl('person', 'ferran-adria', 'de')).toBe('/de/personen/ferran-adria');

    // Section root URLs (used as SEO landing pages)
    expect(getRouteUrl('regiones', 'es')).toBe('/es/regiones');
    expect(getRouteUrl('personas', 'es')).toBe('/es/personas');
  });

  it('should validate all Region taxonomy JSON files in src/content/taxonomies/regions/', () => {
    const regionsDir = path.join(rootDir, 'src', 'content', 'taxonomies', 'regions');
    expect(fs.existsSync(regionsDir)).toBe(true);

    const files = fs.readdirSync(regionsDir).filter((f) => f.endsWith('.json'));
    expect(files.length).toBeGreaterThanOrEqual(4); // betanzos, donostia, madrid, extremadura

    for (const file of files) {
      const raw = fs.readFileSync(path.join(regionsDir, file), 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toHaveProperty('id');
      expect(data.type).toBe('region');
      expect(data).toHaveProperty('slug');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');

      for (const lang of ['es', 'en', 'de']) {
        expect(data.slug[lang]).toBeTruthy();
        expect(data.title[lang]).toBeTruthy();
        expect(data.description[lang]).toBeTruthy();
      }
    }
  });

  it('should validate Person taxonomy JSON files across src/content/taxonomies/people/ and src/content/persons/', () => {
    const peopleDir = path.join(rootDir, 'src', 'content', 'taxonomies', 'people');
    const personsDir = path.join(rootDir, 'src', 'content', 'persons');

    const personFiles: string[] = [];

    if (fs.existsSync(peopleDir)) {
      const files = fs.readdirSync(peopleDir).filter((f) => f.endsWith('.json'));
      files.forEach((f) => personFiles.push(path.join(peopleDir, f)));
    }

    if (fs.existsSync(personsDir)) {
      const files = fs.readdirSync(personsDir).filter((f) => f.endsWith('.json'));
      files.forEach((f) => personFiles.push(path.join(personsDir, f)));
    }

    expect(personFiles.length).toBeGreaterThan(0);

    for (const filePath of personFiles) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toHaveProperty('id');
      expect(data.type).toBe('person');
      expect(data).toHaveProperty('slug');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');

      for (const lang of ['es', 'en', 'de']) {
        expect(data.slug[lang]).toBeTruthy();
        expect(data.title[lang]).toBeTruthy();
        expect(data.description[lang]).toBeTruthy();
      }
    }
  });
});
