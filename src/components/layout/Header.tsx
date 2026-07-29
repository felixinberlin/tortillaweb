import { useState, useEffect } from "react";
import "@/i18n/config";
import { 
  Menu, 
  ChefHat, 
  Languages, 
  ShieldCheck, 
  Sparkles, 
  X,
  BookOpen,
  Egg,
  Flame,
  Users,
  Info,
  History,
  Home
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  lang?: string;
  currentPath?: string;
}

const navigation = [
  { key: "recipes", href: "/recipes", icon: BookOpen, fallback: "Recetas" },
  { key: "ingredients", href: "/ingredients", icon: Egg, fallback: "Ingredientes" },
  { key: "techniques", href: "/techniques", icon: Flame, fallback: "Técnicas" },
  { key: "science", href: "/science", icon: ShieldCheck, fallback: "Ciencia" },
  { key: "history", href: "/history", icon: History, fallback: "Historia" },
  { key: "personas", href: "/personas", icon: Users, fallback: "Personas" },
  { key: "builder", href: "/builder", icon: Sparkles, fallback: "Constructor" },
  { key: "about", href: "/about", icon: Info, fallback: "Sobre nosotros" },
];

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function Header({ lang = "es", currentPath: propPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientPath, setClientPath] = useState("");

  const { t } = useTranslation(undefined, { lng: lang });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientPath(window.location.pathname);
    }
  }, []);

  const activePath = propPath || clientPath;

  function getLocalizedHref(path: string) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (cleanPath === "/") return `/${lang}`;
    return `/${lang}${cleanPath}`;
  }

  function getLangUrl(targetLang: string) {
    if (!activePath) return `/${targetLang}`;
    const parts = activePath.split("/").filter(Boolean);
    if (parts.length > 0 && ["es", "en", "de"].includes(parts[0])) {
      parts[0] = targetLang;
      return "/" + parts.join("/");
    }
    return `/${targetLang}${activePath}`;
  }

  function isLinkActive(targetPath: string) {
    if (!activePath) return false;
    if (targetPath === "/") {
      return activePath === `/${lang}` || activePath === `/${lang}/` || activePath === "/";
    }
    return activePath.includes(targetPath);
  }

  return (
    <header className="site-header border-t-4 border-[#FFB800] bg-[#FCF9F2]/95 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-[#E8E2D5]">
      {/* Top Header Row */}
      <div className="header-container max-w-7xl mx-auto px-4 h-14 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <a
          href={getLocalizedHref("/")}
          className="brand-logo flex items-center gap-2 group shrink-0"
        >
          <div className="brand-icon p-1.5 sm:p-2 rounded-xl bg-[#FFB800] text-[#4A3B32] shadow-2xs border border-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center">
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading font-black text-sm sm:text-lg text-foreground tracking-tight leading-tight group-hover:text-amber-900 transition-colors">
              tortilladepatatas.org
            </span>
            <span className="font-script text-[10px] sm:text-xs text-amber-800/90 -mt-0.5 hidden xs:block">
              Cuaderno & Ciencia Culinaria
            </span>
          </div>
        </a>

        {/* Desktop Main Navigation (lg and above) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FAF6EE] p-1 rounded-xl border border-[#E8E2D5] shadow-2xs" aria-label="Main Navigation">
          <a
            href={getLocalizedHref("/")}
            className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              isLinkActive("/")
                ? "bg-[#8D6E63] text-white shadow-2xs"
                : "text-foreground/80 hover:text-foreground hover:bg-[#F5E6BE]/60"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </a>
          {navigation.map((item) => {
            const active = isLinkActive(item.href);
            const IconComponent = item.icon;
            const labelText = t(`nav.${item.key}`, item.fallback);
            return (
              <a
                key={item.key}
                href={getLocalizedHref(item.href)}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                  active
                    ? "bg-[#8D6E63] text-white shadow-2xs"
                    : "text-foreground/80 hover:text-foreground hover:bg-[#F5E6BE]/60"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{labelText}</span>
              </a>
            );
          })}
        </nav>

        {/* Header Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Safety Seal Badge (Extra large screens) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] text-[11px] font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span><strong>70°C for 2 min</strong></span>
          </div>

          {/* Language Switcher */}
          <div className="language-switcher flex items-center gap-0.5 bg-[#F3EFE6] p-0.5 sm:p-1 rounded-lg border border-[#E8E2D5]" role="region" aria-label="Language Selector">
            <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1 mr-0.5 hidden md:block" />
            {languages.map((language) => {
              const active = lang === language.code;
              return (
                <a
                  key={language.code}
                  href={getLangUrl(language.code)}
                  className={`lang-btn text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded transition-all ${
                    active
                      ? "bg-white text-[#8D6E63] shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={active}
                >
                  {language.label}
                </a>
              );
            })}
          </div>

          {/* Constructor CTA Button (Desktop only) */}
          <a
            href={getLocalizedHref('/builder')}
            className="hidden md:inline-flex bg-[#8D6E63] hover:bg-[#73564B] text-white font-bold text-xs shadow-2xs border border-[#8D6E63] items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{t("hero.buildButton", "Crear Tortilla")}</span>
          </a>

          {/* Mobile Navigation Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 sm:p-2 border border-[#E8E2D5] bg-[#FAF6EE] text-foreground rounded-lg hover:bg-[#F5E6BE]/60 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2-Row / Flex-Wrap Quick Nav Strip on Mobile & Medium Screens */}
      <div className="lg:hidden border-t border-[#E8E2D5] bg-[#FAF6EE]/95 px-2 py-2 flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5 max-w-full shadow-inner">
        <a
          href={getLocalizedHref("/")}
          className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 shrink-0 ${
            isLinkActive("/")
              ? "bg-[#8D6E63] text-white shadow-2xs"
              : "bg-white/90 text-foreground/80 hover:bg-[#F5E6BE]/80 border border-[#E8E2D5]"
          }`}
        >
          <Home className="w-3 h-3" />
          <span>Inicio</span>
        </a>
        {navigation.map((item) => {
          const active = isLinkActive(item.href);
          const IconComponent = item.icon;
          const labelText = t(`nav.${item.key}`, item.fallback);
          return (
            <a
              key={item.key}
              href={getLocalizedHref(item.href)}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                active
                  ? "bg-[#8D6E63] text-white shadow-2xs"
                  : "bg-white/90 text-foreground/80 hover:bg-[#F5E6BE]/80 border border-[#E8E2D5]"
              }`}
            >
              <IconComponent className="w-3 h-3" />
              <span>{labelText}</span>
            </a>
          );
        })}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full max-w-xs bg-[#FCF9F2] h-full p-5 border-l border-[#E8E2D5] flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-[#FFB800] text-[#4A3B32] shadow-2xs border border-amber-400">
                    <ChefHat className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-heading font-extrabold text-base text-foreground">
                      tortilladepatatas.org
                    </h3>
                    <p className="font-script text-xs text-amber-800">
                      Cuaderno & Ciencia Culinaria
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-amber-100 text-foreground cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col gap-1.5">
                <a
                  href={getLocalizedHref("/")}
                  className={`text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("/")
                      ? "bg-[#8D6E63] text-white shadow-2xs"
                      : "text-foreground hover:bg-[#F5E6BE]/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4" />
                    <span>Inicio</span>
                  </div>
                  {isLinkActive("/") && <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>}
                </a>
                {navigation.map((item) => {
                  const active = isLinkActive(item.href);
                  const IconComponent = item.icon;
                  const labelText = t(`nav.${item.key}`, item.fallback);
                  return (
                    <a
                      key={item.key}
                      href={getLocalizedHref(item.href)}
                      className={`text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                        active
                          ? "bg-[#8D6E63] text-white shadow-2xs"
                          : "text-foreground hover:bg-[#F5E6BE]/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4" />
                        <span>{labelText}</span>
                      </div>
                      {active && <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8E2D5]">
              {/* Safety Seal in Mobile Drawer */}
              <div className="p-2.5 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Estándar bactericida: <strong>70°C for 2 minutes</strong></span>
              </div>

              {/* Language Selector in Drawer */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Languages className="h-3.5 w-3.5 text-amber-700" />
                  <span>Idioma / Language</span>
                </div>
                <div className="flex gap-1.5">
                  {languages.map((language) => {
                    const active = lang === language.code;
                    return (
                      <a
                        key={language.code}
                        href={getLangUrl(language.code)}
                        className={`flex-1 text-center text-xs font-bold py-1.5 rounded-lg border transition-all ${
                          active
                            ? "bg-[#8D6E63] text-white border-[#8D6E63]"
                            : "border-[#E8E2D5] bg-[#FAF6EE] text-foreground hover:bg-[#F5E6BE]/60"
                        }`}
                      >
                        {language.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <a
                href={getLocalizedHref('/builder')}
                className="w-full bg-[#8D6E63] hover:bg-[#73564B] text-white font-bold py-2.5 px-4 rounded-xl shadow-2xs flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <span>{t("hero.buildButton", "Crear Tortilla")}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

