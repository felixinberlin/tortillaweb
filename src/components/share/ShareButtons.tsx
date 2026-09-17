import React, { useState, useMemo, useEffect } from "react";
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Mail,
  Bookmark,
  Sparkles,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  summary?: string;
  lang?: string;
  variant?: "full" | "card" | "pills" | "compact";
  showUrlNotice?: boolean;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description = "",
  summary = "",
  lang = "es",
  variant = "card",
  showUrlNotice = true,
  className = "",
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const [copied, setCopied] = useState(false);
  const [showBookmarkTip, setShowBookmarkTip] = useState(false);
  const [mountedUrl, setMountedUrl] = useState<string>("");
  const [hasNativeShare, setHasNativeShare] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true);
    }
    if (typeof window !== "undefined") {
      const currentHost = window.location.host;
      if (currentHost.includes("tortilladepatatas.org")) {
        setMountedUrl(window.location.href);
      } else {
        setMountedUrl(`https://tortilladepatatas.org${window.location.pathname}${window.location.search}`);
      }
    }
  }, []);

  // Compute final effective URL
  const effectiveUrl = useMemo(() => {
    if (url) {
      if (url.startsWith("/")) {
        return `https://tortilladepatatas.org${url}`;
      }
      return url;
    }
    if (mountedUrl) {
      return mountedUrl;
    }
    return "https://tortilladepatatas.org";
  }, [url, mountedUrl]);

  // Craft share message
  const shareText = useMemo(() => {
    const baseTitle = title.trim();
    if (summary) {
      return `${baseTitle} — ${summary}`;
    }
    if (description) {
      return `${baseTitle}: ${description}`;
    }
    return isEs
      ? `${baseTitle} | Tortilla de Patatas`
      : isDe
      ? `${baseTitle} | Spanische Tortilla`
      : `${baseTitle} | Spanish Tortilla`;
  }, [title, summary, description, isEs, isDe]);

  // Destination URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${effectiveUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(effectiveUrl)}&text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(effectiveUrl)}&text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(effectiveUrl)}`;
  const emailSubject = title;
  const emailBody = `${shareText}\n\n${isEs ? "Puedes ver la receta completa y sus parámetros aquí:" : "View the full recipe and its parameters here:"}\n${effectiveUrl}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(effectiveUrl);
      } else {
        const input = document.createElement("input");
        input.value = effectiveUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: effectiveUrl,
        });
      } catch {
        // User dismissed or aborted share
      }
    } else {
      handleCopyLink();
    }
  };

  // COMPACT VARIANT (Row of clean icon buttons)
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={handleCopyLink}
          title={isEs ? "Copiar URL permanente" : "Copy permanent URL"}
          className="p-2 rounded-xl bg-card border border-border hover:border-[#FFB800] text-foreground hover:text-[#8D6E63] dark:hover:text-[#FFB800] transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
        >
          {copied ? <Check className="w-4 h-4 text-[#2E7D32]" /> : <Copy className="w-4 h-4" />}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="p-2 rounded-xl bg-card border border-border hover:border-[#25D366] text-foreground hover:text-[#25D366] transition-colors shadow-2xs flex items-center justify-center"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Telegram"
          className="p-2 rounded-xl bg-card border border-border hover:border-[#0088cc] text-foreground hover:text-[#0088cc] transition-colors shadow-2xs flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="X / Twitter"
          className="p-2 rounded-xl bg-card border border-border hover:border-[#1DA1F2] text-foreground hover:text-[#1DA1F2] transition-colors shadow-2xs flex items-center justify-center"
        >
          <Share2 className="w-4 h-4" />
        </a>

        <a
          href={emailUrl}
          title="Email"
          className="p-2 rounded-xl bg-card border border-border hover:border-[#EA4335] text-foreground hover:text-[#EA4335] transition-colors shadow-2xs flex items-center justify-center"
        >
          <Mail className="w-4 h-4" />
        </a>

        {hasNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            title={isEs ? "Más aplicaciones" : "More apps"}
            className="p-2 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] hover:bg-[#FFB800]/30 transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
          >
            <Globe className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // PILLS VARIANT (Horizontal pills with label)
  if (variant === "pills") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:border-[#FFB800] text-xs font-bold text-foreground transition-all shadow-2xs cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isEs ? "¡URL Copiada!" : "URL Copied!") : (isEs ? "Copiar URL" : "Copy URL")}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-bold text-[#1E7E34] dark:text-[#25D366] transition-all shadow-2xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-xs font-bold text-[#006699] dark:text-[#29b6f6] transition-all shadow-2xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram</span>
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-xs font-bold text-[#0c7abf] dark:text-[#40b3ff] transition-all shadow-2xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>X / Twitter</span>
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-xs font-bold text-[#1150a8] dark:text-[#4285f4] transition-all shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Facebook</span>
        </a>

        <a
          href={emailUrl}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:border-[#FFB800] text-xs font-bold text-foreground transition-all shadow-2xs"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </a>

        {hasNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFB800]/20 hover:bg-[#FFB800]/30 border border-[#FFB800]/40 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] transition-all shadow-2xs cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEs ? "Más..." : "More..."}</span>
          </button>
        )}
      </div>
    );
  }

  // DEFAULT / CARD VARIANT (Comprehensive interactive notebook box)
  return (
    <div className={`card-notebook bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 ${className}`}>
      {/* Header with Title & Bookmark Hint */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800]">
              <Share2 className="w-4 h-4" />
            </span>
            <h4 className="font-serif-heading font-extrabold text-base sm:text-lg text-foreground">
              {isEs ? "Compartir esta Receta" : isDe ? "Rezept teilen" : "Share this Recipe"}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground">
            {isEs
              ? "Envía tu receta a amigos o guárdala como enlace permanente sin necesidad de registrarte."
              : isDe
              ? "Senden Sie Ihr Rezept an Freunde oder speichern Sie es als permanenten Link."
              : "Send your recipe to friends or save it as a permanent link with zero registration required."}
          </p>
        </div>

        {/* Bookmark Trigger Button */}
        <button
          type="button"
          onClick={() => setShowBookmarkTip(!showBookmarkTip)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto border border-border"
        >
          <Bookmark className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>{isEs ? "Guardar en Marcadores" : isDe ? "Als Lesezeichen" : "Save to Bookmarks"}</span>
        </button>
      </div>

      {/* Bookmark Instructional Popover / Tip */}
      {showBookmarkTip && (
        <div className="p-3.5 rounded-xl bg-[#FFB800]/15 border border-[#FFB800]/30 text-xs text-foreground space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-1.5 font-bold text-[#8D6E63] dark:text-[#FFB800]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEs ? "Cómo guardar esta receta como URL:" : "How to save this recipe as a URL:"}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {isEs ? (
              <>
                Pulsa <strong>Ctrl + D</strong> (en Windows/Linux) o <strong>Cmd + D</strong> (en Mac) en tu teclado para añadir esta dirección web a tus favoritos. Todos los ingredientes y proporciones se recuperarán de forma idéntica cuando vuelvas a abrirla.
              </>
            ) : (
              <>
                Press <strong>Ctrl + D</strong> (Windows/Linux) or <strong>Cmd + D</strong> (Mac) on your keyboard to bookmark this URL. All ingredient ratios and instructions are permanently preserved and restored instantly upon opening.
              </>
            )}
          </p>
        </div>
      )}

      {/* URL Link Input with 1-Click Copy */}
      <div className="space-y-1.5">
        <label className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>{isEs ? "Enlace permanente directo (URL):" : "Direct permanent URL link:"}</span>
          <span className="text-[#2E7D32] dark:text-[#81C784] font-bold lowercase">
            {isEs ? "100% reproducible" : "100% reproducible"}
          </span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={effectiveUrl}
            className="flex-1 text-xs font-mono bg-accent/80 px-3 py-2 rounded-xl border border-border text-foreground select-all focus:outline-hidden"
          />
          <Button
            onClick={handleCopyLink}
            size="sm"
            className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs shrink-0 gap-1.5 px-4 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isEs ? "¡Copiado!" : "Copied!") : (isEs ? "Copiar URL" : "Copy URL")}</span>
          </Button>
        </div>
      </div>

      {/* Share To Social & Messaging Platforms Grid */}
      <div className="space-y-2 pt-1">
        <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
          {isEs ? "Compartir en aplicaciones:" : isDe ? "Teilen über:" : "Share to platforms:"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-bold text-[#1E7E34] dark:text-[#25D366] transition-all shadow-2xs hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-xs font-bold text-[#006699] dark:text-[#29b6f6] transition-all shadow-2xs hover:scale-102"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span className="truncate">Telegram</span>
          </a>

          {/* X / Twitter */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-xs font-bold text-[#0c7abf] dark:text-[#40b3ff] transition-all shadow-2xs hover:scale-102"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span className="truncate">X (Twitter)</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-xs font-bold text-[#1150a8] dark:text-[#4285f4] transition-all shadow-2xs hover:scale-102"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="truncate">Facebook</span>
          </a>

          {/* Email */}
          <a
            href={emailUrl}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-accent hover:bg-secondary border border-border text-xs font-bold text-foreground transition-all shadow-2xs hover:scale-102"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">Email</span>
          </a>
        </div>
      </div>

      {/* Explanatory URL-Saving Callout Notice */}
      {showUrlNotice && (
        <div className="pt-2 border-t border-border/60 flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
          <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
          <p>
            {isEs ? (
              <>
                <strong>Guarda tu receta en URL:</strong> Toda tu configuración (ingredientes, gramajes, corte y técnica de cuajado) queda codificada en la dirección web. Puedes guardarla en tus marcadores o enviarla por mensaje para volver a ella cuando quieras, sin pérdida de datos.
              </>
            ) : isDe ? (
              <>
                <strong>Rezept als URL speichern:</strong> Alle Ihre Einstellungen (Zutaten, Gewichte, Schnittart und Gartechnik) sind direkt in der Webadresse kodiert. Speichern Sie diese Seite einfach als Lesezeichen.
              </>
            ) : (
              <>
                <strong>Save your recipe as a URL:</strong> Your entire formula (ingredients, exact grams, potato cut, and thermal doneness) is encoded in this web address. Save this URL to your bookmarks or send it via message to reopen it anytime without losing any parameters.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
