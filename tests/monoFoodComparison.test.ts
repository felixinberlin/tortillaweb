import { describe, it, expect } from 'vitest';
import {
  MONO_FOOD_PROJECTS,
  SEVEN_DEADLY_SINS,
  MARKETING_PILLARS,
} from '../src/data/monoFoodProjects';
import { getRouteUrl, ROUTES } from '../src/lib/routes';

describe('Mono-Food Comparative Benchmark & Authority Tests', () => {
  it('should register monoFood route with correct localized slugs and labels', () => {
    expect(ROUTES.monoFood).toBeDefined();
    expect(ROUTES.monoFood.slug.es).toBe('mono-food');
    expect(ROUTES.monoFood.slug.en).toBe('mono-food');
    expect(ROUTES.monoFood.slug.de).toBe('mono-food');

    expect(getRouteUrl('monoFood', 'es')).toBe('/es/mono-food');
    expect(getRouteUrl('monoFood', 'en')).toBe('/en/mono-food');
    expect(getRouteUrl('monoFood', 'de')).toBe('/de/mono-food');
  });

  it('should include 11 comparative institutions with tortilladepatatas.org as #1', () => {
    expect(MONO_FOOD_PROJECTS.length).toBe(11);

    const winner = MONO_FOOD_PROJECTS[0];
    expect(winner.id).toBe('tortilladepatatas-org');
    expect(winner.authorityScore).toBeGreaterThanOrEqual(95);

    // Verify all others have authorityScore <= winner.authorityScore
    for (let i = 1; i < MONO_FOOD_PROJECTS.length; i++) {
      expect(MONO_FOOD_PROJECTS[i].authorityScore).toBeLessThan(winner.authorityScore);
    }
  });

  it('should contain complete multilingual metadata for all 10 single-dish projects', () => {
    MONO_FOOD_PROJECTS.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.originLocation).toBeTruthy();
      expect(project.foundedYear).toBeTruthy();

      // Check dish translations
      expect(project.dish.es).toBeTruthy();
      expect(project.dish.en).toBeTruthy();
      expect(project.dish.de).toBeTruthy();

      // Check spicy verdicts
      expect(project.spicyVerdict.es).toBeTruthy();
      expect(project.spicyVerdict.en).toBeTruthy();
      expect(project.spicyVerdict.de).toBeTruthy();

      // Check what we learned
      expect(project.whatWeLearned.es).toBeTruthy();
      expect(project.whatWeLearned.en).toBeTruthy();
      expect(project.whatWeLearned.de).toBeTruthy();

      // Check metrics are in 0-100 range
      expect(project.metrics.scientificRigor).toBeGreaterThanOrEqual(0);
      expect(project.metrics.scientificRigor).toBeLessThanOrEqual(100);
      expect(project.metrics.digitalEngineering).toBeGreaterThanOrEqual(0);
      expect(project.metrics.digitalEngineering).toBeLessThanOrEqual(100);
      expect(project.metrics.archivalFactChecking).toBeGreaterThanOrEqual(0);
      expect(project.metrics.archivalFactChecking).toBeLessThanOrEqual(100);
      expect(project.metrics.kitschLevel).toBeGreaterThanOrEqual(0);
      expect(project.metrics.kitschLevel).toBeLessThanOrEqual(100);
      expect(project.metrics.survivabilityIndex).toBeGreaterThanOrEqual(0);
      expect(project.metrics.survivabilityIndex).toBeLessThanOrEqual(100);
    });
  });

  it('should include the 7 deadly sins with witty roasts and concrete countermeasures', () => {
    expect(SEVEN_DEADLY_SINS.length).toBe(7);

    SEVEN_DEADLY_SINS.forEach((sin, index) => {
      expect(sin.number).toBe(index + 1);
      expect(sin.title.es).toBeTruthy();
      expect(sin.title.en).toBeTruthy();
      expect(sin.title.de).toBeTruthy();

      expect(sin.crime.es).toBeTruthy();
      expect(sin.crime.en).toBeTruthy();
      expect(sin.crime.de).toBeTruthy();

      expect(sin.spicyRoast.es).toBeTruthy();
      expect(sin.spicyRoast.en).toBeTruthy();
      expect(sin.spicyRoast.de).toBeTruthy();

      expect(sin.ourCountermeasure.es).toBeTruthy();
      expect(sin.ourCountermeasure.en).toBeTruthy();
      expect(sin.ourCountermeasure.de).toBeTruthy();
    });
  });

  it('should include future marketing pillars with actionable links', () => {
    expect(MARKETING_PILLARS.length).toBeGreaterThanOrEqual(3);

    const protocol = MARKETING_PILLARS.find((p) => p.id === 'open-tortilla-protocol');
    expect(protocol).toBeDefined();
    expect(protocol?.href).toBe('/builder');

    const unesco = MARKETING_PILLARS.find((p) => p.id === 'unesco-cultural-heritage-dossier');
    expect(unesco).toBeDefined();
    expect(unesco?.href).toBe('/autenticidad');

    const antiSlop = MARKETING_PILLARS.find((p) => p.id === 'anti-slop-manifesto');
    expect(antiSlop).toBeDefined();
    expect(antiSlop?.href).toBe('/science');
  });

  it('should include reference to the 1798 archival discovery in Villanueva de la Serena', () => {
    const winner = MONO_FOOD_PROJECTS.find((p) => p.id === 'tortilladepatatas-org');
    expect(winner?.keyStrengths.es.some((s) => s.includes('1798 Villanueva de la Serena'))).toBe(true);
    expect(winner?.keyStrengths.en.some((s) => s.includes('1798 Villanueva'))).toBe(true);
  });
});
