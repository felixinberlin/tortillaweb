import React from "react";
import { Egg, Utensils, Flame, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EggSize, OilCookingStyle } from "@/domain/builder/types";

interface StepIngredientsProps {
  lang: string;
  eggs: number;
  setEggs: (val: number) => void;
  eggSize: EggSize;
  setEggSize: (val: EggSize) => void;
  potatoesGrams: number;
  setPotatoesGrams: (val: number) => void;
  oilStyle: OilCookingStyle;
  setOilStyle: (val: OilCookingStyle) => void;
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
  oilStyle,
  setOilStyle,
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

  const oilStyles: { id: OilCookingStyle; title: string; desc: string; icon: string }[] = [
    {
      id: "minimal",
      title: isEs ? "Mínimo" : isDe ? "Minimal" : "Minimal",
      desc: isEs
        ? "Confitado ligero / sartén salteada"
        : isDe
        ? "Leichtes Frittieren"
        : "Low-oil confit / shallow sauté",
      icon: "💧",
    },
    {
      id: "traditional",
      title: isEs ? "Tradicional" : isDe ? "Traditionell" : "Traditional",
      desc: isEs
        ? "Patatas sumergidas en pocha lenta"
        : isDe
        ? "Klassisches Olivenölbad"
        : "Classic slow oil poach",
      icon: "🫒",
    },
    {
      id: "generous",
      title: isEs ? "Generoso" : isDe ? "Großzügig" : "Generous",
      desc: isEs
        ? "Abundante baño de AOVE virgen extra"
        : isDe
        ? "Reichlich Olivenöl"
        : "Deep EVOO confit poach",
      icon: "✨",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Eggs Card */}
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-amber-95 shadow-xs">
                <Egg className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-stone-900">
                  {isEs ? "🥚 1. Huevos" : isDe ? "🥚 1. Eier" : "🥚 1. Eggs"}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm">
                  {isEs
                    ? "Selecciona la cantidad y tamaño de huevos disponibles"
                    : isDe
                    ? "Menge und Größe der verfügbaren Eier wählen"
                    : "Select quantity and size of available eggs"}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-amber-600 text-white font-bold text-base px-3 py-1">
              {eggs} {isEs ? "unidades" : isDe ? "Stück" : "units"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Egg Quantity Slider / Controls */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-stone-800">
                {isEs ? "Cantidad de Huevos:" : isDe ? "Eieranzahl:" : "Egg Quantity:"}
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full font-bold text-lg"
                  onClick={() => setEggs(Math.max(2, eggs - 1))}
                >
                  -
                </Button>
                <span className="font-bold text-stone-900 text-lg w-8 text-center">{eggs}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full font-bold text-lg"
                  onClick={() => setEggs(Math.min(20, eggs + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={16}
              value={eggs}
              onChange={(e) => setEggs(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-amber-200/60 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>2 ({isEs ? "Pincho" : "Single"})</span>
              <span>6 ({isEs ? "Clásica" : "Standard"})</span>
              <span>12 ({isEs ? "Familiar" : "Family"})</span>
            </div>
          </div>

          {/* Egg Size Selector */}
          <div>
            <label className="text-sm font-semibold text-stone-800 block mb-2">
              {isEs ? "Tamaño del Huevo (Opcional):" : isDe ? "Eiergröße (Optional):" : "Egg Size (Optional):"}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {eggSizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setEggSize(s.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    eggSize === s.id
                      ? "border-amber-600 bg-amber-100/80 text-amber-950 font-bold shadow-xs"
                      : "border-stone-200 bg-white hover:bg-stone-100/80 text-stone-700"
                  }`}
                >
                  <div className="text-base font-extrabold">{s.label}</div>
                  <div className="text-xs text-stone-500">{s.grams}</div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Potatoes Card */}
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-xs">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-stone-900">
                  {isEs ? "🥔 2. Patatas" : isDe ? "🥔 2. Kartoffeln" : "🥔 2. Potatoes"}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm">
                  {isEs
                    ? "Peso en gramos o estimación por unidades"
                    : isDe
                    ? "Gewicht in Gramm oder geschätzte Stückzahl"
                    : "Weight in grams or estimated potato units"}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-950 border-amber-300 font-bold px-3 py-1">
              {potatoesGrams}g
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-stone-800">
                {isEs ? "Peso total de patatas:" : isDe ? "Gesamtgewicht Kartoffeln:" : "Total Potato Weight:"}
              </label>
              <span className="font-bold text-amber-900 text-lg">{potatoesGrams}g</span>
            </div>
            <input
              type="range"
              min={100}
              max={1500}
              step={50}
              value={potatoesGrams}
              onChange={(e) => setPotatoesGrams(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-amber-200/60 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>200g</span>
              <span>600g ({isEs ? "Estándar" : "Standard"})</span>
              <span>1200g</span>
            </div>
          </div>

          {/* Normalized Unit Badge Callout */}
          <div className="bg-amber-100/60 border border-amber-300 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥔</span>
              <div>
                <p className="font-bold text-amber-950 text-sm">
                  ≈ {potatoUnits} {isEs ? "patatas medianas" : isDe ? "mittlere Kartoffeln" : "medium potatoes"}
                </p>
                <p className="text-xs text-amber-900/80">
                  {isEs
                    ? "Normalización del sistema: 100g de patata = 1 unidad de patata"
                    : isDe
                    ? "Systemnormalisierung: 100g Kartoffel = 1 Kartoffeleinheit"
                    : "System normalization: 100g potato = 1 potato unit"}
                </p>
              </div>
            </div>
            <Badge className="bg-amber-700 text-white font-semibold text-xs">100g = 1 unit</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Olive Oil Card */}
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-700 text-white shadow-xs">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-stone-900">
                  {isEs ? "🫒 3. Aceite de Oliva" : isDe ? "🫒 3. Olivenöl" : "🫒 3. Olive Oil"}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm">
                  {isEs
                    ? "Disponibilidad y estilo de fritura / pochado"
                    : isDe
                    ? "Verfügbarkeit und Frittierstil"
                    : "Availability and poaching oil style"}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-950 border-amber-300 font-bold capitalize">
              {oilStyle}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {oilStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setOilStyle(style.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  oilStyle === style.id
                    ? "border-amber-600 bg-amber-100/90 shadow-sm text-stone-900"
                    : "border-stone-200 bg-white hover:bg-stone-100/70 text-stone-700"
                }`}
              >
                {oilStyle === style.id && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="text-2xl mb-1">{style.icon}</div>
                <div className="font-bold text-base">{style.title}</div>
                <div className="text-xs text-stone-600 mt-1">{style.desc}</div>
              </button>
            ))}
          </div>

          {/* Oil Calculation Output Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
              <span className="text-xs text-stone-500 font-medium block">
                {isEs ? "Aceite para freír est." : isDe ? "Geschätztes Frittieröl" : "Est. Frying Oil Needed"}
              </span>
              <span className="text-xl font-extrabold text-amber-900">{estimatedFryingOil} ml</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
              <span className="text-xs text-stone-500 font-medium block">
                {isEs ? "Aceite absorbido est." : isDe ? "Aufgenommenes Öl" : "Est. Absorbed Oil"}
              </span>
              <span className="text-xl font-extrabold text-amber-700">{estimatedAbsorbedOil} ml</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
