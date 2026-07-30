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
import factionsData from "@/data/factions.json";

interface FactionsPageProps {
  lang?: string;
}

export default function FactionsPage({ lang = "es" }: FactionsPageProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const content = factionsData.content[currentLang] || factionsData.content.es;

  // Local state for interactive poll with localStorage persistence
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [stats, setStats] = useState<Record<string, number>>(content.poll.initialStats);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVote = localStorage.getItem("tortilla_faction_vote");
      if (savedVote) {
        setSelectedFaction(savedVote);
        setHasVoted(true);
        // Increment initial stats slightly if saved vote exists
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
      // Transfer vote if changed
      setStats((prev) => ({
        ...prev,
        [selectedFaction]: Math.max(0, (prev[selectedFaction] || 1) - 1),
        [factionId]: (prev[factionId] || 0) + 1,
      }));
    }
    setSelectedFaction(factionId);
    setHasVoted(true);
  };

  const getFactionIcon = (iconName: string) => {
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

  const getBadgeStyle = (colorName: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8 md:py-14 max-w-6xl space-y-12">
      {/* HEADER & HERO SECTION */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 text-xs font-bold shadow-2xs">
          <Users className="w-3.5 h-3.5" />
          <span>{content.badge}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-heading font-extrabold text-[#292521] tracking-tight leading-tight">
          {content.hero.title}
        </h1>
        
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
          {content.hero.subtitle}
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
                {content.ui?.adriaTitle || "Doctrina de Ferran Adrià (El Bulli)"}
              </span>
            </div>
            <blockquote className="text-base sm:text-lg font-serif-heading italic text-[#292521] leading-relaxed">
              &ldquo;{content.hero.adriaDoctrine}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="max-w-4xl mx-auto space-y-4 text-foreground/90 leading-relaxed text-sm sm:text-base border-b border-[#E8E2D5] pb-8">
        <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          {content.introduction.title}
        </h2>
        <p className="font-sans">{content.introduction.body1}</p>
        <p className="font-sans">{content.introduction.body2}</p>
      </section>

      {/* THE 5 FACTIONS GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D5] pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521]">
              {content.ui?.factionsSectionTitle || "Las 5 Facciones Culinarias"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {content.ui?.factionsSectionSub || "Haz clic en cualquier facción para conocer su dogma, figuras clave y recetas vinculadas."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.factions.map((faction) => (
            <article
              key={faction.id}
              className={`card-notebook p-6 flex flex-col justify-between rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-[#FFB800] bg-[#FCF9F2] relative ${
                selectedFaction === faction.id ? "ring-2 ring-[#FFB800] bg-[#FFF7EA]" : "border-[#E8E2D5]"
              }`}
            >
              <div className="space-y-4">
                {/* Badge & Icon Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 shadow-2xs shrink-0">
                    {getFactionIcon(faction.icon)}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${getBadgeStyle(
                      faction.badgeColor
                    )}`}
                  >
                    {faction.badge}
                  </span>
                </div>

                {/* Name & Key Ingredient */}
                <div>
                  <h3 className="text-xl font-serif-heading font-bold text-[#292521] leading-tight">
                    {faction.name}
                  </h3>
                  <div className="mt-1.5 inline-block text-xs font-semibold text-[#8D6E63] bg-[#F5E6BE]/70 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {content.ui?.keyIngredientLabel || "Ingrediente Clave:"} <strong>{faction.keyIngredient}</strong>
                  </div>
                </div>

                {/* Dogma Quote */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8E2D5] text-xs font-serif-heading italic text-[#292521]/90">
                  &ldquo;{faction.dogma}&rdquo;
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {faction.description}
                </p>

                {/* Prominent Figures */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    {content.ui?.prominentFiguresLabel || "Figuras Prominentes:"}
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
              </div>

              {/* Related Pages Footer */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {content.ui?.relatedPagesLabel || "Recetas y Páginas Relacionadas:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {faction.relatedPages.map((page, pIdx) => (
                    <a
                      key={pIdx}
                      href={page.url}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8D6E63] hover:text-[#292521] bg-[#F5E6BE]/60 hover:bg-[#F5E6BE] px-2.5 py-1 rounded-lg border border-amber-300/80 transition-colors shadow-2xs"
                    >
                      <span>{page.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE POLL MODULE ("Test de Ortodoxia") */}
      <section className="card-notebook p-6 sm:p-8 rounded-2xl bg-[#FCF9F2] border border-[#E8E2D5] shadow-xs space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] border border-amber-300 text-xs font-bold">
            <Vote className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{content.ui?.communityPollBadge || "Encuesta de la Comunidad"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#292521]">
            {content.poll.title}
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80">
            {content.poll.subtitle}
          </p>
        </div>

        {/* Faction Radio Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {content.factions.map((fac) => {
            const count = stats[fac.id] || 0;
            const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const isSelected = selectedFaction === fac.id;

            return (
              <button
                key={fac.id}
                type="button"
                onClick={() => handleVote(fac.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
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
                      {fac.name}
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
                      <span className="text-[10px] text-muted-foreground">{count} {content.ui?.votesSuffix || "votos"}</span>
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
            <span>{content.poll.totalVotesLabel}: <strong className="font-mono text-[#292521] text-sm">{totalVotes}</strong></span>
          </div>

          {hasVoted && (
            <div className="text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{content.poll.votedMessage}</span>
            </div>
          )}
        </div>
      </section>

      {/* MANDATORY SAFETY & HYGIENE NOTE */}
      <section className="card-notebook p-5 sm:p-6 rounded-2xl bg-[#FCF9F2] border-l-4 border-l-[#2E7D32] border border-[#E8E2D5] shadow-xs max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            <p className="font-sans">{renderFormattedSafety(content.safetyNote)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
