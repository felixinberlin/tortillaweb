import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Atom, Thermometer, Flame, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground underline decoration-amber-500/40">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Science() {
  const { t } = useTranslation();

  const scienceCards = [
    {
      key: "card1",
      icon: Thermometer,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      key: "card2",
      icon: Atom,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      key: "card3",
      icon: Flame,
      iconColor: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      key: "card4",
      icon: ShieldAlert,
      iconColor: "text-red-600 bg-red-50 border-red-200",
    },
  ];

  const thermalLevels = [
    {
      titleKey: "sciencePage.levelPilotTitle",
      descKey: "sciencePage.levelPilotDesc",
      temp: "< 63°C",
      badgeColor: "bg-[#00A3FF]/10 text-[#00A3FF] border-[#00A3FF]/30",
      icon: AlertTriangle,
      statusClass: "safety-danger",
    },
    {
      titleKey: "sciencePage.levelMediumTitle",
      descKey: "sciencePage.levelMediumDesc",
      temp: "63°C / 20s",
      badgeColor: "bg-[#FF8A00]/10 text-[#FF8A00] border-[#FF8A00]/30",
      icon: ShieldAlert,
      statusClass: "safety-warning",
    },
    {
      titleKey: "sciencePage.levelSafeTitle",
      descKey: "sciencePage.levelSafeDesc",
      temp: "70°C / 2min",
      badgeColor: "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30",
      icon: ShieldCheck,
      statusClass: "safety-safe",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3.5 py-1 text-xs font-semibold bg-amber-100 text-amber-900 border-amber-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-amber-600" />
          {t("sciencePage.badge", "Física, Química y Seguridad Alimentaria")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-serif-heading font-bold tracking-tight text-foreground mb-4">
          {t("sciencePage.title", "La Ciencia Detrás de la Tortilla")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("sciencePage.subtitle")}
        </p>
      </div>

      {/* Chef Notebook Handwritten Annotation */}
      <div className="chef-note mb-10 shadow-2xs rounded-lg">
        <p className="font-bold text-base font-sans uppercase tracking-wider text-amber-900 mb-1">
          {t("sciencePage.chefNoteHeader", "Del Cuaderno de la Chef & Laboratorio:")}
        </p>
        <p className="italic font-script text-xl text-amber-950">
          "{renderFormattedText(t("sciencePage.chefNoteText", "La tortilla es una obra maestra de dualidad: la calidez rústica de la patata y la volatilidad científica del huevo. Para garantizar la seguridad bactericida, el estándar oro exige siempre **70°C for 2 minutes** para lograr una reducción ≥ 5 log de S. Enteritidis."))}"
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {scienceCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.key} className="card-notebook p-2">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl font-serif-heading font-bold text-foreground">
                    {t(`sciencePage.${item.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {renderFormattedText(t(`sciencePage.${item.key}.desc`))}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <hr className="my-10 border-border" />

      {/* Thermal Processing Levels */}
      <section className="bg-parchment p-6 sm:p-8 rounded-2xl shadow-stacked-parchment">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-foreground mb-2">
            {t("sciencePage.safetySectionTitle", "Garantía de Seguridad Alimentaria & Térmica")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("sciencePage.safetySectionSub", "Los tres umbrales de procesamiento térmico según la metodología Risk Ranger.")}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {thermalLevels.map((lvl) => {
            const Icon = lvl.icon;
            return (
              <div key={lvl.temp} className={`p-5 rounded-xl border ${lvl.statusClass} flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${lvl.badgeColor}`}>
                      {lvl.temp}
                    </span>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base mb-1">
                    {t(lvl.titleKey)}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-90">
                    {renderFormattedText(t(lvl.descKey))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
