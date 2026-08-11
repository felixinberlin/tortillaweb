import React, { useState, useMemo } from "react";
import { Trash2, ChevronDown, ChevronUp, SlidersHorizontal, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIngredientModifier } from "@/domain/builder/ingredientRegistry";
import type { EggSize, OilCookingStyle, TortillaIngredientModifier } from "@/domain/builder/types";

interface SelectedIngredientsBarProps {
  lang: string;
  eggs: number;
  eggSize: EggSize;
  potatoesGrams: number;
  oilStyle: OilCookingStyle;
  extras: { id: string; quantity: number }[];
  onUpdateExtra: (id: string, quantity: number) => void;
  onClearExtras: () => void;
  onSelectTab: (tab: "step1" | "step2" | "step3" | "identity") => void;
  activeTab: string;
}

export const SelectedIngredientsBar: React.FC<SelectedIngredientsBarProps> = ({
  lang,
  eggs,
  eggSize,
  potatoesGrams,
  oilStyle,
  extras,
  onUpdateExtra,
  onClearExtras,
  onSelectTab,
  activeTab,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [isExpanded, setIsExpanded] = useState(true);

  // Filter active extra ingredients with quantity > 0
  const activeExtras = useMemo(() => {
    return extras.filter((e) => e.quantity > 0);
  }, [extras]);

  const getLocalizedName = (item: TortillaIngredientModifier) => {
    if (isEs) return item.name.es;
    if (isDe) return item.name.de;
    return item.name.en;
  };

  const totalIngredientsCount = 3 + activeExtras.length; // 3 base (eggs, potatoes, oil) + extras

  return (
    <Card className="border-2 border-amber-900/15 shadow-md bg-stone-50/95 backdrop-blur-xs rounded-2xl overflow-hidden mb-8 transition-all">
      {/* Top Title & Header Bar */}
      <div className="bg-amber-100/70 border-b border-amber-900/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-2xs">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-stone-900 text-sm md:text-base leading-none">
                {isEs ? "Ingredientes Seleccionados" : isDe ? "Ausgewählte Zutaten" : "Selected Ingredients"}
              </h3>
              <Badge className="bg-amber-600 text-white font-black text-xs px-2 py-0.5 rounded-full">
                {totalIngredientsCount}
              </Badge>
            </div>
            <p className="text-2xs text-stone-600 mt-0.5">
              {isEs
                ? "Resumen en tiempo real. Haz clic en un ingrediente para editarlo o eliminarlo."
                : isDe
                ? "Echtzeit-Übersicht. Klicken Sie auf eine Zutat, um sie zu bearbeiten."
                : "Real-time summary. Click any ingredient to edit or remove it."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeExtras.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearExtras}
              className="text-2xs font-bold text-amber-900 hover:text-red-700 hover:bg-amber-200/50 h-7 px-2.5 rounded-lg flex items-center gap-1"
              title={isEs ? "Eliminar todos los ingredientes extra" : "Remove all extra ingredients"}
            >
              <Trash2 className="w-3 h-3" />
              {isEs ? "Quitar extras" : isDe ? "Extras entfernen" : "Clear extras"}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-600 hover:text-stone-900 h-7 w-7 p-0 rounded-lg"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Body */}
      {isExpanded && (
        <CardContent className="p-4 space-y-4">
          {/* Active Ingredients Area */}
          <div className="space-y-2">
            <span className="text-3xs font-extrabold text-stone-500 uppercase tracking-wider block">
              {isEs ? "Ingredientes en tu receta actual:" : isDe ? "Aktuelle Zutaten:" : "Current Recipe Ingredients:"}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* Base Item 1: Eggs */}
              <button
                type="button"
                onClick={() => onSelectTab("step1")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
                  activeTab === "step1"
                    ? "bg-amber-200 border-amber-400 text-amber-950"
                    : "bg-white border-stone-200 text-stone-800 hover:border-amber-300"
                }`}
                title={isEs ? "Haz clic para editar la base" : "Click to edit base"}
              >
                <span>🥚</span>
                <span>{eggs} {isEs ? "Huevos" : isDe ? "Eier" : "Eggs"} ({eggSize.toUpperCase()})</span>
                <span className="text-3xs text-amber-800 font-normal">({isEs ? "Base" : "Base"})</span>
              </button>

              {/* Base Item 2: Potatoes */}
              <button
                type="button"
                onClick={() => onSelectTab("step1")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
                  activeTab === "step1"
                    ? "bg-amber-200 border-amber-400 text-amber-950"
                    : "bg-white border-stone-200 text-stone-800 hover:border-amber-300"
                }`}
                title={isEs ? "Haz clic para editar la base" : "Click to edit base"}
              >
                <span>🥔</span>
                <span>{potatoesGrams}g {isEs ? "Patatas" : isDe ? "Kartoffeln" : "Potatoes"}</span>
                <span className="text-3xs text-amber-800 font-normal">({isEs ? "Base" : "Base"})</span>
              </button>

              {/* Base Item 3: Oil */}
              <button
                type="button"
                onClick={() => onSelectTab("step1")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
                  activeTab === "step1"
                    ? "bg-amber-200 border-amber-400 text-amber-950"
                    : "bg-white border-stone-200 text-stone-800 hover:border-amber-300"
                }`}
                title={isEs ? "Haz clic para editar la base" : "Click to edit base"}
              >
                <span>🫒</span>
                <span>{isEs ? "Aceite" : isDe ? "Öl" : "Oil"} ({oilStyle})</span>
                <span className="text-3xs text-amber-800 font-normal">({isEs ? "Base" : "Base"})</span>
              </button>

              {/* Active Extra Ingredients Pills (Clickable to remove!) */}
              {activeExtras.map((ex) => {
                const mod = getIngredientModifier(ex.id);
                const name = mod ? getLocalizedName(mod) : ex.id;
                const unit = mod?.defaultUnit || "g";

                return (
                  <div
                    key={ex.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white border border-amber-700 shadow-2xs group transition-all hover:bg-red-700 hover:border-red-800 cursor-pointer"
                    onClick={() => onUpdateExtra(ex.id, 0)}
                    title={isEs ? "Haz clic para desactivar / quitar de la lista" : "Click to deactivate / remove from list"}
                  >
                    <span>✨</span>
                    <span>{name}</span>
                    <span className="bg-amber-800/80 group-hover:bg-red-900/80 px-1.5 py-0.5 rounded-md text-3xs font-mono">
                      {ex.quantity}{unit}
                    </span>
                    <span className="ml-1 text-amber-200 group-hover:text-white font-extrabold text-sm leading-none">
                      ×
                    </span>
                  </div>
                );
              })}

              {/* Button to go to Step 2 Nevera */}
              {activeTab !== "step2" && (
                <button
                  type="button"
                  onClick={() => onSelectTab("step2")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200 transition-all shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isEs ? "Añadir ingrediente de la nevera" : isDe ? "Zutat hinzufügen" : "Add fridge ingredient"}</span>
                </button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

