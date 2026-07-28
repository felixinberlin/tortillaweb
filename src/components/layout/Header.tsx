import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ChefHat, Languages } from "lucide-react";
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
    const parts = location.pathname
      .split("/")
      .filter(Boolean);


    if (
      parts.length > 0 &&
      ["es", "en", "de"].includes(parts[0])
    ) {
      parts[0] = lang;
    } else {
      parts.unshift(lang);
    }


    navigate(`/${parts.join("/")}`);
  };


  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <LocalizedLink
          to="/"
          className="brand-logo"
        >
          <div className="brand-icon">
            <ChefHat className="h-6 w-6" />
          </div>
          <span>Tortilla de Patatas</span>
        </LocalizedLink>

        {/* Desktop navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          {navigation.map((item) => (
            <LocalizedLink
              key={item.href}
              to={item.href}
              className="nav-link"
            >
              {t(`nav.${item.key}`)}
            </LocalizedLink>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="language-switcher" role="region" aria-label="Language Selector">
            <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1.5 mr-0.5" />
            {languages.map((language) => {
              const active = location.pathname.startsWith(`/${language.code}`);
              return (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`lang-btn ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                >
                  {language.label}
                </button>
              );
            })}
          </div>

          <LocalizedLink to="/builder">
            <Button className="bg-[#8D6E63] hover:bg-[#73564B] text-white font-medium shadow-2xs">
              {t("hero.buildButton")}
            </Button>
          </LocalizedLink>
        </div>





        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <SheetContent side="right" className="p-6">
              <nav className="mt-8 flex flex-col gap-5">
                {navigation.map((item) => (
                  <LocalizedLink
                    key={item.href}
                    to={item.href}
                    className="text-lg font-semibold transition-colors hover:text-amber-600"
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                ))}

                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    <span>Idioma / Language</span>
                  </div>
                  <div className="flex gap-2">
                    {languages.map((language) => (
                      <Button
                        key={language.code}
                        variant={location.pathname.startsWith(`/${language.code}`) ? "default" : "outline"}
                        size="sm"
                        onClick={() => changeLanguage(language.code)}
                        className="flex-1"
                      >
                        {language.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <LocalizedLink to="/builder" className="mt-4">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium">
                    {t("hero.buildButton")}
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