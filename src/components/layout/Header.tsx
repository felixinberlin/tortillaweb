import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ChefHat, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import LocalizedLink from "@/components/navigation/LocalizedLink";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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
    <header className="border-b bg-background">

      <div className="container mx-auto flex h-16 items-center justify-between px-4">


        {/* Logo */}
        <LocalizedLink
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-amber-900 dark:text-amber-100"
        >
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
            <ChefHat className="h-6 w-6" />
          </div>
          <span>Tortilla de Patatas</span>
        </LocalizedLink>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <LocalizedLink
                  to={item.href}
                  className="px-3.5 py-2 text-sm font-medium transition-colors hover:text-amber-600 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  {t(`nav.${item.key}`)}
                </LocalizedLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border text-xs font-semibold">
            <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1.5 mr-0.5" />
            {languages.map((language) => {
              const active = location.pathname.startsWith(`/${language.code}`);
              return (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`px-2 py-1 rounded transition-all ${
                    active
                      ? "bg-background text-amber-600 shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {language.label}
                </button>
              );
            })}
          </div>

          <LocalizedLink to="/builder">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium">
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