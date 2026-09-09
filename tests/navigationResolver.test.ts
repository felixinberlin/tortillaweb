import { describe, it, expect } from 'vitest';
import { 
  getLocalizedRoute, 
  getEntityRoute, 
  resolveNavigationTarget, 
  resolveLegacyPath,
  switchLanguage, 
  getCanonicalUrl
} from '../src/lib/routes/resolver';
import { getNavMenu, getFooterNavMenu } from '../src/lib/navigation/menus';
import type { ContentEntity, CanonicalType } from '../src/lib/routes/types';

describe('Navigation Layer & Route Resolver Integration Tests', () => {
  describe('Route Resolver API Extensions & Link Hardening', () => {
    it('getLocalizedRoute should resolve static routes across locales', () => {
      expect(getLocalizedRoute('ingredients', 'es')).toBe('/es/ingredientes');
      expect(getLocalizedRoute('ingredients', 'en')).toBe('/en/ingredients');
      expect(getLocalizedRoute('ingredients', 'de')).toBe('/de/zutaten');

      expect(getLocalizedRoute('factions', 'es')).toBe('/es/facciones');
      expect(getLocalizedRoute('factions', 'en')).toBe('/en/factions');
      expect(getLocalizedRoute('factions', 'de')).toBe('/de/faktionen');
    });

    it('getEntityRoute should generate valid localized entity URLs for all canonical types', () => {
      const canonicalTypes: CanonicalType[] = [
        'recipe', 'faction', 'ingredient', 'technique', 
        'person', 'region', 'style'
      ];

      canonicalTypes.forEach((cType) => {
        const entity: ContentEntity = {
          id: `sample-${cType}`,
          canonicalType: cType,
          slug: { es: `ejemplo-${cType}`, en: `example-${cType}`, de: `beispiel-${cType}` }
        };

        const esUrl = getEntityRoute(entity, 'es');
        const enUrl = getEntityRoute(entity, 'en');
        const deUrl = getEntityRoute(entity, 'de');

        expect(esUrl).toMatch(new RegExp(`^/es/.*ejemplo-${cType}$`));
        expect(enUrl).toMatch(new RegExp(`^/en/.*example-${cType}$`));
        expect(deUrl).toMatch(new RegExp(`^/de/.*beispiel-${cType}$`));
      });
    });

    it('resolveNavigationTarget should handle typed targets (routeId, entity, to, href, key, or string)', () => {
      // Direct routeId
      expect(resolveNavigationTarget({ routeId: 'builder' }, 'en')).toBe('/en/builder');
      
      // Entity object
      const recipeEntity: ContentEntity = {
        id: 'clasica',
        canonicalType: 'recipe',
        slug: { es: 'receta-tradicional', en: 'traditional-recipe', de: 'klassisches-rezept' }
      };
      expect(resolveNavigationTarget({ entity: recipeEntity }, 'de')).toBe('/de/recipes/klassisches-rezept');

      // Legacy path targets ({ to: ... }, { href: ... }, { key: ... })
      expect(resolveNavigationTarget({ to: '/recipes' }, 'es')).toBe('/es/recipes');
      expect(resolveNavigationTarget({ to: '/ingredients' }, 'de')).toBe('/de/zutaten');
      expect(resolveNavigationTarget({ href: '/facciones' }, 'en')).toBe('/en/factions');
      expect(resolveNavigationTarget({ key: 'history' }, 'es')).toBe('/es/history');
      expect(resolveNavigationTarget('/contacto', 'es')).toBe('/es/contacto');
      expect(resolveNavigationTarget('/', 'es')).toBe('/es');
    });

    it('resolveLegacyPath should support legacy path migration safely', () => {
      expect(resolveLegacyPath('/ingredients', 'de')).toBe('/de/zutaten');
      expect(resolveLegacyPath('/facciones', 'en')).toBe('/en/factions');
      expect(resolveLegacyPath('/custom-page', 'es')).toBe('/es/custom-page');
      expect(resolveLegacyPath('https://external.com/page')).toBe('https://external.com/page');
    });

    it('switchLanguage should translate paths accurately between locales', () => {
      expect(switchLanguage('/es/ingredientes', 'de')).toBe('/de/zutaten');
      expect(switchLanguage('/de/faktionen', 'en')).toBe('/en/factions');
      expect(switchLanguage('/en/ingredients/potato', 'es')).toBe('/es/ingredientes/potato');
    });

    it('getCanonicalUrl should produce valid absolute URLs for canonical indexing', () => {
      expect(getCanonicalUrl('/es/ingredientes/patata', 'es')).toBe('https://tortilladepatatas.org/es/ingredientes/patata');
      expect(getCanonicalUrl('/de/zutaten', 'de')).toBe('https://tortilladepatatas.org/de/zutaten');
    });
  });

  describe('Centralized Navigation Menus', () => {
    it('getNavMenu should return localized menu structure for header', () => {
      const navEs = getNavMenu('es');
      expect(navEs.universo.items.length).toBeGreaterThan(0);
      expect(navEs.universo.items.map(i => i.href)).toContain('/es/recipes');
      expect(navEs.fundamentos.items.map(i => i.href)).toContain('/es/ingredientes');

      const navDe = getNavMenu('de');
      expect(navDe.fundamentos.items.map(i => i.href)).toContain('/de/zutaten');
      expect(navDe.fundamentos.items.map(i => i.href)).toContain('/de/faktionen');
    });

    it('getFooterNavMenu should return localized menu links for footer', () => {
      const footerEn = getFooterNavMenu('en');
      expect(footerEn.map(i => i.href)).toContain('/en/ingredients');
      expect(footerEn.map(i => i.href)).toContain('/en/contact');

      const footerDe = getFooterNavMenu('de');
      expect(footerDe.map(i => i.href)).toContain('/de/zutaten');
      expect(footerDe.map(i => i.href)).toContain('/de/kontakt');
    });
  });
});
