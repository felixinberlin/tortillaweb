export type SupportedLocale = 'es' | 'en' | 'de';

export type RouteId =
  | 'home'
  | 'recipes'
  | 'factions'
  | 'ingredients'
  | 'techniques'
  | 'science'
  | 'history'
  | 'personas'
  | 'restaurantes'
  | 'regiones'
  | 'records'
  | 'estilos'
  | 'enciclopedia'
  | 'laboratorio'
  | 'comparador'
  | 'builder'
  | 'contact'
  | 'about'
  | 'encuestas'
  | 'tests';

export type CanonicalType =
  | 'recipe'
  | 'faction'
  | 'ingredient'
  | 'technique'
  | 'person'
  | 'restaurant'
  | 'region'
  | 'style';

export type NavigationTarget =
  | { routeId: RouteId; entity?: never; to?: never; href?: never; key?: never }
  | { entity: ContentEntity; routeId?: never; to?: never; href?: never; key?: never }
  | { to: string; routeId?: never; entity?: never; href?: never; key?: never }
  | { href: string; routeId?: never; entity?: never; to?: never; key?: never }
  | { key: string; routeId?: never; entity?: never; to?: never; href?: never }
  | string;

export interface RouteDefinition {
  id: RouteId;
  slug: Record<SupportedLocale, string>;
  label: Record<SupportedLocale, string>;
  canonicalType?: CanonicalType;
}

export interface ContentEntity {
  id: string;
  type?: CanonicalType;
  canonicalType?: CanonicalType;
  slug: Record<SupportedLocale, string> | string;
  title?: Record<SupportedLocale, string> | string;
  name?: Record<SupportedLocale, string> | string;
}

export interface RouteResolution {
  locale: SupportedLocale;
  routeId?: RouteId;
  canonicalType?: CanonicalType;
  slug?: string;
  entityId?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
