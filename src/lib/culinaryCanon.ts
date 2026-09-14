/**
 * Culinary Canon (Source of Truth)
 * Thermodynamic standards, golden ratios, and frying parameters.
 * Backed by canonical XLIFF definitions in /src/i18n/xlf/culinary_canon.{en,de}.xlf
 */

export const CULINARY_CANON = {
  ratios: {
    potatoPerEgg: {
      es: '100g de patata por cada huevo (o 1 kg por 6-8 huevos)',
      en: '100g potato per egg (or 1 kg per 6-8 eggs)',
      de: '100g Kartoffel pro Ei (oder 1 kg für 6-8 Eier)',
    },
    salt: {
      es: '1,2% del peso total (12g de sal por kg de patata pelada)',
      en: '1.2% of total weight (12g salt per kg of peeled potato)',
      de: '1,2% des Gesamtgewichts (12g Salz pro kg geschälte Kartoffeln)',
    },
    absorbedOil: {
      es: '~10% de absorción de AOVE (~60-80ml por tortilla de 6 huevos)',
      en: '~10% EVOO absorption (~60-80ml per 6-egg tortilla)',
      de: '~10% Olivenölabsorption (~60-80ml pro 6-Eier-Tortilla)',
    },
  },
  thermal: {
    poaching: {
      temperature: '130°C - 140°C',
      es: 'Confitado a 130°C - 140°C en AOVE abundante',
      en: 'Confit at 130°C - 140°C in abundant EVOO',
      de: 'Sanftes Garen bei 130°C - 140°C in reichlich Olivenöl',
    },
    searing: {
      temperature: '180°C',
      es: 'Sellado en sartén caliente a 180°C',
      en: 'Searing in hot pan at 180°C',
      de: 'Kurzes Anbraten in heißer Pfanne bei 180°C',
    },
    eggCoagulation: {
      temperature: '62°C',
      es: 'Coagulación proteica del huevo a partir de 62°C',
      en: 'Egg protein coagulation starting at 62°C',
      de: 'Eiweißgerinnung beginnt ab 62°C',
    },
    starchGelatinization: {
      temperature: '60°C - 65°C',
      es: 'Gelatinización de almidón entre 60°C y 65°C',
      en: 'Potato starch gelatinization between 60°C and 65°C',
      de: 'Kartoffelstärkegelierung zwischen 60°C und 65°C',
    },
  },
};

export function getCulinaryRatioText(
  key: keyof typeof CULINARY_CANON.ratios,
  lang: 'es' | 'en' | 'de' = 'es'
): string {
  return CULINARY_CANON.ratios[key]?.[lang] || CULINARY_CANON.ratios[key]?.es || '';
}

export function getCulinaryThermalText(
  key: keyof typeof CULINARY_CANON.thermal,
  lang: 'es' | 'en' | 'de' = 'es'
): string {
  return CULINARY_CANON.thermal[key]?.[lang] || CULINARY_CANON.thermal[key]?.es || '';
}
