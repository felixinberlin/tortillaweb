import { useState, useMemo, useEffect } from "react";
import "@/i18n/config";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  GitCompare,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type {
  EggSize,
  OilCookingStyle,
  TextureStyle,
  PotatoTechnique,
} from "@/domain/builder/types";
import {
  createTortillaConfiguration,
  serializeConfigurationToUrl,
  parseConfigurationFromUrl,
} from "@/domain/builder/configCalculator";
import { generateRecipe } from "@/domain/builder/generateRecipe";
import { compareRecipes } from "@/domain/tortilla-dna/compareRecipes";
import { getReferenceRecipes } from "@/domain/recipes/referenceRecipes";

import { StepIngredients } from "./StepIngredients";
import { StepInventory } from "./StepInventory";
import { StepPreferences } from "./StepPreferences";
import { TortillaProfileView } from "./TortillaProfileView";
import { SelectedIngredientsBar } from "./SelectedIngredientsBar";

interface BuilderAppProps {
  lang?: string;
}

export default function BuilderApp({ lang = "es" }: BuilderAppProps) {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  // State
  const [eggs, setEggs] = useState<number>(6);
  const [eggSize, setEggSize] = useState<EggSize>("large");
  const [potatoesGrams, setPotatoesGrams] = useState<number>(600);
  const [oilStyle, setOilStyle] = useState<OilCookingStyle>("traditional");
  const [extras, setExtras] = useState<{ id: string; quantity: number }[]>([]);
  const [texture, setTexture] = useState<TextureStyle>("jugosa");
  const [potatoTechnique, setPotatoTechnique] = useState<PotatoTechnique>("pochada");

  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "step3" | "identity">("step1");
  const [showComparator, setShowComparator] = useState<boolean>(false);
  const [selectedRefId, setSelectedRefId] = useState<string>("betanzos");

  // Load configuration from URL query search parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsed = parseConfigurationFromUrl(searchParams);

      if (parsed.eggs) setEggs(parsed.eggs);
      if (parsed.eggSize) setEggSize(parsed.eggSize);
      if (parsed.potatoesGrams) setPotatoesGrams(parsed.potatoesGrams);
      if (parsed.oilStyle) setOilStyle(parsed.oilStyle);
      if (parsed.texture) setTexture(parsed.texture);
      if (parsed.potatoTechnique) setPotatoTechnique(parsed.potatoTechnique);
      if (parsed.extras) setExtras(parsed.extras);
    }
  }, []);

  // Update URL search parameters live
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryString = serializeConfigurationToUrl({
        eggs,
        eggSize,
        potatoesGrams,
        oilStyle,
        texture,
        potatoTechnique,
        extras,
      });
      const newUrl = `${window.location.pathname}?${queryString}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [eggs, eggSize, potatoesGrams, oilStyle, texture, potatoTechnique, extras]);

  // Handle adding / removing extra ingredients from fridge inventory
  const handleUpdateExtra = (id: string, quantity: number) => {
    setExtras((prev) => {
      const exists = prev.find((e) => e.id === id);
      if (quantity <= 0) {
        return prev.filter((e) => e.id !== id);
      }
      if (exists) {
        return prev.map((e) => (e.id === id ? { ...e, quantity } : e));
      }
      return [...prev, { id, quantity }];
    });
  };

  const handleClearExtras = () => {
    setExtras([]);
  };

  // Build domain object: TortillaConfiguration
  const tortillaConfig = useMemo(() => {
    return createTortillaConfiguration({
      eggs,
      eggSize,
      potatoesGrams,
      oilStyle,
      texture,
      potatoTechnique,
      extras,
    });
  }, [eggs, eggSize, potatoesGrams, oilStyle, texture, potatoTechnique, extras]);

  // Shareable URL
  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      const queryString = serializeConfigurationToUrl({
        eggs,
        eggSize,
        potatoesGrams,
        oilStyle,
        texture,
        potatoTechnique,
        extras,
      });
      return `${window.location.origin}${window.location.pathname}?${queryString}`;
    }
    return "";
  }, [eggs, eggSize, potatoesGrams, oilStyle, texture, potatoTechnique, extras]);

  // Domain Recipe object for DNA Comparator
  const userRecipe = useMemo(() => {
    return generateRecipe({ config: tortillaConfig });
  }, [tortillaConfig]);

  const referenceRecipes = useMemo(() => getReferenceRecipes(), []);
  const selectedRefRecipe = useMemo(() => {
    return referenceRecipes.find((r) => r.id === selectedRefId) || referenceRecipes[0];
  }, [referenceRecipes, selectedRefId]);

  const comparison = useMemo(() => {
    if (!userRecipe || !selectedRefRecipe) return null;
    return compareRecipes(userRecipe, selectedRefRecipe);
  }, [userRecipe, selectedRefRecipe]);

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold bg-amber-100 text-amber-950 border-amber-300">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-amber-600" />
          {isEs ? "Motor de Creación de Nevera a Tortilla" : isDe ? "Kühlschrank-zu-Tortilla Rechner" : "Fridge-to-Tortilla Creation Engine"}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900">
          {isEs ? "¿Qué ingredientes tienes?" : isDe ? "Welche Zutaten haben Sie?" : "What ingredients do you have?"}
        </h1>
        <p className="text-base md:text-lg text-stone-600 leading-relaxed">
          {isEs
            ? "Olvídate de recetas fijas. Selecciona lo que tienes en la nevera y crea una tortilla personalizada con técnica y proporciones ideales."
            : isDe
            ? "Vergessen Sie starre Rezepte. Wählen Sie Ihre Zutaten aus dem Kühlschrank und erstellen Sie Ihre individuelle Tortilla."
            : "Forget rigid recipes. Choose what's in your fridge and craft a personalized tortilla with custom technique and DNA profile."}
        </p>
      </div>

      {/* Navigation Tabs Header */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-stone-200/80 p-1.5 rounded-2xl max-w-3xl mx-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("step1")}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === "step1"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>🥚 1. {isEs ? "Base" : isDe ? "Basis" : "Core Base"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("step2")}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === "step2"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>🥗 2. {isEs ? "Nevera" : isDe ? "Zutaten" : "Fridge"}</span>
          {extras.filter((e) => e.quantity > 0).length > 0 && (
            <Badge className="bg-amber-600 text-white text-3xs px-1.5 py-0">
              {extras.filter((e) => e.quantity > 0).length}
            </Badge>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("step3")}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === "step3"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>✨ 3. {isEs ? "Técnica" : isDe ? "Technik" : "Technique"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("identity")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl font-extrabold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === "identity"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-amber-100 text-amber-950 hover:bg-amber-200"
          }`}
        >
          <span>🍳 {isEs ? "Perfil Final" : isDe ? "Tortilla Profile" : "Tortilla Identity"}</span>
        </button>
      </div>

      {/* Persistent Selected Ingredients Bar (Always visible in Creator) */}
      <SelectedIngredientsBar
        lang={lang}
        eggs={eggs}
        eggSize={eggSize}
        potatoesGrams={potatoesGrams}
        oilStyle={oilStyle}
        extras={extras}
        onUpdateExtra={handleUpdateExtra}
        onClearExtras={handleClearExtras}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Tab Content Display */}
      <AnimatePresence mode="wait">
        {activeTab === "step1" && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StepIngredients
              lang={lang}
              eggs={eggs}
              setEggs={setEggs}
              eggSize={eggSize}
              setEggSize={setEggSize}
              potatoesGrams={potatoesGrams}
              setPotatoesGrams={setPotatoesGrams}
              oilStyle={oilStyle}
              setOilStyle={setOilStyle}
              estimatedFryingOil={tortillaConfig.calculatedProfile.estimatedFryingOilMl}
              estimatedAbsorbedOil={tortillaConfig.calculatedProfile.estimatedAbsorbedOilMl}
              potatoUnits={tortillaConfig.calculatedProfile.potatoUnits}
            />

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setActiveTab("step2")}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                {isEs ? "Paso 2: Añadir Ingredientes" : "Step 2: Add Ingredients"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "step2" && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StepInventory
              lang={lang}
              extras={extras}
              onUpdateExtra={handleUpdateExtra}
            />

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("step1")}
                className="border-stone-300 font-bold px-5 py-2 text-sm"
              >
                {isEs ? "Anterior" : "Previous"}
              </Button>
              <Button
                onClick={() => setActiveTab("step3")}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                {isEs ? "Paso 3: Preferencias de Técnica" : "Step 3: Preferences"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "step3" && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StepPreferences
              lang={lang}
              texture={texture}
              setTexture={setTexture}
              potatoTechnique={potatoTechnique}
              setPotatoTechnique={setPotatoTechnique}
            />

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("step2")}
                className="border-stone-300 font-bold px-5 py-2 text-sm"
              >
                {isEs ? "Anterior" : "Previous"}
              </Button>
              <Button
                onClick={() => setActiveTab("identity")}
                className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-8 py-3 rounded-xl text-base shadow-md"
              >
                {isEs ? "Generar Perfil Final" : "Generate Tortilla Identity"}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <TortillaProfileView
              lang={lang}
              config={tortillaConfig}
              shareUrl={shareUrl}
              onOpenComparator={() => setShowComparator(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DNA Comparator Modal / Section */}
      {showComparator && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border-2 border-stone-300 shadow-xl p-6 relative my-8">
            <button
              type="button"
              onClick={() => setShowComparator(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 bg-stone-100 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <GitCompare className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-black text-stone-900">
                {isEs ? "Comparador de Tortilla DNA" : "Tortilla DNA Benchmark"}
              </h3>
            </div>

            <p className="text-xs text-stone-600 mb-6">
              {isEs
                ? "Compara tu receta generada contra referentes icónicos como la Tortilla de Betanzos o la Clásica con Cebolla:"
                : "Benchmark your custom tortilla ratios against iconic reference recipes:"}
            </p>

            {/* Select reference recipe */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {referenceRecipes.map((r) => {
                const titleStr = typeof r.title === "string" ? r.title : (r.title?.[isEs ? "es" : "en"] || r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRefId(r.id || "")}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                      selectedRefId === r.id
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {titleStr}
                  </button>
                );
              })}
            </div>

            {/* Comparison Details Grid */}
            {comparison && selectedRefRecipe && (
              <div className="grid grid-cols-2 gap-4 text-xs bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-amber-900 uppercase">
                    {isEs ? "Tu Tortilla Personalizada" : "Your Custom Omelette"}
                  </h4>
                  <p>🥚 Huevos: <strong>{comparison.recipeA.eggCount}</strong></p>
                  <p>🥔 Patata/Huevo: <strong>{comparison.dnaComparison.potatoDifference.recipeA}g</strong></p>
                  <p>🫒 Aceite/Huevo: <strong>{comparison.dnaComparison.oilDifference.recipeA}ml</strong></p>
                </div>

                <div className="space-y-2 border-l border-amber-200 pl-4">
                  <h4 className="font-extrabold text-stone-900 uppercase">
                    {typeof selectedRefRecipe.title === "string" ? selectedRefRecipe.title : (selectedRefRecipe.title?.[isEs ? "es" : "en"] || selectedRefRecipe.id)}
                  </h4>
                  <p>🥚 Huevos: <strong>{comparison.recipeB.eggCount}</strong></p>
                  <p>🥔 Patata/Huevo: <strong>{comparison.dnaComparison.potatoDifference.recipeB}g</strong></p>
                  <p>🫒 Aceite/Huevo: <strong>{comparison.dnaComparison.oilDifference.recipeB}ml</strong></p>
                </div>
              </div>
            )}

            <div className="mt-6 text-right">
              <Button
                onClick={() => setShowComparator(false)}
                className="bg-stone-800 hover:bg-stone-900 text-white font-bold px-5 py-2 text-xs"
              >
                {isEs ? "Cerrar" : "Close"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
