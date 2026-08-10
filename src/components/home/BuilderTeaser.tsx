import React, { useState } from "react";
import "@/i18n/config";
import { ArrowRight, ChefHat, Sparkles, Users, ShieldCheck, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import { Button } from "@/components/ui/button";

interface BuilderTeaserProps {
  lang?: string;
}

export default function BuilderTeaser({ lang = "es" }: BuilderTeaserProps) {
  const { t } = useTranslation(undefined, { lng: lang });
  const [diners, setDiners] = useState<number>(4);
  const [hasOnion, setHasOnion] = useState<boolean>(true);

  // Quick ratio calculations for teaser preview
  const eggs = diners * 2;
  const potatoes = diners * 150; // grams
  const oil = diners * 30; // ml absorbed/used
  const panSize = diners <= 2 ? 20 : diners <= 4 ? 24 : diners <= 6 ? 26 : 28;

  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="card-notebook bg-[#FAF6EE] dark:bg-[#262220] border border-[#E8E2D5] dark:border-[#3D352E] rounded-3xl p-6 sm:p-8 md:p-10 shadow-stacked-parchment relative overflow-hidden transition-all">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/10 dark:bg-[#FFB800]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold shadow-2xs">
              <ChefHat className="h-4 w-4 text-[#FFB800]" />
              <span>{t("builder.badge", "Constructor interactivo de tortilla")}</span>
            </div>

            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground dark:text-[#F5E6BE] tracking-tight leading-tight">
              {t("builder.title", "Crea tu propia tortilla")}
            </h2>

            <p className="text-foreground/80 dark:text-[#F5E6BE]/80 text-sm sm:text-base leading-relaxed max-w-xl">
              {t("builder.subtitle", "Elige ingredientes, controla el fuego y descubre cómo cada decisión cambia el resultado final.")}
            </p>

            {/* Quick Interactive Selector */}
            <div className="bg-white/80 dark:bg-[#1C1917]/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E8E2D5] dark:border-[#3D352E] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>Comensales / Diners: <strong>{diners} pers.</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasOnion(!hasOnion)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      hasOnion
                        ? "bg-[#2E7D32]/10 dark:bg-[#2E7D32]/25 text-[#2E7D32] dark:text-[#81C784] border-[#2E7D32]/30"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {hasOnion ? "🧅 Con cebolla" : "🧅 Sin cebolla"}
                  </button>
                </div>
              </div>

              {/* Diners Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[2, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDiners(num)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      diners === num
                        ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] border-[#8D6E63] dark:border-[#FFB800] shadow-2xs"
                        : "bg-[#FAF6EE] dark:bg-[#28231F] text-foreground dark:text-[#F5E6BE] border-[#E8E2D5] dark:border-[#3D352E] hover:bg-[#F5E6BE]/60"
                    }`}
                  >
                    {num} p.
                  </button>
                ))}
              </div>

              {/* Dynamic Live Calculations */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-[#FAF6EE] dark:bg-[#28231F] border border-[#E8E2D5] dark:border-[#3D352E]">
                  <span className="block text-xs font-extrabold text-[#8D6E63] dark:text-[#FFB800]">{eggs}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">🥚 Huevos</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EE] dark:bg-[#28231F] border border-[#E8E2D5] dark:border-[#3D352E]">
                  <span className="block text-xs font-extrabold text-[#8D6E63] dark:text-[#FFB800]">{potatoes}g</span>
                  <span className="text-[10px] text-muted-foreground font-medium">🥔 Patata</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EE] dark:bg-[#28231F] border border-[#E8E2D5] dark:border-[#3D352E]">
                  <span className="block text-xs font-extrabold text-[#8D6E63] dark:text-[#FFB800]">{oil}ml</span>
                  <span className="text-[10px] text-muted-foreground font-medium">🛢️ Aceite</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EE] dark:bg-[#28231F] border border-[#E8E2D5] dark:border-[#3D352E]">
                  <span className="block text-xs font-extrabold text-[#8D6E63] dark:text-[#FFB800]">{panSize}cm</span>
                  <span className="text-[10px] text-muted-foreground font-medium">🍳 Sartén</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <LocalizedLink to="/builder" lang={lang}>
                <Button size="lg" className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold shadow-md cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4 text-[#FFB800] dark:text-[#1C1917]" />
                  <span>{t("builder.button", "Empezar a crear")}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LocalizedLink>

              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/20 border border-[#2E7D32]/25 text-[#2E7D32] dark:text-[#81C784] text-xs font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{lang === 'es' ? 'Seguridad:' : lang === 'de' ? 'Sicherheit:' : 'Safety:'} <strong>Huevo Seguro</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Notebook Illustration Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-square rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F5E6BE] dark:from-[#2A2420] dark:to-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] p-6 shadow-inner flex flex-col justify-between items-center text-center">
              
              <div className="p-4 rounded-full bg-[#FFB800]/20 dark:bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#FFB800] animate-pulse">
                <Flame className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <p className="font-serif-heading font-extrabold text-lg text-foreground dark:text-[#F5E6BE]">
                  Simulación de Fuego & Ratios
                </p>
                <p className="chef-note text-xs text-amber-900 dark:text-[#FFB800]">
                  «El Secreto: 150g de patata y 2 huevos por persona»
                </p>
              </div>

              <div className="w-full bg-[#FAF6EE] dark:bg-[#28231F] py-2 px-3 rounded-xl border border-[#E8E2D5] dark:border-[#3D352E] text-[11px] font-bold text-foreground/80 dark:text-[#F5E6BE]/80 flex items-center justify-between">
                <span>Calculadora Térmica</span>
                <span className="text-[#2E7D32] dark:text-[#81C784] font-extrabold">100% Preciso</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
