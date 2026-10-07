import { useState, useMemo, useEffect } from "react";
import "@/i18n/config";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type {
  EggSize,
  OilCookingStyle,
  TextureStyle,
  PotatoTechnique,
  PotatoVariety,
  PotatoCutStyle,
  FryingTemperatureProfile,
} from "@/domain/builder/types";
import {
  createTortillaConfiguration,
  serializeConfigurationToUrl,
  parseConfigurationFromUrl,
} from "@/domain/builder/configCalculator";
import { createUserRecipeSchema } from "@/lib/seo";

import { StepIngredients } from "./StepIngredients";
import { StepInventory } from "./StepInventory";
import { StepPreferences } from "./StepPreferences";
import { TortillaProfileView } from "./TortillaProfileView";
import { SelectedIngredientsBar } from "./SelectedIngredientsBar";
import { UrlSaveInfoBanner } from "./UrlSaveInfoBanner";

interface BuilderAppProps {
  lang?: string;
}

export default function BuilderApp({ lang = "es" }: BuilderAppProps) {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  // State
  const [diners, setDiners] = useState<number>(4);
  const [eggs, setEggs] = useState<number>(6);
  const [eggSize, setEggSize] = useState<EggSize>("large");
  const [potatoesGrams, setPotatoesGrams] = useState<number>(600);
  const [potatoVariety, setPotatoVariety] = useState<PotatoVariety>("monalisa");
  const [potatoCut, setPotatoCut] = useState<PotatoCutStyle>("panadera");
  const [oilStyle, setOilStyle] = useState<OilCookingStyle>("traditional");
  const [extras, setExtras] = useState<{ id: string; quantity: number }[]>([]);
  const [texture, setTexture] = useState<TextureStyle>("jugosa");
  const [potatoTechnique, setPotatoTechnique] = useState<PotatoTechnique>("pochada");
  const [fryingTempProfile, setFryingTempProfile] = useState<FryingTemperatureProfile>("traditional_medium");

  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "step3" | "identity">("step1");

  // Scale portions when diners count changes
  const handleDinersChange = (count: number) => {
    setDiners(count);
    // Standard baseline: ~1.5 eggs per person, ~150g potatoes per person
    setEggs(Math.max(2, Math.round(count * 1.5)));
    setPotatoesGrams(Math.max(200, count * 150));
  };

  // Load configuration from URL query search parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsed = parseConfigurationFromUrl(searchParams);

      if (parsed.eggs) setEggs(parsed.eggs);
      if (parsed.eggSize) setEggSize(parsed.eggSize);
      if (parsed.potatoesGrams) setPotatoesGrams(parsed.potatoesGrams);
      if (parsed.potatoVariety) setPotatoVariety(parsed.potatoVariety);
      if (parsed.potatoCut) setPotatoCut(parsed.potatoCut);
      if (parsed.oilStyle) setOilStyle(parsed.oilStyle);
      if (parsed.texture) setTexture(parsed.texture);
      if (parsed.potatoTechnique) setPotatoTechnique(parsed.potatoTechnique);
      if (parsed.fryingTempProfile) setFryingTempProfile(parsed.fryingTempProfile);
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
        potatoVariety,
        potatoCut,
        oilStyle,
        texture,
        potatoTechnique,
        fryingTempProfile,
        extras,
      });
      const newUrl = `${window.location.pathname}?${queryString}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [
    eggs,
    eggSize,
    potatoesGrams,
    potatoVariety,
    potatoCut,
    oilStyle,
    texture,
    potatoTechnique,
    fryingTempProfile,
    extras,
  ]);

  // Compute live configuration
  const tortillaConfig = useMemo(() => {
    return createTortillaConfiguration({
      eggs,
      eggSize,
      potatoesGrams,
      potatoVariety,
      potatoCut,
      oilStyle,
      texture,
      potatoTechnique,
      fryingTempProfile,
      extras,
    });
  }, [
    eggs,
    eggSize,
    potatoesGrams,
    potatoVariety,
    potatoCut,
    oilStyle,
    texture,
    potatoTechnique,
    fryingTempProfile,
    extras,
  ]);

  const shareUrl = useMemo(() => {
    const queryString = serializeConfigurationToUrl({
      eggs,
      eggSize,
      potatoesGrams,
      potatoVariety,
      potatoCut,
      oilStyle,
      texture,
      potatoTechnique,
      fryingTempProfile,
      extras,
    });
    return `https://tortilladepatatas.org/${lang}/builder?${queryString}`;
  }, [
    lang,
    eggs,
    eggSize,
    potatoesGrams,
    potatoVariety,
    potatoCut,
    oilStyle,
    texture,
    potatoTechnique,
    fryingTempProfile,
    extras,
  ]);

  // Dynamically update Schema.org Recipe JSON-LD for the custom user recipe
  useEffect(() => {
    if (typeof window !== "undefined") {
      const schemaId = "user-created-recipe-schema";
      let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = schemaId;
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      const schemaObj = createUserRecipeSchema(tortillaConfig, lang, shareUrl || window.location.href);
      scriptEl.textContent = JSON.stringify(schemaObj, null, 2);
    }
  }, [tortillaConfig, shareUrl, lang]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEs ? "Constructor Interactivo de Tortilla" : isDe ? "Interaktiver Tortilla-Rechner" : "Interactive Tortilla Builder"}</span>
        </div>

        <h1 className="font-serif-heading text-3xl md:text-5xl font-black tracking-tight text-foreground">
          {isEs ? "¿Cómo quieres tu tortilla hoy?" : isDe ? "Wie möchten Sie Ihre Tortilla?" : "How would you like your tortilla?"}
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {isEs
            ? "Selecciona comensales, ingredientes de tu despensa y técnica de cocción para obtener tu fórmula gastronómica personalizada."
            : isDe
            ? "Wählen Sie Portionen, Zutaten und Kochtechnik für Ihre perfekte Tortilla-Rezeptur."
            : "Select diners, pantry ingredients, and thermal technique to craft your custom culinary formula."}
        </p>

        {/* Diners / Servings Quick Scaler */}
        <div className="inline-flex items-center gap-2 bg-card border border-border p-1.5 rounded-2xl shadow-xs mt-2">
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-foreground">
            <Users className="w-4 h-4 text-[#FFB800]" />
            <span>{isEs ? "Comensales:" : "Diners:"}</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDinersChange(num)}
                aria-pressed={diners === num}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 ${
                  diners === num
                    ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {num} {num === 1 ? (isEs ? "pers." : "p.") : (isEs ? "pers." : "p.")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time URL Auto-save Notification Banner */}
      <UrlSaveInfoBanner
        shareUrl={shareUrl}
        lang={lang}
        onOpenShare={() => setActiveTab("identity")}
      />

      {/* Navigation Tabs Header */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 bg-secondary/80 p-1.5 rounded-2xl max-w-3xl mx-auto shadow-2xs border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("step1")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "step1"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>🥚 1. {isEs ? "Base & Patatas" : isDe ? "Basis" : "Base"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("step2")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "step2"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>🥗 2. {isEs ? "Despensa" : isDe ? "Zutaten" : "Pantry"}</span>
          {extras.filter((e) => e.quantity > 0).length > 0 && (
            <span className="bg-[#FFB800] text-[#1C1917] text-3xs font-extrabold px-1.5 py-0.5 rounded-full">
              {extras.filter((e) => e.quantity > 0).length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("step3")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "step3"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>✨ 3. {isEs ? "Técnica & Cuajado" : isDe ? "Technik" : "Doneness"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("identity")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-extrabold text-xs md:text-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "identity"
              ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] shadow-xs"
              : "bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] hover:bg-[#FFB800]/30"
          }`}
        >
          <span>🍳 {isEs ? "Fórmula Final" : isDe ? "Profil" : "Profile"}</span>
        </button>
      </div>

      {/* Persistent Selected Ingredients Bar */}
      <SelectedIngredientsBar
        lang={lang}
        eggs={eggs}
        eggSize={eggSize}
        potatoesGrams={potatoesGrams}
        potatoVariety={potatoVariety}
        potatoCut={potatoCut}
        oilStyle={oilStyle}
        extras={extras}
        onUpdateExtra={(id, quantity) => {
          setExtras((prev) => {
            const existing = prev.find((e) => e.id === id);
            if (existing) {
              if (quantity <= 0) return prev.filter((e) => e.id !== id);
              return prev.map((e) => (e.id === id ? { ...e, quantity } : e));
            }
            if (quantity > 0) return [...prev, { id, quantity }];
            return prev;
          });
        }}
        onClearExtras={() => setExtras([])}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "step1" && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
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
              potatoVariety={potatoVariety}
              setPotatoVariety={setPotatoVariety}
              potatoCut={potatoCut}
              setPotatoCut={setPotatoCut}
              estimatedFryingOil={tortillaConfig.calculatedProfile.estimatedFryingOilMl}
              estimatedAbsorbedOil={tortillaConfig.calculatedProfile.estimatedAbsorbedOilMl}
              potatoUnits={tortillaConfig.calculatedProfile.potatoUnits}
            />

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setActiveTab("step2")}
                className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>{isEs ? "Siguiente: Despensa y Extras" : isDe ? "Weiter: Zutaten" : "Next: Extra Ingredients"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "step2" && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StepInventory
              lang={lang}
              extras={extras}
              onUpdateExtra={(id, quantity) => {
                setExtras((prev) => {
                  const existing = prev.find((e) => e.id === id);
                  if (existing) {
                    if (quantity <= 0) return prev.filter((e) => e.id !== id);
                    return prev.map((e) => (e.id === id ? { ...e, quantity } : e));
                  }
                  if (quantity > 0) return [...prev, { id, quantity }];
                  return prev;
                });
              }}
            />

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("step1")}
                className="border-border bg-card text-foreground cursor-pointer"
              >
                {isEs ? "← Atrás: Base" : "← Back"}
              </Button>
              <Button
                onClick={() => setActiveTab("step3")}
                className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>{isEs ? "Siguiente: Técnica y Cuajado" : isDe ? "Weiter: Technik" : "Next: Technique & Heat"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "step3" && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StepPreferences
              lang={lang}
              texture={texture}
              setTexture={setTexture}
              potatoTechnique={potatoTechnique}
              setPotatoTechnique={setPotatoTechnique}
              potatoVariety={potatoVariety}
              setPotatoVariety={setPotatoVariety}
              potatoCut={potatoCut}
              setPotatoCut={setPotatoCut}
              fryingTempProfile={fryingTempProfile}
              setFryingTempProfile={setFryingTempProfile}
              calculatedProfile={tortillaConfig.calculatedProfile}
            />

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("step2")}
                className="border-border bg-card text-foreground cursor-pointer"
              >
                {isEs ? "← Atrás: Despensa" : "← Back"}
              </Button>
              <Button
                onClick={() => setActiveTab("identity")}
                className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEs ? "Ver Perfil y Receta Final" : isDe ? "Rezept anzeigen" : "View Final Recipe"}</span>
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <TortillaProfileView
              lang={lang}
              config={tortillaConfig}
              shareUrl={shareUrl}
            />

            <div className="flex justify-start pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("step3")}
                className="border-border bg-card text-foreground cursor-pointer"
              >
                {isEs ? "← Modificar Parámetros de Técnica" : "← Modify Cooking Parameters"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
