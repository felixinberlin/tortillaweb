import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import {
  Egg,
  CookingPot,
  Flame,
  FlaskConical,
  BookOpen,
  Gamepad2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    key: "ingredients",
    href: "/ingredients",
    icon: Egg,
  },
  {
    key: "recipes",
    href: "/recipes",
    icon: CookingPot,
  },
  {
    key: "techniques",
    href: "/techniques",
    icon: Flame,
  },
  {
    key: "science",
    href: "/science",
    icon: FlaskConical,
  },
  {
    key: "history",
    href: "/history",
    icon: BookOpen,
  },
  {
    key: "builder",
    href: "/builder",
    icon: Gamepad2,
  },
];

export default function FeatureGrid() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          {t("features.title")}
        </h2>

        <p className="mt-4 text-muted-foreground">
          {t("features.subtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <LocalizedLink key={feature.key} to={feature.href} className="block group">
              <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg border border-border">
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 transition group-hover:bg-orange-600 group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold group-hover:text-amber-600 transition">
                    {t(`features.cards.${feature.key}.title`)}
                  </h3>

                  <p className="text-muted-foreground">
                    {t(`features.cards.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </LocalizedLink>
          );
        })}
      </div>
    </section>
  );
}
