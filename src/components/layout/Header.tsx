import { Link, useLocation, useNavigate } from "react-router-dom";
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
        <Link
          to="/es"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <ChefHat className="h-6 w-6" />

          <span>
            Tortilla de Patatas
          </span>
        </Link>



        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">

          <NavigationMenuList>

            {navigation.map((item) => (

              <NavigationMenuItem key={item.href}>

                <LocalizedLink
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium transition-colors hover:text-orange-600"
                >
                  {t(`nav.${item.key}`)}
                </LocalizedLink>

              </NavigationMenuItem>

            ))}

          </NavigationMenuList>

        </NavigationMenu>





        {/* Language selector */}
        <div className="hidden md:flex items-center gap-2">

          <Languages className="h-4 w-4" />

          {languages.map((language) => (

            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="text-sm hover:text-orange-600"
            >
              {language.label}
            </button>

          ))}

        </div>





        {/* CTA */}
        <div className="hidden md:block">

          <LocalizedLink to="/builder">

            <Button>
              {t("hero.buildButton")}
            </Button>

          </LocalizedLink>

        </div>





        {/* Mobile menu */}
        <div className="md:hidden">

          <Sheet>

            <SheetTrigger>

              <Button
                variant="ghost"
                size="icon"
              >
                <Menu className="h-5 w-5" />
              </Button>

            </SheetTrigger>


            <SheetContent side="right">

              <nav className="mt-8 flex flex-col gap-4">


                {navigation.map((item) => (

                  <LocalizedLink
                    key={item.href}
                    to={item.href}
                    className="text-lg font-medium hover:text-orange-600"
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>

                ))}



                <div className="mt-4 flex gap-3">

                  {languages.map((language) => (

                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                    >
                      {language.label}
                    </button>

                  ))}

                </div>




                <LocalizedLink to="/builder">

                  <Button className="mt-4 w-full">
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