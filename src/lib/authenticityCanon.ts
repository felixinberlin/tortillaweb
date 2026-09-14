/**
 * Authenticity Canon (Source of Truth)
 * Editorial taxonomy markers (Fact vs Legend vs Opinion) and verified source badges.
 * Backed by canonical XLIFF definitions in /src/i18n/xlf/authenticity_canon.{en,de}.xlf
 */

export type EditorialTaxonomyType = 'fact' | 'legend' | 'opinion';

export const AUTHENTICITY_CANON = {
  taxonomy: {
    fact: {
      type: 'fact' as const,
      badgeColor: '#2E7D32',
      es: 'Hecho Histórico Documentado (FACT)',
      en: 'Documented Historical Fact (FACT)',
      de: 'Dokumentierte historische Tatsache (FACT)',
      description: {
        es: 'Respaldado por archivos históricos primarios (1798 Villanueva de la Serena, 1817 Cortes de Navarra, estudios CSIC).',
        en: 'Backed by primary archival documentation (1798 Villanueva de la Serena, 1817 Cortes de Navarra, CSIC studies).',
        de: 'Gestützt auf historische Primärquellen (1798 Villanueva de la Serena, 1817 Cortes de Navarra, CSIC-Studien).',
      },
    },
    legend: {
      type: 'legend' as const,
      badgeColor: '#FF8A00',
      es: 'Leyenda Popular (LEGEND)',
      en: 'Popular Legend (LEGEND)',
      de: 'Populäre Legende (LEGEND)',
      description: {
        es: 'Folklore cultural sin respaldo documental contemporáneo (General Tomás de Zumalacárregui, campesina anónima navarra).',
        en: 'Cultural folklore without contemporary documentary evidence (General Tomás de Zumalacárregui, anonymous Navarrese farmwife).',
        de: 'Kulturelle Überlieferung ohne zeitgenössische Primärbelege (General Tomás de Zumalacárregui, anonyme Bäuerin).',
      },
    },
    opinion: {
      type: 'opinion' as const,
      badgeColor: '#00A3FF',
      es: 'Preferencia Cultural / Tradición (OPINION)',
      en: 'Cultural Tradition / Opinion (OPINION)',
      de: 'Kulturelle Tradition / Meinung (OPINION)',
      description: {
        es: 'Debates gastronómicos y preferencias de facción (cebolla vs sin cebolla, cuajado Betanzos vs clásico, variedad de patata).',
        en: 'Gastronomic debates and faction preferences (onion vs no onion, Betanzos runny vs classic, potato variety).',
        de: 'Gastronomische Debatten und Fraktionsvorlieben (Zwiebel vs. keine Zwiebel, Betanzos saftig vs. klassisch, Kartoffelsorte).',
      },
    },
  },
  sources: {
    boe: {
      es: 'BOE: Legislación Oficial',
      en: 'BOE: Official Spanish Legislation',
      de: 'BOE: Spanisches Amtsblatt & Gesetzgebung',
    },
    csic: {
      es: 'CSIC: Archivo Científico',
      en: 'CSIC: Scientific Research Archive',
      de: 'CSIC: Wissenschaftliches Forschungsarchiv',
    },
    aesan: {
      es: 'AESAN: Seguridad Alimentaria',
      en: 'AESAN: Spanish Food Safety Agency',
      de: 'AESAN: Spanische Agentur für Lebensmittelsicherheit',
    },
    bne: {
      es: 'BNE: Biblioteca Nacional',
      en: 'BNE: National Library Historical Archives',
      de: 'BNE: Historische Archive der Nationalbibliothek',
    },
    cis: {
      es: 'CIS: Demografía y Sondeos',
      en: 'CIS: National Sociological Surveys',
      de: 'CIS: Soziologische Umfragen Spanien',
    },
  },
};

export function getEditorialTaxonomyLabel(
  type: EditorialTaxonomyType,
  lang: 'es' | 'en' | 'de' = 'es'
): string {
  return AUTHENTICITY_CANON.taxonomy[type]?.[lang] || AUTHENTICITY_CANON.taxonomy[type]?.es || '';
}

export function getEditorialSourceLabel(
  sourceKey: keyof typeof AUTHENTICITY_CANON.sources,
  lang: 'es' | 'en' | 'de' = 'es'
): string {
  return AUTHENTICITY_CANON.sources[sourceKey]?.[lang] || AUTHENTICITY_CANON.sources[sourceKey]?.es || '';
}
