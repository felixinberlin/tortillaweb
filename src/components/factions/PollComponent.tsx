import React, { useState, useEffect } from "react";
import { Vote, CheckCircle2, BarChart3 } from "lucide-react";

interface PollComponentProps {
  lang?: string;
}

export default function PollComponent({ lang = "es" }: PollComponentProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  const options = [
    { id: "concebollistas", name: "Concebollistas (Con Cebolla)", pct: 54 },
    { id: "puristas", name: "Puristas (Sin Cebolla)", pct: 28 },
    { id: "pimientistas", name: "Pimientistas (Con Pimiento)", pct: 8 },
    { id: "ajistas", name: "Ajistas (Con Ajo)", pct: 5 },
    { id: "con-cosas", name: "Con Cosas (Innovadoras)", pct: 5 },
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tortilla_faction_vote");
      if (saved) {
        setSelected(saved);
        setHasVoted(true);
      }
    }
  }, []);

  const handleVote = (id: string) => {
    setSelected(id);
    setHasVoted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("tortilla_faction_vote", id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-[#FFB800]/20 text-[#8D6E63]">
          <Vote className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif-heading font-bold text-xl text-[#292521]">
            {currentLang === "en" ? "Official Faction Poll" : currentLang === "de" ? "Offizielle Faktiensumfrage" : "Plebiscito de Facciones Culinarias"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {currentLang === "en" ? "Cast your vote and view community stats" : currentLang === "de" ? "Stimme ab und sieh die Ergebnisse" : "Declara tu lealtad y consulta los porcentajes en tiempo real"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasVoted}
              aria-pressed={isSelected}
              onClick={() => !hasVoted && handleVote(opt.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] disabled:cursor-default ${
                isSelected
                  ? "bg-[#F5E6BE] border-[#FFB800] shadow-2xs"
                  : "bg-white border-[#E8E2D5] hover:border-amber-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? "border-[#8D6E63] bg-[#8D6E63] text-white" : "border-[#E8E2D5]"
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="font-bold text-sm text-[#292521]">{opt.name}</span>
              </div>

              {hasVoted && (
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="bg-[#8D6E63] h-full rounded-full"
                      style={{ width: `${opt.pct}%` }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#8D6E63]">{opt.pct}%</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <div className="p-3 bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-xl text-xs font-bold text-[#2E7D32] flex items-center gap-2">
          <BarChart3 className="w-4 h-4 shrink-0" />
          <span>
            {currentLang === "en" ? "Vote recorded in your local kitchen notebook!" : currentLang === "de" ? "Stimme in Ihrem digitalen Küchenbuch registriert!" : "¡Voto registrado en tu cuaderno culinario local!"}
          </span>
        </div>
      )}
    </div>
  );
}
