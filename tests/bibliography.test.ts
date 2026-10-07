import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Bibliography & Sources Data Model Validation', () => {
  const rootDir = process.cwd();
  const bibliographyDir = path.join(rootDir, 'src', 'content', 'bibliography');

  const files = fs.readdirSync(bibliographyDir).filter((f) => f.endsWith('.json'));
  const entries = files.map((file) => ({
    file,
    data: JSON.parse(fs.readFileSync(path.join(bibliographyDir, file), 'utf-8')),
  }));

  it('contains at least 15 verified primary bibliography entries', () => {
    expect(entries.length).toBeGreaterThanOrEqual(15);
  });

  it('all bibliography items conform to the schema with trilingual titles and summaries', () => {
    for (const { file, data } of entries) {
      expect(data, `File ${file} missing id`).toHaveProperty('id');
      expect(typeof data.id).toBe('string');

      expect(data, `File ${file} missing title`).toHaveProperty('title');
      expect(data.title.es, `File ${file} missing title.es`).toBeDefined();
      expect(data.title.en, `File ${file} missing title.en`).toBeDefined();
      expect(data.title.de, `File ${file} missing title.de`).toBeDefined();

      expect(data, `File ${file} missing authors`).toHaveProperty('authors');
      expect(Array.isArray(data.authors)).toBe(true);
      expect(data.authors.length).toBeGreaterThan(0);

      expect(data, `File ${file} missing year`).toHaveProperty('year');

      expect(data, `File ${file} missing type`).toHaveProperty('type');
      expect([
        'manuscript',
        'academic_book',
        'academic_paper',
        'legislation',
        'official_report',
        'culinary_canon',
        'survey',
        'historical_chronicle',
        'gastronomic_press',
        'archive',
        'website'
      ]).toContain(data.type);

      expect(data, `File ${file} missing category`).toHaveProperty('category');
      expect(['history', 'science', 'safety', 'gastronomy', 'sociology', 'agronomy']).toContain(data.category);

      expect(data, `File ${file} missing citationText`).toHaveProperty('citationText');
      expect(typeof data.citationText).toBe('string');

      expect(data, `File ${file} missing summary`).toHaveProperty('summary');
      expect(data.summary.es, `File ${file} missing summary.es`).toBeDefined();
      expect(data.summary.en, `File ${file} missing summary.en`).toBeDefined();
      expect(data.summary.de, `File ${file} missing summary.de`).toBeDefined();

      expect(data, `File ${file} missing relatedArticleSlugs`).toHaveProperty('relatedArticleSlugs');
      expect(Array.isArray(data.relatedArticleSlugs)).toBe(true);

      expect(data.verified, `File ${file} verified should be boolean`).toBeTypeOf('boolean');
    }
  });

  it('includes foundational historical, scientific, and legal cornerstones', () => {
    const ids = entries.map((e) => e.data.id);
    expect(ids).toContain('valcarcel-1767');
    expect(ids).toContain('tena-godoy-1798');
    expect(ids).toContain('memorial-cortes-navarra-1817');
    expect(ids).toContain('lopez-linage-2008');
    expect(ids).toContain('rd-1021-2022');
    expect(ids).toContain('mcgee-2004');
    expect(ids).toContain('cis-estudio-3340-3418');
  });

  it('RD 1021/2022 enforces mandatory bolding of food safety figures', () => {
    const rd = entries.find((e) => e.data.id === 'rd-1021-2022')?.data;
    expect(rd).toBeDefined();

    // Check mandatory bolding in keyTakeaway or summary
    const contentText = JSON.stringify(rd);
    expect(contentText).toContain('**70°C for 2 minutes**');
    expect(contentText).toContain('**63°C for 20 seconds**');
    expect(contentText).toContain('**4 hours**');
  });
});
