import { 
  ROUTES, 
  getRouteUrl, 
  resolveReverseRoute 
} from './routes';
import type { SupportedLocale, RouteId } from './routes';

export interface TranslationMap {
  [translationKey: string]: {
    es?: string;
    en?: string;
    de?: string;
  };
}

export interface LookupResult {
  translationMap: TranslationMap;
  urlToKey: Record<string, string>;
}

// Generate static route translations dynamically from the central ROUTES registry
export const STATIC_ROUTE_TRANSLATIONS: TranslationMap = Object.entries(ROUTES).reduce(
  (acc, [routeId]) => {
    acc[routeId] = {
      es: getRouteUrl(routeId as RouteId, 'es'),
      en: getRouteUrl(routeId as RouteId, 'en'),
      de: getRouteUrl(routeId as RouteId, 'de'),
    };
    return acc;
  },
  {} as TranslationMap
);

/**
 * Client & Server safe function to find destination URL for a given target language.
 */
export function findTranslationURL({
  currentPath,
  targetLang,
  translationKey,
  customHreflangs,
  lookupData,
}: {
  currentPath: string;
  targetLang: string;
  translationKey?: string;
  customHreflangs?: Array<{ lang: string; href: string }>;
  lookupData?: LookupResult;
}): string {
  const target = targetLang as SupportedLocale;

  // 1. Check customHreflangs if provided
  if (customHreflangs && customHreflangs.length > 0) {
    const match = customHreflangs.find((item) => item.lang === targetLang);
    if (match && match.href) {
      try {
        const parsed = new URL(match.href);
        return parsed.pathname;
      } catch {
        return match.href;
      }
    }
  }

  // Normalize path
  const cleanPath = currentPath.split('?')[0].split('#')[0].replace(/\/$/, '') || `/${target}`;

  // 2. Check translationKey if provided in lookupData
  if (translationKey && lookupData?.translationMap?.[translationKey]) {
    const targetUrl = lookupData.translationMap[translationKey][target];
    if (targetUrl) return targetUrl;
  }

  // 3. Lookup via urlToKey in lookupData
  if (lookupData?.urlToKey) {
    const key = lookupData.urlToKey[cleanPath];
    if (key && lookupData.translationMap[key]) {
      const targetUrl = lookupData.translationMap[key][target];
      if (targetUrl) return targetUrl;
    }
  }

  // 4. Reverse Route Resolution via typed ROUTES registry
  const resolution = resolveReverseRoute(cleanPath);
  if (resolution.routeId) {
    const baseTargetUrl = getRouteUrl(resolution.routeId, target);
    if (resolution.slug) {
      return `${baseTargetUrl}/${resolution.slug}`.replace(/\/+/g, '/');
    }
    return baseTargetUrl;
  }

  // 5. Fallback check across static routes map
  for (const [, map] of Object.entries(STATIC_ROUTE_TRANSLATIONS)) {
    const currentMatches = Object.values(map).includes(cleanPath);
    if (currentMatches && map[target]) {
      return map[target]!;
    }
  }

  // Fallback to localized homepage
  return `/${target}`;
}

