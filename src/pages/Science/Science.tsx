import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Atom, Thermometer, Flame, Gauge } from "lucide-react";

export default function Science() {
  const { t } = useTranslation();

  const scienceCards = [
    {
      key: "card1",
      icon: Thermometer,
      border: "border-amber-500/20 bg-amber-500/5",
      iconColor: "text-amber-600",
    },
    {
      key: "card2",
      icon: Atom,
      border: "border-blue-500/20 bg-blue-500/5",
      iconColor: "text-blue-600",
    },
    {
      key: "card3",
      icon: Flame,
      border: "border-orange-500/20 bg-orange-500/5",
      iconColor: "text-orange-600",
    },
    {
      key: "card4",
      icon: Gauge,
      border: "border-emerald-500/20 bg-emerald-500/5",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("sciencePage.badge", "Física y Química Culinary")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {t("sciencePage.title", "La Ciencia Detrás de la Tortilla")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("sciencePage.subtitle", "Entiende las transformaciones moleculares del huevo y la patata bajo la acción del calor.")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {scienceCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.key} className={`border ${item.border} shadow-sm transition hover:shadow-md`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-background border shadow-2xs ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {t(`sciencePage.${item.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(`sciencePage.${item.key}.desc`)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
