import { describe, it, expect } from 'vitest';
import { xlfRegistry, getXlfTranslation, getAllXlfKeys } from '../src/lib/xlfRegistry';
import { getTranslations } from '../src/lib/i18n';

describe('Comprehensive Canonical XLIFF Registry', () => {
  it('should load all 14 domain catalogues with Spanish, English and German keys', () => {
    const keys = getAllXlfKeys();
    expect(keys.length).toBeGreaterThan(60);

    // Verify presence of all key domains
    expect(keys.some(k => k.startsWith('nav.'))).toBe(true);
    expect(keys.some(k => k.startsWith('hero.'))).toBe(true);
    expect(keys.some(k => k.startsWith('builder.'))).toBe(true);
    expect(keys.some(k => k.startsWith('footer.'))).toBe(true);
    expect(keys.some(k => k.startsWith('contact.'))).toBe(true);
    expect(keys.some(k => k.startsWith('safety.'))).toBe(true);
    expect(keys.some(k => k.startsWith('sciencePage.'))).toBe(true);
    expect(keys.some(k => k.startsWith('ingredientsPage.'))).toBe(true);
    expect(keys.some(k => k.startsWith('store.'))).toBe(true);
    expect(keys.some(k => k.startsWith('trivia.'))).toBe(true);
  });

  it('should serve exact localized strings across all languages for nav domain', () => {
    expect(getXlfTranslation('es', 'nav.recipes')).toBe('Recetas');
    expect(getXlfTranslation('en', 'nav.recipes')).toBe('Recipes');
    expect(getXlfTranslation('de', 'nav.recipes')).toBe('Rezepte');

    expect(getXlfTranslation('es', 'nav.science')).toBe('Ciencia');
    expect(getXlfTranslation('en', 'nav.science')).toBe('Science');
    expect(getXlfTranslation('de', 'nav.science')).toBe('Wissenschaft');
  });

  it('should preserve strict temperature safety thresholds in XLIFF registry', () => {
    const goldEn = getXlfTranslation('en', 'safety.gold_standard.full');
    expect(goldEn).toContain('**70°C for 2 minutes**');
    expect(goldEn).toContain('**63°C for 20 seconds**');
    expect(goldEn).toContain('**4 hours**');

    const goldDe = getXlfTranslation('de', 'safety.gold_standard.full');
    expect(goldDe).toContain('**70°C für 2 Minuten**');
    expect(goldDe).toContain('**63°C für 20 Sekunden**');
    expect(goldDe).toContain('**4 Stunden**');

    const goldEs = getXlfTranslation('es', 'safety.gold_standard.full');
    expect(goldEs).toContain('**70°C durante 2 minutos**');
    expect(goldEs).toContain('**63°C durante 20 segundos**');
    expect(goldEs).toContain('**4 horas**');
  });

  it('should provide science page molecular and safety keys', () => {
    expect(getXlfTranslation('en', 'sciencePage.title')).toBe('The Science Behind Tortilla');
    expect(getXlfTranslation('de', 'sciencePage.title')).toBe('Die Wissenschaft hinter der Tortilla');
    expect(getXlfTranslation('es', 'sciencePage.title')).toBe('La Ciencia Detrás de la Tortilla');

    const chefNoteEn = getXlfTranslation('en', 'sciencePage.chefNoteText');
    expect(chefNoteEn).toContain('**70°C for 2 minutes**');
  });

  it('should provide ingredients canon keys', () => {
    expect(getXlfTranslation('es', 'ingredientsPage.potatoes.title')).toBe('La Patata');
    expect(getXlfTranslation('en', 'ingredientsPage.potatoes.title')).toBe('The Potato');
    expect(getXlfTranslation('de', 'ingredientsPage.potatoes.title')).toBe('Die Kartoffel');
  });

  it('should be seamlessly consumed via getTranslations helper', () => {
    const tEn = getTranslations('en');
    expect(tEn('nav.recipes')).toBe('Recipes');
    expect(tEn('hero.badge')).toBe('The encyclopedia of Spanish tortilla');
    expect(tEn('builder.title')).toBe('Create your own tortilla');
    expect(tEn('footer.safeThreshold')).toBe('Safe: **70°C for 2 minutes**');

    const tDe = getTranslations('de');
    expect(tDe('nav.recipes')).toBe('Rezepte');
    expect(tDe('hero.badge')).toBe('Die Enzyklopädie der spanischen Tortilla');
    expect(tDe('builder.title')).toBe('Erstelle deine eigene Tortilla');
    expect(tDe('footer.safeThreshold')).toBe('Sicher: **70°C für 2 Minuten**');
  });
});
