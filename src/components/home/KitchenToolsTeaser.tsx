import React from "react";
import {
  Utensils,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KitchenToolsTeaserProps {
  lang?: string;
}

export default function KitchenToolsTeaser({ lang = "es" }: KitchenToolsTeaserProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="card-notebook p-6 sm:p-10 md:p-12 bg-card border-2 border-[#FFB800]/40 rounded-3xl shadow-stacked-parchment space-y-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30">
              <Utensils className="h-3.5 w-3.5 text-[#FFB800]" />
              <span>
                {currentLang === "es"
                  ? "Menaje, Sartenes & Física Culinaria"
                  : currentLang === "de"
                  ? "Werkzeuge, Pfannen & Küchenphysik"
                  : "Kitchen Tools, Skillets & Physics"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-heading text-foreground tracking-tight">
              {currentLang === "es"
                ? "¿Cuál es el mejor pelador de patatas y cuándo conviene usar sartén doble?"
                : currentLang === "de"
                ? "Welcher Kartoffelschäler ist der beste und wann lohnt sich eine Doppelpfanne?"
                : "What is the best potato peeler and when should you use a double flip pan?"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {currentLang === "es"
                ? "La técnica culinaria requiere las herramientas idóneas: el pelador en Y ahorra un 10% de pulpa frente al cuchillo tradicional, y las sartenes volteadoras evitan el riesgo de vertidos en tortillas de gran tamaño."
                : currentLang === "de"
                ? "Präzision beginnt beim Werkzeug: Der Y-Schäler spart bis zu 10 % Kartoffelmasse, während Doppelpfannen sicheres Wenden ohne Auslaufen ermöglichen."
                : "Precision cooking starts with the right tools: Y-peelers save up to 10% potato mass compared to paring knives, and interlocking double pans ensure zero-spill flips."}
            </p>
          </div>

          <a
            href={`/${currentLang}/utensilios`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm rounded-xl shadow-md transition-all shrink-0 hover:translate-x-0.5"
          >
            <span>{currentLang === "es" ? "Explorar Guía de Utensilios" : currentLang === "de" ? "Zum Werkzeug-Guide" : "Explore Kitchen Tools Guide"}</span>
            <ArrowRight className="w-4 h-4 text-[#FFB800] dark:text-[#1C1917]" />
          </a>
        </div>

        {/* 3 Core Pillars of Tool Science */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 1: The Potato Peeler */}
          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🥔</span>
                <Badge variant="outline" className="text-[11px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 border-[#2E7D32]/20">
                  {currentLang === "es" ? "Merma <4%" : "Waste <4%"}
                </Badge>
              </div>
              <h3 className="text-base font-bold font-serif-heading text-foreground">
                {currentLang === "es" ? "Pelador en 'Y' con Hoja Pivotante" : currentLang === "de" ? "Y-Sparschäler mit Pendelklinge" : "Swivel Y-Peeler"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "Su cuchilla oscilante de 0.8 mm respeta la capa subepidérmica donde se concentran los azúcares naturales y sales minerales de la patata."
                  : currentLang === "de"
                  ? "Die 0,8 mm Pendelklinge schützt die geschmackstragende Schicht direkt unter der Kartoffelschale."
                  : "Its 0.8 mm micro-blade preserves the sub-epidermal layer holding natural sugars and potato minerals."}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#8D6E63] dark:text-[#FFB800] font-semibold">
              {currentLang === "es" ? "→ 90 segundos por kg pelado" : "→ 90 seconds per peeled kg"}
            </span>
          </div>

          {/* Pillar 2: Double Flip Skillet */}
          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🔄</span>
                <Badge variant="outline" className="text-[11px] font-bold text-[#00A3FF] bg-[#00A3FF]/10 border-[#00A3FF]/20">
                  {currentLang === "es" ? "Cero Derrames" : "Zero Spills"}
                </Badge>
              </div>
              <h3 className="text-base font-bold font-serif-heading text-foreground">
                {currentLang === "es" ? "Sartén Doble Acoplable" : currentLang === "de" ? "Doppel-Wendipfanne" : "Interlocking Flip Pan"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "Elimina el miedo al giro en tortillas de más de 6 huevos o estilo Betanzos líquido. La regla de oro: cocinar abierta y acoplar solo al voltear."
                  : currentLang === "de"
                  ? "Nimmt jede Angst beim Wenden großer oder sehr flüssiger Tortillas. Wichtig: Immer offen braten!"
                  : "Eliminates flip anxiety for 6+ egg or runny Betanzos tortillas. Cook open, couple only to turn."}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#00A3FF] font-semibold">
              {currentLang === "es" ? "→ Seguridad mecánica 180°" : "→ 180° mechanical safety"}
            </span>
          </div>

          {/* Pillar 3: Thermal Probe Standard */}
          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌡️</span>
                <Badge variant="outline" className="text-[11px] font-bold text-[#D32F2F] bg-[#D32F2F]/10 border-[#D32F2F]/20">
                  70°C / 2 min
                </Badge>
              </div>
              <h3 className="text-base font-bold font-serif-heading text-foreground">
                {currentLang === "es" ? "Termometría de Precisión" : currentLang === "de" ? "Präzisions-Thermometrie" : "Precision Thermometry"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "Controla los **70°C durante 2 minutos** (o **63°C durante 20 segundos**) para pasteurizar el huevo sin sobrecuajar la yema cremosa."
                  : currentLang === "de"
                  ? "Kontrolliert **70°C für 2 Minuten**, um Salmonellen abzutöten, ohne den saftigen Kern zu verkochen."
                  : "Verifies **70°C for 2 minutes** (or **63°C for 20 seconds**) to ensure food safety with a creamy center."}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#D32F2F] font-semibold">
              {currentLang === "es" ? "→ Inocuidad bacteriológica" : "→ Bactericidal safety"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
