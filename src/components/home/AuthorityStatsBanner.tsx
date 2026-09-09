import React from "react";
import { BookOpen, ShieldCheck, Sparkles, Award } from "lucide-react";

interface AuthorityStatsBannerProps {
  lang?: string;
}

export default function AuthorityStatsBanner({ lang = "es" }: AuthorityStatsBannerProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  const stats = [
    {
      value: "100+",
      label: currentLang === "es" ? "Recetas & Variantes Regionales" : currentLang === "de" ? "Rezepte & Regionale Stile" : "Recipes & Regional Styles",
      desc: currentLang === "es" ? "Desde Betanzos hasta vanguardia" : currentLang === "de" ? "Von Betanzos bis Avantgarde" : "From Betanzos to Modernist",
      icon: BookOpen,
      color: "text-[#FFB800]",
    },
    {
      value: "70°C",
      label: currentLang === "es" ? "Estándar Oro de Seguridad" : currentLang === "de" ? "Gold-Sicherheitsstandard" : "Food Safety Gold Standard",
      desc: currentLang === "es" ? "Pasteurización a 2 minutos" : currentLang === "de" ? "2 Minuten Pasteurisation" : "2-minute thermal pasteurization",
      icon: ShieldCheck,
      color: "text-[#2E7D32]",
    },
    {
      value: "200+",
      label: currentLang === "es" ? "Trivias Históricas Verificadas" : currentLang === "de" ? "Geprüfte Historische Fakten" : "Fact-Verified Historical Trivia",
      desc: currentLang === "es" ? "1798 Villanueva a 2026" : currentLang === "de" ? "1798 Villanueva bis 2026" : "1798 Villanueva to 2026",
      icon: Award,
      color: "text-[#00A3FF]",
    },
    {
      value: "50.000+",
      label: currentLang === "es" ? "Tortillas Calculadas" : currentLang === "de" ? "Berechnete Tortillas" : "Calculated Custom Omelettes",
      desc: currentLang === "es" ? "Algoritmo de proporciones áureas" : currentLang === "de" ? "Goldener Mengen-Algorithmus" : "Golden ratio algorithm engine",
      icon: Sparkles,
      color: "text-[#8D6E63] dark:text-[#FFB800]",
    },
  ];

  return (
    <section className="bg-card/60 border-y border-border py-8 md:py-12 relative">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="card-notebook p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-2xs hover:shadow-sm transition-all text-center space-y-2 flex flex-col items-center justify-center"
              >
                <div className={`p-2.5 rounded-full bg-secondary/80 ${stat.color} mb-1`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                  {stat.label}
                </span>
                <span className="text-[11px] text-muted-foreground leading-tight">
                  {stat.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
