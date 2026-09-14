import { parseXlf } from './xlfParser';

// Raw imports of all canonical XLIFF 1.2 files
import safetyEn from '../i18n/xlf/safety_canon.en.xlf?raw';
import safetyDe from '../i18n/xlf/safety_canon.de.xlf?raw';

import factionsEn from '../i18n/xlf/factions_canon.en.xlf?raw';
import factionsDe from '../i18n/xlf/factions_canon.de.xlf?raw';

import culinaryEn from '../i18n/xlf/culinary_canon.en.xlf?raw';
import culinaryDe from '../i18n/xlf/culinary_canon.de.xlf?raw';

import authenticityEn from '../i18n/xlf/authenticity_canon.en.xlf?raw';
import authenticityDe from '../i18n/xlf/authenticity_canon.de.xlf?raw';

import uiActionsEn from '../i18n/xlf/ui_actions_canon.en.xlf?raw';
import uiActionsDe from '../i18n/xlf/ui_actions_canon.de.xlf?raw';

import navEn from '../i18n/xlf/nav_canon.en.xlf?raw';
import navDe from '../i18n/xlf/nav_canon.de.xlf?raw';

import heroEn from '../i18n/xlf/hero_canon.en.xlf?raw';
import heroDe from '../i18n/xlf/hero_canon.de.xlf?raw';

import builderEn from '../i18n/xlf/builder_canon.en.xlf?raw';
import builderDe from '../i18n/xlf/builder_canon.de.xlf?raw';

import footerEn from '../i18n/xlf/footer_canon.en.xlf?raw';
import footerDe from '../i18n/xlf/footer_canon.de.xlf?raw';

import contactEn from '../i18n/xlf/contact_canon.en.xlf?raw';
import contactDe from '../i18n/xlf/contact_canon.de.xlf?raw';

import scienceEn from '../i18n/xlf/science_canon.en.xlf?raw';
import scienceDe from '../i18n/xlf/science_canon.de.xlf?raw';

import ingredientsEn from '../i18n/xlf/ingredients_canon.en.xlf?raw';
import ingredientsDe from '../i18n/xlf/ingredients_canon.de.xlf?raw';

import storeEn from '../i18n/xlf/store_canon.en.xlf?raw';
import storeDe from '../i18n/xlf/store_canon.de.xlf?raw';

import triviaEn from '../i18n/xlf/trivia_canon.en.xlf?raw';
import triviaDe from '../i18n/xlf/trivia_canon.de.xlf?raw';

const catalogues = [
  { name: 'safety', en: safetyEn, de: safetyDe },
  { name: 'factions', en: factionsEn, de: factionsDe },
  { name: 'culinary', en: culinaryEn, de: culinaryDe },
  { name: 'authenticity', en: authenticityEn, de: authenticityDe },
  { name: 'ui_actions', en: uiActionsEn, de: uiActionsDe },
  { name: 'nav', en: navEn, de: navDe },
  { name: 'hero', en: heroEn, de: heroDe },
  { name: 'builder', en: builderEn, de: builderDe },
  { name: 'footer', en: footerEn, de: footerDe },
  { name: 'contact', en: contactEn, de: contactDe },
  { name: 'science', en: scienceEn, de: scienceDe },
  { name: 'ingredients', en: ingredientsEn, de: ingredientsDe },
  { name: 'store', en: storeEn, de: storeDe },
  { name: 'trivia', en: triviaEn, de: triviaDe },
];

export type LangCode = 'es' | 'en' | 'de';

/**
 * Registry storing flattened key-value pairs parsed from canonical XLIFF files.
 */
export const xlfRegistry: Record<LangCode, Record<string, string>> = {
  es: {},
  en: {},
  de: {},
};

// Build the in-memory registry once at module initialization
for (const cat of catalogues) {
  const parsedEn = parseXlf(cat.en);
  const parsedDe = parseXlf(cat.de);

  // Ingest Spanish (source from English catalogue)
  for (const [id, unit] of Object.entries(parsedEn.units)) {
    if (unit.source) {
      xlfRegistry.es[id] = unit.source;
    }
  }

  // Ingest English targets
  for (const [id, unit] of Object.entries(parsedEn.units)) {
    if (unit.target) {
      xlfRegistry.en[id] = unit.target;
    }
  }

  // Ingest German targets
  for (const [id, unit] of Object.entries(parsedDe.units)) {
    if (unit.target) {
      xlfRegistry.de[id] = unit.target;
    }
  }
}

// Map camelCase aliases to canonical XLIFF IDs
const keyAliases: Record<string, string> = {
  'safety.goldStandardFull': 'safety.gold_standard.full',
  'safety.goldStandardSummary': 'safety.gold_standard.summary',
  'safety.optimalThreshold': 'safety.threshold.optimal',
  'safety.intermediateThreshold': 'safety.threshold.intermediate',
  'safety.ambientLimit': 'safety.threshold.ambient_limit',
  'safety.refrigeration': 'safety.threshold.refrigeration',
  'safety.statusSafe': 'safety.status.safe',
  'safety.statusWarning': 'safety.status.warning',
  'safety.statusDanger': 'safety.status.danger',
  'safety.compactBadge': 'safety.badge.compact',
  'safety.reductionClaim': 'safety.reduction.salmonella',
  'safety.shareVerifiedRule': 'safety.share.rule_verified',
};

for (const lang of ['es', 'en', 'de'] as LangCode[]) {
  for (const [alias, canonicalId] of Object.entries(keyAliases)) {
    if (xlfRegistry[lang][canonicalId]) {
      xlfRegistry[lang][alias] = xlfRegistry[lang][canonicalId];
    }
  }
}

/**
 * Direct lookup function for XLIFF translation units.
 */
export function getXlfTranslation(lang: string, key: string): string | undefined {
  const normalizedLang: LangCode = (lang === 'en' || lang === 'de') ? lang : 'es';
  const targetDict = xlfRegistry[normalizedLang];
  if (targetDict && targetDict[key]) {
    return targetDict[key];
  }
  // Fallback to Spanish source if present
  if (normalizedLang !== 'es' && xlfRegistry.es[key]) {
    return xlfRegistry.es[key];
  }
  return undefined;
}

/**
 * List all loaded XLIFF unit keys for inspection and testing.
 */
export function getAllXlfKeys(): string[] {
  return Object.keys(xlfRegistry.es);
}
