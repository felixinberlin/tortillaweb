import React, { useState, useMemo } from "react";
import {
  generateTortillaSvg,
  generateTortillaSvgDataUri,
  INGREDIENT_SVG_REGISTRY,
} from "@/domain/svg";
import type {
  TortillaSvgOptions,
  DonenessLevel,
  PotatoCut,
  SvgPresentationView,
  SvgTheme,
  IngredientExtraId,
} from "@/domain/svg";
import {
  getSvgStudioTranslations,
  type SvgStudioLang,
} from "@/domain/svg/i18n";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Eye,
  Flame,
  Egg,
  Layers,
  ChefHat,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DONENESS_IDS: { id: DonenessLevel; icon: string }[] = [
  { id: "liquid", icon: "🌋" },
  { id: "runny", icon: "💧" },
  { id: "melosa", icon: "✨" },
  { id: "cuajada", icon: "🍳" },
  { id: "firme", icon: "🥪" },
];

const POTATO_CUT_IDS: PotatoCut[] = [
  "panadera",
  "dados",
  "chascada",
  "paja",
  "chips",
];

const EXTRA_IDS: { id: IngredientExtraId; icon: string }[] = [
  { id: "chorizo", icon: "🔴" },
  { id: "jamon", icon: "🥓" },
  { id: "truffle", icon: "🖤" },
  { id: "sobrasada", icon: "🍯" },
  { id: "cheese", icon: "🧀" },
  { id: "mushrooms", icon: "🍄" },
  { id: "peppers", icon: "🫑" },
  { id: "garlic", icon: "🧄" },
  { id: "chickpea", icon: "🌱" },
];

export interface TortillaSvgStudioProps {
  lang?: string;
}

export default function TortillaSvgStudio({ lang = "es" }: TortillaSvgStudioProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? (lang as SvgStudioLang) : "es";
  const t = useMemo(() => getSvgStudioTranslations(currentLang), [currentLang]);

  // Initial title in corresponding language
  const defaultTitle = useMemo(() => {
    switch (currentLang) {
      case "en":
        return "Creamy Tortilla with Onion and Jamón";
      case "de":
        return "Cremige Tortilla mit Zwiebel und Schinken";
      case "es":
      default:
        return "Tortilla Melosa con Cebolla y Jamón";
    }
  }, [currentLang]);

  // State
  const [title, setTitle] = useState(defaultTitle);
  const [eggCount, setEggCount] = useState<number>(6);
  const [potatoGrams, setPotatoGrams] = useState<number>(600);
  const [doneness, setDoneness] = useState<DonenessLevel>("melosa");
  const [potatoCut, setPotatoCut] = useState<PotatoCut>("panadera");
  const [hasOnion, setHasOnion] = useState<boolean>(true);
  const [onionStyle, setOnionStyle] = useState<"caramelized" | "pochada" | "crispy">("caramelized");
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set(["jamon"]));
  const [presentation, setPresentation] = useState<SvgPresentationView>("skillet_top");
  const [theme, setTheme] = useState<SvgTheme>("kitchen_dark");
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [showSafetyBadge, setShowSafetyBadge] = useState<boolean>(true);
  const [showDnaMetrics, setShowDnaMetrics] = useState<boolean>(true);
  const [animated, setAnimated] = useState<boolean>(true);
  const [animatedFlip, setAnimatedFlip] = useState<boolean>(false);

  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedDataUri, setCopiedDataUri] = useState(false);

  // Trigger 3D flip animation handler
  const handleTriggerFlip = () => {
    if (animatedFlip) return;
    setAnimatedFlip(true);
    setTimeout(() => {
      setAnimatedFlip(false);
    }, 1600);
  };

  // Toggle extra helper
  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Compile options
  const svgOptions = useMemo<TortillaSvgOptions>(() => {
    return {
      title,
      eggCount,
      potatoWeightG: potatoGrams,
      doneness,
      potatoCut,
      onion: {
        present: hasOnion,
        style: onionStyle,
        quantityG: hasOnion ? 120 : 0,
      },
      extras: Array.from(selectedExtras) as IngredientExtraId[],
      presentation,
      theme,
      showBadge,
      showSafetyBadge,
      showDnaMetrics,
      animated,
      animatedFlip,
      lang: currentLang,
    };
  }, [
    title,
    eggCount,
    potatoGrams,
    doneness,
    potatoCut,
    hasOnion,
    onionStyle,
    selectedExtras,
    presentation,
    theme,
    showBadge,
    showSafetyBadge,
    showDnaMetrics,
    animated,
    animatedFlip,
    currentLang,
  ]);

  // Derived outputs
  const svgString = useMemo(() => generateTortillaSvg(svgOptions), [svgOptions]);
  const dataUri = useMemo(() => generateTortillaSvgDataUri(svgOptions), [svgOptions]);
  const ratioGPerEgg = eggCount > 0 ? Math.round(potatoGrams / eggCount) : 100;

  // Actions
  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgString);
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    } catch (err) {
      console.error("Failed to copy SVG:", err);
    }
  };

  const handleCopyDataUri = async () => {
    try {
      await navigator.clipboard.writeText(dataUri);
      setCopiedDataUri(true);
      setTimeout(() => setCopiedDataUri(false), 2000);
    } catch (err) {
      console.error("Failed to copy Data URI:", err);
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(title || "tortilla").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 text-stone-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t.badgeSubtitle}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-400">
              {t.title}
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleDownloadSvg}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.downloadSvg}
            </Button>
            <Button
              variant="outline"
              onClick={handleCopySvg}
              className="border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700"
            >
              {copiedSvg ? <Check className="w-4 h-4 text-emerald-400 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copiedSvg ? t.copiedSvg : t.copySvg}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Preview (Left) vs Control Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Canvas & Quick View Selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl overflow-hidden">
            {/* Viewport bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-stone-200">{t.livePreview}</span>
                {animated && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {presentation === "skillet_top" && (
                  <button
                    type="button"
                    onClick={handleTriggerFlip}
                    disabled={animatedFlip}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition-all active:scale-95 disabled:opacity-60"
                  >
                    <span className={animatedFlip ? "animate-spin" : ""}>🔄</span>
                    <span>{animatedFlip ? t.flippingText : t.flipTortillaBtn}</span>
                  </button>
                )}
                <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setPresentation("skillet_top")}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      presentation === "skillet_top"
                        ? "bg-amber-500 text-stone-950 shadow"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t.viewSkillet}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresentation("sliced_pincho")}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      presentation === "sliced_pincho"
                        ? "bg-amber-500 text-stone-950 shadow"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t.viewPincho}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresentation("duo_pan_slice")}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      presentation === "duo_pan_slice"
                        ? "bg-amber-500 text-stone-950 shadow"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t.viewDuo}
                  </button>
                </div>
              </div>
            </div>

            {/* SVG Render Container */}
            <div
              className="w-full aspect-[3/2] rounded-xl overflow-hidden mt-3 bg-stone-950 flex items-center justify-center border border-stone-800/80"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />

            {/* Quick Metrics Bar */}
            <div className="mt-4 pt-3 border-t border-stone-800/80 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-stone-400">{t.dnaMetric}</div>
                <div className="font-bold text-amber-400 text-sm mt-0.5">{ratioGPerEgg} {t.ratioPerEgg}</div>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-stone-400">{t.donenessMetric}</div>
                <div className="font-bold text-amber-400 text-sm mt-0.5 capitalize">
                  {t.donenessOptions[doneness]?.label.split(" ")[0] || doneness}
                </div>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-stone-400">{t.potatoMetric}</div>
                <div className="font-bold text-amber-400 text-sm mt-0.5 capitalize">
                  {t.potatoCutOptions[potatoCut]?.label.split(" ")[0] || potatoCut}
                </div>
              </div>
            </div>
          </div>

          {/* Export Code Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Code2 className="w-4 h-4 text-amber-400" />
                {t.exportTitle}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyDataUri}
                  className="h-7 text-xs border-stone-700 bg-stone-800 text-stone-300"
                >
                  {copiedDataUri ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedDataUri ? t.copiedDataUri : t.copyDataUri}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopySvg}
                  className="h-7 text-xs border-stone-700 bg-stone-800 text-stone-300"
                >
                  {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedSvg ? t.copiedSvg : t.copySvg}
                </Button>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.exportDesc}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Parameter Tuning (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl text-stone-100">
            {/* Title & Identity */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                {t.titleInputLabel}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder={t.titleInputPlaceholder}
              />
            </div>

            {/* Doneness / Coagulation Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                {t.donenessSectionTitle}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {DONENESS_IDS.map((opt) => {
                  const info = t.donenessOptions[opt.id] || { label: opt.id, desc: "" };
                  const isSelected = doneness === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDoneness(opt.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 text-stone-100"
                          : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{opt.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-stone-200">{info.label}</div>
                          <div className="text-[11px] text-stone-400">{info.desc}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Potato Cut Style */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {t.potatoCutSectionTitle}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {POTATO_CUT_IDS.map((cutId) => {
                  const info = t.potatoCutOptions[cutId] || { label: cutId, desc: "" };
                  const isSelected = potatoCut === cutId;
                  return (
                    <button
                      key={cutId}
                      type="button"
                      onClick={() => setPotatoCut(cutId)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 text-stone-100"
                          : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-200">{info.label}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{info.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Batch & Egg Quantities */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                  <Egg className="w-3.5 h-3.5 text-amber-400" /> {t.eggsSliderLabel}: {eggCount}
                </label>
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={eggCount}
                  onChange={(e) => setEggCount(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">
                  {t.potatoesSliderLabel}: {potatoGrams}g
                </label>
                <input
                  type="range"
                  min={200}
                  max={1500}
                  step={50}
                  value={potatoGrams}
                  onChange={(e) => setPotatoGrams(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Onion Settings */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-200">{t.onionToggleLabel}</span>
                <input
                  type="checkbox"
                  checked={hasOnion}
                  onChange={(e) => setHasOnion(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
              {hasOnion && (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {(["caramelized", "pochada", "crispy"] as const).map((st) => {
                    const label =
                      st === "caramelized"
                        ? t.onionStyleCaramelized
                        : st === "pochada"
                        ? t.onionStylePochada
                        : t.onionStyleCrispy;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setOnionStyle(st)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold border transition-all ${
                          onionStyle === st
                            ? "bg-amber-500 text-stone-950 border-amber-500"
                            : "bg-stone-900 border-stone-800 text-stone-400"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Extras / Fillings */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t.extrasSectionTitle}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {EXTRA_IDS.map((extra) => {
                  const isSelected = selectedExtras.has(extra.id);
                  const label = t.extraIngredients[extra.id] || extra.id;
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <span>{extra.icon}</span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges & Animations */}
            <div className="space-y-2.5 pt-2 border-t border-stone-800">
              <label className="flex items-center gap-2 text-xs text-amber-300 font-semibold cursor-pointer bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <span>{t.animatedToggle}</span>
              </label>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBadge}
                    onChange={(e) => setShowBadge(e.target.checked)}
                    className="w-3.5 h-3.5 accent-amber-500 rounded cursor-pointer"
                  />
                  {t.showBadgeToggle}
                </label>
                <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSafetyBadge}
                    onChange={(e) => setShowSafetyBadge(e.target.checked)}
                    className="w-3.5 h-3.5 accent-amber-500 rounded cursor-pointer"
                  />
                  <span dangerouslySetInnerHTML={{ __html: t.showSafetyBadgeToggle.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone Ingredient Vector Gallery */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl text-stone-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t.ingredientVisualModules}
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-400">
              {t.ingredientGalleryTitle}
            </h2>
            <p className="text-xs text-stone-400 max-w-2xl">
              {t.ingredientGalleryDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { id: "egg", state: "raw", name: "Huevo / Egg" },
            { id: "potato", state: "panadera", name: "Patata / Potato" },
            { id: "onion", state: "caramelized", name: "Cebolla / Onion" },
            { id: "olive_oil", state: "droplet", name: "AOVE / Olive Oil" },
            { id: "salt", state: "crystals", name: "Sal / Salt" },
            { id: "chorizo", state: "slice", name: "Chorizo" },
            { id: "jamon", state: "slice", name: "Jamón Ibérico" },
            { id: "truffle", state: "whole", name: "Trufa / Truffle" },
            { id: "cheese", state: "wedge", name: "Queso / Cheese" },
            { id: "peppers", state: "whole", name: "Pimientos / Peppers" },
            { id: "mushrooms", state: "whole", name: "Boletus / Mushrooms" },
            { id: "garlic", state: "bulb", name: "Ajo / Garlic" },
            { id: "sobrasada", state: "spread", name: "Sobrasada" },
            { id: "chickpea", state: "pile", name: "Garbanzo (1798)" },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 rounded-xl p-3 flex flex-col items-center justify-between text-center transition-all group hover:scale-[1.03] hover:shadow-lg"
            >
              <div
                className="w-16 h-16 my-2 flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: INGREDIENT_SVG_REGISTRY[item.id]?.renderSvgString({
                    state: item.state,
                    width: 64,
                    height: 64,
                    standalone: true,
                  }) || "",
                }}
              />
              <div className="w-full pt-2 border-t border-stone-800/80">
                <div className="text-[11px] font-bold text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                  {item.name}
                </div>
                <div className="text-[10px] text-stone-400 capitalize font-mono mt-0.5">
                  {item.state}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
