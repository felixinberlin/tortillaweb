import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, History, Compass, HeartHandshake } from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("aboutPage.badge", "Historia y Cultura")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {t("aboutPage.title", "Sobre Tortilla de Patatas")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("aboutPage.subtitle", "Un proyecto dedicado a divulgar, preservar y perfeccionar el icono gastronómico español por excelencia.")}
        </p>
      </div>

      <div className="space-y-8">
        {/* Story Section */}
        <Card className="border border-border shadow-sm overflow-hidden">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <History className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("aboutPage.storyTitle", "El Origen de un Ícono")}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("aboutPage.storyP1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("aboutPage.storyP2")}
            </p>
          </CardContent>
        </Card>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 w-fit">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("aboutPage.missionTitle", "Nuestra Misión")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("aboutPage.missionDesc")}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="p-2.5 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 w-fit">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                tortilladepatatas.org
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Un sitio web rápido, bilingüe y accesible para todos los amantes de la cocina casera tradicional.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
