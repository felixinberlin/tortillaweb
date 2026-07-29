import React from "react";
import { useTranslation } from "react-i18next";
import { ChefHat, ShieldCheck, Heart, BookOpen } from "lucide-react";
import LocalizedLink from "@/components/navigation/LocalizedLink";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-[#FFB800] bg-amber-500/10 px-1 py-0.5 rounded">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer relative overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 bg-radial-gradient opacity-5 pointer-events-none" />

      <div className="footer-container relative z-10">
        {/* Brand Column */}
        <div className="footer-brand space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#FFB800] text-[#2A2421] shadow-2xs border border-amber-300">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h3 className="tracking-tight m-0">
                tortilladepatatas.org
              </h3>
              <p className="font-script text-sm opacity-80 -mt-1 m-0">
                {t("footer.subtitle", "Gastronomía, Tradición & Ciencia Culinaria")}
              </p>
            </div>
          </div>

          <p>
            {t(
              "footer.brandDesc",
              "La enciclopedia gastronómica y cuaderno de laboratorio dedicado a la auténtica tortilla de patatas española."
            )}
          </p>
        </div>

        {/* Navigation Map */}
        <nav className="footer-nav" aria-label="Footer Navigation">
          <h4>
            {t("footer.exploreTitle", "Explorar Cuaderno")}
          </h4>
          <ul>
            <li>
              <LocalizedLink to="/recipes">
                {t("nav.recipes", "Recetas de la Gastronomía")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/builder" className="font-semibold text-amber-700">
                {t("nav.builder", "Constructor Interactivo")}
              </LocalizedLink>
            </li>
            <li>
              <a
                href="http://creator.tortilladepatatas.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-700"
              >
                Tortilla Creator App
              </a>
            </li>
            <li>
              <LocalizedLink to="/ingredients">
                {t("nav.ingredients", "Ingredientes & Proporciones")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/techniques">
                {t("nav.techniques", "Técnicas & Volteado")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/science">
                {t("nav.science", "Ciencia & Seguridad Alimentaria")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/history">
                {t("nav.history", "Historia & Cronología 1767-2025")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/personas">
                {t("nav.personas", "Personas & Creadores")}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/about">
                {t("nav.about", "Sobre Nosotros")}
              </LocalizedLink>
            </li>
          </ul>
        </nav>

        {/* Food Safety Laboratory Notice Card */}
        <div className="space-y-3">
          <div className="footer-safety-notice relative">
            <h4>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{t("footer.safetyTitle", "Estándar de Seguridad Bactericida")}</span>
            </h4>

            <p className="mb-2">
              {renderFormattedText(
                t(
                  "footer.safetyText",
                  "Para garantizar la inocuidad microbiológica y la destrucción de Salmonella spp., el estándar de cocinado bactericida exige alcanzar **70°C for 2 minutes** (o **63°C for 20 seconds** como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de **4 hours** a temperatura ambiente."
                )
              )}
            </p>

            <div className="pt-2 border-t border-amber-500/10 flex items-center justify-between text-[11px] opacity-80">
              <span className="font-mono">{t("footer.safetyNorm", "Normativa Colectividades Real Decreto 1021/2022")}</span>
              <LocalizedLink to="/science" className="font-bold text-amber-700 hover:underline flex items-center gap-1">
                <span>{t("footer.viewReport", "Ver Informe")}</span>
                <BookOpen className="w-3 h-3" />
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} tortilladepatatas.org. {t("footer.rights", "Todos los derechos reservados.")}
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          <span>{t("footer.craftedWith", "Hecho con")}</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>{t("footer.forGastronomy", "para los amantes de la gastronomía y la ciencia culinaria.")}</span>
        </p>
      </div>
    </footer>
  );
}
