import { getRouteUrl, getRouteLabel } from '../routes/resolver';
import type { RouteId, SupportedLocale } from '../routes/types';

export interface MenuItem {
  routeId: RouteId;
  href: string;
  label: string;
  description?: string;
}

export interface MenuSection {
  id: string;
  title: Record<SupportedLocale, string>;
  items: MenuItem[];
}

export const NAV_STRUCTURE = {
  universo: {
    title: { es: 'El Universo Tortillero', en: 'The Omelette Universe', de: 'Das Tortilla-Universum' },
    routeIds: ['recipes', 'builder', 'comparador', 'laboratorio', 'enciclopedia', 'encuestas', 'tests'] as RouteId[],
  },
  fundamentos: {
    title: { es: 'Fundamentos Culinarios', en: 'Culinary Fundamentals', de: 'Kulinarische Grundlagen' },
    routeIds: ['ingredients', 'techniques', 'science', 'history', 'estilos', 'factions'] as RouteId[],
  },
};

export const FOOTER_ROUTE_IDS: RouteId[] = [
  'recipes',
  'builder',
  'ingredients',
  'techniques',
  'science',
  'history',
  'about',
  'contact',
];

export function getNavMenu(lang: SupportedLocale = 'es') {
  return {
    universo: {
      title: NAV_STRUCTURE.universo.title[lang] || NAV_STRUCTURE.universo.title.es,
      items: NAV_STRUCTURE.universo.routeIds.map((routeId) => ({
        routeId,
        href: getRouteUrl(routeId, lang),
        label: getRouteLabel(routeId, lang),
      })),
    },
    fundamentos: {
      title: NAV_STRUCTURE.fundamentos.title[lang] || NAV_STRUCTURE.fundamentos.title.es,
      items: NAV_STRUCTURE.fundamentos.routeIds.map((routeId) => ({
        routeId,
        href: getRouteUrl(routeId, lang),
        label: getRouteLabel(routeId, lang),
      })),
    },
  };
}

export function getFooterNavMenu(lang: SupportedLocale = 'es'): MenuItem[] {
  return FOOTER_ROUTE_IDS.map((routeId) => ({
    routeId,
    href: getRouteUrl(routeId, lang),
    label: getRouteLabel(routeId, lang),
  }));
}
