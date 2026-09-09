import { useEffect } from "react";
import i18n from "@/i18n/config";

const supportedLanguages = ["es", "en", "de"];

export default function LanguageSync({ lang }: { lang?: string }) {
  useEffect(() => {
    let currentLang = lang;
    if (!currentLang && typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts.length > 0 && supportedLanguages.includes(parts[0])) {
        currentLang = parts[0];
      }
    }
    if (currentLang && supportedLanguages.includes(currentLang)) {
      if (i18n.language !== currentLang) {
        i18n.changeLanguage(currentLang);
      }
    }
  }, [lang]);

  return null;
}
