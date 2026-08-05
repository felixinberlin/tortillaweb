import React, { useState } from "react";
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  ChefHat,
  Flame,
  Scale,
  Info,
  ExternalLink,
  BookOpen,
  GitCompare,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TortillaConfiguration } from "@/domain/builder/types";
import { getIngredientModifier } from "@/domain/builder/ingredientRegistry";

interface TortillaProfileViewProps {
  lang: string;
  config: TortillaConfiguration;
  shareUrl: string;
  onOpenComparator?: () => void;
}

export const TortillaProfileView: React.FC<TortillaProfileViewProps> = ({
  lang,
  config,
  shareUrl,
  onOpenComparator,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRecipe, setCopiedRecipe] = useState(false);

  const { calculatedProfile, ingredients, preferences } = config;

  const eggIng = ingredients.find((i) => i.entityId === "egg");
  const potatoIng = ingredients.find((i) => i.entityId === "potato");
  const oilIng = ingredients.find((i) => i.entityId === "oil");
  const extraIngs = ingredients.filter(
    (i) => i.entityId !== "egg" && i.entityId !== "potato" && i.entityId !== "oil"
  );

  const getLocalizedName = (entityId: string) => {
    if (entityId === "egg") return isEs ? "Huevos" : isDe ? "Eier" : "Eggs";
    if (entityId === "potato") return isEs ? "Patatas" : isDe ? "Kartoffeln" : "Potatoes";
    if (entityId === "oil") return isEs ? "Aceite de Oliva" : isDe ? "Olivenöl" : "Olive Oil";
    const mod = getIngredientModifier(entityId);
    if (!mod) return entityId;
    return isEs ? mod.name.es : isDe ? mod.name.de : mod.name.en;
  };

  const getTaxonomyUrl = (entityId: string) => {
    const langPrefix = isEs ? "/es" : isDe ? "/de" : "/en";
    const section = isEs ? "ingredientes" : isDe ? "zutaten" : "ingredients";

    if (entityId === "egg") return `${langPrefix}/${section}/${isEs ? "huevo" : isDe ? "ei" : "egg"}`;
    if (entityId === "potato") return `${langPrefix}/${section}/${isEs ? "patata" : isDe ? "kartoffel" : "potato"}`;
    if (entityId === "oil") return `${langPrefix}/${section}/${isEs ? "aceite" : isDe ? "oel" : "oil"}`;

    const mod = getIngredientModifier(entityId);
    if (mod?.taxonomySlug) {
      const slug = isEs ? mod.taxonomySlug.es : isDe ? mod.taxonomySlug.de : mod.taxonomySlug.en;
      return `${langPrefix}/${section}/${slug}`;
    }
    return null;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyRecipeText = () => {
    const adviceList = isEs
      ? calculatedProfile.cookingAdvice.es
      : isDe
      ? calculatedProfile.cookingAdvice.de
      : calculatedProfile.cookingAdvice.en;

    const ingText = ingredients
      .map((ing) => `- ${ing.quantity}${ing.unit} ${getLocalizedName(ing.entityId)}`)
      .join("\n");

    const text = `🍳 ${isEs ? "Mi Receta de Tortilla de Patatas" : "My Custom Tortilla Recipe"}
------------------------------------
${isEs ? "Ingredientes:" : "Ingredients:"}
${ingText}

${isEs ? "Sartén recomendada:" : "Recommended pan:"} ${calculatedProfile.recommendedPanSizeCm} cm
${isEs ? "Raciones estimadas:" : "Estimated servings:"} ${calculatedProfile.estimatedServings}
${isEs ? "Ratio Patata/Huevo:" : "Potato/Egg ratio:"} ${calculatedProfile.potatoEggRatio}g/egg (${calculatedProfile.ratioCategory[isEs ? "es" : "en"]})

${isEs ? "Instrucciones de Elaboración:" : "Cooking Steps:"}
${adviceList.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}
------------------------------------
${shareUrl}`;

    navigator.clipboard.writeText(text);
    setCopiedRecipe(true);
    setTimeout(() => setCopiedRecipe(false), 2000);
  };

  const adviceList = isEs
    ? calculatedProfile.cookingAdvice.es
    : isDe
    ? calculatedProfile.cookingAdvice.de
    : calculatedProfile.cookingAdvice.en;

  const flavorNotes = isEs
    ? calculatedProfile.flavorNotes.es
    : isDe
    ? calculatedProfile.flavorNotes.de
    : calculatedProfile.flavorNotes.en;

  return (
    <div className="space-y-8">
      {/* Identity Banner */}
      <Card className="border-2 border-amber-600/40 bg-gradient-to-br from-amber-500/15 via-stone-50 to-amber-500/10 shadow-md rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-amber-600 text-white font-bold px-3 py-1">
                  <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
                  {isEs ? "Identidad Creada" : isDe ? "Tortilla-Identität" : "Tortilla Identity"}
                </Badge>
                <Badge variant="outline" className="border-amber-400 bg-amber-100 text-amber-950 font-bold">
                  🍳 {calculatedProfile.recommendedPanSizeCm} cm pan
                </Badge>
                <Badge variant="outline" className="border-amber-400 bg-amber-100 text-amber-950 font-bold">
                  👥 {calculatedProfile.estimatedServings} {isEs ? "raciones" : "servings"}
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
                {isEs ? "Tu Tortilla Personalizada" : isDe ? "Ihre Eigene Tortilla" : "Your Custom Tortilla"}
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-1">
                {calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"]}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="border-amber-500 text-amber-950 hover:bg-amber-100 font-bold text-xs"
              >
                {copiedLink ? <Check className="w-4 h-4 mr-1 text-emerald-600" /> : <Share2 className="w-4 h-4 mr-1" />}
                {copiedLink
                  ? isEs
                    ? "Enlace Copiado!"
                    : "Link Copied!"
                  : isEs
                  ? "Compartir URL"
                  : "Share URL"}
              </Button>
              <Button
                size="sm"
                onClick={handleCopyRecipeText}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                {copiedRecipe ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copiedRecipe
                  ? isEs
                    ? "Copiado!"
                    : "Copied!"
                  : isEs
                  ? "Copiar Receta"
                  : "Copy Recipe"}
              </Button>
              {onOpenComparator && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenComparator}
                  className="bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs"
                >
                  <GitCompare className="w-4 h-4 mr-1" />
                  {isEs ? "Comparar ADN" : "Compare DNA"}
                </Button>
              )}
            </div>
          </div>

          {/* Ingredient Composition Summary Grid */}
          <div>
            <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              {isEs ? "Composición de Ingredientes" : isDe ? "Zusammenstellung" : "Ingredient Composition"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block">🥚 {isEs ? "Huevos" : "Eggs"}</span>
                <span className="text-xl font-extrabold text-stone-900">{eggIng?.quantity || 0}</span>
                <span className="text-3xs text-stone-400 block uppercase font-bold">{eggIng?.size || "L"}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block">🥔 {isEs ? "Patatas" : "Potatoes"}</span>
                <span className="text-xl font-extrabold text-stone-900">{potatoIng?.quantity || 0}g</span>
                <span className="text-3xs text-stone-400 block font-bold">≈ {calculatedProfile.potatoUnits} {isEs ? "unidades" : "units"}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block">🫒 {isEs ? "Aceite Absorbido" : "Absorbed Oil"}</span>
                <span className="text-xl font-extrabold text-amber-900">{calculatedProfile.estimatedAbsorbedOilMl}ml</span>
                <span className="text-3xs text-stone-400 block font-bold">({calculatedProfile.estimatedFryingOilMl}ml {isEs ? "freír" : "fry"})</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block">🥗 {isEs ? "Extras" : "Extras"}</span>
                <span className="text-xl font-extrabold text-stone-900">{extraIngs.length}</span>
                <span className="text-3xs text-stone-400 block font-bold">{isEs ? "ingredientes" : "ingredients"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tortilla DNA Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ratios & Indicators */}
        <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
          <CardHeader className="bg-amber-500/10 pb-3 border-b border-amber-900/10">
            <CardTitle className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              {isEs ? "Indicadores Tortilla DNA" : "Tortilla DNA Ratios"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Potato/Egg ratio */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-stone-800">🥔 {isEs ? "Ratio Patata / Huevo:" : "Potato / Egg Ratio:"}</span>
                <span className="text-amber-900 font-extrabold">{calculatedProfile.potatoEggRatio}g / {isEs ? "huevo" : "egg"}</span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, (calculatedProfile.potatoEggRatio / 150) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"]}
              </p>
            </div>

            {/* Oil/Egg ratio */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-stone-800">🫒 {isEs ? "Ratio Aceite / Huevo:" : "Oil / Egg Ratio:"}</span>
                <span className="text-amber-900 font-extrabold">{calculatedProfile.oilEggRatio}ml / {isEs ? "huevo" : "egg"}</span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-700 h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, (calculatedProfile.oilEggRatio / 35) * 100)}%` }}
                />
              </div>
            </div>

            {/* Quality Traits Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-stone-500 font-medium block">💧 {isEs ? "Humedad / Jugosidad" : "Moisture Level"}</span>
                <span className="font-extrabold text-stone-900 text-sm">{calculatedProfile.moistureLevel}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-stone-500 font-medium block">🥩 {isEs ? "Intensidad de Grasa" : "Fat Level"}</span>
                <span className="font-extrabold text-stone-900 text-sm">{calculatedProfile.fatLevel}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predicted Characteristics */}
        <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
          <CardHeader className="bg-amber-500/10 pb-3 border-b border-amber-900/10">
            <CardTitle className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {isEs ? "Características Predichas" : "Predicted Characteristics"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                ✨ {isEs ? "Textura Prevista" : "Predicted Texture"}
              </h4>
              <p className="text-stone-900 font-semibold text-sm">
                {calculatedProfile.textureNote[isEs ? "es" : isDe ? "de" : "en"]}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                🍳 {isEs ? "Notas de Sabor" : "Flavor Notes"}
              </h4>
              <ul className="list-disc list-inside text-xs text-stone-700 space-y-1">
                {flavorNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                🍳 {isEs ? "Estructura & Corte" : "Structure & Slice"}
              </h4>
              <p className="text-xs text-stone-700">
                {typeof calculatedProfile.structureNote === "object"
                  ? calculatedProfile.structureNote[isEs ? "es" : isDe ? "de" : "en"] || calculatedProfile.structureNote.es
                  : calculatedProfile.structureNote}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Cooking Recommendation */}
      <Card className="border-2 border-amber-600/30 shadow-sm bg-amber-500/5 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/15 pb-4 border-b border-amber-600/20">
          <CardTitle className="text-xl font-bold text-amber-950 flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-600" />
            {isEs ? "Recomendaciones Dinámicas de Elaboración" : "Dynamic Cooking Instructions"}
          </CardTitle>
          <CardDescription className="text-amber-900/80 text-sm">
            {isEs
              ? "Paso a paso personalizado según tus ingredientes y técnica elegida"
              : "Custom step-by-step instructions generated for your exact ingredient balance"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ol className="space-y-4">
            {adviceList.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4 p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs">
                <span className="font-extrabold text-amber-800 bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center shrink-0 text-sm">
                  {idx + 1}
                </span>
                <p className="text-stone-800 text-sm leading-relaxed pt-1 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Knowledge Graph Connections */}
      <Card className="border-2 border-stone-200 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-stone-100/80 pb-3 border-b border-stone-200">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            {isEs ? "Conexiones con el Grafo de Conocimiento" : "Knowledge Graph Connections"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-xs text-stone-600 mb-4">
            {isEs
              ? "Explora las fichas de conocimiento detalladas de los ingredientes presentes en tu receta:"
              : "Explore knowledge monographs for the ingredients in your custom tortilla:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => {
              const url = getTaxonomyUrl(ing.entityId);
              if (!url) return null;

              return (
                <a
                  key={ing.entityId}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold text-xs transition-all shadow-2xs"
                >
                  <span>{getLocalizedName(ing.entityId)}</span>
                  <ExternalLink className="w-3 h-3 text-amber-700" />
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
