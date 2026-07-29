import es from "../i18n/es.json";
import en from "../i18n/en.json";
import de from "../i18n/de.json";

const translations: Record<string, any> = { es, en, de };

export type SupportedLang = "es" | "en" | "de";
export const supportedLanguages: SupportedLang[] = ["es", "en", "de"];

export function getTranslations(lang: string = "es") {
  const dict = translations[lang] || translations.es;

  return function t(key: string, fallback?: string): string {
    const keys = key.split(".");
    let current: any = dict;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to Spanish if key missing in target language
        let esCurrent: any = translations.es;
        for (const ek of keys) {
          if (esCurrent && typeof esCurrent === "object" && ek in esCurrent) {
            esCurrent = esCurrent[ek];
          } else {
            esCurrent = undefined;
            break;
          }
        }
        return typeof esCurrent === "string" ? esCurrent : fallback ?? key;
      }
    }

    if (typeof current === "string") {
      return current;
    }
    return fallback ?? key;
  };
}
