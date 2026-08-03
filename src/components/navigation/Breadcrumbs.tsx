import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { resolveBreadcrumbs } from '@/lib/navigation/breadcrumbs';
import type { SupportedLocale } from '@/lib/routes';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  lang?: string;
  currentPath?: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ lang = 'es', currentPath, items }: BreadcrumbsProps) {
  const locale = (lang as SupportedLocale) || 'es';
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
  const cleanPath = path.replace(/\/$/, '');

  const homePaths = ['', `/${locale}`, '/es', '/en', '/de', '/'];
  if (homePaths.includes(cleanPath) && (!items || items.length === 0)) {
    return null;
  }

  let computedItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    computedItems = items;
  } else {
    computedItems = resolveBreadcrumbs(path, locale);
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumbs-nav border-b border-[#E8E2D5] bg-[#FAF6EE]/95 backdrop-blur-xs py-2 px-4 sm:px-6 w-full shadow-2xs"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-foreground/80 font-medium overflow-x-auto no-scrollbar py-0.5">
        {computedItems.map((item, index) => {
          const isLast = index === computedItems.length - 1;
          const isHome = index === 0;

          return (
            <React.Fragment key={item.url + index}>
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#8D6E63]/40 shrink-0 select-none" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 bg-[#F5E6BE] text-[#4A3B32] font-bold px-2.5 py-0.5 rounded-md border border-[#8D6E63]/25 shadow-2xs shrink-0 whitespace-nowrap"
                >
                  {isHome && <Home className="w-3.5 h-3.5 text-[#8D6E63]" />}
                  <span>{item.name}</span>
                </span>
              ) : (
                <a
                  href={item.url}
                  className="inline-flex items-center gap-1 text-[#8D6E63] hover:text-[#4A3B32] hover:bg-[#F5E6BE]/60 px-1.5 py-0.5 rounded transition-colors shrink-0 whitespace-nowrap font-medium"
                >
                  {isHome && <Home className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />}
                  <span>{item.name}</span>
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
