import { useState, useEffect } from "react";
import "@/i18n/config";
import { ChefHat, ShieldCheck, Heart, BookOpen, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveNavigationTarget, type SupportedLocale } from "@/lib/routes";

interface FooterProps {
  lang?: string;
  currentPath?: string;
}

export default function Footer({ lang = "es", currentPath: propPath }: FooterProps) {
  const [clientPath, setClientPath] = useState("");

  const { t } = useTranslation(undefined, { lng: lang });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientPath(window.location.pathname);
    }
  }, []);

  const activePath = propPath || clientPath;

  function getLocalizedHref(path: string) {
    return resolveNavigationTarget({ to: path }, (lang as SupportedLocale) || 'es');
  }

  function isLinkActive(targetPath: string) {
    if (!activePath) return false;
    const resolvedUrl = getLocalizedHref(targetPath);
    if (targetPath === "/" || resolvedUrl === `/${lang}` || resolvedUrl === `/${lang}/`) {
      return activePath === `/${lang}` || activePath === `/${lang}/` || activePath === "/";
    }
    return activePath === resolvedUrl || activePath.startsWith(`${resolvedUrl}/`);
  }

  return (
    <footer className="site-footer relative overflow-hidden bg-[#2A2421] text-[#E8E2D5] py-12 border-t border-[#8D6E63]/30 mt-16">
      <div className="footer-container max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Brand Column */}
        <div className="footer-brand space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#FFB800] text-[#2A2421] shadow-2xs border border-amber-300">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif-heading font-bold text-lg text-white tracking-tight m-0">
                tortilladepatatas.org
              </h3>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#E8E2D5]/80 leading-relaxed">
            {t(
              "footer.brandDesc",
              "La enciclopedia gastronómica y cuaderno de laboratorio dedicado a la auténtica tortilla de patatas española."
            )}
          </p>
        </div>

        {/* Navigation Map */}
        <nav className="footer-nav space-y-3" aria-label="Footer Navigation">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
            {t("footer.exploreTitle", "Explorar Cuaderno")}
          </h4>
          <ul className="space-y-2 text-xs md:text-sm">
            {[
              { path: "/recipes", label: t("nav.recipes", "Recetas de la Gastronomía") },
              { path: "/builder", label: t("nav.builder", "Constructor Interactivo") },
              { path: "/ingredients", label: t("nav.ingredients", "Ingredientes & Proporciones") },
              { path: "/techniques", label: t("nav.techniques", "Técnicas & Volteado") },
              { path: "/science", label: t("nav.science", "Ciencia & Seguridad Alimentaria") },
              { path: "/history", label: t("nav.history", "Historia & Cronología 1767-2025") },
              { path: "/about", label: t("nav.about", "Sobre Nosotros") },
              { path: "/contacto", label: t("nav.contact", "Contacto & Consultas") },
              { path: "/aviso-legal", label: t("nav.impressum", "Aviso Legal e Impressum") },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={getLocalizedHref(item.path)}
                  className={`flex items-center justify-between group py-0.5 hover:text-white transition-colors ${
                    isLinkActive(item.path) ? "font-bold text-[#FFB800]" : "text-[#E8E2D5]/80"
                  }`}
                >
                  <span>{item.label}</span>
                  {isLinkActive(item.path) && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://tortilladepatatas.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFB800] flex items-center justify-between group py-0.5 hover:underline"
              >
                <span>Tortilla Creator App (tortilladepatatas.de)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Food Safety Notice Card */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
            <h4 className="font-bold text-sm text-[#FFB800] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
              <span>{t("footer.safetyTitle", "Estándar de Seguridad Bactericida")}</span>
            </h4>

            <p className="text-[#E8E2D5]/80 leading-relaxed">
              Para garantizar la inocuidad microbiológica y la destrucción de <i>Salmonella spp.</i>, el estándar de cocinado bactericida exige alcanzar <strong className="font-bold text-[#FFB800] bg-amber-500/10 px-1 py-0.5 rounded">70°C for 2 minutes</strong> (o <strong className="font-bold text-[#FFB800] bg-amber-500/10 px-1 py-0.5 rounded">63°C for 20 seconds</strong> como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de <strong className="font-bold text-[#FFB800] bg-amber-500/10 px-1 py-0.5 rounded">4 hours</strong> a temperatura ambiente.
            </p>

            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-[#E8E2D5]/60">
              <span className="font-mono">{t("footer.safetyNorm", "Normativa Colectividades Real Decreto 1021/2022")}</span>
              <a href={getLocalizedHref('/science')} className="font-bold text-[#FFB800] hover:underline flex items-center gap-1">
                <span>{t("footer.viewReport", "Ver Informe")}</span>
                <BookOpen className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-[#8D6E63]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#E8E2D5]/70 text-center sm:text-left">
        <p>
          2026 tortilladepatatas.org. {t("footer.rights", "Ningún derecho reservado.")}
        </p>
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>{t("footer.craftedWith", "Hecho con")}</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>{t("footer.forGastronomy", "para los amantes de la tortilla de patatas.")}</span>
        </p>
      </div>
    </footer>
  );
}
