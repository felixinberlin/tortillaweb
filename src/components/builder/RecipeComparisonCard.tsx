import React, { useState, useMemo } from "react";
import {
  Scale,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  ChefHat,
  Egg,
} from "lucide-react";
import type { TortillaConfiguration } from "@/domain/builder/types";
import type { RawRecipeInput, LocalizedString } from "@/domain/comparator/types";
import { compareRecipes } from "@/domain/comparator/compareRecipes";
import { getComparatorUrlForConfig } from "@/domain/builder/dnaShareHelper";

// Load all recipes eagerly from the content directory
const recipeModules = import.meta.glob("/src/content/recipes/*.json", { eager: true });
const allCanonicalRecipes: RawRecipeInput[] = Object.values(recipeModules).map((mod: any) => mod.default || mod);

interface RecipeComparisonCardProps {
  lang: string;
  config: TortillaConfiguration;
  recipes?: RawRecipeInput[];
}

export const RecipeComparisonCard: React.FC<RecipeComparisonCardProps> = ({
  lang,
  config,
  recipes = allCanonicalRecipes,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [selectedCanonicalId, setSelectedCanonicalId] = useState<string>("clasica");

  // Helper to extract localized string
  const getLocalized = (str: string | LocalizedString | undefined): string => {
    if (!str) return "";
    if (typeof str === "object") {
      return str[lang as "es" | "en" | "de"] || str.es || str.en || "";
    }
    return str;
  };

  // Convert the user's custom builder configuration into a RawRecipeInput for comparison
  const userRecipeInput: RawRecipeInput = useMemo(() => {
    const eggIng = config.ingredients.find((i) => i.entityId === "egg");
    const potatoIng = config.ingredients.find((i) => i.entityId === "potato");
    const onionIng = config.ingredients.find((i) => i.entityId === "onion");

    const totalEggs = eggIng ? eggIng.quantity : 6;
    const totalPotatoes = potatoIng ? potatoIng.quantity : 600;
    const totalOnion = onionIng ? onionIng.quantity : 0;
    const totalOil = config.calculatedProfile.estimatedAbsorbedOilMl || 60;

    const rawIngredients = [
      {
        id: "egg",
        ingredientId: "egg",
        name: { es: "Huevos", en: "Eggs", de: "Eier" },
        amount: totalEggs,
        unit: "unit",
      },
      {
        id: "potato",
        ingredientId: "potato",
        name: { es: "Patatas", en: "Potatoes", de: "Kartoffeln" },
        amount: totalPotatoes,
        unit: "g",
      },
      {
        id: "oil",
        ingredientId: "oil",
        name: { es: "Aceite de Oliva", en: "Olive Oil", de: "Olivenöl" },
        amount: totalOil,
        unit: "ml",
      },
    ];

    if (totalOnion > 0) {
      rawIngredients.push({
        id: "onion",
        ingredientId: "onion",
        name: { es: "Cebolla", en: "Onion", de: "Zwiebel" },
        amount: totalOnion,
        unit: "g",
      });
    }

    // Add remaining extras
    for (const ing of config.ingredients) {
      if (["egg", "potato", "onion", "oil", "salt"].includes(ing.entityId)) continue;
      rawIngredients.push({
        id: ing.entityId,
        ingredientId: ing.entityId,
        name: ing.entityId,
        amount: ing.quantity,
        unit: ing.unit || "g",
      });
    }

    return {
      id: "custom-user-recipe",
      recipeId: "custom-user-recipe",
      title: {
        es: "Tu Tortilla Creada",
        en: "Your Created Tortilla",
        de: "Deine Erstellte Tortilla",
      },
      name: {
        es: "Tu Tortilla Creada",
        en: "Your Created Tortilla",
        de: "Deine Erstellte Tortilla",
      },
      ingredients: rawIngredients,
    };
  }, [config]);

  // Selected canonical recipe
  const canonicalRecipe = useMemo(() => {
    return recipes.find((r) => (r.id || r.recipeId) === selectedCanonicalId) || recipes[0];
  }, [recipes, selectedCanonicalId]);

  // Run the standardized comparative engine
  const comparisonResult = useMemo(() => {
    if (!canonicalRecipe) return null;
    return compareRecipes(userRecipeInput, canonicalRecipe);
  }, [userRecipeInput, canonicalRecipe]);

  // Calculate similarity match percentage with selected canonical recipe
  const similarityScore = useMemo(() => {
    if (!comparisonResult) return 85;
    const userPotatoPerEgg = config.calculatedProfile.potatoEggRatio;
    const canonPotatoRatio = comparisonResult.recipeB.ratios.potato?.quantity || 100;
    const potatoDiff = Math.abs(userPotatoPerEgg - canonPotatoRatio);

    const userHasOnion = config.ingredients.some((i) => i.entityId === "onion" && i.quantity > 0);
    const canonHasOnion = (comparisonResult.recipeB.ratios.onion?.quantity || 0) > 0;
    const onionMatch = userHasOnion === canonHasOnion ? 1 : 0.65;

    // Proximity factor based on potato ratio (0 to 100)
    const ratioFactor = Math.max(0.4, 1 - potatoDiff / 150);

    const score = Math.round(ratioFactor * onionMatch * 100);
    return Math.min(99, Math.max(45, score));
  }, [config, comparisonResult]);

  // Find highest matching canonical recipe overall
  const topMatches = useMemo(() => {
    const userRatio = config.calculatedProfile.potatoEggRatio;
    const userHasOnion = config.ingredients.some((i) => i.entityId === "onion" && i.quantity > 0);

    return recipes
      .map((rec) => {
        const res = compareRecipes(userRecipeInput, rec);
        const canonRatio = res.recipeB.ratios.potato?.quantity || 100;
        const diff = Math.abs(userRatio - canonRatio);
        const canonHasOnion = (res.recipeB.ratios.onion?.quantity || 0) > 0;
        const onionMatch = userHasOnion === canonHasOnion ? 1 : 0.65;
        const score = Math.min(99, Math.max(40, Math.round(Math.max(0.35, 1 - diff / 160) * onionMatch * 100)));
        return {
          id: rec.id || rec.recipeId || "",
          title: getLocalized(rec.title || rec.name),
          score,
          slug: typeof rec.slug === "object" ? rec.slug[lang as "es" | "en" | "de"] || rec.slug.es : rec.slug || rec.id,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [recipes, userRecipeInput, config, lang]);

  // Quick preset shortcuts
  const presetShortcuts = [
    { id: "clasica", label: isEs ? "Tortilla Clásica" : isDe ? "Klassische Tortilla" : "Classic Tortilla", icon: "🥔" },
    { id: "concebolla", label: isEs ? "Con Cebolla" : isDe ? "Mit Zwiebeln" : "With Onion", icon: "🧅" },
    { id: "betanzos", label: isEs ? "Estilo Betanzos" : isDe ? "Betanzos-Stil" : "Betanzos Style", icon: "🍳" },
    { id: "paisana", label: isEs ? "Tortilla Paisana" : isDe ? "Tortilla Paisana" : "Country Paisana", icon: "🫑" },
  ];

  return (
    <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 rounded-xl bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30">
              <Scale className="w-5 h-5 text-[#FFB800]" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-foreground">
                {isEs
                  ? "Comparador de ADN Culinario & Recetas del Canon"
                  : isDe
                  ? "Rezept-Vergleich & Kulinarische DNA"
                  : "Culinary DNA & Canonical Recipe Comparison"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEs
                  ? "Compara tu fórmula personalizada contra las recetas históricas y de concurso (normalizado por cada huevo)"
                  : isDe
                  ? "Vergleichen Sie Ihre Formel mit klassischen Rezepten (pro 1 Ei normalisiert)"
                  : "Compare your custom formula against canonical and competition recipes (normalized per 1 egg)"}
              </p>
            </div>
          </div>
        </div>

        {/* Compatibility Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-accent border border-border shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#FFB800]" />
          <div className="text-left">
            <span className="text-3xs text-muted-foreground uppercase font-bold block">
              {isEs ? "Afinidad Culinaria" : isDe ? "Übereinstimmung" : "DNA Match"}
            </span>
            <span className="text-sm font-extrabold text-foreground">
              {similarityScore}% {isEs ? "de compatibilidad" : "compatibility"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Comparison Selector Buttons & Dropdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {isEs ? "1. Selecciona receta de referencia:" : "1. Choose comparison reference:"}
          </span>
          <a
            href={`/${lang}/comparador`}
            className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline flex items-center gap-1"
          >
            <span>{isEs ? "Ver laboratorio comparador" : "Open full comparator"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Preset Quick Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presetShortcuts.map((preset) => {
            const active = selectedCanonicalId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedCanonicalId(preset.id)}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  active
                    ? "bg-[#8D6E63] text-white border-[#8D6E63] dark:bg-[#FFB800] dark:text-[#1C1917] dark:border-[#FFB800] shadow-xs"
                    : "bg-accent border-border text-foreground hover:bg-secondary"
                }`}
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Full Archive Recipe Dropdown */}
        <div className="flex items-center gap-2 pt-1">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            value={selectedCanonicalId}
            onChange={(e) => setSelectedCanonicalId(e.target.value)}
            className="w-full text-xs font-bold p-2.5 rounded-xl bg-accent border border-border text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
          >
            <optgroup label={isEs ? "Recetas del Archivo Canónico" : "Canonical Recipe Archive"}>
              {recipes.map((rec) => {
                const id = rec.id || rec.recipeId || "";
                return (
                  <option key={id} value={id}>
                    {getLocalized(rec.title || rec.name)} ({id})
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Top Matching Recipes Bar */}
      <div className="p-3.5 rounded-xl bg-accent/60 border border-border space-y-2">
        <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block">
          🏆 {isEs ? "Tus Mayores Afinidades en el Archivo:" : "Top Matching Recipes in Archive:"}
        </span>
        <div className="flex flex-wrap gap-2">
          {topMatches.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedCanonicalId(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                selectedCanonicalId === m.id
                  ? "bg-[#8D6E63] text-white border-[#8D6E63] dark:bg-[#FFB800] dark:text-[#1C1917]"
                  : "bg-card border-border text-foreground hover:bg-secondary"
              }`}
            >
              <span>{m.title}</span>
              <span className="text-3xs px-1.5 py-0.2 rounded-full bg-secondary text-foreground font-extrabold">
                {m.score}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Normalized Comparison Table */}
      {comparisonResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column A: User Custom Formula */}
            <div className="p-4 rounded-xl bg-accent border-2 border-[#FFB800]/50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-base">🍳</span>
                  <span className="font-serif-heading font-extrabold text-sm text-foreground">
                    {isEs ? "Tu Fórmula Creada" : "Your Created Formula"}
                  </span>
                </div>
                <span className="text-3xs px-2 py-0.5 rounded-full bg-[#FFB800] text-[#1C1917] font-extrabold">
                  {isEs ? "Tu Creación" : "Custom"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Patata/Huevo" : "Potato/Egg"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {config.calculatedProfile.potatoEggRatio}g
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Aceite/Huevo" : "Oil/Egg"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {config.calculatedProfile.oilEggRatio}ml
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Cebolla" : "Onion"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {config.ingredients.some((i) => i.entityId === "onion" && i.quantity > 0)
                      ? isEs ? "Sí" : "Yes"
                      : isEs ? "No" : "None"}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-muted-foreground pt-1">
                <div className="flex justify-between">
                  <span>{isEs ? "Textura Prevista:" : "Predicted Texture:"}</span>
                  <strong className="text-foreground">{config.calculatedProfile.textureNote[isEs ? "es" : isDe ? "de" : "en"]}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isEs ? "Sartén Sugerida:" : "Suggested Pan:"}</span>
                  <strong className="text-foreground">{config.calculatedProfile.recommendedPanSizeCm} cm</strong>
                </div>
              </div>
            </div>

            {/* Column B: Selected Canonical Recipe */}
            <div className="p-4 rounded-xl bg-accent border border-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-[#8D6E63] dark:text-[#FFB800]" />
                  <span className="font-serif-heading font-extrabold text-sm text-foreground">
                    {getLocalized(canonicalRecipe.title || canonicalRecipe.name)}
                  </span>
                </div>
                <span className="text-3xs px-2 py-0.5 rounded-full bg-secondary text-foreground font-bold">
                  {isEs ? "Referencia" : "Reference"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Patata/Huevo" : "Potato/Egg"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {comparisonResult.recipeB.ratios.potato?.quantity || 100}g
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Aceite/Huevo" : "Oil/Egg"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {comparisonResult.recipeB.ratios.oil?.quantity || 20}ml
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border">
                  <span className="text-3xs text-muted-foreground block font-bold">{isEs ? "Cebolla" : "Onion"}</span>
                  <span className="font-extrabold text-foreground text-sm">
                    {(comparisonResult.recipeB.ratios.onion?.quantity || 0) > 0
                      ? isEs ? "Sí" : "Yes"
                      : isEs ? "No" : "None"}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-muted-foreground pt-1">
                <div className="flex justify-between">
                  <span>{isEs ? "Perfil Canónico:" : "Canonical Profile:"}</span>
                  <strong className="text-foreground">{comparisonResult.profile.eggDominance.b}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isEs ? "Carga de Patata:" : "Potato Load:"}</span>
                  <strong className="text-foreground">{comparisonResult.profile.potatoIntensity.b}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Granular Ingredient Difference Breakdown Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs text-left">
              <thead className="bg-secondary/70 text-foreground uppercase text-3xs font-extrabold">
                <tr>
                  <th className="p-2.5">{isEs ? "Ingrediente (por 1 huevo)" : "Ingredient (per 1 egg)"}</th>
                  <th className="p-2.5 text-center">{isEs ? "Tu Fórmula" : "Your Formula"}</th>
                  <th className="p-2.5 text-center">{getLocalized(canonicalRecipe.title || canonicalRecipe.name)}</th>
                  <th className="p-2.5 text-right">{isEs ? "Diferencia" : "Difference"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {comparisonResult.ingredients.map((ing) => {
                  const isDiffPositive = ing.difference > 0;
                  const isDiffZero = ing.difference === 0;

                  return (
                    <tr key={ing.ingredientId} className="hover:bg-accent/40 transition-colors">
                      <td className="p-2.5 font-bold text-foreground capitalize flex items-center gap-1.5">
                        {ing.ingredientId === "egg" && <Egg className="w-3.5 h-3.5 text-[#FFB800]" />}
                        {ing.ingredientId === "potato" && <span>🥔</span>}
                        {ing.ingredientId === "oil" && <span>🫒</span>}
                        {ing.ingredientId === "onion" && <span>🧅</span>}
                        <span>{getLocalized(ing.name)}</span>
                      </td>
                      <td className="p-2.5 text-center font-bold text-foreground">
                        {ing.recipeAValue} {ing.unit}
                      </td>
                      <td className="p-2.5 text-center text-muted-foreground">
                        {ing.recipeBValue} {ing.unit}
                      </td>
                      <td className="p-2.5 text-right font-extrabold">
                        {isDiffZero ? (
                          <span className="text-muted-foreground">{isEs ? "Idéntico" : "Identical"}</span>
                        ) : isDiffPositive ? (
                          <span className="text-[#8D6E63] dark:text-[#FFB800]">
                            +{ing.difference} {ing.unit} (+{ing.percentageDifference}%)
                          </span>
                        ) : (
                          <span className="text-[#2E7D32] dark:text-[#81C784]">
                            {ing.difference} {ing.unit} ({ing.percentageDifference}%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-muted-foreground">
              {isEs
                ? "Cada gramo de patata y gota de aceite por huevo modifica el punto de cuajado y la emulsión."
                : "Every gram of potato and drop of oil per egg shifts the curd point and emulsion balance."}
            </p>

            <a
              href={getComparatorUrlForConfig(config, lang, selectedCanonicalId)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] text-xs font-bold shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              <span>{isEs ? "Abrir Comparador Completo" : "Open Full Comparator Laboratory"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>
        </div>
      )}
    </div>
  );
};
