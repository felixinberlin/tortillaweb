import React from "react";
import { Egg, Utensils, Flame, Check } from "lucide-react";
import type { EggSize, PotatoVariety, PotatoCutStyle } from "@/domain/builder/types";

interface StepIngredientsProps {
  lang: string;
  eggs: number;
  setEggs: (val: number) => void;
  eggSize: EggSize;
  setEggSize: (val: EggSize) => void;
  potatoesGrams: number;
  setPotatoesGrams: (val: number) => void;
  potatoVariety?: PotatoVariety;
  setPotatoVariety?: (val: PotatoVariety) => void;
  potatoCut?: PotatoCutStyle;
  setPotatoCut?: (val: PotatoCutStyle) => void;
  estimatedFryingOil: number;
  estimatedAbsorbedOil: number;
  potatoUnits: number;
}

export const StepIngredients: React.FC<StepIngredientsProps> = ({
  lang,
  eggs,
  setEggs,
  eggSize,
  setEggSize,
  potatoesGrams,
  setPotatoesGrams,
  potatoVariety = "monalisa",
  setPotatoVariety,
  potatoCut = "panadera",
  setPotatoCut,
  estimatedFryingOil,
  estimatedAbsorbedOil,
  potatoUnits,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const eggSizes: { id: EggSize; label: string; grams: string }[] = [
    { id: "small", label: "S", grams: "50g" },
    { id: "medium", label: "M", grams: "58g" },
    { id: "large", label: "L", grams: "65g" },
    { id: "xl", label: "XL", grams: "73g" },
  ];

  const potatoVarieties: {
    id: PotatoVariety;
    name: string;
    badge: string;
    starch: string;
    desc: string;
  }[] = [
    {
      id: "monalisa",
      name: "Monalisa",
      badge: isEs ? "Cremosidad Universal" : isDe ? "Universelle Cremigkeit" : "Universal Creaminess",
      starch: "18% Almidón",
      desc: isEs
        ? "Equilibrio idóneo entre almidón y agua. Textura suave, cremosa y pochado uniforme."
        : isDe
        ? "Ideale Balance von Stärke und Feuchtigkeit. Weiche, samtige Textur."
        : "Ideal starch-moisture balance. Soft, velvety confit texture.",
    },
    {
      id: "kennebec",
      name: "Kennebec",
      badge: isEs ? "Estilo Betanzos" : isDe ? "Betanzos-Stil" : "Betanzos Style",
      starch: "20% Almidón",
      desc: isEs
        ? "Bajo contenido acuoso. Bordes crujientes con centro fundente para tortillas fluidas."
        : isDe
        ? "Geringer Wassergehalt. Knusprige Ränder mit flüssigem Kern."
        : "Low water content. Crisp edges with melting center for runny tortillas.",
    },
    {
      id: "agria",
      name: "Agria",
      badge: isEs ? "Baja Absorción & Fritura" : isDe ? "Wenig Ölaufnahme" : "Low Oil Absorption",
      starch: "22% Almidón",
      desc: isEs
        ? "Elevada materia seca. Minimiza absorción grasa, garantizando corteza dorada y centro tierno."
        : isDe
        ? "Hohe Trockenmasse. Minimale Ölaufnahme und goldene Kruste."
        : "High dry matter. Minimizes oil absorption with golden crust and tender interior.",
    },
    {
      id: "red_pontiac",
      name: "Red Pontiac",
      badge: isEs ? "Jugosa & Tierna" : isDe ? "Saftig & Zart" : "Juicy & Tender",
      starch: "15% Almidón",
      desc: isEs
        ? "Piel roja y carne blanca. Muy jugosa, ideal para tortillas húmedas tradicionales."
        : isDe
        ? "Rote Schale, sehr saftig für klassisch feuchte Tortillas."
        : "Red skin, high moisture for succulent traditional tortillas.",
    },
  ];

  const potatoCuts: {
    id: PotatoCutStyle;
    name: string;
    thickness: string;
    desc: string;
    icon: string;
  }[] = [
    {
      id: "panadera",
      name: isEs ? "Panadera Clásica" : isDe ? "Klassische Scheiben" : "Classic Panadera",
      thickness: "3–5 mm",
      desc: isEs
        ? "Láminas regulares. Transmisión térmica equilibrada y capas aterciopeladas."
        : isDe
        ? "Gleichmäßige Scheiben. Perfekte Schichten."
        : "Uniform thin disks. Balanced thermal transmission.",
      icon: "🥔",
    },
    {
      id: "chascada",
      name: isEs ? "Chascada / Rota" : isDe ? "Gezupft / Gebrochen" : "Cracked / Rustic",
      thickness: "Irregular",
      desc: isEs
        ? "Arrancada con cuchillo. Libera amilopectina emulsionando un puré natural."
        : isDe
        ? "Mit dem Messer gebrochen, setzt Stärke für Bindung frei."
        : "Knife-cracked to release amylopectin for natural creamy binding.",
      icon: "🔪",
    },
    {
      id: "dados",
      name: isEs ? "Dados Pequeños" : isDe ? "Kleine Würfel" : "Diced Cubes",
      thickness: "~1 cm",
      desc: isEs
        ? "Cubos uniformes. Gran consistencia estructural para corte en pincho o bocadillo."
        : isDe
        ? "Gleichmäßige Würfel für stabilen Schnitt."
        : "Small cubes. Solid structural integrity for pinchos.",
      icon: "🎲",
    },
    {
      id: "ultrafina",
      name: isEs ? "Lámina Chips / Mandolina" : isDe ? "Hauchdünn / Mandoline" : "Paper-Thin Chips",
      thickness: "1–2 mm",
      desc: isEs
        ? "Corte muy fino. Rápida fritura con costra crujiente exterior y centro fundente."
        : isDe
        ? "Hauchdünne Scheiben für knusprige Textur."
        : "Very thin slices for quick frying and crisp golden contrast.",
      icon: "⚡",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Huevos (Eggs Card) */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30 shadow-2xs">
              <Egg className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-foreground">
                {isEs ? "1. Huevos Frescos" : isDe ? "1. Frische Eier" : "1. Fresh Eggs"}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {isEs
                  ? "Base de emulsión proteica y sabor de la tortilla"
                  : isDe
                  ? "Proteinquelle und Herzstück der Tortilla"
                  : "Protein emulsion base and heart of the dish"}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-sm font-extrabold border border-[#FFB800]/40">
            {eggs} {isEs ? "huevos" : isDe ? "Eier" : "eggs"}
          </span>
        </div>

        <div className="space-y-6">
          {/* Egg quantity slider / buttons */}
          <div>
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              {isEs ? "Cantidad de Huevos:" : isDe ? "Anzahl Eier:" : "Egg Quantity:"}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={2}
                max={16}
                step={1}
                value={eggs}
                onChange={(e) => setEggs(Number(e.target.value))}
                className="w-full accent-[#FFB800] h-2 bg-secondary rounded-lg cursor-pointer"
              />
              <span className="w-12 text-center text-xl font-black text-[#8D6E63] dark:text-[#FFB800]">
                {eggs}
              </span>
            </div>
            <div className="flex justify-between text-2xs text-muted-foreground mt-1">
              <span>2 ({isEs ? "Individual" : "Solo"})</span>
              <span>4–6 ({isEs ? "Estándar 4 personas" : "4 People"})</span>
              <span>12–16 ({isEs ? "Gran Banquete" : "Party"})</span>
            </div>
          </div>

          {/* Egg Sizes */}
          <div>
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              {isEs ? "Calibre del Huevo:" : isDe ? "Eiergröße:" : "Egg Size:"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {eggSizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setEggSize(size.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    eggSize === size.id
                      ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-foreground shadow-2xs font-extrabold"
                      : "border-border bg-card hover:bg-accent text-foreground/80"
                  }`}
                >
                  <span className="block text-lg font-black">{size.label}</span>
                  <span className="text-xs text-muted-foreground">{size.grams}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Patatas (Potatoes Card) */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8D6E63]/20 text-[#8D6E63] dark:text-[#F5E6BE] border border-[#8D6E63]/30 shadow-2xs">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-foreground">
                {isEs ? "2. Patatas & Variedad" : isDe ? "2. Kartoffeln & Sorte" : "2. Potatoes & Cultivar"}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {isEs
                  ? "Selecciona el peso, la variedad botánica y el tipo de corte"
                  : isDe
                  ? "Wählen Sie Gewicht, Sorte und Schnitttechnik"
                  : "Select weight, botanical cultivar, and cutting technique"}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-extrabold border border-border">
            {potatoesGrams}g (~{potatoUnits} {isEs ? "patatas medianas" : "potatoes"})
          </span>
        </div>

        <div className="space-y-6">
          {/* Potato weight slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                {isEs ? "Peso de Patatas (Gramos):" : isDe ? "Kartoffelgewicht (Gramm):" : "Potato Weight (Grams):"}
              </label>
              <span className="text-sm font-black text-[#8D6E63] dark:text-[#FFB800]">{potatoesGrams}g</span>
            </div>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={potatoesGrams}
              onChange={(e) => setPotatoesGrams(Number(e.target.value))}
              className="w-full accent-[#FFB800] h-2 bg-secondary rounded-lg cursor-pointer"
            />
          </div>

          {/* Variety selection */}
          {setPotatoVariety && (
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                {isEs ? "Variedad de Patata:" : isDe ? "Kartoffelsorte:" : "Potato Variety:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {potatoVarieties.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setPotatoVariety(v.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      potatoVariety === v.id
                        ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-foreground shadow-2xs"
                        : "border-border bg-card hover:bg-accent text-foreground/80"
                    }`}
                  >
                    {potatoVariety === v.id && (
                      <div className="absolute top-2.5 right-2.5 bg-[#FFB800] text-[#1C1917] rounded-full p-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-sm">{v.name}</span>
                      <span className="text-2xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-semibold">
                        {v.starch}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cut style selection */}
          {setPotatoCut && (
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                {isEs ? "Geometría de Corte:" : isDe ? "Schnittform:" : "Cut Geometry:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {potatoCuts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setPotatoCut(c.id)}
                    aria-pressed={potatoCut === c.id}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 ${
                      potatoCut === c.id
                        ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-foreground shadow-2xs"
                        : "border-border bg-card hover:bg-accent text-foreground/80"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.icon}</span>
                      <span className="font-bold text-sm">{c.name}</span>
                      <span className="text-2xs text-muted-foreground font-mono ml-auto">{c.thickness}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Aceite (Oil & Thermodynamics) */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/30 shadow-2xs">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-foreground">
                {isEs ? "3. Aceite de Oliva & Fritura" : isDe ? "3. Olivenöl & Frittieren" : "3. Olive Oil & Frying"}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {isEs
                  ? "Cálculo de aceite para baño y absorción lipídica final"
                  : isDe
                  ? "Berechnung der Ölaufnahme und Gartemperatur"
                  : "Calculation for frying bath and lipid absorption"}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-extrabold border border-border">
            ~{estimatedAbsorbedOil}ml {isEs ? "absorbidos" : "absorbed"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-accent border border-border space-y-1">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
              {isEs ? "Aceite para Sartén (Baño de Fritura)" : "Total Frying Oil Required"}
            </span>
            <span className="text-2xl font-black text-[#8D6E63] dark:text-[#FFB800]">
              {estimatedFryingOil} ml
            </span>
            <span className="text-2xs text-muted-foreground block">
              {isEs
                ? "Suficiente para cubrir las patatas durante el confitado"
                : "Enough to cover potatoes during confit"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-accent border border-border space-y-1">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
              {isEs ? "Aceite Retenido en Tortilla" : "Lipid Retention in Dish"}
            </span>
            <span className="text-2xl font-black text-[#2E7D32] dark:text-[#81C784]">
              {estimatedAbsorbedOil} ml
            </span>
            <span className="text-2xs text-muted-foreground block">
              {isEs
                ? "Aporta jugosidad y sedosidad al corte final"
                : "Provides moisture and silkiness to final slice"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
