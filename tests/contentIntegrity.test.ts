import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Content Integrity & Data Collection Tests', () => {
  const rootDir = process.cwd();

  it('should validate all recipe JSON files', () => {
    const recipesDir = path.join(rootDir, 'src', 'content', 'recipes');
    const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.json'));

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const filePath = path.join(recipesDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('slug');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('taxonomyIds');

      // Verify localized object structure
      for (const lang of ['es', 'en', 'de']) {
        expect(data.slug[lang]).toBeTruthy();
        expect(data.title[lang]).toBeTruthy();
        expect(data.description[lang]).toBeTruthy();
      }

      // Verify taxonomyIds array
      expect(Array.isArray(data.taxonomyIds)).toBe(true);
      expect(data.taxonomyIds.length).toBeGreaterThan(0);
    }
  });

  it('should validate all taxonomy JSON files across subdirectories', () => {
    const taxonomiesDir = path.join(rootDir, 'src', 'content', 'taxonomies');

    const getTaxonomyFiles = (dir: string, fileList: string[] = []): string[] => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          getTaxonomyFiles(itemPath, fileList);
        } else if (item.endsWith('.json')) {
          fileList.push(itemPath);
        }
      }
      return fileList;
    };

    const files = getTaxonomyFiles(taxonomiesDir);
    expect(files.length).toBeGreaterThan(0);

    for (const filePath of files) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('type');
      expect(data).toHaveProperty('slug');
      expect(data).toHaveProperty('title');

      for (const lang of ['es', 'en', 'de']) {
        expect(data.slug[lang]).toBeTruthy();
        expect(data.title[lang]).toBeTruthy();
      }
    }
  });

  it('should validate page JSON content files', () => {
    const pagesDir = path.join(rootDir, 'src', 'content', 'pages');
    const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.json'));

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const filePath = path.join(pagesDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toBeTypeOf('object');
      if (data.title) {
        expect(data.title.es || data.title.en || data.title.de).toBeTruthy();
      }
    }
  });

  it('should validate header navigation JSON content', () => {
    const headerPath = path.join(rootDir, 'src', 'content', 'navigation', 'header.json');
    expect(fs.existsSync(headerPath)).toBe(true);

    const raw = fs.readFileSync(headerPath, 'utf-8');
    const data = JSON.parse(raw);

    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items.length).toBeGreaterThan(0);

    for (const item of data.items) {
      expect(item).toHaveProperty('key');
      expect(item).toHaveProperty('href');
      expect(item).toHaveProperty('label');
      expect(item.label.es).toBeTruthy();
      expect(item.label.en).toBeTruthy();
      expect(item.label.de).toBeTruthy();
    }
  });
});
