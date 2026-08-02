import React from "react";

type LocalizedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  lang?: string;
  children: React.ReactNode;
};

export default function LocalizedLink({
  to,
  lang,
  children,
  className,
  ...props
}: LocalizedLinkProps) {
  let activeLang = lang;
  if (!activeLang && typeof window !== "undefined") {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0 && ["es", "en", "de"].includes(parts[0])) {
      activeLang = parts[0];
    }
  }
  const language = activeLang && ["es", "en", "de"].includes(activeLang) ? activeLang : "es";

const ROUTE_LOCALIZATIONS: Record<string, Record<string, string>> = {
  '/ingredients': { es: '/es/ingredientes', en: '/en/ingredients', de: '/de/zutaten' },
  '/ingredientes': { es: '/es/ingredientes', en: '/en/ingredients', de: '/de/zutaten' },
  '/zutaten': { es: '/es/ingredientes', en: '/en/ingredients', de: '/de/zutaten' },
  '/facciones': { es: '/es/facciones', en: '/en/factions', de: '/de/faktionen' },
  '/factions': { es: '/es/facciones', en: '/en/factions', de: '/de/faktionen' },
  '/faktionen': { es: '/es/facciones', en: '/en/factions', de: '/de/faktionen' },
  '/techniques': { es: '/es/tecnicas', en: '/en/techniques', de: '/de/techniken' },
  '/tecnicas': { es: '/es/tecnicas', en: '/en/techniques', de: '/de/techniken' },
  '/techniken': { es: '/es/tecnicas', en: '/en/techniques', de: '/de/techniken' },
  '/estilos': { es: '/es/estilos', en: '/en/styles', de: '/de/stile' },
  '/styles': { es: '/es/estilos', en: '/en/styles', de: '/de/stile' },
  '/stile': { es: '/es/estilos', en: '/en/styles', de: '/de/stile' },
  '/regiones': { es: '/es/regiones', en: '/en/regions', de: '/de/regionen' },
  '/regions': { es: '/es/regiones', en: '/en/regions', de: '/de/regionen' },
  '/regionen': { es: '/es/regiones', en: '/en/regions', de: '/de/regionen' },
  '/personas': { es: '/es/personas', en: '/en/people', de: '/de/personen' },
  '/people': { es: '/es/personas', en: '/en/people', de: '/de/personen' },
  '/personen': { es: '/es/personas', en: '/en/people', de: '/de/personen' },
  '/restaurantes': { es: '/es/restaurantes', en: '/en/restaurants', de: '/de/restaurants' },
  '/restaurants': { es: '/es/restaurantes', en: '/en/restaurants', de: '/de/restaurants' },
  '/contacto': { es: '/es/contacto', en: '/en/contact', de: '/de/kontakt' },
  '/contact': { es: '/es/contacto', en: '/en/contact', de: '/de/kontakt' },
  '/kontakt': { es: '/es/contacto', en: '/en/contact', de: '/de/kontakt' },
};

  const cleanTo = to.startsWith("/") ? to : `/${to}`;
  let path = cleanTo === "/" ? `/${language}` : `/${language}${cleanTo}`;

  if (ROUTE_LOCALIZATIONS[cleanTo] && ROUTE_LOCALIZATIONS[cleanTo][language]) {
    path = ROUTE_LOCALIZATIONS[cleanTo][language];
  }

  return (
    <a href={path} className={className} {...props}>
      {children}
    </a>
  );
}
