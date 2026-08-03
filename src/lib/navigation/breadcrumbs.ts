import type { SupportedLocale, BreadcrumbItem } from '../routes/types';
import { 
  getRouteIdFromSlug, 
  getRouteLabel, 
  getRouteUrl, 
  getCanonicalTypeFromRouteId 
} from '../routes/resolver';

/**
 * Dynamic entity-aware breadcrumbs resolver.
 * Consumes only the route resolver API and remains independent of route storage.
 */
export function resolveBreadcrumbs(
  pathname: string,
  lang: SupportedLocale = 'es',
  entityResolver?: (type?: string, slug?: string) => { title?: string; id?: string } | undefined
): BreadcrumbItem[] {
  const cleanPath = pathname.replace(/\/$/, '');
  const parts = cleanPath.split('/').filter(Boolean);

  let locale = lang;
  if (parts.length > 0 && ['es', 'en', 'de'].includes(parts[0])) {
    locale = parts.shift() as SupportedLocale;
  }

  const homeLabel = getRouteLabel('home', locale) || 'Inicio';
  const breadcrumbs: BreadcrumbItem[] = [{ name: homeLabel, url: `/${locale}` }];

  if (parts.length === 0) {
    return breadcrumbs;
  }

  const firstSegment = parts[0];
  const routeId = getRouteIdFromSlug(firstSegment);

  if (routeId && routeId !== 'home') {
    const routeLabel = getRouteLabel(routeId, locale);
    const routeUrl = getRouteUrl(routeId, locale);
    breadcrumbs.push({ name: routeLabel, url: routeUrl });

    if (parts.length > 1) {
      const itemSlug = parts.slice(1).join('/');
      const canonicalType = getCanonicalTypeFromRouteId(routeId) || routeId;
      
      let itemLabel = itemSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      if (entityResolver) {
        const entity = entityResolver(canonicalType, itemSlug);
        if (entity && entity.title) {
          itemLabel = entity.title;
        }
      }

      breadcrumbs.push({
        name: itemLabel,
        url: `${routeUrl}/${itemSlug}`,
      });
    }
  } else {
    // Fallback path accumulation for unmapped segments
    let accPath = `/${locale}`;
    parts.forEach((part) => {
      accPath += `/${part}`;
      const partLabel = part
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      breadcrumbs.push({ name: partLabel, url: accPath });
    });
  }

  return breadcrumbs;
}
