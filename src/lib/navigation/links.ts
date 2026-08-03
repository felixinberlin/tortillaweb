import {
  getRouteUrl,
  getContentUrl,
  getLocalizedRoute,
  getEntityRoute,
  resolveNavigationTarget,
  resolveLegacyPath
} from '../routes/resolver';
import LocalizedLink, { RouteLink, EntityLink, ExternalLink } from '../../components/navigation/LocalizedLink';
import type { RouteId, SupportedLocale, ContentEntity, NavigationTarget } from '../routes/types';

export {
  getRouteUrl,
  getContentUrl,
  getLocalizedRoute,
  getEntityRoute,
  resolveNavigationTarget,
  resolveLegacyPath,
  LocalizedLink,
  RouteLink,
  EntityLink,
  ExternalLink,
  type RouteId,
  type SupportedLocale,
  type ContentEntity,
  type NavigationTarget,
};
