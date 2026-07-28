import React from "react";
import { useTranslation } from "react-i18next";
import { ChefHat, ShieldCheck, Heart, Sparkles, BookOpen, ShieldAlert, ArrowUpRight } from "lucide-react";
import LocalizedLink from "@/components/navigation/LocalizedLink";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer bg-[#2A2421] text-[#F5E6BE] border-t-4 border-[#FFB800] pt-12 pb-8 mt-16 shadow-stacked-parchment relative overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 bg-radial-gradient opacity-5 pointer-events-none" />

      <div className="footer-container max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        {/* Brand Column (4 Cols) */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFB800] text-[#2A2421] shadow-2xs border border-amber-300">
              <ChefHat className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black font-serif-heading text-[#FFB800] tracking-tight">
                tortilladepatatas.org
              </h3>
              <p className="font-script text-sm text-[#F5E6BE]/80 -mt-0.5">
                Gastronomía, Tradición & Ciencia Culinaria
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#E8E2D5]/80 leading-relaxed">
            {t(
              "footer.brandDesc",
              "La enciclopedia gastronómica y cuaderno de laboratorio dedicado a la auténtica tortilla de patatas española."
            )}
          </p>

          {/* Quick Safety Seals Grid in Brand Column */}
          <div className="pt-2 flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFB800]/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Umbrales Térmicos de Seguridad:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#2E7D32]/20 text-[#81C784] border border-[#2E7D32]/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Seguro: **70°C for 2 minutes**</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#FF8A00]/20 text-[#FFB74D] border border-[#FF8A00]/40 flex items-center gap-1">
                <span>Caution: **63°C for 20 seconds**</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#B00020]/20 text-[#EF5350] border border-[#B00020]/40 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Riesgo: **4 hours** amb.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Map (3 Cols) */}
        <nav className="md:col-span-3 lg:col-span-3 space-y-3" aria-label="Footer Navigation">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FFB800] pb-2 border-b border-[#3D352E]">
            {t("footer.exploreTitle", "Explorar Cuaderno")}
          </h4>
          <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
            <li>
              <LocalizedLink to="/recipes" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.recipes", "Recetas de la Gastronomía")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/builder" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span className="font-semibold text-[#FFB800]">{t("nav.builder", "Constructor Interactivo")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <a
                href="http://creator.tortilladepatatas.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFB800] hover:underline transition-colors flex items-center justify-between group py-0.5 font-bold"
              >
                <span>Tortilla Creator App (creator.tortilladepatatas.org)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB800]" />
              </a>
            </li>
            <li>
              <LocalizedLink to="/ingredients" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.ingredients", "Ingredientes & Proporciones")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/techniques" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.techniques", "Técnicas & Volteado")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/science" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.science", "Ciencia & Seguridad Alimentaria")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/history" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.history", "Historia & Cronología 1767-2025")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/personas" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.personas", "Personas & Creadores")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/about" className="text-[#E8E2D5] hover:text-[#FFB800] transition-colors flex items-center justify-between group py-0.5">
                <span>{t("nav.about", "Sobre Nosotros")}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
              </LocalizedLink>
            </li>
          </ul>
        </nav>

        {/* Food Safety Laboratory Notice Card (4 Cols) */}
        <div className="md:col-span-4 lg:col-span-5 space-y-3">
          <div className="footer-safety-notice bg-[#362E2A] p-5 rounded-2xl border border-amber-500/30 shadow-2xs relative">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-500/20">
              <ShieldCheck className="w-5 h-5 text-[#FFB800]" />
              <h4 className="text-sm font-bold text-[#FFB800] font-serif-heading">
                {t("footer.safetyTitle", "Estándar de Seguridad Bactericida")}
              </h4>
            </div>

            <p className="text-xs text-[#F5E6BE]/90 leading-relaxed mb-3">
              Para garantizar la inocuidad microbiológica y la destrucción de <em>Salmonella spp.</em>, el estándar de cocinado bactericida exige alcanzar **70°C for 2 minutes** (o **63°C for 20 seconds** como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de **4 hours** a temperatura ambiente.
            </p>

            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-[#E8E2D5]/70">
              <span className="font-mono">Normativa Colectividades Real Decreto 1021/2022</span>
              <LocalizedLink to="/science" className="font-bold text-[#FFB800] hover:underline flex items-center gap-1">
                <span>Ver Informe</span>
                <BookOpen className="w-3 h-3" />
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-[#3D352E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A89C90]">
        <p>
          &copy; {new Date().getFullYear()} tortilladepatatas.org. {t("footer.rights", "Todos los derechos reservados.")}
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          <span>{t("footer.craftedWith", "Hecho con")}</span>
          <Heart className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800] inline" />
          <span>{t("footer.forGastronomy", "para los amantes de la gastronomía y la ciencia culinaria.")}</span>
        </p>
      </div>
    </footer>
  );
}
