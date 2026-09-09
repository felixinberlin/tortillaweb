import React from "react";
import {
  ChefHat,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { EQUIPMENT_ITEMS } from "@/data/equipmentData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LocalizedLink from "@/components/navigation/LocalizedLink";

interface EquipmentShowcaseProps {
  lang?: string;
}

export default function EquipmentShowcase({ lang = "es" }: EquipmentShowcaseProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  // Pick top 3 highlighted products
  const featured = EQUIPMENT_ITEMS.filter((i) => i.highlighted).slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-notebook-grid/50 border-b border-border relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-xs">
              <ChefHat className="h-3.5 w-3.5 text-[#FFB800]" />
              <span>
                {currentLang === "es"
                  ? "El Arsenal del Tortillólogo"
                  : currentLang === "de"
                  ? "Das Meister-Arsenal"
                  : "The Tortillologist Arsenal"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-heading text-foreground tracking-tight">
              {currentLang === "es"
                ? "Las Herramientas para Nunca Fallar"
                : currentLang === "de"
                ? "Die Werkzeuge für Geling-Garantie"
                : "The Equipment for Foolproof Perfection"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {currentLang === "es"
                ? "Sartenes de hierro curado, mandolinas japonesas y el termómetro para garantizar los 70°C sin perder el cuajado perfecto."
                : currentLang === "de"
                ? "Geschmiedete Eisenpfannen, japanische Mandolinen und Einstich-Thermometer für 70°C Lebensmittelsicherheit bei optimaler Cremigkeit."
                : "Seasoned mineral iron pans, Japanese mandolines, and instant thermometers for 70°C food safety with a runny golden core."}
            </p>
          </div>

          <LocalizedLink to="/tienda" lang={currentLang} className="shrink-0">
            <Button
              size="lg"
              variant="outline"
              className="font-bold text-sm bg-card hover:bg-accent border-border shadow-xs"
            >
              <ShoppingBag className="mr-2 h-4 w-4 text-[#FFB800]" />
              <span>
                {currentLang === "es"
                  ? "Ver Todo el Equipamiento"
                  : currentLang === "de"
                  ? "Gesamte Ausrüstung Ansehen"
                  : "Explore Complete Arsenal"}
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </LocalizedLink>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => {
            const name = item.name[currentLang] || item.name.es;
            const tagline = item.tagline[currentLang] || item.tagline.es;
            const whyEssential = item.whyEssential[currentLang] || item.whyEssential.es;
            const badge = item.badge[currentLang] || item.badge.es;

            return (
              <div
                key={item.id}
                className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-stacked-parchment hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800] border-[#FFB800]/30 font-bold text-xs">
                      {badge}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase font-bold text-muted-foreground">
                      {item.brand}
                    </span>
                    <h3 className="text-lg font-bold font-serif-heading text-foreground leading-snug">
                      {name}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-foreground/80 italic border-l-2 border-[#FFB800] pl-2.5">
                    "{tagline}"
                  </p>

                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-xs text-muted-foreground space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#FFB800]" />
                      {currentLang === "es" ? "Por qué es esencial:" : currentLang === "de" ? "Warum unverzichtbar:" : "Why it matters:"}
                    </span>
                    <p className="leading-relaxed">
                      {whyEssential}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono text-foreground">
                    {item.priceRange}
                  </span>

                  <LocalizedLink to="/tienda" lang={currentLang}>
                    <Button
                      size="sm"
                      className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs shadow-xs"
                    >
                      <span>{currentLang === "es" ? "Ver Detalles" : currentLang === "de" ? "Details" : "Details"}</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </LocalizedLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
