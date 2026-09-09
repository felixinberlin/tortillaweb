import "@/i18n/config";
import { ArrowRight, Flame, Egg, BookOpen, ChefHat, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { getTranslations } from "@/lib/i18n";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import { Button } from "@/components/ui/button";

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = "es" }: HeroProps) {
  const t = getTranslations(lang);

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
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/20 px-3 py-1 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/35 shadow-xs">
              <ChefHat className="h-3.5 w-3.5 text-[#FFB800]" />
              <span>{t("hero.badge", "Cuaderno Gastronómico & Ciencia")}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2E7D32]/10 dark:bg-[#2E7D32]/25 px-3 py-1 text-xs font-bold text-[#2E7D32] dark:text-[#81C784] border border-[#2E7D32]/25 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Estándar Oro: <strong>70°C por 2 minutos</strong></span>
            </div>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {t("hero.title", "La Tortilla de Patatas Perfecta")}
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("hero.subtitle", "La guía definitiva y cuaderno de cocina sobre la tortilla española: recetas de abuela, termodinámica culinaria, proporciones maestras y el debate eterno.")}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <LocalizedLink to="/recipes" lang={lang} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm shadow-md border border-[#8D6E63] dark:border-[#FFB800] transition-all"
              >
                <BookOpen className="mr-2 h-4 w-4 text-[#FFB800] dark:text-[#1C1917]" />
                <span>{t("hero.recipesButton", "Explorar Recetas")}</span>
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
                <span>{t("hero.buildButton", "Crear en el Constructor")}</span>
              </Button>
            </LocalizedLink>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs sm:text-sm font-semibold text-muted-foreground">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border shadow-2xs">
              <Egg className="h-4 w-4 text-[#FFB800] shrink-0" />
              <span className="truncate">{t("hero.ingredients", "Ratio Huevo/Patata")}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border shadow-2xs">
              <Flame className="h-4 w-4 text-[#FF8A00] shrink-0" />
              <span className="truncate">{t("hero.techniques", "Punto de Cuajado")}</span>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2 rounded-xl bg-card border border-border shadow-2xs">
              <BookOpen className="h-4 w-4 text-[#00A3FF] shrink-0" />
              <span className="truncate">{t("hero.knowledge", "Tradición & Ciencia")}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Card Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          <div className="card-notebook p-2 bg-card border border-border rounded-3xl shadow-stacked-parchment overflow-hidden">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary relative">
              <img
                src="/images/hero.jpg"
                alt="Tortilla de Patatas Clásica Tradicional"
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-card/90 dark:bg-[#1C1917]/90 backdrop-blur-xs p-3 rounded-xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-foreground">Tortilla Clásica de Betanzos & Madrid</span>
                  <span className="text-[11px] text-muted-foreground font-script text-base leading-none text-[#8D6E63] dark:text-[#FFB800]">
                    "El secreto está en el pochado lento a 140°C"
                  </span>
                </div>
                <div className="px-2 py-1 rounded-md bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-[10px] font-extrabold">
                  4 pers.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
