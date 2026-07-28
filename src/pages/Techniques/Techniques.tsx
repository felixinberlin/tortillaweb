import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Utensils, Flame, Timer, RefreshCw, CheckCircle2 } from "lucide-react";

export default function Techniques() {
  const { t } = useTranslation();

  const steps = [
    {
      num: 1,
      key: "step1",
      icon: Utensils,
      color: "text-amber-600 bg-amber-100 border-amber-200",
    },
    {
      num: 2,
      key: "step2",
      icon: Flame,
      color: "text-orange-600 bg-orange-100 border-orange-200",
    },
    {
      num: 3,
      key: "step3",
      icon: Timer,
      color: "text-blue-600 bg-blue-100 border-blue-200",
    },
    {
      num: 4,
      key: "step4",
      icon: RefreshCw,
      color: "text-emerald-600 bg-emerald-100 border-emerald-200",
    },
    {
      num: 5,
      key: "step5",
      icon: CheckCircle2,
      color: "text-amber-600 bg-amber-100 border-amber-200",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("techniquesPage.badge", "Maestría en la Cocina")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {t("techniquesPage.title", "Técnicas y Pasos Críticos")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("techniquesPage.subtitle", "Desde el chasquido inicial de la patata hasta el movimiento decidido del volteo en la sartén.")}
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.key} className="border border-border shadow-sm transition hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl border flex items-center justify-center ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                    {t(`techniquesPage.${step.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pl-16">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t(`techniquesPage.${step.key}.desc`)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
