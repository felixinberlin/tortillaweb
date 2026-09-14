/**
 * UI Actions Canon (Source of Truth)
 * Standardized action buttons, exporters, and share copy.
 * Backed by canonical XLIFF definitions in /src/i18n/xlf/ui_actions_canon.{en,de}.xlf
 */

export const UI_ACTIONS_CANON = {
  downloadCooklang: {
    es: 'Descargar Receta Cooklang (.cook)',
    en: 'Download Cooklang Recipe (.cook)',
    de: 'Cooklang-Rezept herunterladen (.cook)',
  },
  exportPdf: {
    es: 'Exportar Ficha Técnica PDF',
    en: 'Export Technical PDF Sheet',
    de: 'Technisches Datenblatt exportieren (PDF)',
  },
  downloadSvg: {
    es: 'Descargar SVG de Laboratorio',
    en: 'Download Laboratory Vector SVG',
    de: 'Labor-Vektorgrafik herunterladen (SVG)',
  },
  copyRecipeLink: {
    es: 'Copiar Enlace de Receta',
    en: 'Copy Recipe Link',
    de: 'Rezept-Link kopieren',
  },
  verifySource: {
    es: 'Verificar Fuente en la Web',
    en: 'Verify Source Online',
    de: 'Quelle online prüfen',
  },
};

export function getUiActionLabel(
  key: keyof typeof UI_ACTIONS_CANON,
  lang: 'es' | 'en' | 'de' = 'es'
): string {
  return UI_ACTIONS_CANON[key]?.[lang] || UI_ACTIONS_CANON[key]?.es || '';
}
