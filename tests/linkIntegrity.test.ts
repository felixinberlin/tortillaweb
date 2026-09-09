import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { resolveLegacyPath, resolveReverseRoute } from '../src/lib/routes/resolver';

describe('Link Integrity Automated Test Suite (No 404 Links)', () => {
  const rootDir = process.cwd();

  // 1. Gather all valid recipes
  const recipesDir = path.join(rootDir, 'src', 'content', 'recipes');
  const recipeFiles = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.json'));
  const recipeSlugsByLang: Record<string, Set<string>> = { es: new Set(), en: new Set(), de: new Set() };
  
  for (const file of recipeFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(recipesDir, file), 'utf-8'));
    for (const lang of ['es', 'en', 'de']) {
      if (data.slug?.[lang]) {
        recipeSlugsByLang[lang].add(data.slug[lang]);
      }
    }
  }

  // 2. Gather all valid taxonomies
  const taxonomiesDir = path.join(rootDir, 'src', 'content', 'taxonomies');
  const taxonomySlugsByLangAndType: Record<string, Record<string, Set<string>>> = {
    es: {},
    en: {},
    de: {},
  };

  const walkDir = (dir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walkDir(fullPath));
      } else if (file.endsWith('.json')) {
        results.push(fullPath);
      }
    });
    return results;
  };

  const taxonomyFiles = walkDir(taxonomiesDir);
  for (const file of taxonomyFiles) {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const type = data.type;
    for (const lang of ['es', 'en', 'de']) {
      if (!taxonomySlugsByLangAndType[lang][type]) {
        taxonomySlugsByLangAndType[lang][type] = new Set();
      }
      if (data.slug?.[lang]) {
        taxonomySlugsByLangAndType[lang][type].add(data.slug[lang]);
      }
    }
  }

  // 3. Gather all valid guides
  const guidesDir = path.join(rootDir, 'src', 'content', 'guides');
  const guideSlugsByLang: Record<string, Set<string>> = { es: new Set(), en: new Set(), de: new Set() };
  if (fs.existsSync(guidesDir)) {
    const guideFiles = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.md'));
    for (const file of guideFiles) {
      const match = file.match(/^(.+)\.(es|en|de)\.md$/);
      if (match) {
        const lang = match[2];
        guideSlugsByLang[lang].add(match[1]);
        const fileContent = fs.readFileSync(path.join(guidesDir, file), 'utf-8');
        const slugMatch = fileContent.match(/slug:\s*["']?([^"'\n\r]+)["']?/);
        if (slugMatch) {
          guideSlugsByLang[lang].add(slugMatch[1].trim());
        }
      }
    }
  }

  // Helper function to validate any internal URL string
  const validateInternalUrl = (url: string, sourceFile: string) => {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
      return; // External or hash link
    }

    const parts = url.replace(/^\//, '').split('/');
    let lang = ['es', 'en', 'de'].includes(parts[0]) ? parts[0] : '';
    
    if (!lang) {
      if (sourceFile.endsWith('.de.md') || sourceFile.includes('.de')) lang = 'de';
      else if (sourceFile.endsWith('.en.md') || sourceFile.includes('.en')) lang = 'en';
      else lang = 'es';
    }

    const resolvedUrl = resolveLegacyPath(url, lang as 'es' | 'en' | 'de');
    const resolution = resolveReverseRoute(resolvedUrl);

    expect(
      resolution.routeId,
      `Unresolvable route in link "${url}" found in ${sourceFile}`
    ).toBeDefined();

    if (resolution.slug) {
      const canonicalType = resolution.canonicalType;
      // Handle subtabs like "patata/variedades" or "kartoffel/sorten"
      const baseSlug = resolution.slug.split('/')[0];

      if (canonicalType === 'recipe') {
        const isValidRecipe = recipeSlugsByLang[lang].has(baseSlug);
        expect(
          isValidRecipe,
          `Broken recipe link "${url}" (resolved slug: "${baseSlug}") in ${sourceFile}`
        ).toBe(true);
      } else if (canonicalType === 'guide') {
        const isValidGuide = guideSlugsByLang[lang].has(baseSlug);
        expect(
          isValidGuide,
          `Broken guide link "${url}" (resolved slug: "${baseSlug}") in ${sourceFile}`
        ).toBe(true);
      } else if (canonicalType) {
        const validTaxonomySlugs = taxonomySlugsByLangAndType[lang][canonicalType];
        const isValidTaxonomy = validTaxonomySlugs && validTaxonomySlugs.has(baseSlug);
        expect(
          isValidTaxonomy,
          `Broken taxonomy (${canonicalType}) link "${url}" (resolved slug: "${baseSlug}") in ${sourceFile}`
        ).toBe(true);
      }
    }
  };

  it('should validate all markdown links across src/content without 404s', () => {
    const contentDir = path.join(rootDir, 'src', 'content');
    const getMarkdownFiles = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          results = results.concat(getMarkdownFiles(fullPath));
        } else if (file.endsWith('.md')) {
          results.push(fullPath);
        }
      });
      return results;
    };

    const mdFiles = getMarkdownFiles(contentDir);
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    for (const file of mdFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      let match;
      while ((match = markdownLinkRegex.exec(content)) !== null) {
        const linkTarget = match[2].trim();
        validateInternalUrl(linkTarget, path.relative(rootDir, file));
      }
    }
  });

  it('should validate all linked entities in TechniquesPage.tsx without 404s', () => {
    const techniquesFile = path.join(rootDir, 'src', 'components', 'techniques', 'TechniquesPage.tsx');
    const content = fs.readFileSync(techniquesFile, 'utf-8');
    
    // Extract recipe slugs and ingredient slugs referenced in TECHNIQUES array
    const recipeSlugMatches = [...content.matchAll(/relatedRecipe:\s*\{[\s\S]*?slug:\s*\{([^}]+)\}/g)];
    for (const match of recipeSlugMatches) {
      const slugBlock = match[1];
      const esMatch = slugBlock.match(/es:\s*['"]([^'"]+)['"]/);
      const enMatch = slugBlock.match(/en:\s*['"]([^'"]+)['"]/);
      const deMatch = slugBlock.match(/de:\s*['"]([^'"]+)['"]/);

      if (esMatch) validateInternalUrl(`/es/recipes/${esMatch[1]}`, 'TechniquesPage.tsx');
      if (enMatch) validateInternalUrl(`/en/recipes/${enMatch[1]}`, 'TechniquesPage.tsx');
      if (deMatch) validateInternalUrl(`/de/recipes/${deMatch[1]}`, 'TechniquesPage.tsx');
    }

    const ingredientSlugMatches = [...content.matchAll(/relatedIngredient:\s*\{[\s\S]*?slug:\s*\{([^}]+)\}/g)];
    for (const match of ingredientSlugMatches) {
      const slugBlock = match[1];
      const esMatch = slugBlock.match(/es:\s*['"]([^'"]+)['"]/);
      const enMatch = slugBlock.match(/en:\s*['"]([^'"]+)['"]/);
      const deMatch = slugBlock.match(/de:\s*['"]([^'"]+)['"]/);

      if (esMatch) validateInternalUrl(`/es/ingredientes/${esMatch[1]}`, 'TechniquesPage.tsx');
      if (enMatch) validateInternalUrl(`/en/ingredients/${enMatch[1]}`, 'TechniquesPage.tsx');
      if (deMatch) validateInternalUrl(`/de/zutaten/${deMatch[1]}`, 'TechniquesPage.tsx');
    }
  });
});
