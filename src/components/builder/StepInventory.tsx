import React, { useState, useMemo } from "react";
import { Plus, Minus, Search } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border mb-6">
          <div>
            <h3 className="font-serif-heading text-xl font-bold text-foreground">
              {isEs ? "🥗 Inventario de Ingredientes Extras" : isDe ? "🥗 Zusatzzutaten" : "🥗 Extra Ingredients & Add-ins"}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {isEs
                ? "Añade cebolla caramelizada, chorizo, pimientos o queso a tu fórmula personalizada."
                : isDe
                ? "Fügen Sie karamellisierte Zwiebeln, Chorizo, Paprika oder Käse hinzu."
                : "Add caramelized onions, chorizo, peppers, or artisan cheeses."}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isEs ? "Buscar ingrediente..." : "Search ingredients..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-accent border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] shadow-2xs"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredIngredients.map((item) => {
            const qty = getExtraQty(item.ingredientId);
            const isSelected = qty > 0;

            return (
              <div
                key={item.ingredientId}
                className={`p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 shadow-2xs"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{getLocalizedName(item)}</h4>
                    <span className="text-3xs text-muted-foreground capitalize">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => onUpdateExtra(item.ingredientId, Math.max(0, qty - 1))}
                      disabled={qty === 0}
                      className="p-1 rounded-md hover:bg-secondary disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-black">{qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateExtra(item.ingredientId, qty + 1)}
                      className="p-1 rounded-md hover:bg-secondary cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-2xs text-muted-foreground leading-relaxed line-clamp-2">
                  {getLocalizedAdvice(item)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
