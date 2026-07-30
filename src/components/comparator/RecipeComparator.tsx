import React, { useState, useMemo } from "react";
import type { RawRecipeInput, LocalizedString } from "@/domain/comparator/types";
import { compareRecipes } from "@/domain/comparator/compareRecipes";
import { Scale, Sparkles, ChefHat } from "lucide-react";

interface RecipeComparatorProps {
  recipes: RawRecipeInput[];
  initialRecipeAId?: string;
  initialRecipeBId?: string;
  lang?: string;
}

export const RecipeComparator: React.FC<RecipeComparatorProps> = ({
  recipes,
  initialRecipeAId = "clasica",
  initialRecipeBId = "betanzos",
  lang = "es",
}) => {
  const [selectedIdA, setSelectedIdA] = useState<string>(initialRecipeAId);
  const [selectedIdB, setSelectedIdB] = useState<string>(initialRecipeBId);

  const recipeMap = useMemo(() => {
    const map = new Map<string, RawRecipeInput>();
    for (const r of recipes) {
      const id = r.id || r.recipeId || "";
      if (id) map.set(id, r);
    }
    return map;
  }, [recipes]);

  const recipeA = useMemo(() => recipeMap.get(selectedIdA) || recipes[0], [recipeMap, selectedIdA, recipes]);
  const recipeB = useMemo(() => recipeMap.get(selectedIdB) || recipes[1] || recipes[0], [recipeMap, selectedIdB, recipes]);

  const comparison = useMemo(() => {
    if (!recipeA || !recipeB) return null;
    return compareRecipes(recipeA, recipeB);
  }, [recipeA, recipeB]);

  function getLocalizedText(str: string | LocalizedString | undefined): string {
    if (!str) return "";
    if (typeof str === "object") {
      return str[lang as "es" | "en" | "de"] || str.es || str.en || "";
    }
    return str;
  }

  const translations = {
    es: {
      title: "Comparador Nutricional y DNA de Tortilla",
      subtitle: "Conversión matemática estandarizada por cada huevo (1 Huevo = Unidad Fundamental)",
      selectA: "Receta A (Base)",
      selectB: "Receta B (Comparación)",
      eggCount: "Huevos totales en receta",
      dnaTitle: "ADN Térmico y Proporciones Culinarias",
      eggDominance: "Dominancia de Huevo",
      potatoIntensity: "Carga de Patata",
      oilRichness: "Oleosidad y Confitado",
      onionPresence: "Presencia de Cebolla",
      tableHeaderIng: "Ingrediente",
      tableHeaderA: "Receta A (por huevo)",
      tableHeaderB: "Receta B (por huevo)",
      tableHeaderDiff: "Diferencia",
      equal: "Igual (0%)",
      classificationTitle: "Perfil Culinario Normalizado",
    },
    en: {
      title: "Nutritional & Tortilla DNA Comparator",
      subtitle: "Standardized mathematical ratio per 1 egg (1 Egg = Fundamental Unit)",
      selectA: "Recipe A (Baseline)",
      selectB: "Recipe B (Comparison)",
      eggCount: "Total eggs in recipe",
      dnaTitle: "Culinary DNA & Proportions",
      eggDominance: "Egg Dominance",
      potatoIntensity: "Potato Load",
      oilRichness: "Oil & Confit Richness",
      onionPresence: "Onion Presence",
      tableHeaderIng: "Ingredient",
      tableHeaderA: "Recipe A (per egg)",
      tableHeaderB: "Recipe B (per egg)",
      tableHeaderDiff: "Difference",
      equal: "Equal (0%)",
      classificationTitle: "Normalized Culinary Profile",
    },
    de: {
      title: "Nährwert- & Tortilla-DNA-Vergleicher",
      subtitle: "Standardisierte mathematische Verhältnisse pro 1 Ei (1 Ei = Grundeinheit)",
      selectA: "Rezept A (Basis)",
      selectB: "Rezept B (Vergleich)",
      eggCount: "Eier gesamt im Rezept",
      dnaTitle: "Kulinarische DNA & Proportionen",
      eggDominance: "Ei-Dominanz",
      potatoIntensity: "Kartoffelgehalt",
      oilRichness: "Ölgehalt & Confit",
      onionPresence: "Zwiebelanteil",
      tableHeaderIng: "Zutat",
      tableHeaderA: "Rezept A (pro Ei)",
      tableHeaderB: "Rezept B (pro Ei)",
      tableHeaderDiff: "Differenz",
      equal: "Gleich (0%)",
      classificationTitle: "Normalisiertes Kulinarisches Profil",
    },
  }[lang as "es" | "en" | "de"] || translations.es;

  if (!comparison) return null;

  const { profileA, profileB } = { profileA: comparison.recipeA, profileB: comparison.recipeB };

  // Calculate DNA percentages for progress bars
  const calcEggDominance = (potatoQty: number) => Math.min(100, Math.max(10, Math.round((1 - (potatoQty - 50) / 150) * 100)));
  const calcPotatoIntensity = (potatoQty: number) => Math.min(100, Math.max(10, Math.round((potatoQty / 200) * 100)));
  const calcOilRichness = (oilQty: number) => Math.min(100, Math.max(10, Math.round((oilQty / 45) * 100)));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 my-6">
      {/* Selector Section */}
      <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#E8E2D5] pb-3">
          <div className="p-2 rounded-xl bg-[#FFB800] text-[#4A3B32] shadow-2xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-foreground">
              {translations.title}
            </h3>
            <p className="text-xs text-muted-foreground">{translations.subtitle}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {/* Selector Recipe A */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider block">
              {translations.selectA}
            </label>
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D5] text-sm font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
            >
              {recipes.map((r) => {
                const id = r.id || r.recipeId || "";
                return (
                  <option key={id} value={id}>
                    {getLocalizedText(r.title || r.recipeName || r.name)}
                  </option>
                );
              })}
            </select>
            <div className="text-[11px] text-muted-foreground flex items-center justify-between px-1">
              <span>{translations.eggCount}: <strong>{profileA.eggCount} huevos</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                {profileA.classification.potatoIntensityLabel}
              </span>
            </div>
          </div>

          {/* Selector Recipe B */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider block">
              {translations.selectB}
            </label>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D5] text-sm font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
            >
              {recipes.map((r) => {
                const id = r.id || r.recipeId || "";
                return (
                  <option key={id} value={id}>
                    {getLocalizedText(r.title || r.recipeName || r.name)}
                  </option>
                );
              })}
            </select>
            <div className="text-[11px] text-muted-foreground flex items-center justify-between px-1">
              <span>{translations.eggCount}: <strong>{profileB.eggCount} huevos</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px]">
                {profileB.classification.potatoIntensityLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card-notebook overflow-hidden border border-[#E8E2D5] rounded-2xl bg-[#FCF9F2] shadow-sm">
        <div className="p-4 sm:p-5 border-b border-[#E8E2D5] bg-[#FAF6EE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-[#8D6E63]" />
            <h4 className="font-serif-heading font-bold text-base text-foreground">
              {getLocalizedText(recipeA.title || recipeA.recipeName)} vs {getLocalizedText(recipeB.title || recipeB.recipeName)}
            </h4>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#FFB800]/20 text-[#8D6E63] border border-[#FFB800]/40">
            Ratio Normalizado / 1 Huevo
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E8E2D5] bg-[#F5E6BE]/30 text-[#8D6E63]">
                <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderIng}</th>
                <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderA}</th>
                <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderB}</th>
                <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderDiff}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D5]">
              {comparison.ingredients.map((item) => {
                const isDiffPositive = item.difference > 0;

                return (
                  <tr key={item.ingredientId} className="hover:bg-[#FAF6EE]/80 transition-colors">
                    <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8D6E63]"></span>
                      {getLocalizedText(item.name)}
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-foreground">
                      {item.recipeAValue} {item.unit} / huevo
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-foreground">
                      {item.recipeBValue} {item.unit} / huevo
                    </td>
                    <td className="p-3.5 font-mono">
                      {item.difference === 0 ? (
                        <span className="text-muted-foreground text-xs font-normal">{translations.equal}</span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-xs ${
                            isDiffPositive
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          {isDiffPositive ? `+${item.difference}` : item.difference} {item.unit}{" "}
                          ({isDiffPositive ? `+${item.percentageDifference}%` : `${item.percentageDifference}%`})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tortilla DNA Visualizer */}
      <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB800]" />
            <h4 className="font-serif-heading font-bold text-base text-foreground">
              {translations.dnaTitle}
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FFB800] inline-block"></span>
              {getLocalizedText(recipeA.title || recipeA.recipeName)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#00A3FF] inline-block"></span>
              {getLocalizedText(recipeB.title || recipeB.recipeName)}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Egg Dominance Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{translations.eggDominance}</span>
              <span className="text-[#8D6E63] font-mono">
                {profileA.classification.eggDominanceLabel} vs {profileB.classification.eggDominanceLabel}
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcEggDominance(profileA.ratios.potato?.quantity || 100)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#00A3FF] transition-all duration-500 rounded-full"
                  style={{ width: `${calcEggDominance(profileB.ratios.potato?.quantity || 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Potato Intensity Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{translations.potatoIntensity}</span>
              <span className="text-[#8D6E63] font-mono">
                {profileA.ratios.potato?.quantity || 0}g/huevo vs {profileB.ratios.potato?.quantity || 0}g/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcPotatoIntensity(profileA.ratios.potato?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#00A3FF] transition-all duration-500 rounded-full"
                  style={{ width: `${calcPotatoIntensity(profileB.ratios.potato?.quantity || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Oil Richness Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{translations.oilRichness}</span>
              <span className="text-[#8D6E63] font-mono">
                {profileA.ratios.oil?.quantity || 0}ml/huevo vs {profileB.ratios.oil?.quantity || 0}ml/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcOilRichness(profileA.ratios.oil?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#00A3FF] transition-all duration-500 rounded-full"
                  style={{ width: `${calcOilRichness(profileB.ratios.oil?.quantity || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeComparator;
