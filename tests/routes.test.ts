import { describe, it, expect } from 'vitest';
import { 
  ROUTES, 
  getRouteUrl, 
  getRouteIdFromSlug, 
  getRouteIdFromCanonicalType,
  getContentUrl, 
  resolveReverseRoute, 
  switchLanguage,
  getCanonicalUrl,
  resolveBreadcrumbs,
  resolveLegacyPath
} from '../src/lib/routes';
import { getRouteIdFromCanonicalType as getRouteIdFromCanonicalTypeDirect } from '../src/lib/routes/resolver';
import type { CanonicalType, ContentEntity } from '../src/lib/routes/types';

describe('Typed Route Registry & Dynamic i18n Routing Tests', () => {
  it('should have a central ROUTES registry with valid localized slugs and labels for all locales', () => {
    expect(ROUTES.recipes).toBeDefined();
    expect(ROUTES.ingredients).toBeDefined();
    expect(ROUTES.factions).toBeDefined();

    expect(ROUTES.ingredients.slug.es).toBe('ingredientes');
    expect(ROUTES.ingredients.slug.en).toBe('ingredients');
    expect(ROUTES.ingredients.slug.de).toBe('zutaten');

    expect(ROUTES.ingredients.label.es).toBe('Ingredientes');
    expect(ROUTES.ingredients.label.en).toBe('Ingredients');
    expect(ROUTES.ingredients.label.de).toBe('Zutaten');
  });

  it('should resolve route ID from canonicalType using getRouteIdFromCanonicalType without typeToRouteMap', () => {
    expect(getRouteIdFromCanonicalType('ingredient')).toBe('ingredients');
    expect(getRouteIdFromCanonicalType('faction')).toBe('factions');
    expect(getRouteIdFromCanonicalType('recipe')).toBe('recipes');
    expect(getRouteIdFromCanonicalType('person')).toBe('personas');
    expect(getRouteIdFromCanonicalType('region')).toBe('regiones');
    expect(getRouteIdFromCanonicalType('style')).toBe('estilos');
    expect(getRouteIdFromCanonicalType('technique')).toBe('techniques');

    // Direct module import test
    expect(getRouteIdFromCanonicalTypeDirect('ingredient')).toBe('ingredients');
  });

  it('should correctly format static route URLs with getRouteUrl', () => {
    expect(getRouteUrl('ingredients', 'es')).toBe('/es/ingredientes');
    expect(getRouteUrl('ingredients', 'en')).toBe('/en/ingredients');
    expect(getRouteUrl('ingredients', 'de')).toBe('/de/zutaten');

    expect(getRouteUrl('factions', 'es')).toBe('/es/facciones');
    expect(getRouteUrl('factions', 'en')).toBe('/en/factions');
    expect(getRouteUrl('factions', 'de')).toBe('/de/faktionen');

    expect(getRouteUrl('home', 'es')).toBe('/es');
  });

  it('should resolve route ID from any localized slug segment using getRouteIdFromSlug', () => {
    expect(getRouteIdFromSlug('ingredientes')).toBe('ingredients');
    expect(getRouteIdFromSlug('ingredients')).toBe('ingredients');
    expect(getRouteIdFromSlug('zutaten')).toBe('ingredients');

    expect(getRouteIdFromSlug('facciones')).toBe('factions');
    expect(getRouteIdFromSlug('factions')).toBe('factions');
    expect(getRouteIdFromSlug('faktionen')).toBe('factions');
  });

  it('should format content URLs with getContentUrl using CanonicalType', () => {
    const potato: ContentEntity = {
      id: 'potato',
      type: 'ingredient' as CanonicalType,
      slug: { es: 'patata', en: 'potato', de: 'kartoffel' },
    };

    expect(getContentUrl(potato, 'es')).toBe('/es/ingredientes/patata');
    expect(getContentUrl(potato, 'en')).toBe('/en/ingredients/potato');
    expect(getContentUrl(potato, 'de')).toBe('/de/zutaten/kartoffel');
  });

  it('should reverse-resolve URLs using resolveReverseRoute', () => {
    const resEs = resolveReverseRoute('/es/ingredientes/potato');
    expect(resEs.locale).toBe('es');
    expect(resEs.routeId).toBe('ingredients');
    expect(resEs.canonicalType).toBe('ingredient');
    expect(resEs.slug).toBe('potato');

    const resDe = resolveReverseRoute('/de/zutaten/kartoffel');
    expect(resDe.locale).toBe('de');
    expect(resDe.routeId).toBe('ingredients');
    expect(resDe.canonicalType).toBe('ingredient');
    expect(resDe.slug).toBe('kartoffel');
  });

  it('should switch languages accurately using switchLanguage', () => {
    expect(switchLanguage('/es/ingredientes/patata', 'en')).toBe('/en/ingredients/patata');
    expect(switchLanguage('/es/facciones/puristas', 'de')).toBe('/de/faktionen/puristas');
    expect(switchLanguage('/es/contacto', 'en')).toBe('/en/contact');
  });

  it('should generate canonical URLs using getCanonicalUrl', () => {
    expect(getCanonicalUrl('/es/ingredientes/patata', 'es')).toBe('https://tortilladepatatas.org/es/ingredientes/patata');
    expect(getCanonicalUrl('/de/zutaten/kartoffel', 'de')).toBe('https://tortilladepatatas.org/de/zutaten/kartoffel');
  });

  it('should resolve breadcrumbs dynamically and prevent 404s when navigating to section roots', () => {
    const breadcrumbs = resolveBreadcrumbs('/es/ingredientes/patata', 'es', (type, slug) => {
      if (type === 'ingredient' && slug === 'patata') {
        return { title: 'La Patata' };
      }
      return undefined;
    });

    expect(breadcrumbs).toHaveLength(3);
    expect(breadcrumbs[0]).toEqual({ name: 'Inicio', url: '/es' });
    expect(breadcrumbs[1]).toEqual({ name: 'Ingredientes', url: '/es/ingredientes' });
    expect(breadcrumbs[2]).toEqual({ name: 'La Patata', url: '/es/ingredientes/patata' });
  });

  it('should resolve breadcrumbs correctly for German route /de/zutaten/kartoffel', () => {
    const breadcrumbs = resolveBreadcrumbs('/de/zutaten/kartoffel', 'de');

    expect(breadcrumbs).toHaveLength(3);
    expect(breadcrumbs[0]).toEqual({ name: 'Startseite', url: '/de' });
    expect(breadcrumbs[1]).toEqual({ name: 'Zutaten', url: '/de/zutaten' });
    expect(breadcrumbs[2]).toEqual({ name: 'Kartoffel', url: '/de/zutaten/kartoffel' });
  });

  it('should resolve legacy or cross-locale recipe paths like /es/recipes/betanzos-style-spanish-omelette correctly', () => {
    const resEs = resolveLegacyPath('/es/recipes/betanzos-style-spanish-omelette', 'es');
    expect(resEs).toBe('/es/recipes/tortilla-betanzos');

    const resEn = resolveLegacyPath('/en/recipes/betanzos-style-spanish-omelette', 'en');
    expect(resEn).toBe('/en/recipes/betanzos-style-spanish-omelette');

    const resDe = resolveLegacyPath('/de/recipes/betanzos-style-spanish-omelette', 'de');
    expect(resDe).toBe('/de/recipes/betanzos-tortilla');
  });
});
