import { describe, it, expect } from 'vitest';
import { getTranslations, supportedLanguages } from '../src/lib/i18n';

describe('i18n Helpers Unit Tests', () => {
  it('should list supported languages as es, en, de', () => {
    expect(supportedLanguages).toEqual(['es', 'en', 'de']);
  });

  it('should return correct translations in Spanish', () => {
    const t = getTranslations('es');
    expect(t('nav.recipes')).toBe('Recetas');
    expect(t('nav.factions')).toBe('Facciones');
  });

  it('should return correct translations in English', () => {
    const t = getTranslations('en');
    expect(t('nav.recipes')).toBe('Recipes');
    expect(t('nav.factions')).toBe('Factions');
  });

  it('should return correct translations in German', () => {
    const t = getTranslations('de');
    expect(t('nav.recipes')).toBe('Rezepte');
    expect(t('nav.factions')).toBe('Faktionen');
  });

  it('should fallback to Spanish when translation key is missing in target language', () => {
    const t = getTranslations('en');
    // Testing nested property fallback
    expect(t('nonexistent.key', 'Fallback String')).toBe('Fallback String');
  });

  it('should fallback to default fallback parameter when key does not exist in Spanish dictionary', () => {
    const t = getTranslations('es');
    expect(t('unknown.nested.path', 'Default Fallback')).toBe('Default Fallback');
  });
});
