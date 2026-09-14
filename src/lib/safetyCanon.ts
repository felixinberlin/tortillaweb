/**
 * Centralized Safety Canon & Pasteurization Standards
 * Single Source of Truth synchronized with XLIFF definitions (src/i18n/xlf/safety_canon.*.xlf).
 *
 * Mandatory figures (always bolded in editorial texts):
 * - Gold Standard: **70°C for 2 minutes** (≥ 5 log reduction of Salmonella enteritidis)
 * - Intermediate Threshold: **63°C for 20 seconds**
 * - Ambient Exposure Limit: **4 hours** max
 * - Refrigeration Threshold: <8°C (optimal 4°C)
 */

export type SupportedLang = 'es' | 'en' | 'de';
export type SafetyLevel = 'safe' | 'warning' | 'danger';

export interface SafetyStandardEntry {
  es: string;
  en: string;
  de: string;
}

export const SAFETY_COLORS = {
  safe: '#2E7D32',      // Success / 70°C for 2 minutes / <8°C refrig
  warning: '#FFC107',   // Caution / 63°C for 20 seconds
  danger: '#B00020',    // Danger / >4h ambient exposure
  orangeThreshold: '#FF8A00',
  crimsonBactericidal: '#D32F2F',
} as const;

export const SAFETY_CANON: Record<string, SafetyStandardEntry> = {
  // 1. Full Legal & Culinary Safety Notice
  fullNotice: {
    es: 'Para garantizar la inocuidad microbiológica y la destrucción de Salmonella spp., el estándar de cocinado bactericida exige alcanzar **70°C durante 2 minutos** (o **63°C durante 20 segundos** como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de **4 horas** a temperatura ambiente.',
    en: 'To guarantee microbiological safety and destruction of Salmonella spp., the bactericidal cooking standard requires reaching **70°C for 2 minutes** (or **63°C for 20 seconds** as an intermediate threshold). Runny tortillas should not remain for more than **4 hours** at ambient temperature.',
    de: 'Für maximale Lebensmittelsicherheit und bakterizide Pasteurisierung verlangt der Standard **70°C für 2 Minuten** (oder **63°C für 20 Sekunden** als mittlere Stufe). Saftige Tortillas sollten nicht länger als **4 Stunden** bei Raumtemperatur stehen.',
  },

  // 2. Summary Notice
  summaryNotice: {
    es: 'El estándar de oro sanitario exige **70°C durante 2 minutos** en el corazón de la masa para inocuidad total frente a Salmonella.',
    en: 'The golden culinary safety standard mandates **70°C for 2 minutes** at core for total safety against Salmonella.',
    de: 'Der Goldstandard für Lebensmittelsicherheit fordert **70°C für 2 Minuten** im Kern für vollständige Salmonellenabtötung.',
  },

  // 3. Optimal Threshold (Safe / Gold Standard)
  optimalThreshold: {
    es: '**70°C durante 2 minutos**',
    en: '**70°C for 2 minutes**',
    de: '**70°C für 2 Minuten**',
  },

  // 4. Intermediate Threshold (Warning / Caution)
  intermediateThreshold: {
    es: '**63°C durante 20 segundos**',
    en: '**63°C for 20 seconds**',
    de: '**63°C für 20 Sekunden**',
  },

  // 5. Ambient Exposure Limit
  ambientLimit: {
    es: 'Máximo **4 horas** a temperatura ambiente',
    en: 'Maximum **4 hours** at ambient temperature',
    de: 'Maximal **4 Stunden** bei Raumtemperatur',
  },

  // 6. Refrigeration Threshold
  refrigeration: {
    es: 'Refrigeración a <8°C (óptimo 4°C)',
    en: 'Refrigeration below <8°C (optimal 4°C)',
    de: 'Kühlung unter <8°C (optimal 4°C)',
  },

  // 7. Status Badge Strings
  statusSafe: {
    es: 'Seguro: **70°C durante 2 minutos** (<8°C refrig)',
    en: 'Safe: **70°C for 2 minutes** (<8°C refrig)',
    de: 'Sicher: **70°C für 2 Minuten** (<8°C Kühlung)',
  },
  statusWarning: {
    es: 'Precaución: **63°C durante 20 segundos** (consumo inmediato)',
    en: 'Caution: **63°C for 20 seconds** (immediate consumption)',
    de: 'Achtung: **63°C für 20 Sekunden** (sofortiger Verzehr)',
  },
  statusDanger: {
    es: 'Peligro: Riesgo Alto (>4 horas a temperatura ambiente)',
    en: 'Danger: High Risk (>4 hours at ambient temperature)',
    de: 'Gefahr: Hohes Risiko (>4 Stunden bei Raumtemperatur)',
  },

  // 8. Compact SVG / Visual Badge
  compactBadge: {
    es: '🛡️ 70°C 2min / 63°C 20s',
    en: '🛡️ 70°C 2min / 63°C 20s',
    de: '🛡️ 70°C 2min / 63°C 20s',
  },

  // 9. Technical Reduction Target
  reductionClaim: {
    es: 'Reducción bactericida ≥ 5 log de Salmonella enteritidis',
    en: 'Bactericidal ≥ 5 log reduction of Salmonella enteritidis',
    de: 'Bakterizide Reduktion von ≥ 5 log von Salmonella enteritidis',
  },

  // 10. Social Share Snippet
  shareVerifiedRule: {
    es: 'Norma Térmica: 70°C durante 2 minutos / máx 4 horas ambiente.',
    en: 'Safety Rule Verified: 70°C for 2 min / max 4 hours ambient.',
    de: 'Sicherheitsstandard: 70°C für 2 Min / max 4 Std ungekühlt.',
  },

  // 11. PDF Technical Bullets
  pdfSafetyBullets: {
    es: '• Estándar de oro sanitario: 70°C durante 2 minutos en el corazón para inocuidad total frente a Salmonella.\n• Alternativa térmica segura: 63°C durante 20 segundos. Límite ambiente: máximo 4 horas antes de refrigerar (<8°C).',
    en: '• Gold standard: 70°C for 2 minutes at core for total safety against Salmonella.\n• Rapid alternative: 63°C for 20 seconds. Ambient limit: maximum 4 hours before refrigeration (<8°C).',
    de: '• Goldstandard: 70°C für 2 Minuten im Kern für absolute Salmonellenfreiheit.\n• Schnelle Alternative: 63°C für 20 Sekunden. Raumtemperaturgrenze: maximal 4 Stunden vor Kühlung (<8°C).',
  },
};

/**
 * Returns the full bactericidal cooking warning in the specified language.
 */
export function getSafetyFullNotice(lang: string = 'es'): string {
  const safeLang = (lang in SAFETY_CANON.fullNotice ? lang : 'es') as SupportedLang;
  return SAFETY_CANON.fullNotice[safeLang];
}

/**
 * Returns the short core safety summary statement.
 */
export function getSafetySummaryNotice(lang: string = 'es'): string {
  const safeLang = (lang in SAFETY_CANON.summaryNotice ? lang : 'es') as SupportedLang;
  return SAFETY_CANON.summaryNotice[safeLang];
}

/**
 * Returns formatted status badge label for Safe, Warning, or Danger levels.
 */
export function getSafetyStatusLabel(level: SafetyLevel, lang: string = 'es'): string {
  const safeLang = (lang === 'en' || lang === 'de' || lang === 'es' ? lang : 'es') as SupportedLang;
  switch (level) {
    case 'safe':
      return SAFETY_CANON.statusSafe[safeLang];
    case 'warning':
      return SAFETY_CANON.statusWarning[safeLang];
    case 'danger':
      return SAFETY_CANON.statusDanger[safeLang];
  }
}

/**
 * Returns the PDF technical sheet safety bullets block.
 */
export function getPdfSafetyBullets(lang: string = 'es'): string {
  const safeLang = (lang === 'en' || lang === 'de' || lang === 'es' ? lang : 'es') as SupportedLang;
  return SAFETY_CANON.pdfSafetyBullets[safeLang];
}

/**
 * Returns the verified rule text for social sharing and trivia challenges.
 */
export function getShareVerifiedRule(lang: string = 'es'): string {
  const safeLang = (lang === 'en' || lang === 'de' || lang === 'es' ? lang : 'es') as SupportedLang;
  return SAFETY_CANON.shareVerifiedRule[safeLang];
}
