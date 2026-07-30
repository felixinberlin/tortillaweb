import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Factions Data Tests', () => {
  const rootDir = process.cwd();

  it('should validate src/data/factions.json schema and localized content', () => {
    const factionsPath = path.join(rootDir, 'src', 'data', 'factions.json');
    expect(fs.existsSync(factionsPath)).toBe(true);

    const raw = fs.readFileSync(factionsPath, 'utf-8');
    const factionsData = JSON.parse(raw);

    expect(factionsData).toHaveProperty('content');
    expect(factionsData.content).toHaveProperty('es');
    expect(factionsData.content).toHaveProperty('en');
    expect(factionsData.content).toHaveProperty('de');

    for (const lang of ['es', 'en', 'de']) {
      const langContent = factionsData.content[lang];
      expect(Array.isArray(langContent.factions)).toBe(true);
      expect(langContent.factions.length).toBe(5);

      for (const faction of langContent.factions) {
        expect(faction).toHaveProperty('id');
        expect(faction).toHaveProperty('name');
        expect(faction).toHaveProperty('dogma');
        expect(faction).toHaveProperty('keyIngredient');
        expect(faction).toHaveProperty('description');
      }
    }
  });
});
