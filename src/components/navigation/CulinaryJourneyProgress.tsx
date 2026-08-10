import React from "react";
import "@/i18n/config";
import { 
  History, 
  Egg, 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  Users, 
  FlaskConical, 
  HelpCircle, 
  ArrowRight,
  Compass
} from "lucide-react";
import { resolveNavigationTarget, type SupportedLocale } from "@/lib/routes";

interface CulinaryJourneyProgressProps {
  lang?: string;
  currentStepPath?: string;
}

export default function CulinaryJourneyProgress({ lang = "es", currentStepPath = "" }: CulinaryJourneyProgressProps) {
  function getLocalizedHref(path: string) {
    return resolveNavigationTarget({ to: path }, (lang as SupportedLocale) || 'es');
  }

  const steps = [
    {
      id: "history",
      path: "/history",
      title: lang === "es" ? "1. Historia & Orígenes" : lang === "de" ? "1. Geschichte & Ursprung" : "1. History & Origins",
      icon: History,
    },
    {
      id: "ingredients",
      path: "/ingredientes",
      title: lang === "es" ? "2. Ingredientes Sagrados" : lang === "de" ? "2. Heilige Zutaten" : "2. Sacred Ingredients",
      icon: Egg,
    },
    {
      id: "science",
      path: "/science",
      title: lang === "es" ? "3. Ciencia & Seguridad" : lang === "de" ? "3. Wissenschaft & Hygiene" : "3. Safety & Science",
      icon: ShieldCheck,
    },
    {
      id: "builder",
      path: "/builder",
      title: lang === "es" ? "4. Constructor Ratios" : lang === "de" ? "4. Baukasten & Ratios" : "4. Interactive Builder",
      icon: Sparkles,
    },
    {
      id: "comparator",
      path: "/comparador",
      title: lang === "es" ? "5. Comparador Estilos" : lang === "de" ? "5. Stil-Vergleich" : "5. Style Comparator",
      icon: Scale,
    },
    {
      id: "factions",
      path: "/factions",
      title: lang === "es" ? "6. Facciones & Debates" : lang === "de" ? "6. Fraktionen & Debatte" : "6. Factions & Debates",
      icon: Users,
    },
    {
      id: "worldstate",
      path: "/laboratorio/worldstate",
      title: lang === "es" ? "7. Simulador WorldState" : lang === "de" ? "7. Weltzustand-Simulator" : "7. WorldState Simulator",
      icon: FlaskConical,
    },
    {
      id: "trivia",
      path: "/trivia",
      title: lang === "es" ? "8. Desafío Trivia (200+)" : lang === "de" ? "8. Trivia-Quiz (200+)" : "8. Trivia Challenge",
      icon: HelpCircle,
    },
  ];

  // Find index of current step
  const currentIndex = steps.findIndex((step) => {
    const localized = getLocalizedHref(step.path);
    return currentStepPath === localized || (step.path !== "/" && currentStepPath.includes(step.path));
  });

  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const nextStep = steps[(activeIndex + 1) % steps.length];
  const nextHref = getLocalizedHref(nextStep.path);

  return (
    <div className="card-notebook bg-[#FAF6EE] dark:bg-[#262220] border border-[#E8E2D5] dark:border-[#3D352E] rounded-3xl p-5 sm:p-6 shadow-sm my-8 transition-colors">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E8E2D5] dark:border-[#3D352E]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#FFB800] text-[#1C1917] font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8D6E63] dark:text-[#FFB800]">
              {lang === "es" ? "La Ruta Guiada Culinaria" : lang === "de" ? "Der kulinarische Leitfaden" : "Guided Culinary Journey"}
            </span>
            <h3 className="font-serif-heading font-extrabold text-base sm:text-lg text-foreground dark:text-[#F5E6BE]">
              {lang === "es" ? "Paso a Paso en el Universo de la Tortilla" : lang === "de" ? "Schritt für Schritt durch das Universum" : "Step-by-Step Through the Universe"}
            </h3>
          </div>
        </div>

        {/* Oma Safe Next Button */}
        <a
          href={nextHref}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs sm:text-sm shadow-2xs transition-colors shrink-0"
        >
          <span>{lang === "es" ? `Siguiente: ${nextStep.title.split('. ')[1]}` : lang === "de" ? `Weiter: ${nextStep.title.split('. ')[1]}` : `Next: ${nextStep.title.split('. ')[1]}`}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Sequential Horizontal Progress Route */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const href = getLocalizedHref(step.path);
          const isCurrent = idx === activeIndex;
          const isPast = idx < activeIndex;

          return (
            <a
              key={step.id}
              href={href}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[70px] ${
                isCurrent
                  ? "bg-[#FFB800] text-[#1C1917] border-[#FFB800] ring-2 ring-[#FFB800]/50 font-bold shadow-2xs"
                  : isPast
                  ? "bg-[#F5E6BE]/60 dark:bg-[#3D332A] text-foreground/90 dark:text-[#F5E6BE] border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#8D6E63]"
                  : "bg-white/80 dark:bg-[#1C1917]/80 text-foreground/70 dark:text-[#F5E6BE]/70 border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#FFB800]"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isCurrent ? "text-[#1C1917]" : "text-[#8D6E63] dark:text-[#FFB800]"}`} />
                <span className="text-[10px] opacity-75 font-mono">0{idx + 1}</span>
              </div>
              <span className="text-[11px] leading-tight font-medium mt-1 line-clamp-2">
                {step.title.split(". ")[1]}
              </span>
            </a>
          );
        })}
      </div>

    </div>
  );
}
