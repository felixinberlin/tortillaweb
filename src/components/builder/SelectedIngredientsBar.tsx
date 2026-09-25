import React, { useState, useMemo } from "react";
import { Trash2, ChevronDown, ChevronUp, SlidersHorizontal, Plus } from "lucide-react";
import { getIngredientModifier } from "@/domain/builder/ingredientRegistry";
import type {
  EggSize,
  OilCookingStyle,
  PotatoVariety,
  PotatoCutStyle,
  TortillaIngredientModifier,
} from "@/domain/builder/types";

interface SelectedIngredientsBarProps {
  lang: string;
  eggs: number;
  eggSize: EggSize;
  potatoesGrams: number;
  potatoVariety?: PotatoVariety;
  potatoCut?: PotatoCutStyle;
  oilStyle?: OilCookingStyle;
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
  potatoVariety = "monalisa",
  potatoCut = "panadera",
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
    <div className="card-notebook bg-card border border-border rounded-2xl shadow-xs overflow-hidden mb-8 transition-all">
      {/* Top Title & Header Bar */}
      <div className="bg-accent border-b border-border px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#FFB800] text-[#1C1917] shadow-2xs font-bold">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-foreground text-sm md:text-base leading-none">
                {isEs ? "Ingredientes Seleccionados" : isDe ? "Ausgewählte Zutaten" : "Selected Ingredients"}
              </h3>
              <span className="bg-[#FFB800] text-[#1C1917] font-black text-xs px-2 py-0.5 rounded-full">
                {totalIngredientsCount}
              </span>
            </div>
            <p className="text-2xs text-muted-foreground mt-0.5">
              {isEs
                ? "Resumen en tiempo real. Modifica ingredientes o pulsa para ajustar proporciones."
                : isDe
                ? "Echtzeit-Übersicht Ihrer Rezeptur."
                : "Real-time summary of your recipe components."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeExtras.length > 0 && (
            <button
              type="button"
              onClick={onClearExtras}
              className="text-2xs font-bold text-destructive hover:bg-destructive/10 h-7 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              title={isEs ? "Eliminar todos los ingredientes extra" : "Remove all extra ingredients"}
            >
              <Trash2 className="w-3 h-3" />
              <span>{isEs ? "Quitar extras" : isDe ? "Extras entfernen" : "Clear extras"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800]"
            aria-label={isExpanded ? (isEs ? "Contraer ingredientes" : "Collapse ingredients bar") : (isEs ? "Expandir ingredientes" : "Expand ingredients bar")}
            aria-expanded={isExpanded}
            aria-controls="ingredients-bar-content"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Content Area */}
      {isExpanded && (
        <div id="ingredients-bar-content" className="p-4 bg-card">
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Base Huevos */}
            <div className="inline-flex items-center gap-1.5 bg-accent border border-border px-3 py-1.5 rounded-xl text-xs">
              <span className="text-base">🥚</span>
              <span className="font-extrabold text-foreground">
                {eggs} {isEs ? "Huevos" : "Eggs"} ({eggSize.toUpperCase()})
              </span>
              <button
                type="button"
                onClick={() => onSelectTab("step1")}
                className="text-3xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline ml-1 cursor-pointer"
              >
                {isEs ? "ajustar" : "edit"}
              </button>
            </div>

            {/* 2. Base Patatas */}
            <div className="inline-flex items-center gap-1.5 bg-accent border border-border px-3 py-1.5 rounded-xl text-xs">
              <span className="text-base">🥔</span>
              <span className="font-extrabold text-foreground">
                {potatoesGrams}g ({potatoVariety} - {potatoCut})
              </span>
              <button
                type="button"
                onClick={() => onSelectTab("step1")}
                className="text-3xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline ml-1 cursor-pointer"
              >
                {isEs ? "ajustar" : "edit"}
              </button>
            </div>

            {/* 3. Base Aceite */}
            <div className="inline-flex items-center gap-1.5 bg-accent border border-border px-3 py-1.5 rounded-xl text-xs">
              <span className="text-base">🫒</span>
              <span className="font-extrabold text-foreground">
                {isEs ? "AOVE Fritura" : "EVOO"}
              </span>
            </div>

            {/* Active Extras */}
            {activeExtras.map((extra) => {
              const modifier = getIngredientModifier(extra.id);
              if (!modifier) return null;
              const name = getLocalizedName(modifier);

              return (
                <div
                  key={extra.id}
                  className="inline-flex items-center gap-1.5 bg-[#FFB800]/15 dark:bg-[#FFB800]/25 border border-[#FFB800]/40 px-3 py-1.5 rounded-xl text-xs"
                >
                  <span className="font-extrabold text-foreground">
                    {extra.quantity}× {name}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateExtra(extra.id, 0)}
                    className="text-muted-foreground hover:text-destructive ml-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive rounded-sm px-1"
                    title={isEs ? `Quitar ${name}` : `Remove ${name}`}
                    aria-label={isEs ? `Quitar ${name}` : `Remove ${name}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}

            {/* Add more button */}
            {activeTab !== "step2" && (
              <button
                type="button"
                onClick={() => onSelectTab("step2")}
                className="inline-flex items-center gap-1 border border-dashed border-border px-2.5 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-[#FFB800] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>{isEs ? "Añadir más" : "Add more"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
