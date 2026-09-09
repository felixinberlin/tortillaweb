import React, { useState } from "react";
import {
  Download,
  Share2,
  Copy,
  Check,
  FileJson,
  FileText,
  FileDown,
  Image as ImageIcon,
  ExternalLink,
  X,
  Sparkles,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TortillaConfiguration } from "@/domain/builder/types";
import {
  downloadDnaAsPdf,
  downloadDnaImage,
  downloadDnaAsJson,
  downloadDnaAsText,
  getComparatorUrlForConfig,
} from "@/domain/builder/dnaShareHelper";

interface DnaExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  config: TortillaConfiguration;
  shareUrl: string;
}

export const DnaExportModal: React.FC<DnaExportModalProps> = ({
  isOpen,
  onClose,
  lang,
  config,
  shareUrl,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!isOpen) return null;

  const comparatorUrl = getComparatorUrlForConfig(config, lang);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isEs
            ? `Mi ADN de Tortilla de Patatas (${config.calculatedProfile.potatoEggRatio}g/huevo)`
            : `My Tortilla DNA Profile (${config.calculatedProfile.potatoEggRatio}g/egg)`,
          text: isEs
            ? `He creado mi fórmula de Tortilla de Patatas con un ratio de ${config.calculatedProfile.potatoEggRatio}g/huevo y sartén de ${config.calculatedProfile.recommendedPanSizeCm}cm. ¡Pruébala y compárala!`
            : `Check out my custom Tortilla DNA formula (${config.calculatedProfile.potatoEggRatio}g/egg). Compare it in the lab!`,
          url: shareUrl || window.location.href,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      await downloadDnaAsPdf(config, lang, shareUrl);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    setDownloadingImg(true);
    try {
      await downloadDnaImage(config, lang);
    } finally {
      setDownloadingImg(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-card border-2 border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{isEs ? "Exportar y Guardar ADN" : isDe ? "DNA exportieren" : "Export & Save DNA"}</span>
          </div>
          <h3 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            {isEs
              ? "Guarda, Descarga y Comparte tu Tortilla"
              : isDe
              ? "Tortilla-DNA speichern, herunterladen und teilen"
              : "Save, Download & Share your Tortilla DNA"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isEs
              ? "Tu fórmula contiene un ADN digital reproducible mediante enlace permanente, imagen de alta resolución y archivo JSON."
              : "Your formula contains digital DNA shareable via permanent URL, high-resolution graphic card, or JSON spec."}
          </p>
        </div>

        {/* Share URL Box */}
        <div className="p-4 rounded-2xl bg-accent border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isEs ? "🔗 Enlace Permanente al ADN:" : "🔗 Permanent DNA Link:"}
            </span>
            <span className="text-3xs text-[#2E7D32] dark:text-[#81C784] font-bold">
              {isEs ? "Carga instantánea de parámetros" : "Instant parameter restore"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl || window.location.href}
              className="flex-1 text-xs font-mono bg-card px-3 py-2.5 rounded-xl border border-border text-foreground select-all focus:outline-hidden"
            />
            <Button
              onClick={handleCopyLink}
              size="sm"
              className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs shrink-0 gap-1.5 px-4 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? (isEs ? "¡Copiado!" : "Copied!") : (isEs ? "Copiar" : "Copy")}</span>
            </Button>
          </div>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <div className="pt-1">
              <button
                type="button"
                onClick={handleNativeShare}
                className="text-xs font-bold text-[#00A3FF] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isEs ? "Compartir con aplicaciones (WhatsApp, Telegram...)" : "Share via native apps"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Download Grid Options */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            {isEs ? "📥 Opciones de Descarga Directa:" : "📥 Direct Download Formats:"}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* PDF Recipe Document Card */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="p-4 rounded-2xl bg-card border-2 border-[#FFB800] hover:bg-[#FFB800]/5 transition-all flex flex-col items-start gap-2 text-left cursor-pointer group shadow-xs hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] dark:text-[#81C784] text-[9px] font-extrabold uppercase">
                {isEs ? "Estándar 70°C" : "70°C Safe"}
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] group-hover:scale-105 transition-transform">
                <FileDown className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div>
                <span className="font-bold text-sm text-foreground block">
                  {isEs ? "Ficha Receta (PDF)" : isDe ? "Rezeptblatt (PDF)" : "Recipe Sheet (PDF)"}
                </span>
                <span className="text-3xs text-muted-foreground">
                  {isEs ? "Completa para imprimir y cocinar" : "Print-ready kitchen notebook"}
                </span>
              </div>
              <div className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] mt-auto flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingPdf ? (isEs ? "Generando..." : "Rendering...") : (isEs ? "Descargar PDF" : "Download PDF")}</span>
              </div>
            </button>

            {/* PNG Image Card */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloadingImg}
              className="p-4 rounded-2xl bg-card border border-border hover:border-[#FFB800] transition-all flex flex-col items-start gap-2 text-left cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <div className="p-2.5 rounded-xl bg-[#FFB800]/15 text-[#8D6E63] dark:text-[#FFB800] group-hover:scale-105 transition-transform">
                <ImageIcon className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div>
                <span className="font-bold text-sm text-foreground block">
                  {isEs ? "Tarjeta Gráfica PNG" : "Graphic Card (PNG)"}
                </span>
                <span className="text-3xs text-muted-foreground">
                  {isEs ? "Ficha D.N.I. en alta resolución" : "High-res recipe spec sheet"}
                </span>
              </div>
              <div className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] mt-auto flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingImg ? (isEs ? "Generando..." : "Rendering...") : (isEs ? "Descargar PNG" : "Download PNG")}</span>
              </div>
            </button>

            {/* JSON Profile */}
            <button
              type="button"
              onClick={() => downloadDnaAsJson(config, lang)}
              className="p-4 rounded-2xl bg-card border border-border hover:border-[#FFB800] transition-all flex flex-col items-start gap-2 text-left cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-500 group-hover:scale-105 transition-transform">
                <FileJson className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <span className="font-bold text-sm text-foreground block">
                  {isEs ? "Archivo JSON" : "JSON Data"}
                </span>
                <span className="text-3xs text-muted-foreground">
                  {isEs ? "Formato de datos interoperable" : "Structured culinary payload"}
                </span>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-auto flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{isEs ? "Descargar .json" : "Download .json"}</span>
              </div>
            </button>

            {/* Kitchen Docket / Markdown Text */}
            <button
              type="button"
              onClick={() => downloadDnaAsText(config, lang, shareUrl)}
              className="p-4 rounded-2xl bg-card border border-border hover:border-[#FFB800] transition-all flex flex-col items-start gap-2 text-left cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <span className="font-bold text-sm text-foreground block">
                  {isEs ? "Ficha de Cocina TXT" : "Kitchen Sheet TXT"}
                </span>
                <span className="text-3xs text-muted-foreground">
                  {isEs ? "Instrucciones para imprimir" : "Text steps for countertop"}
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-auto flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{isEs ? "Descargar .txt" : "Download .txt"}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Direct Action to Comparator */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFB800]/15 to-[#8D6E63]/15 border border-[#FFB800]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFB800] text-[#1C1917]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">
                {isEs ? "¿Quieres comparar tu ADN con recetas históricas?" : "Compare this DNA with canonical recipes?"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {isEs
                  ? "Abre el comparador con tu tortilla cargada como Receta A y analízala frente a Betanzos o Clásica."
                  : "Opens the technical comparator with your custom DNA preloaded against reference recipes."}
              </p>
            </div>
          </div>

          <a
            href={comparatorUrl}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] text-xs font-extrabold text-center shrink-0 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isEs ? "Abrir en Comparador" : "Open in Comparator"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
