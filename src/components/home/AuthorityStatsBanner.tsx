import React from "react";
import { BookOpen, ShieldCheck, Heart, Sparkles } from "lucide-react";

interface AuthorityStatsBannerProps {
  lang?: string;
  recipeCount?: number;
}

const recipeFilesCount = Object.keys(import.meta.glob('/src/content/recipes/*.json')).length;

export default function AuthorityStatsBanner({ lang = "es", recipeCount }: AuthorityStatsBannerProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const totalRecipes = typeof recipeCount === "number" && recipeCount > 0 ? recipeCount : recipeFilesCount;

  const pillars = [
    {
      value: `${totalRecipes} Recetas`,
      label: currentLang === "es" ? "Recetario Tradicional" : currentLang === "de" ? "Traditions-Rezepte" : "Traditional Recipes",
      desc: currentLang === "es" ? "Desde la clásica de la abuela hasta Betanzos melosa" : currentLang === "de" ? "Von Omas Klassiker bis zur saftigen Betanzos" : "From grandma's classic to runny Betanzos",
      icon: BookOpen,
      color: "text-[#FFB800]",
    },
    {
      value: "100% AOVE",
      label: currentLang === "es" ? "Pochado Lento en Aceite" : currentLang === "de" ? "Sanftes Olivenöl-Confit" : "Slow Olive Oil Confit",
      desc: currentLang === "es" ? "Patata pochada con calma hasta quedar tierna como mantequilla" : currentLang === "de" ? "Kartoffeln butterweich gegart bei milder Hitze" : "Potatoes simmered gently until butter-soft and tender",
      icon: Heart,
      color: "text-[#8D6E63] dark:text-[#FFB800]",
    },
    {
      value: "70°C",
      label: currentLang === "es" ? "Seguridad en la Mesa" : currentLang === "de" ? "Sicherheit & Genuss" : "Food Safety & Peace of Mind",
      desc: currentLang === "es" ? "Regla de oro: **70°C por 2 minutos** (o **63°C por 20 segundos**)" : currentLang === "de" ? "Goldstandard: **70°C für 2 Minuten** (oder **63°C für 20 Sekunden**)" : "Gold standard: **70°C for 2 minutes** (or **63°C for 20 seconds**)",
      icon: ShieldCheck,
      color: "text-[#2E7D32]",
    },
    {
      value: "10 Min",
      label: currentLang === "es" ? "El Reposo Mágico" : currentLang === "de" ? "Die magische Ruhezeit" : "The Magic Rest",
      desc: currentLang === "es" ? "Mezclar patata y huevo antes de la sartén para máxima jugosidad" : currentLang === "de" ? "Kartoffeln und Ei vor dem Braten ziehen lassen" : "Resting potatoes and eggs before the pan for ultimate juiciness",
      icon: Sparkles,
      color: "text-[#FFA000]",
    },
  ];

  return (
    <section className="bg-card/70 border-y border-border py-8 md:py-10 relative">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="card-notebook p-5 rounded-2xl bg-card border border-border shadow-2xs hover:shadow-xs transition-all text-center space-y-2 flex flex-col items-center justify-center"
              >
                <div className={`p-2.5 rounded-full bg-[#FFB800]/10 dark:bg-[#FFB800]/20 ${item.color} mb-0.5`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold font-serif-heading tracking-tight text-foreground">
                  {item.value}
                </span>
                <span className="text-sm font-bold text-foreground leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
