import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  lang?: string;
  currentPath?: string;
  items?: BreadcrumbItem[];
}

const segmentLabels: Record<string, Record<string, string>> = {
  recipes: { es: 'Recetas', en: 'Recipes', de: 'Rezepte' },
  facciones: { es: 'Facciones', en: 'Factions', de: 'Fraktionen' },
  factions: { es: 'Facciones', en: 'Factions', de: 'Fraktionen' },
  builder: { es: 'Creador DNA', en: 'Recipe Builder', de: 'Rezept-Rechner' },
  comparador: { es: 'Comparador Nutricional', en: 'Recipe Comparator', de: 'Rezept-Vergleicher' },
  laboratorio: { es: 'Laboratorio', en: 'Laboratory', de: 'Labor' },
  ingredients: { es: 'Ingredientes', en: 'Ingredients', de: 'Zutaten' },
  techniques: { es: 'Técnicas', en: 'Techniques', de: 'Techniken' },
  science: { es: 'Ciencia & Seguridad', en: 'Science & Safety', de: 'Wissenschaft & Sicherheit' },
  history: { es: 'Historia', en: 'History', de: 'Geschichte' },
  personas: { es: 'Personajes', en: 'People & Chefs', de: 'Persönlichkeiten' },
  estilos: { es: 'Estilos Culinarios', en: 'Culinary Styles', de: 'Kulinarische Stile' },
  restaurantes: { es: 'Restaurantes', en: 'Restaurants', de: 'Restaurants' },
  regiones: { es: 'Regiones', en: 'Regions', de: 'Regionen' },
  records: { es: 'Récords', en: 'Records', de: 'Rekorde' },
  enciclopedia: { es: 'Enciclopedia', en: 'Encyclopedia', de: 'Enzyklopädie' },
  about: { es: 'Sobre el Proyecto', en: 'About', de: 'Über uns' },
  contacto: { es: 'Contacto', en: 'Contact', de: 'Kontakt' },
  contact: { es: 'Contacto', en: 'Contact', de: 'Kontakt' },
  kontakt: { es: 'Contacto', en: 'Contact', de: 'Kontakt' },
  encuestas: { es: 'Encuestas', en: 'Community Polls', de: 'Umfragen' },
  tests: { es: 'Test de Lealtad', en: 'Loyalty Quiz', de: 'Fraktionstest' },

  // Recipe slugs
  betanzos: { es: 'Tortilla de Betanzos', en: 'Betanzos Omelette', de: 'Betanzos-Tortilla' },
  clasica: { es: 'Clásica Purista', en: 'Classic Purist', de: 'Klassische Puristische' },
  concebolla: { es: 'Con Cebolla Caramelizada', en: 'With Caramelized Onion', de: 'Mit Karamelisierten Zwiebeln' },
  express: { es: 'Express con Chips', en: 'Express Chips Omelette', de: 'Express-Chips-Tortilla' },
  paisana: { es: 'Paisana Tradicional', en: 'Traditional Country Omelette', de: 'Traditionelle Bauern-Tortilla' },
  jamon: { es: 'Con Jamón Ibérico', en: 'With Iberian Ham', de: 'Mit Iberischem Schinken' },
  vegana: { es: 'Vegana (Sin Huevo)', en: 'Vegan (Egg-Free)', de: 'Vegan (Ohne Ei)' },

  // Factions slugs
  puristas: { es: 'Los Puristas', en: 'The Purists', de: 'Die Puristen' },
  concebollistas: { es: 'Los Concebollistas', en: 'Onion Faction', de: 'Die Zwiebel-Fraktion' },
  pimientistas: { es: 'Los Pimientistas', en: 'Pepper Faction', de: 'Die Paprika-Fraktion' },
  ajistas: { es: 'Los Ajistas', en: 'Garlic Faction', de: 'Die Knoblauch-Fraktion' },
  'con-cosas': { es: "Los 'Con Cosas'", en: 'Modernist Faction', de: 'Moderne Variationen' },
};

function formatSegment(segment: string, locale: string): string {
  if (segmentLabels[segment] && segmentLabels[segment][locale]) {
    return segmentLabels[segment][locale];
  }
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumbs({ lang = 'es', currentPath, items }: BreadcrumbsProps) {
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
  const cleanPath = path.replace(/\/$/, '');

  const homePaths = ['', `/${lang}`, '/es', '/en', '/de', '/'];
  if (homePaths.includes(cleanPath) && (!items || items.length === 0)) {
    return null;
  }

  let computedItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    computedItems = items;
  } else {
    const parts = cleanPath.split('/').filter(Boolean);
    if (parts.length > 0 && ['es', 'en', 'de'].includes(parts[0])) {
      parts.shift();
    }

    const homeName = lang === 'de' ? 'Startseite' : lang === 'en' ? 'Home' : 'Inicio';
    computedItems.push({
      name: homeName,
      url: `/${lang}`,
    });

    let currentAccPath = `/${lang}`;
    parts.forEach((part) => {
      currentAccPath += `/${part}`;
      computedItems.push({
        name: formatSegment(part, lang),
        url: currentAccPath,
      });
    });
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
