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
  Info,
  Home,
  Shield,
  Library,
  FlaskConical,
  History,
  Palette,
  Users,
  Utensils,
  MapPin,
  Microscope,
  Trophy,
  ChevronDown
} from "lucide-react";
import { useTranslation } from "react-i18next";
import headerNavData from "@/content/navigation/header.json";

interface HeaderProps {
  lang?: string;
  currentPath?: string;
}

const iconMap: Record<string, any> = {
  recipes: BookOpen,
  factions: Shield,
  universo: Library,
  history: History,
  estilos: Palette,
  personas: Users,
  restaurantes: Utensils,
  regiones: MapPin,
  ingredients: Egg,
  techniques: Flame,
  science: Microscope,
  records: Trophy,
  laboratory: FlaskConical,
  about: Info,
};

const navigation = headerNavData.items.map((item: any) => ({
  key: item.key,
  href: item.href,
  icon: iconMap[item.key] || BookOpen,
  label: item.label,
  children: item.children ? item.children.map((child: any) => ({
    key: child.key,
    href: child.href,
    icon: iconMap[child.key] || BookOpen,
    label: child.label,
  })) : undefined,
}));

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function Header({ lang = "es", currentPath: propPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientPath, setClientPath] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("universo");

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

  function getItemLabel(item: { key: string; label: Record<string, string> }) {
    if (item.label && item.label[lang]) {
      return item.label[lang];
    }
    return t(`nav.${item.key}`, item.label?.es || item.key);
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
            <span>{t("nav.home", "Inicio")}</span>
          </a>
          {navigation.map((item: any) => {
            const active = isLinkActive(item.href);
            const IconComponent = item.icon;
            const labelText = getItemLabel(item);

            if (item.children && item.children.length > 0) {
              const hasActiveChild = item.children.some((c: any) => isLinkActive(c.href));
              return (
                <div key={item.key} className="relative group">
                  <a
                    href={getLocalizedHref(item.href)}
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                      active || hasActiveChild
                        ? "bg-[#8D6E63] text-white shadow-2xs"
                        : "text-foreground/80 hover:text-foreground hover:bg-[#F5E6BE]/60"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{labelText}</span>
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </a>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50 min-w-[220px]">
                    <div className="bg-[#FCF9F2] border border-[#E8E2D5] rounded-xl shadow-xl p-2 space-y-0.5">
                      <div className="px-2.5 py-1 text-[10px] font-bold text-amber-800 uppercase tracking-wider border-b border-[#E8E2D5]/60 mb-1">
                        {labelText}
                      </div>
                      {item.children.map((child: any) => {
                        const ChildIcon = child.icon;
                        const childLabel = getItemLabel(child);
                        const childActive = isLinkActive(child.href);
                        return (
                          <a
                            key={child.key}
                            href={getLocalizedHref(child.href)}
                            className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                              childActive
                                ? "bg-[#8D6E63] text-white"
                                : "text-foreground/80 hover:text-foreground hover:bg-[#F5E6BE]"
                            }`}
                          >
                            <ChildIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                            <span>{childLabel}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

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
          <span>{t("nav.home", "Inicio")}</span>
        </a>
        {navigation.map((item: any) => {
          const active = isLinkActive(item.href);
          const IconComponent = item.icon;
          const labelText = getItemLabel(item);
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
                    <span>{t("nav.home", "Inicio")}</span>
                  </div>
                  {isLinkActive("/") && <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>}
                </a>
                {navigation.map((item: any) => {
                  const active = isLinkActive(item.href);
                  const IconComponent = item.icon;
                  const labelText = getItemLabel(item);

                  if (item.children && item.children.length > 0) {
                    const isSubOpen = openSubmenu === item.key;
                    return (
                      <div key={item.key} className="space-y-1">
                        <div
                          className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                            active
                              ? "bg-[#8D6E63] text-white shadow-2xs"
                              : "bg-[#F5E6BE]/40 text-foreground hover:bg-[#F5E6BE]/70"
                          }`}
                        >
                          <a
                            href={getLocalizedHref(item.href)}
                            className="flex items-center gap-2.5 text-sm font-bold flex-1"
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{labelText}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setOpenSubmenu(isSubOpen ? null : item.key)}
                            className="p-1 text-xs text-amber-900 cursor-pointer"
                            aria-label="Toggle submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
                          </button>
                        </div>

                        {isSubOpen && (
                          <div className="pl-3 space-y-1 border-l-2 border-[#FFB800] ml-3 mt-1">
                            {item.children.map((child: any) => {
                              const ChildIcon = child.icon;
                              const childLabel = getItemLabel(child);
                              const childActive = isLinkActive(child.href);
                              return (
                                <a
                                  key={child.key}
                                  href={getLocalizedHref(child.href)}
                                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                                    childActive
                                      ? "bg-[#8D6E63] text-white shadow-2xs"
                                      : "text-foreground hover:bg-[#F5E6BE]/60"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <ChildIcon className="w-3.5 h-3.5 shrink-0" />
                                    <span>{childLabel}</span>
                                  </div>
                                  {childActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]"></span>}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

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
                <span>{t("header.safetyStandard", "Estándar bactericida: ")}<strong>70°C for 2 minutes</strong></span>
              </div>

              {/* Language Selector in Drawer */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Languages className="h-3.5 w-3.5 text-amber-700" />
                  <span>{t("header.languageSelector", "Idioma / Language")}</span>
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

