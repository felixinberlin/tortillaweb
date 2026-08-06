import React, { useState, useMemo } from "react";
import { Search, X, Plus, Check, Trash2, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OPTIONAL_INGREDIENTS, getIngredientModifier } from "@/domain/builder/ingredientRegistry";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter active extra ingredients with quantity > 0
  const activeExtras = useMemo(() => {
    return extras.filter((e) => e.quantity > 0);
  }, [extras]);

  // Search filter across optional ingredients
  const filteredSearchIngredients = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return OPTIONAL_INGREDIENTS.filter((item) => {
      const nameEs = item.name.es.toLowerCase();
      const nameEn = item.name.en.toLowerCase();
      const nameDe = item.name.de.toLowerCase();
      const category = item.category.toLowerCase();
      return (
        nameEs.includes(query) ||
        nameEn.includes(query) ||
        nameDe.includes(query) ||
        category.includes(query) ||
        item.ingredientId.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const getLocalizedName = (item: TortillaIngredientModifier) => {
    if (isEs) return item.name.es;
    if (isDe) return item.name.de;
    return item.name.en;
  };

  const getExtraQty = (id: string) => {
    const item = extras.find((e) => e.id === id);
    return item ? item.quantity : 0;
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
                {isEs ? "Lista de Ingredientes Seleccionados" : isDe ? "Ausgewählte Zutaten" : "Selected Ingredients List"}
              </h3>
              <Badge className="bg-amber-600 text-white font-black text-xs px-2 py-0.5 rounded-full">
                {totalIngredientsCount}
              </Badge>
            </div>
            <p className="text-2xs text-stone-600 mt-0.5">
              {isEs
                ? "Visible en todo momento. Haz clic en cualquier ingrediente para desactivarlo o eliminarlo."
                : isDe
                ? "Jederzeit sichtbar. Klicken Sie auf eine Zutat, um sie zu entfernen."
                : "Always visible. Click any ingredient to activate, deactivate, or remove it."}
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

              {activeExtras.length === 0 && (
                <span className="text-xs text-stone-500 italic bg-stone-100 px-3 py-1 rounded-xl border border-dashed border-stone-300">
                  {isEs
                    ? "Sin extras seleccionados (Tortilla pura de solo huevo y patata)"
                    : isDe
                    ? "Keine Extras ausgewählt (Reine Kartoffel-Ei Tortilla)"
                    : "No extra ingredients selected (Pure potato and egg recipe)"}
                </span>
              )}
            </div>
          </div>

          {/* Quick Search & Quick-Add Bar */}
          <div className="pt-2 border-t border-amber-900/10 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEs
                      ? "🔍 Buscar ingrediente (cebolla, chorizo, pimiento, ajo, queso...)"
                      : isDe
                      ? "🔍 Zutat suchen (Zwiebel, Chorizo, Paprika, Knoblauch...)"
                      : "🔍 Search ingredient (onion, chorizo, pepper, garlic, cheese...)"
                  }
                  className="w-full pl-9 pr-8 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder:text-stone-400 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    aria-label={isEs ? "Limpiar búsqueda" : "Clear search"}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {searchQuery && (
                <span className="text-3xs text-amber-900 font-bold self-center">
                  {filteredSearchIngredients.length} {isEs ? "resultados" : "results"}
                </span>
              )}
            </div>

            {/* Render Search Results Dropdown / Grid */}
            {searchQuery.trim() !== "" && (
              <div className="bg-white border-2 border-amber-400 rounded-xl p-3 shadow-md space-y-2 animate-in fade-in duration-150">
                <div className="text-3xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center justify-between">
                  <span>{isEs ? "Resultados de la búsqueda:" : "Search Results:"}</span>
                  <span className="text-stone-500 font-normal">
                    {isEs ? "Haz clic para activar / desactivar" : "Click to toggle active"}
                  </span>
                </div>

                {filteredSearchIngredients.length === 0 ? (
                  <p className="text-xs text-stone-500 py-2 text-center">
                    {isEs
                      ? `No se encontraron ingredientes para "${searchQuery}"`
                      : `No ingredients found matching "${searchQuery}"`}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredSearchIngredients.map((item) => {
                      const currentQty = getExtraQty(item.ingredientId);
                      const isActive = currentQty > 0;
                      const name = getLocalizedName(item);

                      return (
                        <button
                          key={item.ingredientId}
                          type="button"
                          onClick={() => {
                            if (isActive) {
                              onUpdateExtra(item.ingredientId, 0);
                            } else {
                              onUpdateExtra(item.ingredientId, item.defaultQuantity);
                            }
                          }}
                          className={`p-2 rounded-lg border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                            isActive
                              ? "bg-amber-600 text-white border-amber-700 shadow-2xs"
                              : "bg-stone-50 text-stone-800 border-stone-200 hover:bg-amber-100/60 hover:border-amber-300"
                          }`}
                        >
                          <div className="truncate">
                            <span>{name}</span>
                            <span className="block text-3xs font-normal opacity-80">
                              {item.defaultQuantity}{item.defaultUnit}
                            </span>
                          </div>
                          {isActive ? (
                            <span className="bg-amber-800 px-1.5 py-0.5 rounded text-3xs font-black">
                              ✓ {isEs ? "Activo" : "Active"}
                            </span>
                          ) : (
                            <span className="text-amber-800 font-black text-3xs bg-amber-200/80 px-1.5 py-0.5 rounded">
                              + {isEs ? "Añadir" : "Add"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quick-Add / Toggle Popular Ingredients Pills (when search is empty) */}
            {!searchQuery && (
              <div className="space-y-1.5">
                <span className="text-3xs font-bold text-stone-500 uppercase tracking-wider block">
                  {isEs ? "Acceso rápido a ingredientes opcionales (haz clic para añadir/quitar):" : "Quick toggle optional ingredients:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {OPTIONAL_INGREDIENTS.map((item) => {
                    const currentQty = getExtraQty(item.ingredientId);
                    const isActive = currentQty > 0;
                    const name = getLocalizedName(item);

                    return (
                      <button
                        key={item.ingredientId}
                        type="button"
                        onClick={() => {
                          if (isActive) {
                            onUpdateExtra(item.ingredientId, 0);
                          } else {
                            onUpdateExtra(item.ingredientId, item.defaultQuantity);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-all flex items-center gap-1 border ${
                          isActive
                            ? "bg-amber-600 text-white border-amber-700 shadow-2xs"
                            : "bg-white text-stone-700 border-stone-200 hover:bg-amber-50 hover:border-amber-300"
                        }`}
                      >
                        {isActive ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <Plus className="w-3 h-3 text-amber-700" />
                        )}
                        <span>{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
