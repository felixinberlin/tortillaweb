/**
 * Canonical Equipment Shop & Gourmet Pantry text definitions backed by OASIS XLIFF 1.2
 * Source files: src/i18n/xlf/store_canon.{en,de}.xlf
 */

export interface StoreCategoryCanon {
  id: string;
  label: Record<'es' | 'en' | 'de', string>;
}

export const STORE_CATEGORIES_CANON: StoreCategoryCanon[] = [
  {
    id: 'all',
    label: { es: 'Todo el Arsenal', en: 'All Gear', de: 'Gesamte Ausrüstung' },
  },
  {
    id: 'skillets',
    label: { es: 'Sartenes & Volteadoras', en: 'Pans & Skillets', de: 'Pfannen & Wender' },
  },
  {
    id: 'thermometers',
    label: { es: 'Termómetros & Seguridad', en: 'Thermometers & Safety', de: 'Thermometer & Hygiene' },
  },
  {
    id: 'cutlery',
    label: { es: 'Mandolinas & Corte', en: 'Mandolines & Cutlery', de: 'Mandolinen & Messer' },
  },
  {
    id: 'pantry',
    label: { es: 'Aceites D.O. & Despensa', en: 'D.O. Olive Oil & Pantry', de: 'D.O. Olivenöl & Vorrat' },
  },
  {
    id: 'books',
    label: { es: 'E-Books & Cursos Pro', en: 'E-Books & Masterclasses', de: 'E-Books & Meisterkurse' },
  },
  {
    id: 'merch',
    label: { es: 'Delantales & Merch', en: 'Aprons & Merch', de: 'Schürzen & Merch' },
  },
];

export const STORE_CANON = {
  header: {
    badge: {
      es: 'Arsenal Culinario Homologado por Gastrónomos',
      en: 'Culinary Arsenal Endorsed by Master Chefs',
      de: 'Von Spitzenköchen geprüftes Meister-Equipment',
    },
    title: {
      es: 'Equipamiento, Despensa & Guías Maestras',
      en: 'Equipment, Gourmet Pantry & Master Guides',
      de: 'Ausrüstung, Vorratskammer & Meister-Leitfäden',
    },
    subtitle: {
      es: 'Herramientas de hierro mineral, sartenes dobles volteadoras, termómetros de sonda calibrados y aceites de oliva virgen extra con D.O.P.',
      en: 'Mineral iron pans, double flipping skillets, calibrated probe thermometers, and D.O.P. extra virgin olive oils.',
      de: 'Mineral-Eisenpfannen, Doppel-Wende-Pfannen, kalibrierte Einstichthermometer und D.O.P. natives Olivenöl extra.',
    },
    searchPlaceholder: {
      es: 'Buscar sartenes, mandolinas, termómetros o aceites...',
      en: 'Search skillets, mandolines, thermometers, or oils...',
      de: 'Pfannen, Mandolinen, Thermometer oder Öle suchen...',
    },
  },
  trust: {
    certification: {
      es: 'Homologación Técnica',
      en: 'Technical Certification',
      de: 'Technische Zertifizierung',
    },
    thermal: {
      es: 'Estándar **70°C durante 2 minutos**',
      en: 'Standard **70°C for 2 minutes**',
      de: 'Standard **70°C für 2 Minuten**',
    },
    editorial: {
      es: 'Criterio Editorial Riguroso',
      en: 'Rigorous Editorial Standards',
      de: 'Strenge redaktionelle Standards',
    },
  },
};

export function getStoreCategoryLabel(categoryId: string, lang: 'es' | 'en' | 'de' = 'es'): string {
  const cat = STORE_CATEGORIES_CANON.find((c) => c.id === categoryId);
  if (!cat) return categoryId;
  return cat.label[lang] || cat.label.es;
}

export function getStoreUiText(key: 'badge' | 'title' | 'subtitle' | 'searchPlaceholder', lang: 'es' | 'en' | 'de' = 'es'): string {
  const entry = STORE_CANON.header[key];
  return entry[lang] || entry.es;
}
