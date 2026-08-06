import React, { useState, useMemo } from "react";
import { Plus, Minus, Check, ExternalLink, Info, Search, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OPTIONAL_INGREDIENTS } from "@/domain/builder/ingredientRegistry";
import type { TortillaIngredientModifier } from "@/domain/builder/types";

interface StepInventoryProps {
  lang: string;
  extras: { id: string; quantity: number }[];
  onUpdateExtra: (id: string, quantity: number) => void;
}

export const StepInventory: React.FC<StepInventoryProps> = ({
  lang,
  extras,
  onUpdateExtra,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [activeCategory, setActiveCategory] = useState<"all" | "vegetables" | "meat" | "dairy" | "other">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: isEs ? "Todos" : isDe ? "Alle" : "All" },
    { id: "vegetables", label: isEs ? "Verduras" : isDe ? "Gemüse" : "Vegetables", icon: "🧅" },
    { id: "meat", label: isEs ? "Cárnicos" : isDe ? "Fleisch" : "Meat", icon: "🥓" },
    { id: "dairy", label: isEs ? "Lácteos" : isDe ? "Milchprodukte" : "Dairy", icon: "🧀" },
    { id: "other", label: isEs ? "Otros / Sobras" : isDe ? "Sonstiges" : "Other / Leftovers", icon: "🍲" },
  ];

  const getLocalizedName = (item: TortillaIngredientModifier) => {
    if (isEs) return item.name.es;
    if (isDe) return item.name.de;
    return item.name.en;
  };

  const getLocalizedAdvice = (item: TortillaIngredientModifier) => {
    if (isEs) return item.cookingAdvice.es;
    if (isDe) return item.cookingAdvice.de;
    return item.cookingAdvice.en;
  };

  const getExtraQty = (id: string) => {
    const item = extras.find((e) => e.id === id);
    return item ? item.quantity : 0;
  };

  const filteredIngredients = useMemo(() => {
    return OPTIONAL_INGREDIENTS.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameEs = item.name.es.toLowerCase();
      const nameEn = item.name.en.toLowerCase();
      const nameDe = item.name.de.toLowerCase();
      const category = item.category.toLowerCase();

      return (
        nameEs.includes(q) ||
        nameEn.includes(q) ||
        nameDe.includes(q) ||
        category.includes(q) ||
        item.ingredientId.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const getTaxonomyUrl = (item: TortillaIngredientModifier) => {
    if (!item.taxonomySlug) return null;
    const langPrefix = isEs ? "/es" : isDe ? "/de" : "/en";
    const section = isEs ? "ingredientes" : isDe ? "zutaten" : "ingredients";
    const slug = isEs ? item.taxonomySlug.es : isDe ? item.taxonomySlug.de : item.taxonomySlug.en;
    return `${langPrefix}/${section}/${slug}`;
  };

  const activeCount = extras.filter((e) => e.quantity > 0).length;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl font-bold text-stone-900">
                {isEs ? "🥗 Inventario de la Nevera" : isDe ? "🥗 Zutaten aus dem Kühlschrank" : "🥗 Fridge Inventory"}
              </CardTitle>
              <CardDescription className="text-stone-600 text-sm">
                {isEs
                  ? "Busca o selecciona ingredientes extras para añadirlos a tu tortilla o desactivarlos al instante."
                  : isDe
                  ? "Suchen oder wählen Sie zusätzliche Zutaten aus, um sie Ihrer Tortilla hinzuzufügen."
                  : "Search or choose extra ingredients to add or deactivate them instantly."}
              </CardDescription>
            </div>
            <Badge className="bg-amber-600 text-white font-bold px-3 py-1">
              {activeCount} {isEs ? "activos" : isDe ? "ausgewählt" : "active"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Search Input Field */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEs
                  ? "🔍 Buscar ingrediente por nombre o categoría (cebolla, pimiento, chorizo, queso, ajo...)"
                  : isDe
                  ? "🔍 Zutat nach Name oder Kategorie suchen..."
                  : "🔍 Search ingredient by name or category..."
              }
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder:text-stone-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label={isEs ? "Limpiar búsqueda" : "Clear search"}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-700 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Ingredient Cards Grid */}
          {filteredIngredients.length === 0 ? (
            <div className="text-center py-8 bg-white border border-stone-200 rounded-2xl p-6">
              <p className="text-stone-500 font-medium text-sm">
                {isEs
                  ? `No se encontraron ingredientes para "${searchQuery}".`
                  : `No ingredients found matching "${searchQuery}".`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-bold border-amber-500 text-amber-900"
              >
                {isEs ? "Ver todos los ingredientes" : "Show all ingredients"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIngredients.map((item) => {
                const currentQty = getExtraQty(item.ingredientId);
                const isActive = currentQty > 0;
                const taxonomyUrl = getTaxonomyUrl(item);
                const name = getLocalizedName(item);

                return (
                  <div
                    key={item.ingredientId}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-amber-600 bg-amber-50/90 shadow-sm"
                        : "border-stone-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (isActive) {
                                onUpdateExtra(item.ingredientId, 0);
                              } else {
                                onUpdateExtra(item.ingredientId, item.defaultQuantity);
                              }
                            }}
                            className="font-bold text-stone-900 text-base hover:text-amber-700 text-left cursor-pointer transition-colors"
                          >
                            {name}
                          </button>

                          {isActive && (
                            <Badge className="bg-amber-600 text-white text-3xs px-2 py-0.5">
                              <Check className="w-3 h-3 mr-1 inline" /> {isEs ? "Activo" : "Active"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 capitalize">{item.category}</p>
                      </div>

                      {/* Quantity or Toggle Button */}
                      {isActive ? (
                        <div className="flex items-center gap-1 bg-white border border-amber-300 rounded-lg p-1 shadow-2xs">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-stone-700 font-bold hover:bg-stone-100"
                            onClick={() => {
                              const newQty = currentQty - item.stepIncrement;
                              onUpdateExtra(item.ingredientId, newQty < item.minQuantity ? 0 : newQty);
                            }}
                            title={isEs ? "Reducir cantidad" : "Decrease quantity"}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-bold text-xs text-amber-950 px-1">
                            {currentQty} {item.defaultUnit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-stone-700 font-bold hover:bg-stone-100"
                            onClick={() => {
                              const newQty = Math.min(item.maxQuantity, currentQty + item.stepIncrement);
                              onUpdateExtra(item.ingredientId, newQty);
                            }}
                            title={isEs ? "Aumentar cantidad" : "Increase quantity"}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-800 hover:bg-red-50 ml-1"
                            onClick={() => onUpdateExtra(item.ingredientId, 0)}
                            title={isEs ? "Desactivar / Quitar" : "Deactivate / Remove"}
                            aria-label={isEs ? "Desactivar / Quitar" : "Deactivate / Remove"}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-amber-500 text-amber-900 hover:bg-amber-100 font-semibold text-xs rounded-xl"
                          onClick={() => onUpdateExtra(item.ingredientId, item.defaultQuantity)}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          {isEs ? "Activar" : isDe ? "Aktivieren" : "Activate"}
                        </Button>
                      )}
                    </div>

                    {/* Modifier Effect Indicators */}
                    <div className="flex items-center gap-2 my-2 text-2xs text-stone-600 bg-stone-100/80 p-2 rounded-lg">
                      <span>💧 {isEs ? "Humedad:" : "Moisture:"} {item.effect.moisture > 0 ? `+${item.effect.moisture}` : item.effect.moisture}</span>
                      <span>•</span>
                      <span>🥩 {isEs ? "Grasa:" : "Fat:"} {item.effect.fat > 0 ? `+${item.effect.fat}` : item.effect.fat}</span>
                      <span>•</span>
                      <span>🍯 {isEs ? "Dulzor:" : "Sweetness:"} +{item.effect.sweetness}</span>
                    </div>

                    {/* Cooking Advice Callout */}
                    <div className="text-xs text-stone-700 leading-snug bg-amber-100/50 p-2.5 rounded-lg border border-amber-200/60 mt-2">
                      <p className="italic">"{getLocalizedAdvice(item)}"</p>
                    </div>

                    {/* Taxonomy Knowledge Link */}
                    {taxonomyUrl && (
                      <div className="mt-2 text-right">
                        <a
                          href={taxonomyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-3xs font-bold text-amber-800 hover:text-amber-950 underline gap-1"
                        >
                          <Info className="w-3 h-3" />
                          {isEs ? "Ver ficha técnica del ingrediente" : isDe ? "Zutatenseite anzeigen" : "View ingredient monograph"}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
