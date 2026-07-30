import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Heart,
  Sprout,
  Sparkles,
  Flame,
  CheckCircle2,
  Vote,
  Users,
  Quote,
  ChefHat,
  ExternalLink,
  BarChart3,
  ShieldAlert,
  Award
} from "lucide-react";
import type { Taxonomy } from "@/types/taxonomy";

interface FactionsPageProps {
  lang?: string;
  factions?: Taxonomy[];
  pageData?: any;
}

export default function FactionsPage({ lang = "es", factions = [], pageData = {} }: FactionsPageProps) {
  const { t } = useTranslation(undefined, { lng: lang });
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  // Fallbacks if pageData fields are localized objects
  const badge = pageData.badge?.[currentLang] || (currentLang === "en" ? "Culinary Factions" : currentLang === "de" ? "Kulinarische Faktionen" : "Facciones Culinarias");
  const heroTitle = pageData.hero?.title?.[currentLang] || "¿Purista de la Doctrina o Rebelde Culinario?";
  const heroSubtitle = pageData.hero?.subtitle?.[currentLang] || "Del dogma de la patata y el huevo a las variaciones regionales con personalidad.";
  const adriaDoctrine = pageData.hero?.adriaDoctrine?.[currentLang] || "Distinguimos formalmente entre la 'Tortilla de Patatas Tradicional' y las 'Tortillas de Patatas con...' para garantizar la paz gastronómica.";

  const introTitle = pageData.introduction?.title?.[currentLang] || "La evolución de una receta universal";
  const introBody1 = pageData.introduction?.body1?.[currentLang] || "";
  const introBody2 = pageData.introduction?.body2?.[currentLang] || "";

  const pollTitle = pageData.poll?.title?.[currentLang] || "Test de Ortodoxia: Elige tu Lealtad";
  const pollSub = pageData.poll?.subtitle?.[currentLang] || "¡Declara tu facción! Vota y descubre los porcentajes en tiempo real.";
  const votedMsg = pageData.poll?.votedMessage?.[currentLang] || "¡Voto registrado!";
  const totalVotesLabel = pageData.poll?.totalVotesLabel?.[currentLang] || "Votos totales registrados";
  const initialStats = pageData.poll?.initialStats || {
    puristas: 28,
    concebollistas: 54,
    pimientistas: 8,
    ajistas: 5,
    "con-cosas": 5
  };

  const safetyNoteText = pageData.safetyNote?.[currentLang] || "Recordatorio de Seguridad e Higiene: Para garantizar un cuajado seguro frente a Salmonella, el estándar bactericida exige alcanzar **70°C durante 2 minutos** o cocinar el huevo pasteurizado a **63°C durante 20 segundos**. Consume en menos de **4 horas** a temperatura ambiente o mantén refrigerada por debajo de **8°C**.";

  // Local state for interactive poll with localStorage persistence
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [stats, setStats] = useState<Record<string, number>>(initialStats);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVote = localStorage.getItem("tortilla_faction_vote");
      if (savedVote) {
        setSelectedFaction(savedVote);
        setHasVoted(true);
        setStats((prev) => {
          const updated = { ...prev };
          if (updated[savedVote] !== undefined) {
            updated[savedVote] += 1;
          }
          return updated;
        });
      }
    }
  }, []);

  const totalVotes = Object.values(stats).reduce((a, b) => a + b, 0);

  const handleVote = (factionId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tortilla_faction_vote", factionId);
    }
    if (!hasVoted) {
      setStats((prev) => ({
        ...prev,
        [factionId]: (prev[factionId] || 0) + 1,
      }));
    } else if (selectedFaction && selectedFaction !== factionId) {
      setStats((prev) => ({
        ...prev,
        [selectedFaction]: Math.max(0, (prev[selectedFaction] || 1) - 1),
        [factionId]: (prev[factionId] || 0) + 1,
      }));
    }
    setSelectedFaction(factionId);
    setHasVoted(true);
  };

  const getFactionIcon = (iconName?: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-5 h-5" />;
      case "Heart":
        return <Heart className="w-5 h-5" />;
      case "Sprout":
        return <Sprout className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Flame":
        return <Flame className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getBadgeStyle = (colorName?: string) => {
    switch (colorName) {
      case "terracotta":
        return "bg-[#B65D3A]/10 text-[#B65D3A] border-[#B65D3A]/30";
      case "tortillaGold":
        return "bg-[#FFB800]/15 text-[#8D6E63] border-[#FFB800]/40";
      case "olive":
        return "bg-[#667A3D]/10 text-[#667A3D] border-[#667A3D]/30";
      case "charcoal":
        return "bg-[#292521]/10 text-[#292521] border-[#292521]/30";
      case "cream":
        return "bg-[#F5E6BE] text-[#8D6E63] border-amber-300";
      default:
        return "bg-amber-100 text-amber-900 border-amber-300";
    }
  };

  const renderFormattedSafety = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className="font-bold text-[#8D6E63] bg-[#F5E6BE] px-1.5 py-0.5 rounded border border-amber-300/60"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const routePrefixes: Record<string, string> = {
    es: "facciones",
    en: "factions",
    de: "faktionen",
  };
  const routePrefix = routePrefixes[currentLang] || "facciones";

  return (
    <div className="container mx-auto px-4 py-8 md:py-14 max-w-6xl space-y-12">
      {/* HEADER & HERO SECTION */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 text-xs font-bold shadow-2xs">
          <Users className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-heading font-extrabold text-[#292521] tracking-tight leading-tight">
          {heroTitle}
        </h1>

        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
          {heroSubtitle}
        </p>
      </header>

      {/* FERRAN ADRIÀ DOCTRINE CALLOUT BLOCK */}
      <section className="card-notebook p-6 md:p-8 max-w-4xl mx-auto border-l-4 border-l-[#FFB800] bg-[#FCF9F2] shadow-xs rounded-2xl border border-[#E8E2D5] relative overflow-hidden">
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-[#FFB800]/20 text-[#8D6E63] shrink-0 hidden sm:flex items-center justify-center border border-amber-300/50">
            <Quote className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] bg-[#F5E6BE] px-2.5 py-0.5 rounded-full border border-amber-300/60 inline-flex items-center gap-1">
                <ChefHat className="w-3 h-3 text-[#FFB800]" />
                Doctrina de Ferran Adrià (El Bulli)
              </span>
            </div>
            <blockquote className="text-base sm:text-lg font-serif-heading italic text-[#292521] leading-relaxed">
              &ldquo;{adriaDoctrine}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="max-w-4xl mx-auto space-y-4 text-foreground/90 leading-relaxed text-sm sm:text-base border-b border-[#E8E2D5] pb-8">
        <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          {introTitle}
        </h2>
        {introBody1 && <p className="font-sans">{introBody1}</p>}
        {introBody2 && <p className="font-sans">{introBody2}</p>}
      </section>

      {/* FACTIONS GRID FROM TAXONOMY DATA */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D5] pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521]">
              Las Facciones Culinarias
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Haz clic en cualquier facción para ver su ficha completa y recetas asociadas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factions.map((faction) => {
            const factionTitle = faction.title[currentLang as keyof typeof faction.title] || faction.title.es;
            const factionDesc = faction.description[currentLang as keyof typeof faction.description] || faction.description.es;
            const factionDogma = faction.dogma ? (faction.dogma[currentLang as keyof typeof faction.dogma] || faction.dogma.es) : undefined;
            const factionBadge = faction.badge ? (faction.badge[currentLang as keyof typeof faction.badge] || faction.badge.es) : undefined;
            const keyIngredient = faction.keyIngredient ? (faction.keyIngredient[currentLang as keyof typeof faction.keyIngredient] || faction.keyIngredient.es) : undefined;
            const slug = faction.slug[currentLang as keyof typeof faction.slug] || faction.slug.es;
            const factionUrl = `/${currentLang}/${routePrefix}/${slug}`;

            return (
              <article
                key={faction.id}
                className={`card-notebook p-6 flex flex-col justify-between rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-[#FFB800] bg-[#FCF9F2] relative ${selectedFaction === faction.id ? "ring-2 ring-[#FFB800] bg-[#FFF7EA]" : "border-[#E8E2D5]"
                  }`}
              >
                <div className="mb-5 overflow-hidden rounded-xl border border-[#E8E2D5] shadow-sm">
                  <img
                    src={faction.image}
                    alt={factionTitle}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  {/* Badge & Icon Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 shadow-2xs shrink-0">
                      {getFactionIcon(faction.icon)}
                    </div>
                    {factionBadge && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${getBadgeStyle(
                          faction.theme?.color
                        )}`}
                      >
                        {factionBadge}
                      </span>
                    )}
                  </div>

                  {/* Name & Key Ingredient */}
                  <div>
                    <h3 className="text-xl font-serif-heading font-bold text-[#292521] leading-tight">
                      <a href={factionUrl} className="hover:text-[#8D6E63] transition-colors">
                        {factionTitle}
                      </a>
                    </h3>
                    {keyIngredient && (
                      <div className="mt-1.5 inline-block text-xs font-semibold text-[#8D6E63] bg-[#F5E6BE]/70 px-2.5 py-0.5 rounded-md border border-amber-200">
                        Ingrediente Clave: <strong>{keyIngredient}</strong>
                      </div>
                    )}
                  </div>

                  {/* Dogma Quote */}
                  {factionDogma && (
                    <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8E2D5] text-xs font-serif-heading italic text-[#292521]/90">
                      &ldquo;{factionDogma}&rdquo;
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {factionDesc}
                  </p>

                  {/* Prominent Figures */}
                  {faction.prominentFigures && faction.prominentFigures.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                        Figuras Prominentes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {faction.prominentFigures.map((figure, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium bg-white text-[#292521] px-2 py-0.5 rounded-md border border-[#E8E2D5] shadow-2xs"
                          >
                            {figure}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* View Details Link */}
                <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <a
                    href={factionUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8D6E63] hover:text-[#292521] bg-[#F5E6BE]/60 hover:bg-[#F5E6BE] px-3 py-1.5 rounded-lg border border-amber-300/80 transition-colors shadow-2xs"
                  >
                    <span>{t("factions.viewCard", "Ver Ficha & Recetas")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE POLL MODULE */}
      <section className="card-notebook p-6 sm:p-8 rounded-2xl bg-[#FCF9F2] border border-[#E8E2D5] shadow-xs space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] border border-amber-300 text-xs font-bold">
            <Vote className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{t("factions.communityPoll", "Encuesta de la Comunidad")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521]">
            {pollTitle}
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80">
            {pollSub}
          </p>
        </div>

        {/* Faction Radio Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {factions.map((fac) => {
            const facTitle = fac.title[currentLang as keyof typeof fac.title] || fac.title.es;
            const count = stats[fac.id] || 0;
            const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const isSelected = selectedFaction === fac.id;

            return (
              <button
                key={fac.id}
                type="button"
                onClick={() => handleVote(fac.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                    ? "bg-[#FFF7EA] border-[#FFB800] ring-2 ring-[#FFB800]/50 shadow-xs"
                    : "bg-white border-[#E8E2D5] hover:border-amber-300 hover:bg-[#FAF6EE]"
                  }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#F5E6BE] text-[#8D6E63] border border-amber-300">
                      {getFactionIcon(fac.icon)}
                    </div>
                    <span className="font-serif-heading font-bold text-sm text-[#292521]">
                      {facTitle}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                  )}
                </div>

                {hasVoted && (
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#8D6E63]">
                      <span>{percentage}%</span>
                      <span className="text-[10px] text-muted-foreground">{count} {t("factions.votes", "votos")}</span>
                    </div>
                    <div className="w-full h-2 bg-[#E8E2D5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFB800] transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Total Votes Footer & Confirmation */}
        <div className="pt-4 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
            <BarChart3 className="w-4 h-4 text-[#8D6E63]" />
            <span>{totalVotesLabel}: <strong className="font-mono text-[#292521] text-sm">{totalVotes}</strong></span>
          </div>

          {hasVoted && (
            <div className="text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{votedMsg}</span>
            </div>
          )}
        </div>
      </section>

      {/* SAFETY NOTE */}
      <section className="card-notebook p-5 sm:p-6 rounded-2xl bg-[#FCF9F2] border-l-4 border-l-[#2E7D32] border border-[#E8E2D5] shadow-xs max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            <p className="font-sans">{renderFormattedSafety(safetyNoteText)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
