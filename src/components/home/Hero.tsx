import "@/i18n/config";
import { ArrowRight, Flame, Egg, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import LocalizedLink from "@/components/navigation/LocalizedLink";
import clasicaImg from "@/assets/images/clasica.jpg";

import { Button } from "@/components/ui/button";

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = "es" }: HeroProps) {
  const { t } = useTranslation(undefined, { lng: lang });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20 dark:to-background">
      <div className="container mx-auto grid min-h-[500px] items-center gap-8 md:gap-12 px-4 py-10 md:py-20 md:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-950/50 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-200 border border-amber-200/60">
            <Flame className="h-3.5 w-3.5 text-amber-600" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            {t("hero.title")}
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <LocalizedLink to="/recipes" lang={lang} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                {t("hero.recipesButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </LocalizedLink>

            <LocalizedLink to="/builder" lang={lang} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 font-semibold"
              >
                {t("hero.buildButton")}
              </Button>
            </LocalizedLink>
          </div>

          <div className="flex gap-6 pt-2 text-xs sm:text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Egg className="h-4 w-4 text-amber-600" />
              <span>{t("hero.ingredients")}</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-600" />
              <span>{t("hero.knowledge")}</span>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-amber-100 shadow-xl border border-border">
            <img
              src="/images/clasica.jpg"
              alt={t("hero.title")}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedAsset) {
                  target.dataset.triedAsset = "true";
                  target.src = clasicaImg;
                }
              }}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}