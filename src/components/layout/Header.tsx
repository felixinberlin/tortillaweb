import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ChefHat, Languages, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import LocalizedLink from "@/components/navigation/LocalizedLink";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const navigation = [
  {
    key: "recipes",
    href: "/recipes",
  },
  {
    key: "ingredients",
    href: "/ingredients",
  },
  {
    key: "techniques",
    href: "/techniques",
  },
  {
    key: "science",
    href: "/science",
  },
  {
    key: "history",
    href: "/history",
  },
  {
    key: "personas",
    href: "/personas",
  },
  {
    key: "about",
    href: "/about",
  },
];

const languages = [
  {
    code: "es",
    label: "ES",
  },
  {
    code: "en",
    label: "EN",
  },
  {
    code: "de",
    label: "DE",
  },
];

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    const parts = location.pathname.split("/").filter(Boolean);

    if (parts.length > 0 && ["es", "en", "de"].includes(parts[0])) {
      parts[0] = lang;
    } else {
      parts.unshift(lang);
    }

    navigate(`/${parts.join("/")}`);
  };

  const isLinkActive = (href: string) => {
    return location.pathname.endsWith(href) || location.pathname.includes(href);
  };

  return (
    <header className="site-header border-t-4 border-[#FFB800] bg-[#FCF9F2]/95 backdrop-blur-xs sticky top-0 z-50 shadow-2xs border-b border-[#E8E2D5]">
      <div className="header-container max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <LocalizedLink
          to="/"
          className="brand-logo flex items-center gap-2.5 group shrink-0"
        >
          <div className="brand-icon p-2 rounded-xl bg-[#FFB800] text-[#4A3B32] shadow-2xs border border-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center">
            <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading font-black text-sm xs:text-base sm:text-xl text-foreground tracking-tight leading-tight group-hover:text-amber-900 transition-colors">
              tortilladepatatas.org
            </span>
            <span className="font-script text-xs sm:text-sm text-amber-800/90 -mt-0.5 hidden xs:block">
              Cuaderno & Ciencia
            </span>
          </div>
        </LocalizedLink>

        {/* Desktop Navigation */}
        <nav className="nav-desktop hidden xl:flex items-center gap-1 bg-[#FAF6EE] p-1.5 rounded-xl border border-[#E8E2D5] shadow-2xs" aria-label="Main Navigation">
          {navigation.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <LocalizedLink
                key={item.href}
                to={item.href}
                className={`nav-link px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  active
                    ? "bg-[#8D6E63] text-white shadow-2xs"
                    : "text-foreground/80 hover:text-foreground hover:bg-[#F5E6BE]/60"
                }`}
              >
                {t(`nav.${item.key}`)}
              </LocalizedLink>
            );
          })}
        </nav>

        {/* Medium-screen Compact Nav */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1" aria-label="Compact Navigation">
          {navigation.slice(0, 5).map((item) => {
            const active = isLinkActive(item.href);
            return (
              <LocalizedLink
                key={item.href}
                to={item.href}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  active
                    ? "bg-[#8D6E63] text-white shadow-2xs"
                    : "text-foreground/80 hover:bg-[#F5E6BE]/60"
                }`}
              >
                {t(`nav.${item.key}`)}
              </LocalizedLink>
            );
          })}
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Quick Safety Seal Badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] text-[11px] font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>70°C for 2 minutes</span>
          </div>

          {/* Language Switcher */}
          <div className="language-switcher flex items-center gap-1 bg-[#F3EFE6] p-1 rounded-lg border border-[#E8E2D5]" role="region" aria-label="Language Selector">
            <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1.5 mr-0.5" />
            {languages.map((language) => {
              const active = location.pathname.startsWith(`/${language.code}`);
              return (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`lang-btn text-[11px] font-bold px-2 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 ${
                    active
                      ? "bg-white text-[#8D6E63] shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={active}
                >
                  {language.label}
                </button>
              );
            })}
          </div>

          {/* Constructor CTA Button */}
          <LocalizedLink to="/builder">
            <Button className="bg-[#8D6E63] hover:bg-[#73564B] text-white font-bold text-xs shadow-2xs border border-[#8D6E63] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{t("hero.buildButton")}</span>
            </Button>
          </LocalizedLink>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Language Switcher */}
          <div className="language-switcher flex items-center gap-0.5 bg-[#F3EFE6] p-0.5 rounded-lg border border-[#E8E2D5]" role="region" aria-label="Language Selector">
            {languages.map((language) => {
              const active = location.pathname.startsWith(`/${language.code}`);
              return (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`lang-btn text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 ${
                    active
                      ? "bg-white text-[#8D6E63] shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={active}
                >
                  {language.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Constructor Quick Link */}
          <LocalizedLink to="/builder">
            <Button size="sm" className="bg-[#8D6E63] hover:bg-[#73564B] text-white text-xs px-2 py-1 font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#FFB800] sm:hidden" />
              <span className="hidden xs:inline">{t("nav.builder", "Constructor")}</span>
            </Button>
          </LocalizedLink>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="border-[#E8E2D5] bg-[#FAF6EE] text-foreground" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <SheetContent side="right" className="p-6 bg-[#FCF9F2] border-l border-[#E8E2D5]">
              {/* Drawer Brand */}
              <div className="flex items-center gap-3 pb-6 border-b border-[#E8E2D5]">
                <div className="p-2 rounded-xl bg-[#FFB800] text-[#4A3B32] shadow-2xs border border-amber-400">
                  <ChefHat className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-extrabold text-lg text-foreground">
                    tortilladepatatas.org
                  </h3>
                  <p className="font-script text-xs text-amber-800">
                    Cuaderno & Ciencia Culinaria
                  </p>
                </div>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navigation.map((item) => {
                  const active = isLinkActive(item.href);
                  return (
                    <LocalizedLink
                      key={item.href}
                      to={item.href}
                      className={`text-base font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        active
                          ? "bg-[#8D6E63] text-white shadow-2xs"
                          : "text-foreground hover:bg-[#F5E6BE]/60"
                      }`}
                    >
                      <span>{t(`nav.${item.key}`)}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>}
                    </LocalizedLink>
                  );
                })}

                {/* Safety Seal in Drawer */}
                <div className="mt-4 p-3 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] text-xs font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Estándar bactericida: **70°C for 2 minutes**</span>
                </div>

                <div className="mt-6 border-t border-[#E8E2D5] pt-6">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Languages className="h-4 w-4 text-amber-700" />
                    <span>Idioma / Language</span>
                  </div>
                  <div className="flex gap-2">
                    {languages.map((language) => {
                      const active = location.pathname.startsWith(`/${language.code}`);
                      return (
                        <Button
                          key={language.code}
                          variant={active ? "default" : "outline"}
                          size="sm"
                          onClick={() => changeLanguage(language.code)}
                          className={`flex-1 font-bold ${
                            active
                              ? "bg-[#8D6E63] text-white"
                              : "border-[#E8E2D5] bg-[#FAF6EE] text-foreground"
                          }`}
                        >
                          {language.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <LocalizedLink to="/builder" className="mt-6">
                  <Button className="w-full bg-[#8D6E63] hover:bg-[#73564B] text-white font-bold shadow-2xs flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FFB800]" />
                    <span>{t("hero.buildButton")}</span>
                  </Button>
                </LocalizedLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}