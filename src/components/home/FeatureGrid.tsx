import "@/i18n/config";
import { getTranslations } from "@/lib/i18n";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import {
  Egg,
  CookingPot,
  Flame,
  FlaskConical,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    key: "recipes",
    href: "/recipes",
    icon: CookingPot,
    accent: "#FFB800",
  },
  {
    key: "ingredients",
    href: "/ingredients",
    icon: Egg,
    accent: "#8D6E63",
  },
  {
    key: "techniques",
    href: "/techniques",
    icon: Flame,
    accent: "#FF8A00",
  },
  {
    key: "science",
    href: "/science",
    icon: FlaskConical,
    accent: "#00A3FF",
  },
  {
    key: "history",
    href: "/history",
    icon: BookOpen,
    accent: "#8D6E63",
  },
  {
    key: "builder",
    href: "/builder",
    icon: Sparkles,
    accent: "#FFB800",
  },
];

interface FeatureGridProps {
  lang?: string;
}

export default function FeatureGrid({ lang = "es" }: FeatureGridProps) {
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-2xs">
          <span>{lang === "en" ? "Interactive Culinary Codex" : lang === "de" ? "Kulinarisches Handbuch" : "Índice del Cuaderno"}</span>
        </div>

        <h2 className="font-serif-heading text-3xl font-extrabold md:text-4xl text-foreground">
          {t("features.title", "Explora el Universo de la Tortilla")}
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {t("features.subtitle", "Desde la ciencia molecular del huevo hasta la técnica artesanal de volteo en sartén de hierro fundido.")}
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <LocalizedLink key={feature.key} to={feature.href} lang={lang} className="block group">
              <div className="card-notebook h-full p-6 bg-card border border-border rounded-2xl flex flex-col justify-between transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-foreground border border-border/80 group-hover:scale-105 group-hover:bg-[#FFB800] group-hover:text-[#1C1917] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-script text-xs text-muted-foreground group-hover:text-[#FFB800] transition-colors">
                      ver cuaderno →
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-foreground group-hover:text-[#FFB800] transition-colors">
                    {t(`features.cards.${feature.key}.title`, feature.key)}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`features.cards.${feature.key}.description`, "Consulta guías detalladas, trucos de temperatura y fórmulas de preparación.")}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-foreground/80 group-hover:text-[#FFB800]">
                  <span>{lang === "en" ? "Open chapter" : lang === "de" ? "Kapitel öffnen" : "Abrir capítulo"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </LocalizedLink>
          );
        })}
      </div>
    </section>
  );
}
