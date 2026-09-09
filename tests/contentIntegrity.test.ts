import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createRecipeSchema, validateRecipeSchema } from '../src/lib/seo/recipeSchema';

describe('Content Integrity & Data Collection Validation (Issue #13)', () => {
  const rootDir = process.cwd();
  const recipesDir = path.join(rootDir, 'src', 'content', 'recipes');
  const taxonomiesDir = path.join(rootDir, 'src', 'content', 'taxonomies');
  const personsDir = path.join(rootDir, 'src', 'content', 'persons');
  const storiesDir = path.join(rootDir, 'src', 'content', 'stories');
  const i18nDir = path.join(rootDir, 'src', 'i18n');

  // Helper to load all JSON recipes
  const recipeFiles = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.json'));
  const allRecipes = recipeFiles.map((file) => ({
    file,
    data: JSON.parse(fs.readFileSync(path.join(recipesDir, file), 'utf-8')),
  }));

  // Helper to get recursive taxonomy files
  const getTaxonomyFiles = (dir: string, fileList: string[] = []): string[] => {
    if (!fs.existsSync(dir)) return fileList;
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

  const taxonomyFiles = getTaxonomyFiles(taxonomiesDir);
  const allTaxonomies = taxonomyFiles.map((filePath) => ({
    filePath,
    data: JSON.parse(fs.readFileSync(filePath, 'utf-8')),
  }));

  /* ------------------------------------------------------------------
   * 1. RECIPE VALIDATION TESTS
   * ------------------------------------------------------------------ */

  it('1. Recipe Validation: All recipes have all required structural fields', () => {
    expect(allRecipes.length).toBeGreaterThanOrEqual(16);

    for (const { file, data } of allRecipes) {
      expect(data, `Recipe ${file} missing id`).toHaveProperty('id');
      expect(typeof data.id, `Recipe ${file} id must be string`).toBe('string');
      expect(data, `Recipe ${file} missing slug`).toHaveProperty('slug');
      expect(data, `Recipe ${file} missing title`).toHaveProperty('title');
      expect(data, `Recipe ${file} missing description`).toHaveProperty('description');
      expect(data, `Recipe ${file} missing taxonomyIds`).toHaveProperty('taxonomyIds');
      expect(data, `Recipe ${file} missing image`).toHaveProperty('image');
      expect(data, `Recipe ${file} missing time`).toHaveProperty('time');
      expect(data, `Recipe ${file} missing prepTimeMinutes`).toHaveProperty('prepTimeMinutes');
      expect(data, `Recipe ${file} missing cookTimeMinutes`).toHaveProperty('cookTimeMinutes');
      expect(data, `Recipe ${file} missing yieldServings`).toHaveProperty('yieldServings');
      expect(data, `Recipe ${file} missing ingredients`).toHaveProperty('ingredients');
      expect(data, `Recipe ${file} missing instructions`).toHaveProperty('instructions');
    }
  });

  it('2. Recipe Validation: All ingredients have valid structure, positive amounts, and standard units', () => {
    const validUnits = ['g', 'ml', 'unit'];

    for (const { file, data } of allRecipes) {
      expect(Array.isArray(data.ingredients), `Recipe ${file} ingredients must be an array`).toBe(true);
      expect(data.ingredients.length, `Recipe ${file} must have at least 1 ingredient`).toBeGreaterThan(0);

      for (let i = 0; i < data.ingredients.length; i++) {
        const ing = data.ingredients[i];
        expect(ing.id, `Recipe ${file} ingredient[${i}] missing id`).toBeTruthy();
        expect(ing.name, `Recipe ${file} ingredient[${i}] missing name`).toBeTruthy();
        expect(typeof ing.amount, `Recipe ${file} ingredient[${i}] amount must be number`).toBe('number');
        expect(ing.amount, `Recipe ${file} ingredient[${i}] amount must be > 0`).toBeGreaterThan(0);
        expect(validUnits, `Recipe ${file} ingredient[${i}] unit '${ing.unit}' not in ${validUnits.join(', ')}`).toContain(ing.unit);
      }
    }
  });

  it('3. Recipe Validation: Cook times, prep times, and yield counts are positive integers', () => {
    for (const { file, data } of allRecipes) {
      expect(Number.isInteger(data.time), `Recipe ${file} time must be integer`).toBe(true);
      expect(data.time, `Recipe ${file} time must be > 0`).toBeGreaterThan(0);

      expect(Number.isInteger(data.prepTimeMinutes), `Recipe ${file} prepTimeMinutes must be integer`).toBe(true);
      expect(data.prepTimeMinutes, `Recipe ${file} prepTimeMinutes must be > 0`).toBeGreaterThan(0);

      expect(Number.isInteger(data.cookTimeMinutes), `Recipe ${file} cookTimeMinutes must be integer`).toBe(true);
      expect(data.cookTimeMinutes, `Recipe ${file} cookTimeMinutes must be > 0`).toBeGreaterThan(0);

      expect(Number.isInteger(data.yieldServings), `Recipe ${file} yieldServings must be integer`).toBe(true);
      expect(data.yieldServings, `Recipe ${file} yieldServings must be > 0`).toBeGreaterThan(0);
    }
  });

  it('4. Recipe Validation: All recipe images exist on disk in the public directory', () => {
    for (const { file, data } of allRecipes) {
      expect(typeof data.image, `Recipe ${file} image must be string`).toBe('string');
      expect(data.image.startsWith('/'), `Recipe ${file} image path must start with '/'`).toBe(true);

      const relativePath = data.image.replace(/^\//, '');
      const fullDiskPath = path.join(rootDir, 'public', relativePath);
      expect(
        fs.existsSync(fullDiskPath),
        `Recipe ${file} references image '${data.image}' which does not exist on disk at ${fullDiskPath}`
      ).toBe(true);
    }
  });

  /* ------------------------------------------------------------------
   * 2. MULTILINGUAL COMPLETENESS TESTS
   * ------------------------------------------------------------------ */

  it('5. Multilingual Completeness: All recipes have title, description, and instructions in ES, EN, and DE', () => {
    const requiredLanguages = ['es', 'en', 'de'] as const;

    for (const { file, data } of allRecipes) {
      for (const lang of requiredLanguages) {
        expect(data.title[lang], `Recipe ${file} missing title.${lang}`).toBeTruthy();
        expect(data.title[lang].trim().length, `Recipe ${file} title.${lang} is empty`).toBeGreaterThan(0);

        expect(data.description[lang], `Recipe ${file} missing description.${lang}`).toBeTruthy();
        expect(data.description[lang].trim().length, `Recipe ${file} description.${lang} is too short`).toBeGreaterThan(10);

        expect(data.slug[lang], `Recipe ${file} missing slug.${lang}`).toBeTruthy();
      }

      // Check instructions in all languages
      expect(Array.isArray(data.instructions), `Recipe ${file} instructions must be an array`).toBe(true);
      expect(data.instructions.length, `Recipe ${file} must have at least 1 instruction step`).toBeGreaterThan(0);

      data.instructions.forEach((inst: any, idx: number) => {
        for (const lang of requiredLanguages) {
          expect(inst.step[lang], `Recipe ${file} instruction step ${idx + 1} missing step.${lang}`).toBeTruthy();
          expect(inst.text[lang], `Recipe ${file} instruction step ${idx + 1} missing text.${lang}`).toBeTruthy();
        }
      });
    }
  });

  it('6. Multilingual Completeness: i18n dictionaries (es.json, en.json, de.json) have 100% key parity', () => {
    const esRaw = JSON.parse(fs.readFileSync(path.join(i18nDir, 'es.json'), 'utf-8'));
    const enRaw = JSON.parse(fs.readFileSync(path.join(i18nDir, 'en.json'), 'utf-8'));
    const deRaw = JSON.parse(fs.readFileSync(path.join(i18nDir, 'de.json'), 'utf-8'));

    function extractKeys(obj: any, prefix = ''): string[] {
      let keys: string[] = [];
      for (const k in obj) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          keys = keys.concat(extractKeys(obj[k], fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    }

    const esKeys = new Set(extractKeys(esRaw));
    const enKeys = new Set(extractKeys(enRaw));
    const deKeys = new Set(extractKeys(deRaw));

    expect(esKeys.size).toBeGreaterThan(20);

    const missingInEn = [...esKeys].filter((k) => !enKeys.has(k));
    const missingInDe = [...esKeys].filter((k) => !deKeys.has(k));

    expect(missingInEn, `Missing translations in en.json: ${missingInEn.join(', ')}`).toEqual([]);
    expect(missingInDe, `Missing translations in de.json: ${missingInDe.join(', ')}`).toEqual([]);
  });

  /* ------------------------------------------------------------------
   * 3. CROSS-REFERENCE & RELATIONSHIP TESTS
   * ------------------------------------------------------------------ */

  it('7. Cross-Reference: All taxonomy JSON items have valid schemas and multilingual fields', () => {
    expect(allTaxonomies.length).toBeGreaterThanOrEqual(10);

    for (const { filePath, data } of allTaxonomies) {
      const relPath = path.relative(rootDir, filePath);
      expect(data.id, `Taxonomy ${relPath} missing id`).toBeTruthy();
      expect(data.type, `Taxonomy ${relPath} missing type`).toBeTruthy();
      expect(data.slug, `Taxonomy ${relPath} missing slug`).toBeTruthy();
      expect(data.title, `Taxonomy ${relPath} missing title`).toBeTruthy();

      for (const lang of ['es', 'en', 'de']) {
        expect(data.slug[lang], `Taxonomy ${relPath} missing slug.${lang}`).toBeTruthy();
        expect(data.title[lang], `Taxonomy ${relPath} missing title.${lang}`).toBeTruthy();
      }
    }
  });

  it('8. Cross-Reference: Persona favoriteRecipe references point to existing recipes', () => {
    const personFiles: string[] = [];
    if (fs.existsSync(personsDir)) {
      fs.readdirSync(personsDir)
        .filter((f) => f.endsWith('.json'))
        .forEach((f) => personFiles.push(path.join(personsDir, f)));
    }

    const existingRecipeIds = new Set([
      ...allRecipes.map((r) => r.data.id),
      ...allRecipes.map((r) => r.file.replace('.json', '')),
    ]);

    for (const pPath of personFiles) {
      const pData = JSON.parse(fs.readFileSync(pPath, 'utf-8'));
      if (pData.favoriteRecipe) {
        expect(
          existingRecipeIds.has(pData.favoriteRecipe),
          `Persona ${path.basename(pPath)} references favoriteRecipe '${pData.favoriteRecipe}' which does not exist in recipes`
        ).toBe(true);
      }
    }
  });

  it('9. Cross-Reference: Markdown story files have valid frontmatter and existing persona references', () => {
    if (!fs.existsSync(storiesDir)) return;

    const storyFiles = fs.readdirSync(storiesDir).filter((f) => f.endsWith('.md'));
    expect(storyFiles.length).toBeGreaterThan(0);

    const existingRecipeIds = new Set([
      ...allRecipes.map((r) => r.data.id),
      ...allRecipes.map((r) => r.file.replace('.json', '')),
    ]);

    for (const sFile of storyFiles) {
      const content = fs.readFileSync(path.join(storiesDir, sFile), 'utf-8');
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      expect(frontmatterMatch, `Story ${sFile} missing frontmatter block`).toBeTruthy();

      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
      expect(frontmatter, `Story ${sFile} missing title`).toContain('title:');
      expect(frontmatter, `Story ${sFile} missing description`).toContain('description:');

      // Check if favoriteRecipe is referenced
      const favRecipeMatch = frontmatter.match(/favoriteRecipe:\s*["']?([^"'\r\n]+)["']?/);
      if (favRecipeMatch && favRecipeMatch[1]) {
        const recipeId = favRecipeMatch[1].trim();
        expect(
          existingRecipeIds.has(recipeId),
          `Story ${sFile} references non-existent favoriteRecipe '${recipeId}'`
        ).toBe(true);
      }
    }
  });

  /* ------------------------------------------------------------------
   * 4. SCHEMA COMPLIANCE & JSON-LD TESTS
   * ------------------------------------------------------------------ */

  it('10. Schema Compliance: Every recipe generates valid Schema.org/Recipe JSON-LD across ES, EN, and DE', () => {
    for (const { file, data } of allRecipes) {
      for (const lang of ['es', 'en', 'de'] as const) {
        const schema = createRecipeSchema(data, { lang });

        expect(schema['@context'], `Recipe ${file} [${lang}] invalid @context`).toBe('https://schema.org');
        expect(schema['@type'], `Recipe ${file} [${lang}] invalid @type`).toBe('Recipe');
        expect(schema.name, `Recipe ${file} [${lang}] missing name in schema`).toBeTruthy();
        expect(schema.description, `Recipe ${file} [${lang}] missing description in schema`).toBeTruthy();
        expect(schema.prepTime.startsWith('PT'), `Recipe ${file} [${lang}] invalid prepTime format`).toBe(true);
        expect(schema.cookTime.startsWith('PT'), `Recipe ${file} [${lang}] invalid cookTime format`).toBe(true);
        expect(schema.totalTime.startsWith('PT'), `Recipe ${file} [${lang}] invalid totalTime format`).toBe(true);
        expect(schema.recipeIngredient.length, `Recipe ${file} [${lang}] empty ingredients`).toBeGreaterThan(0);
        expect(schema.recipeInstructions.length, `Recipe ${file} [${lang}] empty instructions`).toBeGreaterThan(0);

        const validation = validateRecipeSchema(schema);
        expect(
          validation.valid,
          `Recipe ${file} [${lang}] failed schema validation: ${validation.errors.join(', ')}`
        ).toBe(true);
      }
    }
  });

  it('11. Page & Navigation Integrity: Header navigation JSON has complete labels across ES, EN, and DE', () => {
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
      expect(item.label.es, `Header item ${item.key} missing label.es`).toBeTruthy();
      expect(item.label.en, `Header item ${item.key} missing label.en`).toBeTruthy();
      expect(item.label.de, `Header item ${item.key} missing label.de`).toBeTruthy();
    }
  });
});
