import React from "react";
import "@/i18n/config";
import { ArrowRight, Flame, Egg, BookOpen, ChefHat, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import { Button } from "@/components/ui/button";
import InteractiveHeroTortilla from "@/components/home/InteractiveHeroTortilla";

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = "es" }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-notebook-grid py-8 md:py-16 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 grid min-h-[480px] items-center gap-8 md:gap-12 lg:grid-cols-12">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Badge Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 px-3.5 py-1 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/35 shadow-xs">
              <ChefHat className="h-3.5 w-3.5 text-[#FFB800]" />
              <span>
                {lang === "de"
                  ? "Heimische Küche, Zeit & Gutes Öl"
                  : lang === "en"
                  ? "Slow Cooking, Good Oil & Home Comfort"
                  : "Cocina de Casa, Fuego Lento & Buen Aceite"}
              </span>
            </div>

            <span className="font-script text-base sm:text-lg text-[#8D6E63] dark:text-[#F5E6BE] select-none">
              {lang === "de"
                ? "Wie bei Oma am Küchentisch"
                : lang === "en"
                ? "Just like grandma made it"
                : "El sabor de siempre, como en casa"}
            </span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {lang === "de"
              ? "Die Kunst der perfekten Tortilla"
              : lang === "en"
              ? "The Art of the Warm Spanish Omelette"
              : "El Placer de la Tortilla Perfecta"}
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {lang === "de"
              ? "Sanft in kaltgepresstem Olivenöl confitierte Kartoffeln, samtig-flüssiges Freilandei und der goldbraune Moment in der heißen Pfanne. Ein warmes Rezeptbuch zum Genießen und Nachkochen."
              : lang === "en"
              ? "Potatoes gently poached in extra virgin olive oil, velvety pasture eggs, and the sizzling, aromatic pan flip. A warm kitchen notebook to celebrate every delicious bite."
              : "Patata pochada despacio en aceite de oliva virgen extra, huevo campero de yema cremosa y el punto dorado al fuego. Un cuaderno cálido y delicioso para disfrutar, cocinar y compartir."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <LocalizedLink to="/recipes" lang={lang} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm shadow-md border border-[#8D6E63] dark:border-[#FFB800] transition-all"
              >
                <BookOpen className="mr-2 h-4 w-4 text-[#FFB800] dark:text-[#1C1917]" />
                <span>
                  {lang === "de"
                    ? "Die leckersten Rezepte ansehen"
                    : lang === "en"
                    ? "Browse Delicious Recipes"
                    : "Ver las Recetas Más Ricas"}
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </LocalizedLink>

            <LocalizedLink to="/builder" lang={lang} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 border-border bg-card text-foreground hover:bg-accent font-bold text-sm shadow-xs transition-all"
              >
                <Sparkles className="mr-2 h-4 w-4 text-[#FFB800]" />
                <span>
                  {lang === "de"
                    ? "Meine Portionsgröße berechnen"
                    : lang === "en"
                    ? "Calculate My Custom Omelette"
                    : "Calcular Mi Tortilla a Medida"}
                </span>
              </Button>
            </LocalizedLink>
          </div>

          {/* Value Pillars / Cozy Kitchen Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs sm:text-sm font-semibold">
            <LocalizedLink
              to="/ingredients"
              lang={lang}
              title={lang === "de" ? "Zutaten: Kartoffeln, Eier und Olivenöl" : lang === "en" ? "Ingredients: potatoes, eggs, and olive oil" : "Ingredientes: patatas, huevos y aceite de oliva"}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-card hover:bg-[#FFB800]/10 border border-border hover:border-[#FFB800]/60 text-muted-foreground hover:text-foreground shadow-2xs transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Egg className="h-4 w-4 text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">
                  {lang === "de" ? "Kartoffeln & Eier" : lang === "en" ? "Potatoes & Eggs" : "Patatas & Huevos"}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-[#FFB800] group-hover:translate-x-0.5 transition-all shrink-0" />
            </LocalizedLink>

            <LocalizedLink
              to="/techniques"
              lang={lang}
              title={lang === "de" ? "Der Moment des Wendens" : lang === "en" ? "The Perfect Pan Flip" : "El Volteo en Sartén"}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-card hover:bg-[#FF8A00]/10 border border-border hover:border-[#FF8A00]/60 text-muted-foreground hover:text-foreground shadow-2xs transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Flame className="h-4 w-4 text-[#FF8A00] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">
                  {lang === "de" ? "Der Pfannenschwung" : lang === "en" ? "The Golden Flip" : "El Volteo Perfecto"}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-[#FF8A00] group-hover:translate-x-0.5 transition-all shrink-0" />
            </LocalizedLink>

            <LocalizedLink
              to="/facciones"
              lang={lang}
              title={lang === "de" ? "Die Zwiebel-Debatte" : lang === "en" ? "The Onion Debate" : "El Debate de la Cebolla"}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-card hover:bg-[#8D6E63]/10 border border-border hover:border-[#8D6E63]/60 text-muted-foreground hover:text-foreground shadow-2xs transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="h-4 w-4 text-[#8D6E63] dark:text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">
                  {lang === "de" ? "Zwiebel-Debatte" : lang === "en" ? "The Onion Debate" : "¿Con o Sin Cebolla?"}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] group-hover:translate-x-0.5 transition-all shrink-0" />
            </LocalizedLink>
          </div>
        </motion.div>

        {/* Hero Card Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          <div className="card-notebook p-2 sm:p-2.5 bg-card border border-border rounded-3xl shadow-stacked-parchment overflow-hidden">
            <InteractiveHeroTortilla lang={lang} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
