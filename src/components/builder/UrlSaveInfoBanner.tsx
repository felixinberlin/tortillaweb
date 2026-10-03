import React, { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  Sparkles,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UrlSaveInfoBannerProps {
  shareUrl: string;
  lang?: string;
  onOpenShare?: () => void;
}

export const UrlSaveInfoBanner: React.FC<UrlSaveInfoBannerProps> = ({
  shareUrl,
  lang = "es",
  onOpenShare,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      const urlToCopy = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const input = document.createElement("input");
        input.value = urlToCopy;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="card-notebook bg-gradient-to-r from-[#FFB800]/10 via-[#FAF6EE] to-[#8D6E63]/10 dark:from-[#2A2420] dark:via-[#201D1A] dark:to-[#1C1917] border border-[#FFB800]/30 rounded-2xl p-3.5 sm:p-4 shadow-2xs mb-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Icon & Text */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] shrink-0 mt-0.5 sm:mt-0">
            <Link2 className="w-4 h-4 text-[#8D6E63] dark:text-[#FFB800]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#8D6E63] dark:text-[#FFB800] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFB800]" />
                {isEs ? "Guardado en URL Activo" : isDe ? "URL-Speicherung Aktiv" : "Live URL Auto-Save Active"}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] dark:text-[#81C784]">
                {isEs ? "Sin Registro" : "No Account Needed"}
              </span>
            </div>
            <p className="text-xs text-foreground/90 mt-0.5 leading-snug">
              {isEs ? (
                <>
                  Tu receta se guarda al instante en la dirección web. <strong>Guarda la URL en marcadores (Ctrl+D)</strong> o cópiala para recuperarla cuando quieras.
                </>
              ) : isDe ? (
                <>
                  Ihr Rezept wird sofort in der Webadresse gespeichert. <strong>Speichern Sie die URL als Lesezeichen (Strg+D)</strong>, um sie jederzeit abzurufen.
                </>
              ) : (
                <>
                  Your recipe is live-saved in the web address. <strong>Bookmark this URL (Ctrl+D)</strong> or copy it to restore your exact tortilla formula anytime.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <Button
            onClick={handleCopy}
            size="sm"
            className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs gap-1.5 px-3 py-1.5 h-8 rounded-xl cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isEs ? "¡URL Copiada!" : "URL Copied!") : (isEs ? "Copiar URL" : "Copy URL")}</span>
          </Button>

          {onOpenShare && (
            <Button
              onClick={onOpenShare}
              size="sm"
              variant="outline"
              className="border-border bg-card text-foreground hover:bg-secondary font-bold text-xs gap-1.5 px-3 py-1.5 h-8 rounded-xl cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{isEs ? "Compartir" : "Share"}</span>
            </Button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isEs ? "Ver más detalles de guardado" : "More details"}
            aria-expanded={isExpanded}
            aria-controls="url-save-info-details"
            aria-label={isEs ? (isExpanded ? "Ocultar detalles" : "Ver más detalles de guardado") : isDe ? (isExpanded ? "Details ausblenden" : "Mehr Details") : (isExpanded ? "Hide details" : "More details")}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Explanation Details */}
      {isExpanded && (
        <div id="url-save-info-details" className="mt-3 pt-3 border-t border-[#FFB800]/20 text-xs text-muted-foreground space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-2.5 rounded-xl bg-card/80 border border-border">
              <span className="font-bold text-foreground block mb-0.5">
                {isEs ? "1. Enlace Permanente" : "1. Permanent Link"}
              </span>
              <span className="text-3xs">
                {isEs
                  ? "Tus parámetros (huevos, patata, variedad, corte, grasa y cuajado) van codificados en el enlace."
                  : "All your parameters (eggs, potato variety, cut, fat, and doneness) are encoded into the URL."}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-card/80 border border-border">
              <span className="font-bold text-foreground block mb-0.5">
                {isEs ? "2. Marcadores del Navegador" : "2. Browser Bookmarks"}
              </span>
              <span className="text-3xs">
                {isEs
                  ? "Añádelo a favoritos en tu móvil u ordenador para abrir tu receta en la cocina con un solo toque."
                  : "Add to favorites on mobile or desktop to open your recipe in the kitchen with one tap."}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-card/80 border border-border">
              <span className="font-bold text-foreground block mb-0.5">
                {isEs ? "3. Compartir con Quien Quieras" : "3. Share with Anyone"}
              </span>
              <span className="text-3xs">
                {isEs
                  ? "Al enviar este enlace por WhatsApp o Telegram, tus amigos verán tu fórmula exacta ya calculada."
                  : "Send via WhatsApp or Telegram; your friends will open your exact calculated formula instantly."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlSaveInfoBanner;
