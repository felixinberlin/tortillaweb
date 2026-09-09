import React, { useMemo, useState } from "react";
import {
  generateTortillaSvg,
  recipeToSvgOptions,
} from "@/domain/svg";
import type { TortillaSvgOptions, SvgPresentationView } from "@/domain/svg";
import { getSvgStudioTranslations, type SvgStudioLang } from "@/domain/svg/i18n";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TortillaSvgRendererProps {
  options?: TortillaSvgOptions;
  recipe?: any;
  className?: string;
  allowViewSwitch?: boolean;
  allowDownload?: boolean;
  initialView?: SvgPresentationView;
  lang?: string;
}

export default function TortillaSvgRenderer({
  options: userOptions,
  recipe,
  className = "",
  allowViewSwitch = false,
  allowDownload = false,
  initialView,
  lang = "es",
}: TortillaSvgRendererProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? (lang as SvgStudioLang) : "es";
  const t = useMemo(() => getSvgStudioTranslations(currentLang), [currentLang]);

  const [currentView, setCurrentView] = useState<SvgPresentationView>(
    initialView || userOptions?.presentation || "skillet_top"
  );
  const [copied, setCopied] = useState(false);

  // Compute final options
  const finalOptions = useMemo<TortillaSvgOptions>(() => {
    let base = userOptions ? { ...userOptions } : {};
    if (recipe) {
      base = recipeToSvgOptions(recipe, base);
    }
    return {
      ...base,
      presentation: currentView,
      lang: currentLang,
    };
  }, [userOptions, recipe, currentView, currentLang]);

  // Generate SVG string
  const svgString = useMemo(() => {
    return generateTortillaSvg(finalOptions);
  }, [finalOptions]);

  // Handle Copy SVG code
  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy SVG:", err);
    }
  };

  // Handle Download SVG file
  const handleDownloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(finalOptions.title || "tortilla").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const viewButtons: { id: SvgPresentationView; label: string }[] = [
    { id: "skillet_top", label: t.viewSkillet },
    { id: "sliced_pincho", label: t.viewPincho },
    { id: "duo_pan_slice", label: t.viewDuo },
  ];

  return (
    <div className={`relative flex flex-col group ${className}`}>
      {/* Visual Canvas Display */}
      <div
        className="w-full h-full rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-stone-900 border border-stone-800"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />

      {/* Interactive Controls Overlay (if enabled) */}
      {(allowViewSwitch || allowDownload) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          {allowViewSwitch && (
            <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-lg border border-stone-700">
              {viewButtons.map((btn) => {
                const isActive = currentView === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setCurrentView(btn.id)}
                    className={`px-2.5 py-1 rounded font-medium transition-all ${
                      isActive
                        ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          )}

          {allowDownload && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySvg}
                className="h-7 px-2.5 text-xs bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? t.copiedSvg : t.copySvg}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadSvg}
                className="h-7 px-2.5 text-xs bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                {t.downloadSvg}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
