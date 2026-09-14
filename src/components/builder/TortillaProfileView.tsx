import React, { useState } from "react";
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Flame,
  Scale,
  Download,
  FileDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TortillaConfiguration } from "@/domain/builder/types";
import { getIngredientModifier } from "@/domain/builder/ingredientRegistry";
import { RecipeComparisonCard } from "./RecipeComparisonCard";
import { DnaExportModal } from "./DnaExportModal";
import { getComparatorUrlForConfig, downloadDnaAsPdf } from "@/domain/builder/dnaShareHelper";
import TortillaSvgRenderer from "@/components/svg/TortillaSvgRenderer";
import { builderConfigToSvgOptions } from "@/domain/svg";
import { ShareButtons } from "@/components/share/ShareButtons";

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
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRecipe, setCopiedRecipe] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const { calculatedProfile, ingredients } = config;
  const comparatorUrl = getComparatorUrlForConfig(config, lang);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      await downloadDnaAsPdf(config, lang, shareUrl);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const getLocalizedName = (entityId: string) => {
    if (entityId === "egg") return isEs ? "Huevos" : isDe ? "Eier" : "Eggs";
    if (entityId === "potato") return isEs ? "Patatas" : isDe ? "Kartoffeln" : "Potatoes";
    if (entityId === "oil") return isEs ? "Aceite de Oliva" : isDe ? "Olivenöl" : "Olive Oil";
    const mod = getIngredientModifier(entityId);
    if (!mod) return entityId;
    return isEs ? mod.name.es : isDe ? mod.name.de : mod.name.en;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl || window.location.href);
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

${isEs ? "Seguridad Culinaria:" : "Food Safety Standard:"} 70°C por 2 minutos (óptimo) / 63°C por 20 segundos

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
    <div className="space-y-6">
      {/* Header Banner with Profile Summary */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🍳</span>
              <h3 className="font-serif-heading text-2xl font-bold text-foreground">
                {isEs ? "Fórmula Personalizada de Tortilla" : isDe ? "Dein Tortilla-Profil" : "Custom Tortilla Recipe Profile"}
              </h3>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {isEs
                ? "Resumen de pesos, termodinámica, proporciones de corte y tiempos calculados"
                : isDe
                ? "Zusammenfassung von Gewichten, Verhältnissen und Garzeiten"
                : "Comprehensive breakdown of weights, ratios, thermodynamics, and timings"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct PDF Export */}
            <Button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              size="sm"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-xs gap-1.5 shadow-2xs cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>
                {isDownloadingPdf
                  ? isEs
                    ? "Generando PDF..."
                    : "Generating PDF..."
                  : isEs
                  ? "Exportar Receta (PDF)"
                  : isDe
                  ? "Rezept PDF"
                  : "Export PDF Recipe"}
              </span>
            </Button>

            {/* Download & Export Modal Trigger */}
            <Button
              onClick={() => setIsExportModalOpen(true)}
              size="sm"
              className="bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917] font-extrabold text-xs gap-1.5 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEs ? "Descargar / Guardar ADN" : isDe ? "DNA Speichern" : "Download / Save DNA"}</span>
            </Button>

            <Button
              onClick={handleCopyLink}
              size="sm"
              variant="outline"
              className="border-border bg-accent text-foreground hover:bg-accent/80 text-xs font-bold gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (isEs ? "¡URL Copiada!" : "URL Copied!") : (isEs ? "Copiar Enlace URL" : "Copy URL Link")}</span>
            </Button>

            <Button
              onClick={handleCopyRecipeText}
              size="sm"
              className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs gap-1.5 cursor-pointer"
            >
              {copiedRecipe ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRecipe ? (isEs ? "¡Texto Copiado!" : "Text Copied!") : (isEs ? "Copiar Receta" : "Copy Recipe")}</span>
            </Button>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-accent border border-border text-center">
            <span className="text-3xs text-muted-foreground font-bold uppercase block">{isEs ? "Sartén" : "Pan"}</span>
            <span className="text-lg font-black text-foreground">{calculatedProfile.recommendedPanSizeCm} cm</span>
          </div>
          <div className="p-3 rounded-xl bg-accent border border-border text-center">
            <span className="text-3xs text-muted-foreground font-bold uppercase block">{isEs ? "Raciones" : "Servings"}</span>
            <span className="text-lg font-black text-foreground">{calculatedProfile.estimatedServings} pers.</span>
          </div>
          <div className="p-3 rounded-xl bg-accent border border-border text-center">
            <span className="text-3xs text-muted-foreground font-bold uppercase block">{isEs ? "Ratio P/H" : "Ratio P/E"}</span>
            <span className="text-lg font-black text-[#8D6E63] dark:text-[#FFB800]">{calculatedProfile.potatoEggRatio}g</span>
          </div>
          <div className="p-3 rounded-xl bg-accent border border-border text-center">
            <span className="text-3xs text-muted-foreground font-bold uppercase block">{isEs ? "Seguridad" : "Safety"}</span>
            <span className="text-xs font-extrabold text-[#2E7D32] dark:text-[#81C784] block mt-1">
              <strong>70°C / 2 min</strong>
            </span>
          </div>
        </div>

        {/* Visual Parametric SVG Illustration */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
              <span className="font-bold text-sm text-foreground">
                {isEs ? "Avatar Ilustrado de tu Tortilla (SVG)" : "Parametric SVG Vector Preview"}
              </span>
            </div>
            <a
              href={`/${lang}/laboratorio/svg-generator`}
              className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline"
            >
              {isEs ? "Abrir en Estudio SVG →" : "Open in SVG Studio →"}
            </a>
          </div>
          <div className="max-w-xl mx-auto">
            <TortillaSvgRenderer
              options={builderConfigToSvgOptions(config, {
                title: isEs ? `Tortilla Personalizada (${calculatedProfile.potatoEggRatio}g/huevo)` : `Custom Tortilla (${calculatedProfile.potatoEggRatio}g/egg)`,
              })}
              allowViewSwitch={true}
              allowDownload={true}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Prominent Comparator Launch Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FFB800]/20 via-accent to-[#8D6E63]/15 border-2 border-[#FFB800]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FFB800] text-[#1C1917] shadow-2xs shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FFB800] text-[#1C1917]">
                {isEs ? "ADN Listo para Comparar" : "DNA Ready to Compare"}
              </span>
            </div>
            <h4 className="font-serif-heading text-lg font-extrabold text-foreground mt-1">
              {isEs
                ? `¿Cómo compite tu ratio de ${calculatedProfile.potatoEggRatio}g/huevo frente al canon?`
                : `How does your ${calculatedProfile.potatoEggRatio}g/egg ratio compare to the canon?`}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEs
                ? "Lleva tu ADN de Tortilla al comparador para medir las diferencias porcentuales de patata, aceite y cebolla."
                : "Open the technical comparator to analyze percentage differences in potato, oil, and onion."}
            </p>
          </div>
        </div>

        <a
          href={comparatorUrl}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] text-sm font-extrabold text-center shrink-0 shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-102 cursor-pointer"
        >
          <span>{isEs ? "Comparar mi ADN en el Comparador" : "Compare DNA in Comparator"}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Ratios and Predicted Traits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ratios Card */}
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-4">
          <h4 className="font-serif-heading text-lg font-bold text-foreground flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FFB800]" />
            {isEs ? "Equilibrio Químico & Ratios" : "Chemical Balance & Ratios"}
          </h4>

          {/* Potato/Egg ratio */}
          <div>
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
              <span className="text-foreground">🥔 {isEs ? "Ratio Patata / Huevo:" : "Potato / Egg Ratio:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-extrabold">
                {calculatedProfile.potatoEggRatio}g / {isEs ? "huevo" : "egg"}
              </span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FFB800] h-2.5 rounded-full"
                style={{ width: `${Math.min(100, (calculatedProfile.potatoEggRatio / 150) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"]}
            </p>
          </div>

          {/* Oil/Egg ratio */}
          <div>
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
              <span className="text-foreground">🫒 {isEs ? "Ratio Aceite / Huevo:" : "Oil / Egg Ratio:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800] font-extrabold">
                {calculatedProfile.oilEggRatio}ml / {isEs ? "huevo" : "egg"}
              </span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8D6E63] h-2.5 rounded-full"
                style={{ width: `${Math.min(100, (calculatedProfile.oilEggRatio / 35) * 100)}%` }}
              />
            </div>
          </div>

          {/* Traits */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-accent p-3 rounded-xl border border-border">
              <span className="text-muted-foreground font-medium block">💧 {isEs ? "Humedad / Jugosidad" : "Moisture Level"}</span>
              <span className="font-extrabold text-foreground text-sm">{calculatedProfile.moistureLevel}</span>
            </div>
            <div className="bg-accent p-3 rounded-xl border border-border">
              <span className="text-muted-foreground font-medium block">🥩 {isEs ? "Grasa & Untuosidad" : "Fat Level"}</span>
              <span className="font-extrabold text-foreground text-sm">{calculatedProfile.fatLevel}</span>
            </div>
          </div>
        </div>

        {/* Predicted Traits Card */}
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-4">
          <h4 className="font-serif-heading text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB800]" />
            {isEs ? "Características Predichas" : "Predicted Characteristics"}
          </h4>

          <div>
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-1">
              ✨ {isEs ? "Textura Prevista" : "Predicted Texture"}
            </span>
            <p className="text-foreground font-semibold text-sm">
              {calculatedProfile.textureNote[isEs ? "es" : isDe ? "de" : "en"]}
            </p>
          </div>

          <div>
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-1">
              🍳 {isEs ? "Notas de Sabor" : "Flavor Notes"}
            </span>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {flavorNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-1">
              🥩 {isEs ? "Estructura & Corte" : "Structure & Slice"}
            </span>
            <p className="text-xs text-muted-foreground">
              {typeof calculatedProfile.structureNote === "object"
                ? calculatedProfile.structureNote[isEs ? "es" : isDe ? "de" : "en"] || calculatedProfile.structureNote.es
                : calculatedProfile.structureNote}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Cooking Instructions */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border">
          <Flame className="w-6 h-6 text-[#FF8A00]" />
          <div>
            <h4 className="font-serif-heading text-xl font-bold text-foreground">
              {isEs ? "Instrucciones de Elaboración Personalizadas" : "Custom Step-by-Step Instructions"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isEs
                ? "Paso a paso calculado matemáticamente para tus proporciones exactas"
                : "Mathematically calculated steps for your exact ingredient balance"}
            </p>
          </div>
        </div>

        <ol className="space-y-3">
          {adviceList.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3.5 bg-accent rounded-xl border border-border text-sm">
              <span className="font-extrabold text-[#8D6E63] dark:text-[#FFB800] bg-secondary rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-xs">
                {idx + 1}
              </span>
              <p className="text-foreground font-medium pt-0.5 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Share To & Save URL Elements for the Created Recipe */}
      <div id="share-created-recipe">
        <ShareButtons
          url={shareUrl}
          title={isEs ? "Mi Receta de Tortilla de Patatas Personalizada" : isDe ? "Mein persönliches Tortilla-Rezept" : "My Custom Spanish Tortilla Recipe"}
          description={
            isEs
              ? `Fórmula gastronómica a medida: ${config.calculatedProfile.potatoEggRatio}g de patata por huevo, punto ${config.preferences.texture}, para ${config.calculatedProfile.estimatedServings} personas.`
              : `Custom recipe: ${config.calculatedProfile.potatoEggRatio}g potato per egg, ${config.preferences.texture} texture, for ${config.calculatedProfile.estimatedServings} diners.`
          }
          summary={
            isEs
              ? `Ratio ${config.calculatedProfile.potatoEggRatio}g/huevo | Sartén ${config.calculatedProfile.recommendedPanSizeCm}cm | ${config.preferences.texture}`
              : `Ratio ${config.calculatedProfile.potatoEggRatio}g/egg | Pan ${config.calculatedProfile.recommendedPanSizeCm}cm | ${config.preferences.texture}`
          }
          lang={lang}
          variant="card"
          showUrlNotice={true}
        />
      </div>

      {/* Interactive DNA & Canonical Recipe Comparator */}
      <RecipeComparisonCard lang={lang} config={config} />

      {/* Export / Download Modal */}
      <DnaExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lang={lang}
        config={config}
        shareUrl={shareUrl}
      />

      {/* Safety Standard Callout */}
      <div className="chef-note">
        <p className="font-serif-heading font-bold text-sm mb-1 text-foreground">
          🛡️ {isEs ? "Norma de Seguridad Alimentaria" : "Food Safety Golden Standard"}
        </p>
        <p className="text-xs text-foreground/90 font-sans leading-relaxed">
          {isEs ? (
            <>
              Para garantizar inocuidad bacteriológica frente a salmonella, mantén el centro de la tortilla a{" "}
              <strong>70°C durante 2 minutos</strong> (o <strong>63°C durante 20 segundos</strong>). Si prefieres textura líquida tipo Betanzos, consúmela inmediatamente y nunca la dejes más de <strong>4 horas</strong> a temperatura ambiente.
            </>
          ) : (
            <>
              To guarantee microbiological safety against salmonella, maintain the tortilla core at{" "}
              <strong>70°C for 2 minutes</strong> (or <strong>63°C for 20 seconds</strong>). If serving liquid Betanzos style, consume immediately and never keep over <strong>4 hours</strong> at ambient temperature.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

