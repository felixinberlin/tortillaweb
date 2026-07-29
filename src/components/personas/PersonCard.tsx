import React from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { User, BookOpen, ExternalLink, Sparkles, Flame, ShieldAlert, Award, Tv, Globe } from "lucide-react";
import type { Persona } from "@/data/personasData";
import LocalizedLink from "@/components/navigation/LocalizedLink";
import { Badge } from "@/components/ui/badge";

interface PersonCardProps {
  persona: Persona;
  lang?: string;
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground bg-amber-500/10 underline decoration-amber-500/50 px-1 py-0.5 rounded">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function PersonCard({ persona, lang = "es" }: PersonCardProps) {
  const { t } = useTranslation(undefined, { lng: lang });
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Historia":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "Tradición":
        return "bg-yellow-100 text-yellow-900 border-yellow-300";
      case "Innovación":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "Ciencia":
        return "bg-red-100 text-red-900 border-red-300";
      case "Divulgación":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "Divulgación Internacional":
        return "bg-sky-100 text-sky-900 border-sky-300";
      case "Cultura":
      case "Cultura Pop":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Historia":
        return <BookOpen className="w-3 h-3" />;
      case "Tradición":
        return <Award className="w-3 h-3" />;
      case "Innovación":
        return <Sparkles className="w-3 h-3" />;
      case "Ciencia":
        return <ShieldAlert className="w-3 h-3" />;
      case "Divulgación":
        return <Flame className="w-3 h-3" />;
      case "Divulgación Internacional":
        return <Globe className="w-3 h-3" />;
      case "Cultura":
      case "Cultura Pop":
        return <Tv className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  return (
    <div className="card-notebook p-6 flex flex-col justify-between hover:border-amber-400 transition-all duration-200 relative group">
      <div>
        {/* Header: Avatar / Icon & Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5E6BE] text-[#8D6E63] border border-amber-300/80 flex items-center justify-center font-bold text-lg shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
              {persona.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif-heading font-bold text-xl text-foreground leading-tight">
                {persona.name}
              </h3>
              {persona.era && (
                <span className="text-xs font-semibold text-amber-800/80 block mt-0.5">
                  {persona.era}
                </span>
              )}
            </div>
          </div>

          <Badge className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 shrink-0 ${getBadgeStyle(persona.badge)}`}>
            {getBadgeIcon(persona.badge)}
            <span>{persona.badge}</span>
          </Badge>
        </div>

        {/* Portrait Image if present */}
        {persona.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4 border border-amber-200/80 shadow-2xs group-hover:shadow-md transition-all">
            <img
              src={persona.imageUrl}
              alt={persona.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-medium italic drop-shadow-xs line-clamp-1">
              {persona.name}
            </div>
          </div>
        )}

        {/* Contribution / Biography */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed mb-6">
          {renderFormattedText(persona.contribution)}
        </p>
      </div>

      {/* Footer / Related Page Button */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {t("personasPage.reference", "Referencia")}
        </span>
        <LocalizedLink
          to={persona.relatedPage.href}
          lang={lang}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 bg-amber-100/80 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg border border-amber-300/80 transition-colors shadow-2xs"
        >
          <span>{persona.relatedPage.label}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </LocalizedLink>
      </div>
    </div>
  );
}
