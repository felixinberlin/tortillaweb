import { useEffect } from "react";
import { useParams } from "react-router-dom";

import i18n from "@/i18n/config";


const supportedLanguages = [
  "es",
  "en",
  "de",
];


export default function LanguageSync() {
  const { lang } = useParams();


  useEffect(() => {
    if (
      lang &&
      supportedLanguages.includes(lang)
    ) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang]);


  return null;
}