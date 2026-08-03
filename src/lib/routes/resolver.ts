import { ROUTES } from './registry';
import type { 
  SupportedLocale, 
  RouteId, 
  CanonicalType, 
  ContentEntity,
  RouteResolution 
} from './types';

/**
 * Resolves RouteId given a canonical type string (e.g., 'ingredient' -> 'ingredients').
 * Derived dynamically from ROUTES without any duplicated type-to-route maps.
 */
export function getRouteIdFromCanonicalType(type?: CanonicalType | string): RouteId | undefined {
  if (!type) return undefined;

  for (const route of Object.values(ROUTES)) {
    if (route.canonicalType === type) {
      return route.id;
    }
  }

  if (type in ROUTES) {
    return type as RouteId;
  }

  return undefined;
}

/**
 * Returns canonicalType associated with a RouteId, if defined.
 */
export function getCanonicalTypeFromRouteId(routeId: RouteId): CanonicalType | undefined {
  return ROUTES[routeId]?.canonicalType;
}

/**
 * Returns localized URL for a given static route ID.
 */
export function getRouteUrl(routeId: RouteId, lang: SupportedLocale = 'es'): string {
  const route = ROUTES[routeId];
  if (!route) return `/${lang}`;
  const slug = route.slug[lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

/**
 * Helper alias for getRouteUrl
 */
export function getLocalizedRoute(routeId: RouteId, lang: SupportedLocale = 'es'): string {
  return getRouteUrl(routeId, lang);
}

/**
 * Returns localized label for a given static route ID.
 */
export function getRouteLabel(routeId: RouteId, lang: SupportedLocale = 'es'): string {
  const route = ROUTES[routeId];
  return route ? route.label[lang] || route.label.es : routeId;
}

/**
 * Resolves route ID from any localized segment.
 */
export function getRouteIdFromSlug(slugSegment: string, lang?: SupportedLocale): RouteId | undefined {
  if (!slugSegment) return 'home';

  for (const route of Object.values(ROUTES)) {
    if (lang) {
      if (route.slug[lang] === slugSegment) return route.id;
    } else {
      if (Object.values(route.slug).includes(slugSegment)) return route.id;
    }
  }

  return undefined;
}

/**
 * Generates localized URL for a content entity (recipe, ingredient, faction, etc.)
 */
export function getContentUrl(
  entity: { type?: CanonicalType; canonicalType?: CanonicalType; slug: Record<string, string> | string },
  lang: SupportedLocale = 'es'
): string {
  const cType = entity.type || entity.canonicalType;
  const routeId = getRouteIdFromCanonicalType(cType) || (cType as RouteId) || 'recipes';
  const baseRouteUrl = getRouteUrl(routeId, lang);

  let slugStr = '';
  if (typeof entity.slug === 'string') {
    slugStr = entity.slug;
  } else if (entity.slug && typeof entity.slug === 'object') {
    slugStr = entity.slug[lang] || entity.slug.es || Object.values(entity.slug)[0] || '';
  }

  return slugStr ? `${baseRouteUrl}/${slugStr}`.replace(/\/+/g, '/') : baseRouteUrl;
}

/**
 * Helper alias for getContentUrl
 */
export function getEntityRoute(
  entity: ContentEntity | { type?: CanonicalType; canonicalType?: CanonicalType; slug: Record<string, string> | string },
  lang: SupportedLocale = 'es'
): string {
  return getContentUrl(entity, lang);
}

/**
 * Resolves typed internal navigation target (routeId OR entity).
 */
export function resolveNavigationTarget(
  target: NavigationTarget | { routeId?: RouteId; entity?: ContentEntity; to?: string; href?: string; key?: string } | string,
  lang: SupportedLocale = 'es'
): string {
  if (typeof target === 'string') {
    return resolveLegacyPath(target, lang);
  }
  if (!target) {
    return `/${lang}`;
  }
  if ('routeId' in target && target.routeId) {
    return getRouteUrl(target.routeId, lang);
  }
  if ('entity' in target && target.entity) {
    return getContentUrl(target.entity, lang);
  }
  if ('to' in target && target.to) {
    return resolveLegacyPath(target.to, lang);
  }
  if ('href' in target && target.href) {
    return resolveLegacyPath(target.href, lang);
  }
  if ('key' in target && target.key) {
    return resolveLegacyPath(target.key, lang);
  }
  return `/${lang}`;
}

/**
 * Migration helper for converting legacy path strings (e.g., "/ingredients") into resolved URLs.
 */
export function resolveLegacyPath(rawPath: string, lang: SupportedLocale = 'es'): string {
  if (!rawPath || rawPath === '/' || rawPath === '') {
    return `/${lang}`;
  }

  // External URLs pass through directly
  if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('mailto:') || rawPath.startsWith('tel:')) {
    return rawPath;
  }

  const cleanKey = rawPath.replace(/^\//, '') as RouteId;
  if (cleanKey in ROUTES) {
    return getRouteUrl(cleanKey, lang);
  }

  const resolution = resolveReverseRoute(rawPath);
  if (resolution.routeId) {
    const baseUrl = getRouteUrl(resolution.routeId, lang);
    if (resolution.slug) {
      return `${baseUrl}/${resolution.slug}`.replace(/\/+/g, '/');
    }
    return baseUrl;
  }

  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (cleanPath.startsWith(`/es/`) || cleanPath.startsWith(`/en/`) || cleanPath.startsWith(`/de/`)) {
    return cleanPath;
  }
  return `/${lang}${cleanPath}`.replace(/\/+/g, '/');
}

/**
 * Parses incoming pathname and resolves locale, routeId, canonicalType, and slug segment.
 */
export function resolveReverseRoute(pathname: string): RouteResolution {
  const cleanPath = pathname.replace(/\/$/, '');
  const parts = cleanPath.split('/').filter(Boolean);

  let locale: SupportedLocale = 'es';
  if (parts.length > 0 && ['es', 'en', 'de'].includes(parts[0])) {
    locale = parts.shift() as SupportedLocale;
  }

  if (parts.length === 0) {
    return { locale, routeId: 'home' };
  }

  const firstSegment = parts[0];
  const routeId = getRouteIdFromSlug(firstSegment);
  const canonicalType = routeId ? getCanonicalTypeFromRouteId(routeId) : undefined;
  const slug = parts.length > 1 ? parts.slice(1).join('/') : undefined;

  return {
    locale,
    routeId,
    canonicalType,
    slug,
  };
}

/**
 * Switches the current route URL to a target language.
 */
export function switchLanguage(currentPathname: string, targetLocale: SupportedLocale): string {
  const resolution = resolveReverseRoute(currentPathname);
  if (!resolution.routeId) {
    return `/${targetLocale}`;
  }
  const baseUrl = getRouteUrl(resolution.routeId, targetLocale);
  if (resolution.slug) {
    return `${baseUrl}/${resolution.slug}`.replace(/\/+/g, '/');
  }
  return baseUrl;
}

/**
 * Generates absolute canonical URL for a given path and locale.
 */
export function getCanonicalUrl(
  pathname: string, 
  locale: SupportedLocale = 'es', 
  baseUrl = 'https://tortilladepatatas.org'
): string {
  const resolution = resolveReverseRoute(pathname);
  const cleanBase = baseUrl.replace(/\/$/, '');

  if (!resolution.routeId) {
    return `${cleanBase}/${locale}`;
  }

  const routePath = getRouteUrl(resolution.routeId, locale);
  if (resolution.slug) {
    const pathPart = `${routePath}/${resolution.slug}`.replace(/\/+/g, '/');
    return `${cleanBase}${pathPart}`;
  }

  return `${cleanBase}${routePath}`;
}
