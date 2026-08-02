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

// Static routes mapping table
export const STATIC_ROUTE_TRANSLATIONS: TranslationMap = {
  'page.home': { es: '/es', en: '/en', de: '/de' },
  'page-home': { es: '/es', en: '/en', de: '/de' },
  'page.recipes': { es: '/es/recipes', en: '/en/recipes', de: '/de/recipes' },
  'page-recipes': { es: '/es/recipes', en: '/en/recipes', de: '/de/recipes' },
  'page.facciones': { es: '/es/facciones', en: '/en/facciones', de: '/de/facciones' },
  'page-facciones': { es: '/es/facciones', en: '/en/facciones', de: '/de/facciones' },
  'page.ingredients': { es: '/es/ingredients', en: '/en/ingredients', de: '/de/ingredients' },
  'page-ingredients': { es: '/es/ingredients', en: '/en/ingredients', de: '/de/ingredients' },
  'page.techniques': { es: '/es/techniques', en: '/en/techniques', de: '/de/techniques' },
  'page-techniques': { es: '/es/techniques', en: '/en/techniques', de: '/de/techniques' },
  'page.science': { es: '/es/science', en: '/en/science', de: '/de/science' },
  'page-science': { es: '/es/science', en: '/en/science', de: '/de/science' },
  'page.history': { es: '/es/history', en: '/en/history', de: '/de/history' },
  'page-history': { es: '/es/history', en: '/en/history', de: '/de/history' },
  'page.personas': { es: '/es/personas', en: '/en/personas', de: '/de/personas' },
  'page-personas': { es: '/es/personas', en: '/en/personas', de: '/de/personas' },
  'page.restaurantes': { es: '/es/restaurantes', en: '/en/restaurantes', de: '/de/restaurantes' },
  'page-restaurantes': { es: '/es/restaurantes', en: '/en/restaurantes', de: '/de/restaurantes' },
  'page.regiones': { es: '/es/regiones', en: '/en/regiones', de: '/de/regiones' },
  'page-regiones': { es: '/es/regiones', en: '/en/regiones', de: '/de/regiones' },
  'page.records': { es: '/es/records', en: '/en/records', de: '/de/records' },
  'page-records': { es: '/es/records', en: '/en/records', de: '/de/records' },
  'page.estilos': { es: '/es/estilos', en: '/en/estilos', de: '/de/estilos' },
  'page-estilos': { es: '/es/estilos', en: '/en/estilos', de: '/de/estilos' },
  'page.enciclopedia': { es: '/es/enciclopedia', en: '/en/enciclopedia', de: '/de/enciclopedia' },
  'page-enciclopedia': { es: '/es/enciclopedia', en: '/en/enciclopedia', de: '/de/enciclopedia' },
  'page.laboratorio': { es: '/es/laboratorio', en: '/en/laboratorio', de: '/de/laboratorio' },
  'page-laboratorio': { es: '/es/laboratorio', en: '/en/laboratorio', de: '/de/laboratorio' },
  'page.comparador': { es: '/es/comparador', en: '/en/comparador', de: '/de/comparador' },
  'page-comparador': { es: '/es/comparador', en: '/en/comparador', de: '/de/comparador' },
  'page.builder': { es: '/es/builder', en: '/en/builder', de: '/de/builder' },
  'page-builder': { es: '/es/builder', en: '/en/builder', de: '/de/builder' },
  'page.encuestas': { es: '/es/encuestas', en: '/en/encuestas', de: '/de/encuestas' },
  'page-encuestas': { es: '/es/encuestas', en: '/en/encuestas', de: '/de/encuestas' },
  'page.tests': { es: '/es/tests', en: '/en/tests', de: '/de/tests' },
  'page-tests': { es: '/es/tests', en: '/en/tests', de: '/de/tests' },
  'page.contact': { es: '/es/contacto', en: '/en/contact', de: '/de/kontakt' },
  'page-contact': { es: '/es/contacto', en: '/en/contact', de: '/de/kontakt' },
  'page.about': { es: '/es/about', en: '/en/about', de: '/de/about' },
  'page-about': { es: '/es/about', en: '/en/about', de: '/de/about' },
};

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
  const cleanPath = currentPath.split('?')[0].split('#')[0].replace(/\/$/, '') || `/${targetLang}`;

  // 2. Check translationKey if provided
  if (translationKey && lookupData?.translationMap?.[translationKey]) {
    const targetUrl = lookupData.translationMap[translationKey][targetLang as 'es' | 'en' | 'de'];
    if (targetUrl) return targetUrl;
  }

  // 3. Lookup via urlToKey
  if (lookupData?.urlToKey) {
    const key = lookupData.urlToKey[cleanPath];
    if (key && lookupData.translationMap[key]) {
      const targetUrl = lookupData.translationMap[key][targetLang as 'es' | 'en' | 'de'];
      if (targetUrl) return targetUrl;
    }
  }

  // 4. Fallback for static routes
  for (const [, map] of Object.entries(STATIC_ROUTE_TRANSLATIONS)) {
    const currentMatches = Object.values(map).includes(cleanPath);
    if (currentMatches && map[targetLang as 'es' | 'en' | 'de']) {
      return map[targetLang as 'es' | 'en' | 'de']!;
    }
  }

  // 5. Graceful fallback to section root if possible, or homepage
  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length > 1) {
    const section = parts[1];
    const sectionKey = `page-${section}`;
    if (lookupData?.translationMap?.[sectionKey]?.[targetLang as 'es' | 'en' | 'de']) {
      return lookupData.translationMap[sectionKey][targetLang as 'es' | 'en' | 'de']!;
    }
  }

  // Fallback to localized homepage
  return `/${targetLang}`;
}
