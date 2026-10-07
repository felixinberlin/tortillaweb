import { getCollection, type CollectionEntry } from 'astro:content';

export type BibliographyEntry = CollectionEntry<'bibliography'>;

export interface LocalizedBibliographyItem {
  id: string;
  title: string;
  authors: string[];
  year: number | string;
  type: string;
  typeLabel: string;
  category: string;
  categoryLabel: string;
  publication?: string;
  publisher?: string;
  location?: string;
  url?: string;
  doi?: string;
  officialCode?: string;
  citationText: string;
  summary: string;
  keyTakeaway?: string;
  quote?: string;
  relatedArticleSlugs: string[];
  verified: boolean;
  tags?: string[];
}

export const CATEGORY_LABELS: Record<string, { es: string; en: string; de: string; icon: string }> = {
  history: {
    es: 'Historia & Manuscritos',
    en: 'History & Manuscripts',
    de: 'Geschichte & Manuskripte',
    icon: 'History'
  },
  science: {
    es: 'Física & Bioquímica Culinaria',
    en: 'Culinary Physics & Biochemistry',
    de: 'Kulinarische Physik & Biochemie',
    icon: 'Microscope'
  },
  safety: {
    es: 'Microbiología & Seguridad Oficial',
    en: 'Microbiology & Official Safety',
    de: 'Mikrobiologie & Offizielle Hygiene',
    icon: 'ShieldCheck'
  },
  gastronomy: {
    es: 'Canon Gastronómico & Campeonatos',
    en: 'Gastronomic Canon & Competitions',
    de: 'Gastronomischer Kanon & Meisterschaften',
    icon: 'Award'
  },
  sociology: {
    es: 'Sociología & Encuestas CIS',
    en: 'Sociology & CIS National Polls',
    de: 'Soziologie & CIS-Umfragen',
    icon: 'Users'
  },
  agronomy: {
    es: 'Agronomía & Variedades de Patata',
    en: 'Agronomy & Potato Cultivars',
    de: 'Agronomie & Kartoffelsorten',
    icon: 'Sprout'
  }
};

export const TYPE_LABELS: Record<string, { es: string; en: string; de: string }> = {
  manuscript: {
    es: 'Manuscrito Histórico',
    en: 'Historical Manuscript',
    de: 'Historisches Manuskript'
  },
  academic_book: {
    es: 'Monografía Académica',
    en: 'Academic Book / Monograph',
    de: 'Wissenschaftliches Fachbuch'
  },
  academic_paper: {
    es: 'Artículo Científico',
    en: 'Scientific Paper',
    de: 'Wissenschaftliche Studie'
  },
  legislation: {
    es: 'Legislación Oficial / BOE',
    en: 'Official Legislation / Gazette',
    de: 'Gesetzgebung / Amtsblatt'
  },
  official_report: {
    es: 'Informe Oficial Institucional',
    en: 'Official Institutional Report',
    de: 'Offizieller Institutsbericht'
  },
  culinary_canon: {
    es: 'Canon Culinario / Recetario Histórico',
    en: 'Culinary Canon / Historic Cookbook',
    de: 'Kulinarischer Kanon / Historisches Kochbuch'
  },
  survey: {
    es: 'Estudio Sociológico / Encuesta Demoscópica',
    en: 'Sociological Survey / National Poll',
    de: 'Soziologische Umfrage / Demoskopie'
  },
  historical_chronicle: {
    es: 'Crónica Histórica / Memoria de Época',
    en: 'Historical Chronicle / Period Memoir',
    de: 'Historische Chronik / Zeitzeugenbericht'
  },
  gastronomic_press: {
    es: 'Crítica Gastronómica & Prensa de Referencia',
    en: 'Gastronomic Journalism & Food Press',
    de: 'Gastronomiekritik & Presseartikel'
  },
  archive: {
    es: 'Fondo Documental de Archivo',
    en: 'Archival Document / Collection',
    de: 'Archivdokument / Bestand'
  },
  website: {
    es: 'Portal Oficial / Registro Digital',
    en: 'Official Web Registry',
    de: 'Offizielles Webportal'
  }
};

/**
 * Returns all bibliography items, sorted chronologically or alphabetically
 */
export async function getAllBibliographyEntries(): Promise<BibliographyEntry[]> {
  const entries = await getCollection('bibliography');
  return entries.sort((a, b) => {
    const yearA = typeof a.data.year === 'number' ? a.data.year : parseInt(String(a.data.year), 10) || 9999;
    const yearB = typeof b.data.year === 'number' ? b.data.year : parseInt(String(b.data.year), 10) || 9999;
    return yearA - yearB;
  });
}

/**
 * Localizes a single bibliography entry for a given language
 */
export function localizeBibliographyEntry(entry: BibliographyEntry, lang: 'es' | 'en' | 'de' = 'es'): LocalizedBibliographyItem {
  const { data } = entry;
  const l = (obj?: { es?: string; en?: string; de?: string }) => {
    if (!obj) return '';
    return obj[lang] || obj.es || obj.en || '';
  };

  const typeLabel = TYPE_LABELS[data.type]?.[lang] || data.type;
  const categoryLabel = CATEGORY_LABELS[data.category]?.[lang] || data.category;

  return {
    id: data.id,
    title: l(data.title),
    authors: data.authors,
    year: data.year,
    type: data.type,
    typeLabel,
    category: data.category,
    categoryLabel,
    publication: data.publication,
    publisher: data.publisher,
    location: data.location,
    url: data.url,
    doi: data.doi,
    officialCode: data.officialCode,
    citationText: data.citationText,
    summary: l(data.summary),
    keyTakeaway: l(data.keyTakeaway),
    quote: l(data.quote),
    relatedArticleSlugs: data.relatedArticleSlugs || [],
    verified: data.verified,
    tags: data.tags,
  };
}

/**
 * Retrieves all bibliography entries localized for a target language
 */
export async function getLocalizedBibliography(lang: 'es' | 'en' | 'de' = 'es'): Promise<LocalizedBibliographyItem[]> {
  const rawEntries = await getAllBibliographyEntries();
  return rawEntries.map((e) => localizeBibliographyEntry(e, lang));
}

/**
 * Finds bibliography sources related to a specific article or topic slug (e.g. 'history', 'science', 'recipes', 'navarra')
 */
export async function getBibliographyForArticle(
  articleSlug: string,
  lang: 'es' | 'en' | 'de' = 'es'
): Promise<LocalizedBibliographyItem[]> {
  const all = await getLocalizedBibliography(lang);
  const normalizedSlug = articleSlug.toLowerCase().trim();
  
  return all.filter((item) => {
    // Direct slug match in relatedArticleSlugs
    const matchesSlug = item.relatedArticleSlugs.some(
      (slug) => slug.toLowerCase() === normalizedSlug || normalizedSlug.includes(slug.toLowerCase())
    );
    // Category match
    const matchesCategory = item.category.toLowerCase() === normalizedSlug;
    return matchesSlug || matchesCategory;
  });
}

/**
 * Finds specific bibliography sources by their explicit IDs
 */
export async function getBibliographyByIds(
  ids: string[],
  lang: 'es' | 'en' | 'de' = 'es'
): Promise<LocalizedBibliographyItem[]> {
  const all = await getLocalizedBibliography(lang);
  const idSet = new Set(ids);
  return all.filter((item) => idSet.has(item.id));
}
