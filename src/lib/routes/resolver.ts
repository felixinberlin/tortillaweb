import { ROUTES } from './registry';
import type { 
  SupportedLocale, 
  RouteId, 
  CanonicalType, 
  ContentEntity,
  NavigationTarget,
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
const ROUTE_SEGMENT_ALIASES: Record<string, RouteId> = {
  recetas: 'recipes',
  rezepte: 'recipes',
  recipes: 'recipes',
  ingredientes: 'ingredients',
  ingredients: 'ingredients',
  zutaten: 'ingredients',
  tecnicas: 'techniques',
  techniques: 'techniques',
  techniken: 'techniques',
  facciones: 'factions',
  factions: 'factions',
  faktionen: 'factions',
  fraktionen: 'factions',
  ciencia: 'science',
  science: 'science',
  wissenschaft: 'science',
  historia: 'history',
  history: 'history',
  geschichte: 'history',
  personas: 'personas',
  people: 'personas',
  personen: 'personas',
  regiones: 'regiones',
  regions: 'regiones',
  regionen: 'regiones',
  contacto: 'contact',
  contact: 'contact',
  kontakt: 'contact',
  'aviso-legal': 'impressum',
  impressum: 'impressum',
  'legal-notice': 'impressum',
  guias: 'guides',
  guides: 'guides',
  anleitungen: 'guides',
  videos: 'videos',
  video: 'videos',
};

export function getRouteIdFromSlug(slugSegment: string, lang?: SupportedLocale): RouteId | undefined {
  if (!slugSegment) return 'home';

  if (ROUTE_SEGMENT_ALIASES[slugSegment.toLowerCase()]) {
    return ROUTE_SEGMENT_ALIASES[slugSegment.toLowerCase()];
  }

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
 * Route Resolver API
 */
export const routeResolver = {
  urlFor: (
    entity: any,
    lang: SupportedLocale = 'es'
  ): string => {
    if (typeof entity === 'string') {
      return resolveNavigationTarget(entity, lang);
    }
    if (!entity) return `/${lang}`;
    if ('url' in entity && typeof entity.url === 'string' && entity.url) {
      return entity.url;
    }
    if ('href' in entity || 'to' in entity) {
      return resolveNavigationTarget(entity, lang);
    }
    return getContentUrl(entity, lang);
  },
  getRouteUrl,
  getContentUrl,
  getEntityRoute,
  resolveNavigationTarget,
  resolveLegacyPath,
};

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

const KNOWN_ENTITY_SLUGS: Record<string, Record<SupportedLocale, string>> = {
  // Recipes
  'clasica': { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
  'classic': { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
  'tortilla-clasica': { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
  'betanzos': { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
  'tortilla-betanzos': { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
  'betanzos-style-spanish-omelette': { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
  'betanzos-tortilla': { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
  'express': { es: 'tortilla-express-patatas-chips', en: 'express-potato-chip-omelette', de: 'express-kartoffelchips-tortilla' },
  'express-chips': { es: 'tortilla-express-patatas-chips', en: 'express-potato-chip-omelette', de: 'express-kartoffelchips-tortilla' },
  'tortilla-express': { es: 'tortilla-express-patatas-chips', en: 'express-potato-chip-omelette', de: 'express-kartoffelchips-tortilla' },
  'tortilla-express-patatas-chips': { es: 'tortilla-express-patatas-chips', en: 'express-potato-chip-omelette', de: 'express-kartoffelchips-tortilla' },
  'con-cebolla': { es: 'tortilla-clasica-con-cebolla', en: 'classic-spanish-omelette-with-onion', de: 'klassische-spanische-tortilla-mit-zwiebel' },
  'concebolla': { es: 'tortilla-clasica-con-cebolla', en: 'classic-spanish-omelette-with-onion', de: 'klassische-spanische-tortilla-mit-zwiebel' },
  'tortilla-clasica-con-cebolla': { es: 'tortilla-clasica-con-cebolla', en: 'classic-spanish-omelette-with-onion', de: 'klassische-spanische-tortilla-mit-zwiebel' },
  'atun': { es: 'tortilla-atun', en: 'tuna-spanish-omelette', de: 'thunfisch-spanische-tortilla' },
  'jamon': { es: 'tortilla-jamon', en: 'jamon-spanish-omelette', de: 'jamon-spanische-tortilla' },
  'paisana': { es: 'tortilla-paisana', en: 'paisana-spanish-omelette', de: 'paisana-tortilla' },
  'quesoazul': { es: 'tortilla-queso-azul', en: 'blue-cheese-spanish-omelette', de: 'blauschimmelkaese-spanische-tortilla' },
  'vegana': { es: 'tortilla-de-patatas-vegana-sin-gluten', en: 'vegan-gluten-free-spanish-omelette', de: 'vegane-glutenfreie-spanische-tortilla' },
  'vegan': { es: 'tortilla-de-patatas-vegana-sin-gluten', en: 'vegan-gluten-free-spanish-omelette', de: 'vegane-glutenfreie-spanische-tortilla' },
  'donostia': { es: 'tortilla-de-donostia', en: 'donostia-basque-omelette', de: 'donostia-baskische-tortilla' },
  'betanzos-pimenton': { es: 'tortilla-betanzos-pimenton-chorizo', en: 'galician-betanzos-paprika-chorizo-omelette', de: 'galicische-betanzos-tortilla-paprika-chorizo' },
  'piquillo-catalana': { es: 'tortilla-catalana-pimientos-piquillo', en: 'catalan-roasted-piquillo-pepper-omelette', de: 'katalanische-piquillo-paprika-tortilla' },
  'paisana-andaluza': { es: 'tortilla-paisana-andaluza-huerta', en: 'andalusian-country-vegetable-omelette', de: 'andalusische-garten-tortilla-paisana' },
  'trufa-champinones': { es: 'tortilla-madrilena-trufa-champinones', en: 'madrid-truffle-portobello-mushroom-omelette', de: 'madrider-trueffel-champignon-tortilla' },
  'sobrasada-mallorquina': { es: 'tortilla-mallorquina-sobrasada-romero', en: 'mallorcan-sobrasada-rosemary-omelette', de: 'mallorquinische-sobrasada-rosmarin-tortilla' },
  'jamon-queso-extremadura': { es: 'tortilla-extremena-jamon-iberico-queso', en: 'extremaduran-iberico-ham-aged-cheese-omelette', de: 'extremadura-tortilla-iberico-schinken-kaese' },
  'piquillo-jamon-navarra': { es: 'tortilla-navarra-pimientos-piquillo-jamon', en: 'navarrese-lodosa-piquillo-pepper-iberico-ham-omelette', de: 'navarra-piquillo-paprika-iberico-schinken-tortilla' },
  // Ingredients
  'potato': { es: 'patata', en: 'potato', de: 'kartoffel' },
  'patata': { es: 'patata', en: 'potato', de: 'kartoffel' },
  'kartoffel': { es: 'patata', en: 'potato', de: 'kartoffel' },
  'egg': { es: 'huevo', en: 'egg', de: 'ei' },
  'huevo': { es: 'huevo', en: 'egg', de: 'ei' },
  'ei': { es: 'huevo', en: 'egg', de: 'ei' },
  'oil': { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
  'aceite-oliva': { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
  'aceite-de-oliva': { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
  'olive-oil': { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
  'olivenoel': { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
  'onion': { es: 'cebolla', en: 'onion', de: 'zwiebel' },
  'cebolla': { es: 'cebolla', en: 'onion', de: 'zwiebel' },
  'zwiebel': { es: 'cebolla', en: 'onion', de: 'zwiebel' },
  // Techniques
  'corte-chascado': { es: 'corte-chascado', en: 'potato-cutting', de: 'kartoffel-schneiden' },
  'potato-cutting': { es: 'corte-chascado', en: 'potato-cutting', de: 'kartoffel-schneiden' },
  'cutting': { es: 'corte-chascado', en: 'potato-cutting', de: 'kartoffel-schneiden' },
  'confitado': { es: 'confitado', en: 'slow-poaching', de: 'langsam-pochieren' },
  'slow-poaching': { es: 'confitado', en: 'slow-poaching', de: 'langsam-pochieren' },
  'slow-cooking': { es: 'confitado', en: 'slow-poaching', de: 'langsam-pochieren' },
  'fritura-crujiente': { es: 'fritura-crujiente', en: 'crispy-frying', de: 'knusprig-frittieren' },
  'crispy-frying': { es: 'fritura-crujiente', en: 'crispy-frying', de: 'knusprig-frittieren' },
  'frying': { es: 'fritura-crujiente', en: 'crispy-frying', de: 'knusprig-frittieren' },
  'emulsion-caliente': { es: 'emulsion-caliente', en: 'warm-emulsion', de: 'warme-emulsion' },
  'warm-emulsion': { es: 'emulsion-caliente', en: 'warm-emulsion', de: 'warme-emulsion' },
  'emulsion': { es: 'emulsion-caliente', en: 'warm-emulsion', de: 'warme-emulsion' },
  'coagulacion-proteica': { es: 'coagulacion-proteica', en: 'protein-coagulation', de: 'protein-gerinnung' },
  'protein-coagulation': { es: 'coagulacion-proteica', en: 'protein-coagulation', de: 'protein-gerinnung' },
  'coagulation': { es: 'coagulacion-proteica', en: 'protein-coagulation', de: 'protein-gerinnung' },
  'deconstruccion': { es: 'deconstruccion', en: 'deconstruction', de: 'dekonstruktion' },
  'deconstruction': { es: 'deconstruccion', en: 'deconstruction', de: 'dekonstruktion' },
  // Factions
  'concebollistas': { es: 'concebollistas', en: 'onion-lovers', de: 'zwiebelliebhaber' },
  'onion-lovers': { es: 'concebollistas', en: 'onion-lovers', de: 'zwiebelliebhaber' },
  'zwiebelliebhaber': { es: 'concebollistas', en: 'onion-lovers', de: 'zwiebelliebhaber' },
  'puristas': { es: 'puristas', en: 'purists', de: 'puristen' },
  'sincebollistas': { es: 'puristas', en: 'purists', de: 'puristen' },
  'purists': { es: 'puristas', en: 'purists', de: 'puristen' },
  'puristen': { es: 'puristas', en: 'purists', de: 'puristen' },
  'ajistas': { es: 'ajistas', en: 'garlic-lovers', de: 'knoblauchliebhaber' },
  'pimientistas': { es: 'pimientistas', en: 'pepper-lovers', de: 'paprika-fraktion' },
  'pepper-lovers': { es: 'pimientistas', en: 'pepper-lovers', de: 'paprika-fraktion' },
  'paprika-fraktion': { es: 'pimientistas', en: 'pepper-lovers', de: 'paprika-fraktion' },
  'paprikaliebhaber': { es: 'pimientistas', en: 'pepper-lovers', de: 'paprika-fraktion' },
  'con-cosas': { es: 'con-cosas', en: 'experimentalists', de: 'experimentelle' },
  // People
  'barat': { es: 'jose-manuel-barat', en: 'jose-manuel-barat', de: 'jose-manuel-barat' },
  'jose-manuel-barat': { es: 'jose-manuel-barat', en: 'jose-manuel-barat', de: 'jose-manuel-barat' },
  'abuela-maria': { es: 'abuela-maria', en: 'abuela-maria', de: 'abuela-maria' },
  'chef-enrique': { es: 'chef-enrique', en: 'chef-enrique', de: 'chef-enrique' },
  'pepe-madrid': { es: 'pepe-madrid', en: 'pepe-madrid', de: 'pepe-madrid' },
  'rosa-maria': { es: 'rosa-maria', en: 'rosa-maria', de: 'rosa-maria' },
  'javier-sevilla': { es: 'javier-sevilla', en: 'javier-sevilla', de: 'javier-sevilla' },
  'elena-berlin': { es: 'elena-berlin', en: 'elena-berlin', de: 'elena-berlin' },
  // Guides
  'tortilla-clasica-masterclass': { es: 'tortilla-clasica-masterclass', en: 'classic-tortilla-masterclass', de: 'klassische-tortilla-meisterklasse' },
  'classic-tortilla-masterclass': { es: 'tortilla-clasica-masterclass', en: 'classic-tortilla-masterclass', de: 'klassische-tortilla-meisterklasse' },
  'klassische-tortilla-meisterklasse': { es: 'tortilla-clasica-masterclass', en: 'classic-tortilla-masterclass', de: 'klassische-tortilla-meisterklasse' },
  'confit-tecnica-lenta': { es: 'confit-tecnica-lenta', en: 'confit-technique-low-slow', de: 'confit-technik-schonend-garen' },
  'confit-technique-low-slow': { es: 'confit-tecnica-lenta', en: 'confit-technique-low-slow', de: 'confit-technik-schonend-garen' },
  'confit-technik-schonend-garen': { es: 'confit-tecnica-lenta', en: 'confit-technique-low-slow', de: 'confit-technik-schonend-garen' },
  'tortilla-expres-20-minutos': { es: 'tortilla-expres-20-minutos', en: 'express-tortilla-20-minute-method', de: 'express-tortilla-20-minuten-methode' },
  'express-tortilla-20-minute-method': { es: 'tortilla-expres-20-minutos', en: 'express-tortilla-20-minute-method', de: 'express-tortilla-20-minuten-methode' },
  'express-tortilla-20-minuten-methode': { es: 'tortilla-expres-20-minutos', en: 'express-tortilla-20-minute-method', de: 'express-tortilla-20-minuten-methode' },
  'masterclass-cebolla-caramelizada': { es: 'masterclass-cebolla-caramelizada', en: 'concebollista-caramelized-onion-masterclass', de: 'concebollista-karamellisierte-zwiebel-meisterklasse' },
  'concebollista-caramelized-onion-masterclass': { es: 'masterclass-cebolla-caramelizada', en: 'concebollista-caramelized-onion-masterclass', de: 'concebollista-karamellisierte-zwiebel-meisterklasse' },
  'concebollista-karamellisierte-zwiebel-meisterklasse': { es: 'masterclass-cebolla-caramelizada', en: 'concebollista-caramelized-onion-masterclass', de: 'concebollista-karamellisierte-zwiebel-meisterklasse' },
  'debate-cebolla-ciencia-sabor': { es: 'debate-cebolla-ciencia-sabor', en: 'onion-debate-resolved-science-taste', de: 'zwiebel-debatte-geloest-wissenschaft-geschmack' },
  'onion-debate-resolved-science-taste': { es: 'debate-cebolla-ciencia-sabor', en: 'onion-debate-resolved-science-taste', de: 'zwiebel-debatte-geloest-wissenschaft-geschmack' },
  'zwiebel-debatte-geloest-wissenschaft-geschmack': { es: 'debate-cebolla-ciencia-sabor', en: 'onion-debate-resolved-science-taste', de: 'zwiebel-debatte-geloest-wissenschaft-geschmack' },
};

const REGION_ENTITY_SLUGS: Record<string, Record<SupportedLocale, string>> = {
  'andalucia': { es: 'andalucia', en: 'andalusia', de: 'andalusien' },
  'andalusia': { es: 'andalucia', en: 'andalusia', de: 'andalusien' },
  'andalusien': { es: 'andalucia', en: 'andalusia', de: 'andalusien' },
  'baleares': { es: 'baleares', en: 'balearic-islands', de: 'balearen' },
  'balearic-islands': { es: 'baleares', en: 'balearic-islands', de: 'balearen' },
  'balearen': { es: 'baleares', en: 'balearic-islands', de: 'balearen' },
  'betanzos': { es: 'betanzos', en: 'betanzos', de: 'betanzos' },
  'cataluna': { es: 'cataluna', en: 'catalonia', de: 'katalonien' },
  'catalonia': { es: 'cataluna', en: 'catalonia', de: 'katalonien' },
  'katalonien': { es: 'cataluna', en: 'catalonia', de: 'katalonien' },
  'donostia': { es: 'donostia', en: 'donostia', de: 'donostia' },
  'extremadura': { es: 'extremadura', en: 'extremadura', de: 'extremadura' },
  'galicia': { es: 'galicia', en: 'galicia', de: 'galicien' },
  'galicien': { es: 'galicia', en: 'galicia', de: 'galicien' },
  'madrid': { es: 'madrid', en: 'madrid', de: 'madrid' },
  'navarra': { es: 'navarra', en: 'navarre', de: 'navarra' },
  'navarre': { es: 'navarra', en: 'navarre', de: 'navarra' },
  'rioja': { es: 'la-rioja', en: 'la-rioja', de: 'la-rioja' },
  'la-rioja': { es: 'la-rioja', en: 'la-rioja', de: 'la-rioja' },
};

/**
 * Migration helper for converting legacy path strings (e.g., "/ingredients") into resolved URLs.
 */
export function resolveLegacyPath(rawPath: string, lang: SupportedLocale = 'es'): string {
  if (!rawPath || rawPath === '/' || rawPath === '') {
    return `/${lang}`;
  }

  // Replace [lang] placeholder if present
  if (rawPath.includes('[lang]')) {
    rawPath = rawPath.replace(/\[lang\]/g, lang);
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
      let mappedSlug: string;
      if (resolution.canonicalType === 'region') {
        mappedSlug = REGION_ENTITY_SLUGS[resolution.slug]?.[lang] || resolution.slug;
      } else {
        mappedSlug = KNOWN_ENTITY_SLUGS[resolution.slug]?.[lang] || resolution.slug;
      }
      return `${baseUrl}/${mappedSlug}`.replace(/\/+/g, '/');
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
