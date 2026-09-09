import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Trivia Categories & Modular Data Integrity Tests', () => {
  const rootDir = process.cwd();

  it('should validate the master trivia index page src/content/pages/trivia.json', () => {
    const triviaIndexPath = path.join(rootDir, 'src', 'content', 'pages', 'trivia.json');
    expect(fs.existsSync(triviaIndexPath)).toBe(true);

    const raw = fs.readFileSync(triviaIndexPath, 'utf-8');
    const data = JSON.parse(raw);

    expect(data.id).toBe('trivia');
    expect(data.categoriesCount).toBe(6);
    expect(data.totalFacts).toBe(368);
    expect(Array.isArray(data.categories)).toBe(true);
    expect(data.categories.length).toBe(6);

    for (const cat of data.categories) {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('file');
      expect(cat).toHaveProperty('title');
      expect(cat).toHaveProperty('description');
      expect(typeof cat.factCount).toBe('number');
      expect(cat.factCount).toBeGreaterThan(0);
    }
  });

  it('should validate all 6 category JSON files in src/content/pages/trivia/', () => {
    const triviaDir = path.join(rootDir, 'src', 'content', 'pages', 'trivia');
    expect(fs.existsSync(triviaDir)).toBe(true);

    const files = fs.readdirSync(triviaDir).filter((f) => f.endsWith('.json'));
    expect(files.length).toBe(6);

    let totalFactsCount = 0;

    for (const file of files) {
      const filePath = path.join(triviaDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('group_id');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');
      expect(Array.isArray(data.facts)).toBe(true);
      expect(data.facts.length).toBeGreaterThan(0);

      totalFactsCount += data.facts.length;

      for (const fact of data.facts) {
        expect(fact).toHaveProperty('id');
        expect(fact).toHaveProperty('category');
        expect(fact).toHaveProperty('status');
        expect(fact).toHaveProperty('title');
        expect(fact).toHaveProperty('fact');

        for (const lang of ['es', 'en', 'de']) {
          expect(fact.title[lang]).toBeTruthy();
          expect(fact.fact[lang]).toBeTruthy();
        }
      }
    }

    expect(totalFactsCount).toBe(368);
  });

  it('should verify public/data/ and docu/ category JSON exports exist and match fact count', () => {
    const publicDataDir = path.join(rootDir, 'public', 'data');
    const docuDir = path.join(rootDir, 'docu');

    for (const targetDir of [publicDataDir, docuDir]) {
      expect(fs.existsSync(targetDir)).toBe(true);
      const overviewFile = path.join(targetDir, '00_Master_Category_Overview.json');
      expect(fs.existsSync(overviewFile)).toBe(true);

      const raw = fs.readFileSync(overviewFile, 'utf-8');
      const data = JSON.parse(raw);
      expect(data.total_facts).toBe(368);
      expect(data.categories_count).toBe(6);
    }
  });
});
