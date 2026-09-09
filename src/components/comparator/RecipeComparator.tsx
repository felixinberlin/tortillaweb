import React, { useState, useMemo, useEffect } from "react";
import type { RawRecipeInput, LocalizedString } from "@/domain/comparator/types";
import { compareRecipes } from "@/domain/comparator/compareRecipes";
import {
  Scale,
  Sparkles,
  ChefHat,
  Share2,
  Check,
  Download,
  Edit3,
  Dna,
} from "lucide-react";

import {
  parseConfigurationFromUrl,
  createTortillaConfiguration,
  serializeConfigurationToUrl,
} from "@/domain/builder/configCalculator";
import {
  buildCustomRecipeFromConfig,
} from "@/domain/builder/dnaShareHelper";

interface RecipeComparatorProps {
  recipes: RawRecipeInput[];
  initialRecipeAId?: string;
  initialRecipeBId?: string;
  lang?: string;
}

export const RecipeComparator: React.FC<RecipeComparatorProps> = ({
  recipes: initialRecipes,
  initialRecipeAId = "clasica",
  initialRecipeBId = "betanzos",
  lang = "es",
}) => {
  const [recipesList, setRecipesList] = useState<RawRecipeInput[]>(initialRecipes);
  const [selectedIdA, setSelectedIdA] = useState<string>(initialRecipeAId);
  const [selectedIdB, setSelectedIdB] = useState<string>(initialRecipeBId);
  const [customDnaConfigA, setCustomDnaConfigA] = useState<any | null>(null);
  const [customDnaConfigB, setCustomDnaConfigB] = useState<any | null>(null);
  const [builderQueryA, setBuilderQueryA] = useState<string>("");
  const [builderQueryB, setBuilderQueryB] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"dna" | "batch">("dna");
  const [copiedLink, setCopiedLink] = useState(false);

  // Parse URL search parameters on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const recipeAParam = params.get("recipeA");
    const recipeBParam = params.get("recipeB");

    // Case 1: Check for Dual Custom parameters (a_eggs, b_eggs, etc.)
    const hasDualA = params.has("a_eggs") || params.has("a_potatoes");
    const hasDualB = params.has("b_eggs") || params.has("b_potatoes");

    let createdRecipesToAdd: RawRecipeInput[] = [];

    if (hasDualA) {
      // Build options from a_* params
      const subParamsA = new URLSearchParams();
      params.forEach((val, key) => {
        if (key.startsWith("a_")) {
          subParamsA.set(key.replace("a_", ""), val);
        }
      });
      const parsedOptionsA = parseConfigurationFromUrl(subParamsA);
      const calculatedConfigA = createTortillaConfiguration(parsedOptionsA);
      setCustomDnaConfigA(calculatedConfigA);
      setBuilderQueryA(serializeConfigurationToUrl(parsedOptionsA));
      const customRecipeA = buildCustomRecipeFromConfig(
        calculatedConfigA,
        lang,
        "custom-user-recipe-a",
        params.get("a_name") || undefined
      );
      createdRecipesToAdd.push(customRecipeA);
    }

    if (hasDualB) {
      // Build options from b_* params
      const subParamsB = new URLSearchParams();
      params.forEach((val, key) => {
        if (key.startsWith("b_")) {
          subParamsB.set(key.replace("b_", ""), val);
        }
      });
      const parsedOptionsB = parseConfigurationFromUrl(subParamsB);
      const calculatedConfigB = createTortillaConfiguration(parsedOptionsB);
      setCustomDnaConfigB(calculatedConfigB);
      setBuilderQueryB(serializeConfigurationToUrl(parsedOptionsB));
      const customRecipeB = buildCustomRecipeFromConfig(
        calculatedConfigB,
        lang,
        "custom-user-recipe-b",
        params.get("b_name") || (lang === "es" ? "Tortilla de Oma / Familia" : "Oma / Family Tortilla")
      );
      createdRecipesToAdd.push(customRecipeB);
    }

    // Case 2: Single custom DNA params without prefix (standard builder export)
    const hasSingleDnaParams =
      !hasDualA &&
      (params.has("eggs") ||
        params.has("potatoes") ||
        params.has("variety") ||
        params.has("texture") ||
        params.has("cut") ||
        recipeAParam === "custom-user-recipe" ||
        recipeBParam === "custom-user-recipe");

    if (hasSingleDnaParams) {
      const parsedOptions = parseConfigurationFromUrl(params);
      const calculatedConfig = createTortillaConfiguration(parsedOptions);
      setCustomDnaConfigA(calculatedConfig);
      setBuilderQueryA(serializeConfigurationToUrl(parsedOptions));

      const customRecipe = buildCustomRecipeFromConfig(calculatedConfig, lang, "custom-user-recipe");
      createdRecipesToAdd.push(customRecipe);
    }

    if (createdRecipesToAdd.length > 0) {
      setRecipesList((prev) => {
        const idsToRemove = new Set(["custom-user-recipe", "custom-user-recipe-a", "custom-user-recipe-b"]);
        const filtered = prev.filter((r) => !idsToRemove.has(r.id || r.recipeId || ""));
        return [...createdRecipesToAdd, ...filtered];
      });

      if (hasDualA && hasDualB) {
        setSelectedIdA("custom-user-recipe-a");
        setSelectedIdB("custom-user-recipe-b");
      } else if (hasDualA) {
        setSelectedIdA("custom-user-recipe-a");
        if (recipeBParam) setSelectedIdB(recipeBParam);
      } else if (hasSingleDnaParams) {
        if (!recipeAParam || recipeAParam === "custom-user-recipe") {
          setSelectedIdA("custom-user-recipe");
        } else {
          setSelectedIdA(recipeAParam);
        }
        if (recipeBParam && recipeBParam !== "custom-user-recipe") {
          setSelectedIdB(recipeBParam);
        }
      }
    } else {
      if (recipeAParam) setSelectedIdA(recipeAParam);
      if (recipeBParam) setSelectedIdB(recipeBParam);
    }
  }, [lang]);

  const recipeMap = useMemo(() => {
    const map = new Map<string, RawRecipeInput>();
    for (const r of recipesList) {
      const id = r.id || r.recipeId || "";
      if (id) map.set(id, r);
    }
    return map;
  }, [recipesList]);

  const recipeA = useMemo(() => recipeMap.get(selectedIdA) || recipesList[0], [recipeMap, selectedIdA, recipesList]);
  const recipeB = useMemo(() => recipeMap.get(selectedIdB) || recipesList[1] || recipesList[0], [recipeMap, selectedIdB, recipesList]);

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

  const handleShareComparison = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);

    // If both custom configs exist, encode a_* and b_*
    if (customDnaConfigA && customDnaConfigB) {
      url.search = ""; // clear
      url.searchParams.set("recipeA", "custom-user-recipe-a");
      url.searchParams.set("recipeB", "custom-user-recipe-b");
      if (builderQueryA) {
        const pA = new URLSearchParams(builderQueryA);
        pA.forEach((val, key) => url.searchParams.set(`a_${key}`, val));
      }
      if (builderQueryB) {
        const pB = new URLSearchParams(builderQueryB);
        pB.forEach((val, key) => url.searchParams.set(`b_${key}`, val));
      }
    } else {
      url.searchParams.set("recipeA", selectedIdA);
      url.searchParams.set("recipeB", selectedIdB);

      if (customDnaConfigA && builderQueryA) {
        const dnaParams = new URLSearchParams(builderQueryA);
        dnaParams.forEach((val, key) => url.searchParams.set(key, val));
      }
    }

    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadComparisonData = () => {
    if (!comparison) return;

    const data = {
      app: "tortilladepatatas.org",
      type: "Comparison_Export",
      timestamp: new Date().toISOString(),
      baseUnit: "1 Egg (Standardized Invariant DNA)",
      recipeA: {
        id: comparison.recipeA.recipeId,
        name: comparison.recipeA.recipeName,
        eggCount: comparison.recipeA.eggCount,
        batchIngredients: recipeA.ingredients,
        dnaRatiosPerEgg: comparison.recipeA.ratios,
        culinaryProfile: comparison.recipeA.classification,
      },
      recipeB: {
        id: comparison.recipeB.recipeId,
        name: comparison.recipeB.recipeName,
        eggCount: comparison.recipeB.eggCount,
        batchIngredients: recipeB.ingredients,
        dnaRatiosPerEgg: comparison.recipeB.ratios,
        culinaryProfile: comparison.recipeB.classification,
      },
      normalizedDifferencesPerEgg: comparison.ingredients,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comparativa-${comparison.recipeA.recipeId}-vs-${comparison.recipeB.recipeId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const translationsMap = {
    es: {
      title: "Comparador de Tortillas & Laboratorio de ADN",
      subtitle: "Conversión matemática estandarizada por cada huevo (1 Huevo = Unidad Fundamental)",
      selectA: "Receta A (Base)",
      selectB: "Receta B (Comparación)",
      eggCount: "Huevos totales en receta",
      dnaTitle: "ADN Culinario y Balance Térmico (Por 1 Huevo)",
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
      dnaActiveTitle: "🧬 ADN de Tortilla Creada Activo",
      dnaActiveSubtitle: "Estás comparando tu fórmula personalizada con las recetas del registro.",
      dualDnaTitle: "⚔️ Duelo de Tortillas Personalizadas Activo",
      dualDnaSubtitle: "Comparando dos recetas creadas a medida con sus cantidades de cocina y ADN normalizado.",
      editInBuilder: "Modificar en el Constructor",
      shareComparison: "Compartir Comparativa",
      downloadData: "Descargar Datos",
      tabDna: "🧬 ADN Normalizado (1 Huevo)",
      tabBatch: "🍳 Cantidades Totales de Cocina",
      batchTableIng: "Ingrediente",
      batchTableA: "Total Receta A",
      batchTableB: "Total Receta B",
      batchServings: "Raciones estimadas",
      batchPan: "Sartén recomendada",
    },
    en: {
      title: "Tortilla Comparator & DNA Laboratory",
      subtitle: "Standardized mathematical ratio per 1 egg (1 Egg = Fundamental Unit)",
      selectA: "Recipe A (Baseline)",
      selectB: "Recipe B (Comparison)",
      eggCount: "Total eggs in recipe",
      dnaTitle: "Culinary DNA & Thermal Balance (Per 1 Egg)",
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
      dnaActiveTitle: "🧬 Custom Created Tortilla DNA Active",
      dnaActiveSubtitle: "Comparing your custom formula against registry recipes.",
      dualDnaTitle: "⚔️ Dual Custom Tortilla Duel Active",
      dualDnaSubtitle: "Comparing two custom created recipes with their kitchen batch & normalized DNA.",
      editInBuilder: "Edit in Builder",
      shareComparison: "Share Comparison",
      downloadData: "Download Data",
      tabDna: "🧬 Normalized DNA (1 Egg)",
      tabBatch: "🍳 Total Kitchen Batch",
      batchTableIng: "Ingredient",
      batchTableA: "Total Recipe A",
      batchTableB: "Total Recipe B",
      batchServings: "Estimated servings",
      batchPan: "Recommended pan",
    },
    de: {
      title: "Tortilla-Vergleicher & DNA-Labor",
      subtitle: "Standardisierte mathematische Verhältnisse pro 1 Ei (1 Ei = Grundeinheit)",
      selectA: "Rezept A (Basis)",
      selectB: "Rezept B (Vergleich)",
      eggCount: "Eier gesamt im Rezept",
      dnaTitle: "Kulinarische DNA & Thermische Balance (Pro 1 Ei)",
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
      dnaActiveTitle: "🧬 Erstellte Tortilla-DNA Aktiv",
      dnaActiveSubtitle: "Du vergleichst dein eigenes Rezept mit den kanonischen Referenzen.",
      dualDnaTitle: "⚔️ Duell zweier eigener Tortillas Aktiv",
      dualDnaSubtitle: "Vergleich zweier selbst erstellter Rezepte mit Zutatenmengen und DNA.",
      editInBuilder: "Im Builder bearbeiten",
      shareComparison: "Vergleich teilen",
      downloadData: "Daten herunterladen",
      tabDna: "🧬 Normalisierte DNA (1 Ei)",
      tabBatch: "🍳 Gesamtmenge Küche",
      batchTableIng: "Zutat",
      batchTableA: "Gesamt Rezept A",
      batchTableB: "Gesamt Rezept B",
      batchServings: "Portionen geschätzt",
      batchPan: "Empfohlene Pfanne",
    },
  };
  const translations = translationsMap[lang as "es" | "en" | "de"] || translationsMap.es;

  if (!comparison) return null;

  const { profileA, profileB } = { profileA: comparison.recipeA, profileB: comparison.recipeB };

  // Calculate DNA percentages for progress bars
  const calcEggDominance = (potatoQty: number) => Math.min(100, Math.max(10, Math.round((1 - (potatoQty - 50) / 150) * 100)));
  const calcPotatoIntensity = (potatoQty: number) => Math.min(100, Math.max(10, Math.round((potatoQty / 200) * 100)));
  const calcOilRichness = (oilQty: number) => Math.min(100, Math.max(10, Math.round((oilQty / 45) * 100)));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 my-6">
      {/* Custom DNA Banner when present */}
      {(customDnaConfigA || customDnaConfigB) && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FFB800]/25 via-accent to-[#8D6E63]/20 border-2 border-[#FFB800] shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-[#FFB800] text-[#1C1917] shadow-2xs shrink-0 mt-0.5">
                <Dna className="w-6 h-6" />
              </div>
              <div>
                <span className="text-3xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FFB800] text-[#1C1917] inline-block mb-1">
                  {customDnaConfigA && customDnaConfigB
                    ? (lang === "es" ? "Duelo de Tortillas Creadas (2 Recetas)" : "Dual Custom Tortillas Duel")
                    : (lang === "es" ? "ADN Importado del Constructor" : "Imported Builder DNA")}
                </span>
                <h4 className="font-serif-heading font-extrabold text-lg sm:text-xl text-foreground">
                  {customDnaConfigA && customDnaConfigB ? translations.dualDnaTitle : translations.dnaActiveTitle}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {customDnaConfigA && customDnaConfigB ? translations.dualDnaSubtitle : translations.dnaActiveSubtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {customDnaConfigA && (
                <a
                  href={`/${lang}/builder?${builderQueryA}`}
                  className="px-3.5 py-2 rounded-xl bg-card border border-border hover:border-[#FFB800] text-foreground text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#8D6E63] dark:text-[#FFB800]" />
                  <span>{customDnaConfigB ? (lang === "es" ? "Editar Receta A" : "Edit Recipe A") : translations.editInBuilder}</span>
                </a>
              )}

              {customDnaConfigB && (
                <a
                  href={`/${lang}/builder?${builderQueryB}`}
                  className="px-3.5 py-2 rounded-xl bg-card border border-border hover:border-[#00A3FF] text-foreground text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#00A3FF]" />
                  <span>{lang === "es" ? "Editar Receta B (Oma)" : "Edit Recipe B (Oma)"}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleShareComparison}
                className="px-3.5 py-2 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (lang === "es" ? "¡URL Copiada!" : "Copied!") : translations.shareComparison}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selector Section */}
      <div className="bg-[#FAF6EE] dark:bg-card p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] dark:border-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D5] dark:border-border pb-3">
          <div className="flex items-center gap-2.5">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareComparison}
              className="px-3 py-1.5 rounded-lg border border-border bg-accent hover:bg-accent/80 text-foreground text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (lang === "es" ? "¡Copiado!" : "Copied!") : (lang === "es" ? "Compartir" : "Share")}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadComparisonData}
              className="px-3 py-1.5 rounded-lg border border-border bg-accent hover:bg-accent/80 text-foreground text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#8D6E63] dark:text-[#FFB800]" />
              <span>{translations.downloadData}</span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {/* Selector Recipe A */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] uppercase tracking-wider block">
              {translations.selectA}
            </label>
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
            >
              {recipesList.map((r) => {
                const id = r.id || r.recipeId || "";
                return (
                  <option key={id} value={id}>
                    {getLocalizedText(r.title || r.recipeName || r.name)}
                  </option>
                );
              })}
            </select>
            <div className="text-[11px] text-muted-foreground flex items-center justify-between px-1">
              <span>{translations.eggCount}: <strong>{profileA.eggCount} {lang === 'es' ? 'huevos' : lang === 'de' ? 'Eier' : 'eggs'}</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-bold text-[10px]">
                {profileA.classification.potatoIntensityLabel}
              </span>
            </div>
          </div>

          {/* Selector Recipe B */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] uppercase tracking-wider block">
              {translations.selectB}
            </label>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
            >
              {recipesList.map((r) => {
                const id = r.id || r.recipeId || "";
                return (
                  <option key={id} value={id}>
                    {getLocalizedText(r.title || r.recipeName || r.name)}
                  </option>
                );
              })}
            </select>
            <div className="text-[11px] text-muted-foreground flex items-center justify-between px-1">
              <span>{translations.eggCount}: <strong>{profileB.eggCount} {lang === 'es' ? 'huevos' : lang === 'de' ? 'Eier' : 'eggs'}</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 border border-blue-300 dark:border-blue-700 font-bold text-[10px]">
                {profileB.classification.potatoIntensityLabel}
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Tabs: DNA vs Batch Quantities */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E8E2D5] dark:border-border">
          <button
            type="button"
            onClick={() => setActiveTab("dna")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "dna"
                ? "bg-[#FFB800] text-[#1C1917] shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {translations.tabDna}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("batch")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "batch"
                ? "bg-[#8D6E63] dark:bg-[#FFB800] text-white dark:text-[#1C1917] shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {translations.tabBatch}
          </button>
        </div>
      </div>

      {/* Main Table: Normalized DNA View OR Batch Quantities View */}
      {activeTab === "dna" ? (
        <div className="card-notebook overflow-hidden border border-[#E8E2D5] dark:border-border rounded-2xl bg-[#FCF9F2] dark:bg-card shadow-xs">
          <div className="p-4 sm:p-5 border-b border-[#E8E2D5] dark:border-border bg-[#FAF6EE] dark:bg-accent flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#8D6E63] dark:text-[#FFB800]" />
              <h4 className="font-serif-heading font-bold text-base text-foreground">
                {getLocalizedText(recipeA.title || recipeA.recipeName)} vs {getLocalizedText(recipeB.title || recipeB.recipeName)}
              </h4>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/40">
              Ratio Normalizado / 1 Huevo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8E2D5] dark:border-border bg-[#F5E6BE]/30 dark:bg-secondary/40 text-[#8D6E63] dark:text-[#FFB800]">
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderIng}</th>
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderA}</th>
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderB}</th>
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.tableHeaderDiff}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D5] dark:divide-border">
                {comparison.ingredients.map((item) => {
                  const isDiffPositive = item.difference > 0;

                  return (
                    <tr key={item.ingredientId} className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors">
                      <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#8D6E63] dark:bg-[#FFB800]"></span>
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
                                ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-300 dark:border-amber-700"
                                : "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700"
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
      ) : (
        /* Total Batch Quantities View */
        <div className="card-notebook overflow-hidden border border-[#E8E2D5] dark:border-border rounded-2xl bg-[#FCF9F2] dark:bg-card shadow-xs">
          <div className="p-4 sm:p-5 border-b border-[#E8E2D5] dark:border-border bg-[#FAF6EE] dark:bg-accent flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#8D6E63] dark:text-[#FFB800]" />
              <h4 className="font-serif-heading font-bold text-base text-foreground">
                {translations.tabBatch}: {getLocalizedText(recipeA.title || recipeA.recipeName)} vs {getLocalizedText(recipeB.title || recipeB.recipeName)}
              </h4>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#8D6E63]/20 dark:bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] border border-[#8D6E63]/40 dark:border-[#FFB800]/40">
              Cantidades de Cocina Reales
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8E2D5] dark:border-border bg-[#F5E6BE]/30 dark:bg-secondary/40 text-[#8D6E63] dark:text-[#FFB800]">
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.batchTableIng}</th>
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.batchTableA} ({profileA.eggCount} huevos)</th>
                  <th className="p-3.5 font-bold uppercase text-[11px] tracking-wider">{translations.batchTableB} ({profileB.eggCount} huevos)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D5] dark:divide-border">
                {/* Eggs */}
                <tr className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors">
                  <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>
                    {lang === "es" ? "Huevos" : lang === "de" ? "Eier" : "Eggs"}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-foreground">
                    {profileA.eggCount} {lang === "es" ? "unidades" : "units"}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-foreground">
                    {profileB.eggCount} {lang === "es" ? "unidades" : "units"}
                  </td>
                </tr>

                {/* Potatoes */}
                <tr className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors">
                  <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    {lang === "es" ? "Patatas" : lang === "de" ? "Kartoffeln" : "Potatoes"}
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileA.ratios.potato?.quantity || 0) * profileA.eggCount)} g
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileB.ratios.potato?.quantity || 0) * profileB.eggCount)} g
                  </td>
                </tr>

                {/* Onion */}
                <tr className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors">
                  <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8D6E63]"></span>
                    {lang === "es" ? "Cebolla" : lang === "de" ? "Zwiebel" : "Onion"}
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileA.ratios.onion?.quantity || 0) * profileA.eggCount)} g
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileB.ratios.onion?.quantity || 0) * profileB.eggCount)} g
                  </td>
                </tr>

                {/* Oil Absorbed */}
                <tr className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors">
                  <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {lang === "es" ? "Aceite Absorbido (Estimado)" : lang === "de" ? "Ölaufnahme (Geschätzt)" : "Estimated Oil Absorbed"}
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileA.ratios.oil?.quantity || 0) * profileA.eggCount)} ml
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-foreground">
                    {Math.round((profileB.ratios.oil?.quantity || 0) * profileB.eggCount)} ml
                  </td>
                </tr>

                {/* Pan Size Recommended */}
                <tr className="hover:bg-[#FAF6EE]/80 dark:hover:bg-accent/50 transition-colors bg-accent/20">
                  <td className="p-3.5 font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span>
                    {translations.batchPan}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    {profileA.eggCount <= 3 ? "18-20 cm" : profileA.eggCount <= 6 ? "22-24 cm" : profileA.eggCount <= 8 ? "26-28 cm" : "30-32 cm"}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#00A3FF]">
                    {profileB.eggCount <= 3 ? "18-20 cm" : profileB.eggCount <= 6 ? "22-24 cm" : profileB.eggCount <= 8 ? "26-28 cm" : "30-32 cm"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tortilla DNA Visualizer */}
      <div className="bg-[#FAF6EE] dark:bg-card p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] dark:border-border shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E2D5] dark:border-border pb-3">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.classification.eggDominanceLabel} vs {profileB.classification.eggDominanceLabel}
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcEggDominance(profileA.ratios.potato?.quantity || 100)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.ratios.potato?.quantity || 0}g/huevo vs {profileB.ratios.potato?.quantity || 0}g/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcPotatoIntensity(profileA.ratios.potato?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.ratios.oil?.quantity || 0}ml/huevo vs {profileB.ratios.oil?.quantity || 0}ml/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcOilRichness(profileA.ratios.oil?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#00A3FF] transition-all duration-500 rounded-full"
                  style={{ width: `${calcOilRichness(profileB.ratios.oil?.quantity || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tortilla DNA Visualizer */}
      <div className="bg-[#FAF6EE] dark:bg-card p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] dark:border-border shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E2D5] dark:border-border pb-3">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.classification.eggDominanceLabel} vs {profileB.classification.eggDominanceLabel}
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcEggDominance(profileA.ratios.potato?.quantity || 100)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.ratios.potato?.quantity || 0}g/huevo vs {profileB.ratios.potato?.quantity || 0}g/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcPotatoIntensity(profileA.ratios.potato?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
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
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-mono">
                {profileA.ratios.oil?.quantity || 0}ml/huevo vs {profileB.ratios.oil?.quantity || 0}ml/huevo
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                  style={{ width: `${calcOilRichness(profileA.ratios.oil?.quantity || 0)}%` }}
                ></div>
              </div>
              <div className="w-full h-3 bg-stone-200 dark:bg-secondary rounded-full overflow-hidden flex">
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

