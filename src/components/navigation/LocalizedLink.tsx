import React from 'react';
import { resolveNavigationTarget, resolveLegacyPath, getRouteUrl, getContentUrl } from '@/lib/routes';
import type { RouteId, SupportedLocale, ContentEntity } from '@/lib/routes';

export type BaseLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  lang?: SupportedLocale | string;
  children: React.ReactNode;
};

export type RouteLinkProps = BaseLinkProps & {
  routeId: RouteId;
};

export type EntityLinkProps = BaseLinkProps & {
  entity: ContentEntity;
};

export type ExternalLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
};

export type LocalizedLinkProps = BaseLinkProps & (
  | { routeId: RouteId; entity?: never; to?: never; href?: never }
  | { entity: ContentEntity; routeId?: never; to?: never; href?: never }
  | { to: string; routeId?: never; entity?: never; href?: never }
  | { href: string; routeId?: never; entity?: never; to?: never }
);

function getActiveLanguage(lang?: SupportedLocale | string): SupportedLocale {
  let activeLang = lang;
  if (!activeLang && typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length > 0 && ['es', 'en', 'de'].includes(parts[0])) {
      activeLang = parts[0];
    }
  }
  return (activeLang && ['es', 'en', 'de'].includes(activeLang) ? activeLang : 'es') as SupportedLocale;
}

export function RouteLink({ routeId, lang, children, className, ...props }: RouteLinkProps) {
  const language = getActiveLanguage(lang);
  const url = getRouteUrl(routeId, language);
  return (
    <a href={url} className={className} {...props}>
      {children}
    </a>
  );
}

export function EntityLink({ entity, lang, children, className, ...props }: EntityLinkProps) {
  const language = getActiveLanguage(lang);
  const url = getContentUrl(entity, language);
  return (
    <a href={url} className={className} {...props}>
      {children}
    </a>
  );
}

export function ExternalLink({ href, children, className, ...props }: ExternalLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className} 
      {...props}
    >
      {children}
    </a>
  );
}

export default function LocalizedLink({
  to,
  href,
  routeId,
  entity,
  lang,
  children,
  className,
  ...props
}: LocalizedLinkProps) {
  const language = getActiveLanguage(lang);

  let targetUrl = `/${language}`;
  if (routeId) {
    targetUrl = resolveNavigationTarget({ routeId }, language);
  } else if (entity) {
    targetUrl = resolveNavigationTarget({ entity }, language);
  } else if (to || href) {
    targetUrl = resolveLegacyPath(to || href || '/', language);
  }

  return (
    <a href={targetUrl} className={className} {...props}>
      {children}
    </a>
  );
}
