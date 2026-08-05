import React, { useState } from "react";
import { Plus, Minus, Check, ExternalLink, Info, Utensils, Flame, Sparkles } from "lucide-react";
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

  const categories = [
    { id: "all", label: isEs ? "Todos" : isDe ? "Alle" : "All" },
    { id: "vegetables", label: isEs ? "Verduras" : isDe ? "Gemüse" : "Vegetables", icon: "🧅" },
    { id: "meat", label: isEs ? "Cárnicos" : isDe ? "Fleisch" : "Meat", icon: "🥓" },
    { id: "dairy", label: isEs ? "Lácteos" : isDe ? "Milchprodukte" : "Dairy", icon: "🧀" },
    { id: "other", label: isEs ? "Otros / Sobras" : isDe ? "Sonstiges" : "Other / Leftovers", icon: "🍲" },
  ];

  const filteredIngredients = OPTIONAL_INGREDIENTS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const getExtraQty = (id: string) => {
    const item = extras.find((e) => e.id === id);
    return item ? item.quantity : 0;
  };

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

  const getTaxonomyUrl = (item: TortillaIngredientModifier) => {
    if (!item.taxonomySlug) return null;
    const langPrefix = isEs ? "/es" : isDe ? "/de" : "/en";
    const section = isEs ? "ingredientes" : isDe ? "zutaten" : "ingredients";
    const slug = isEs ? item.taxonomySlug.es : isDe ? item.taxonomySlug.de : item.taxonomySlug.en;
    return `${langPrefix}/${section}/${slug}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-stone-900">
                {isEs ? "🥗 Inventario de la Nevera" : isDe ? "🥗 Zutaten aus dem Kühlschrank" : "🥗 Fridge Inventory"}
              </CardTitle>
              <CardDescription className="text-stone-600 text-sm">
                {isEs
                  ? "¿Qué más tienes a mano? Añade ingredientes y analiza su impacto técnico."
                  : isDe
                  ? "Was haben Sie sonst noch da? Zutaten hinzufügen und Wirkung analysieren."
                  : "What ingredients do you have? Add them to adapt the technique."}
              </CardDescription>
            </div>
            <Badge className="bg-amber-600 text-white font-bold px-3 py-1">
              {extras.filter((e) => e.quantity > 0).length} {isEs ? "añadidos" : isDe ? "ausgewählt" : "added"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIngredients.map((item) => {
              const currentQty = getExtraQty(item.ingredientId);
              const isActive = currentQty > 0;
              const taxonomyUrl = getTaxonomyUrl(item);

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
                        <span className="font-bold text-stone-900 text-base">
                          {getLocalizedName(item)}
                        </span>
                        {isActive && (
                          <Badge className="bg-amber-600 text-white text-3xs px-2 py-0.5">
                            <Check className="w-3 h-3 mr-1 inline" /> Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 capitalize">{item.category}</p>
                    </div>

                    {/* Quantity or Toggle Button */}
                    {isActive ? (
                      <div className="flex items-center gap-1.5 bg-white border border-amber-300 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-stone-700 font-bold"
                          onClick={() => {
                            const newQty = currentQty - item.stepIncrement;
                            onUpdateExtra(item.ingredientId, newQty < item.minQuantity ? 0 : newQty);
                          }}
                        >
                          -
                        </Button>
                        <span className="font-bold text-xs text-amber-950 px-1">
                          {currentQty} {item.defaultUnit}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-stone-700 font-bold"
                          onClick={() => {
                            const newQty = Math.min(item.maxQuantity, currentQty + item.stepIncrement);
                            onUpdateExtra(item.ingredientId, newQty);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-amber-500 text-amber-900 hover:bg-amber-100 font-semibold text-xs"
                        onClick={() => onUpdateExtra(item.ingredientId, item.defaultQuantity)}
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        {isEs ? "Añadir" : isDe ? "Hinzufügen" : "Add"}
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
        </CardContent>
      </Card>
    </div>
  );
};
