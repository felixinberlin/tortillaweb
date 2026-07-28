import { useTranslation } from "react-i18next";
import { ChefHat, ShieldCheck, Heart } from "lucide-react";
import LocalizedLink from "@/components/navigation/LocalizedLink";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <ChefHat className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-serif-heading text-amber-400">
              tortilladepatatas.org
            </h3>
          </div>
          <p className="text-sm text-amber-100/80 leading-relaxed mb-4">
            {t(
              "footer.brandDesc",
              "La enciclopedia gastronómica y cuaderno de laboratorio dedicado a la auténtica tortilla de patatas española."
            )}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav" aria-label="Footer Navigation">
          <h4>{t("footer.exploreTitle", "Explorar")}</h4>
          <ul className="space-y-2">
            <li>
              <LocalizedLink to="/recipes">{t("nav.recipes", "Recetas")}</LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/builder">{t("nav.builder", "Constructor")}</LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/ingredients">{t("nav.ingredients", "Ingredientes")}</LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/techniques">{t("nav.techniques", "Técnicas")}</LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/science">{t("nav.science", "Ciencia & Seguridad")}</LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/about">{t("nav.about", "Sobre Nosotros")}</LocalizedLink>
            </li>
          </ul>
        </nav>

        {/* Safety Standard Notice */}
        <div className="footer-safety-notice">
          <h4>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t("footer.safetyTitle", "Estándar de Seguridad")}</span>
          </h4>
          <p>
            {t(
              "footer.safetyText",
              "Para la máxima inocuidad alimentaria y pasteurización bactericida, el estándar de cocinado exige alcanzar "
            )}
            <strong>70°C for 2 minutes</strong> (reducción &ge; 5 log de <em>S. Enteritidis</em>).
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} tortilladepatatas.org. {t("footer.rights", "Todos los derechos reservados.")}
        </p>
        <p className="flex items-center gap-1">
          <span>{t("footer.craftedWith", "Hecho con")}</span>
          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
          <span>{t("footer.forGastronomy", "para los amantes de la gastronomía.")}</span>
        </p>
      </div>
    </footer>
  );
}
