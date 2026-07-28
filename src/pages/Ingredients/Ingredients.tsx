import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Egg, CookingPot, Droplet, Flame, Scale } from "lucide-react";

export default function Ingredients() {
  const { t } = useTranslation();

  const ingredientsList = [
    {
      key: "potatoes",
      icon: CookingPot,
      accent: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
      badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
      iconColor: "text-amber-600",
    },
    {
      key: "eggs",
      icon: Egg,
      accent: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20",
      badgeColor: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      key: "oil",
      icon: Droplet,
      accent: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
      badgeColor: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      key: "onion",
      icon: Flame,
      accent: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
      badgeColor: "bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200",
      iconColor: "text-orange-600",
    },
    {
      key: "salt",
      icon: Scale,
      accent: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
      badgeColor: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("ingredientsPage.badge", "Los Fundamentos")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {t("ingredientsPage.title", "Los 4 Ingredientes Sagrados")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("ingredientsPage.subtitle", "Una gran tortilla no necesita artificios. La clave reside en la calidad de la materia prima y la proporción justa.")}
        </p>
      </div>

      {/* Ingredients Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {ingredientsList.map((item) => {
          const Icon = item.icon;
          return (
            <Card 
              key={item.key} 
              className={`border bg-gradient-to-br ${item.accent} shadow-sm transition hover:shadow-md`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-background border shadow-2xs ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {t(`ingredientsPage.${item.key}.title`)}
                    </CardTitle>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.badgeColor}`}>
                      {t(`ingredientsPage.${item.key}.subtitle`)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(`ingredientsPage.${item.key}.desc`)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
