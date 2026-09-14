import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  CheckCircle2,
  ShieldCheck,
  Award,
  RotateCcw,
  ArrowRight,
  Cookie,
  Vote,
} from "lucide-react";
import {
  setFactionCookie,
  getFactionCookie,
  FACTION_DATA,
} from "@/lib/factionCookie";

interface FactionAffinityQuizProps {
  lang?: string;
}

interface Question {
  id: string;
  title: { es: string; en: string; de: string };
  desc: { es: string; en: string; de: string };
  options: {
    label: { es: string; en: string; de: string };
    factionPoints: Record<string, number>;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: "onion",
    title: {
      es: "¿Cuál es tu postura innegociable respecto a la cebolla?",
      en: "What is your non-negotiable stance on onion?",
      de: "Wie stehst du zur Zwiebel in der Tortilla?",
    },
    desc: {
      es: "El gran cisma culinario español que divide familias y tertulias.",
      en: "The historic culinary debate dividing families and kitchens.",
      de: "Die große kulinarische Frage, die Spanien spaltet.",
    },
    options: [
      {
        label: {
          es: "Imprescindible: pochada lentamente para aportar jugosidad y dulzor natural.",
          en: "Essential: gently slow-poached for unctuous moisture and natural sugars.",
          de: "Unverzichtbar: langsam geschmort für Saftigkeit und Süße.",
        },
        factionPoints: { concebollistas: 4, "con-cosas": 1 },
      },
      {
        label: {
          es: "Prohibida: sólo patata frita, huevo de corral, AOVE y sal (Estilo Betanzos).",
          en: "Forbidden: strictly fried potato, fresh egg, EVOO, and salt (Betanzos style).",
          de: "Verboten: nur Kartoffel, Ei, Olivenöl und Salz (Betanzos-Stil).",
        },
        factionPoints: { puristas: 4 },
      },
      {
        label: {
          es: "Secundaria: lo importante es el pimiento o el ajo aromatizando el aceite.",
          en: "Secondary: the real highlight is garlic or sweet peppers in the oil.",
          de: "Nebensächlich: wichtig ist das Aroma von Knoblauch oder Paprika.",
        },
        factionPoints: { pimientistas: 2, ajistas: 2 },
      },
    ],
  },
  {
    id: "aromatics",
    title: {
      es: "¿Qué aromatizante adicional toleras o buscas en el sofrito?",
      en: "What aromatic addition do you look for in the skillet?",
      de: "Welche aromatische Zutat bevorzugst du in der Pfanne?",
    },
    desc: {
      es: "Los matices que distinguen las cocinas de taberna tradicional y campo.",
      en: "Nuances distinguishing traditional tavern and country cooking.",
      de: "Nuancen traditioneller Wirtshaus- und Landküche.",
    },
    options: [
      {
        label: {
          es: "Pimiento verde italiano o del piquillo confitado lentamente.",
          en: "Italian green or roasted piquillo peppers gently confit in olive oil.",
          de: "Geschmorte grüne Paprika oder Piquillo-Streifen.",
        },
        factionPoints: { pimientistas: 4 },
      },
      {
        label: {
          es: "Un diente de ajo frito en el aceite antes de añadir las patatas.",
          en: "A whole garlic clove browned in the oil to infuse the rustic base.",
          de: "Eine goldbraun angebratene Knoblauchzehe im Olivenöl.",
        },
        factionPoints: { ajistas: 4 },
      },
      {
        label: {
          es: "Absolutamente ninguno: nada debe competir con el sabor puro del huevo.",
          en: "None at all: nothing should rival the pure egg and potato essence.",
          de: "Absolut nichts: der reine Ei- und Kartoffelgeschmack steht im Zentrum.",
        },
        factionPoints: { puristas: 3, concebollistas: 1 },
      },
    ],
  },
  {
    id: "innovations",
    title: {
      es: "¿Cómo reaccionas ante ingredientes vanguardistas (queso, chorizo, setas)?",
      en: "How do you react to inventive ingredients (chorizo, cheese, mushrooms)?",
      de: "Wie stehst du zu kreativen Zutaten (Chorizo, Käse, Pilze)?",
    },
    desc: {
      es: "La frontera entre la herejía y la creatividad gastronómica contemporánea.",
      en: "The boundary between culinary heresy and modern culinary expression.",
      de: "Die Grenze zwischen kulinarischer Ketzerei und moderner Kreativität.",
    },
    options: [
      {
        label: {
          es: "¡Me encanta experimentar! Trufa, sobrasada o queso azul amplían horizontes.",
          en: "I love experimenting! Truffle, sobrasada, or blue cheese expand horizons.",
          de: "Ich liebe Experimente! Trüffel, Chorizo oder Käse bereichern das Gericht.",
        },
        factionPoints: { "con-cosas": 4 },
      },
      {
        label: {
          es: "Respeto a Ferran Adrià: llamémoslas 'Tortillas con...', pero no son la clásica.",
          en: "I follow Ferran Adrià: call them 'Tortillas with...', but not the canonical classic.",
          de: "Wie Ferran Adrià: 'Tortilla mit...', aber keine klassische Tortilla.",
        },
        factionPoints: { concebollistas: 2, puristas: 2 },
      },
      {
        label: {
          es: "Es un sacrilegio imperdonable digno de tribunal inquisitorial.",
          en: "An unforgivable sacrilege that offends the culinary pantheon.",
          de: "Ein unverzeihlicher Frevel gegen das spanische Nationalgericht.",
        },
        factionPoints: { puristas: 4 },
      },
    ],
  },
  {
    id: "safety_doneness",
    title: {
      es: "¿Cuál es tu punto de cuajado y compromiso con la seguridad?",
      en: "What is your texture preference and commitment to food safety?",
      de: "Welchen Gargrad und welche Sicherheitsregel bevorzugst du?",
    },
    desc: {
      es: "El equilibrio entre la melosidad cremosa y la pasteurización higiénica.",
      en: "Balancing creamy unctuousness with verified pasteurization standards.",
      de: "Die Balance zwischen Cremigkeit und hygienischer Sicherheit.",
    },
    options: [
      {
        label: {
          es: "Melosa y fluida, pasteurizada alcanzando 70°C for 2 minutes en el corazón térmico.",
          en: "Creamy and fluid, pasteurized reaching 70°C for 2 minutes at core.",
          de: "Cremig-flüssig, pasteurisiert bei 70°C für 2 Minuten im Kern.",
        },
        factionPoints: { concebollistas: 2, puristas: 2 },
      },
      {
        label: {
          es: "Muy jugosa estilo Betanzos (huevo líquido desbordante de yema campera).",
          en: "Ultra-runny Betanzos style (cascading golden egg yolk from pasture eggs).",
          de: "Extrem saftig nach Betanzos-Art (flüssiges Eigelb).",
        },
        factionPoints: { puristas: 3 },
      },
      {
        label: {
          es: "Bien cuajada tradicional, segura para transportar y consumir dentro de 4 hours.",
          en: "Firmly set and golden, perfect for picnics and consumed within 4 hours.",
          de: "Traditionell durchgegart, ideal zum Mitnehmen, Verzehr binnen 4 Stunden.",
        },
        factionPoints: { pimientistas: 2, ajistas: 2, "con-cosas": 1 },
      },
    ],
  },
];

export default function FactionAffinityQuiz({ lang = "es" }: FactionAffinityQuizProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [assignedFaction, setAssignedFaction] = useState<string | null>(null);
  const [cookieSaved, setCookieSaved] = useState<boolean>(false);

  useEffect(() => {
    const existing = getFactionCookie();
    if (existing && FACTION_DATA[existing]) {
      setAssignedFaction(existing);
      setCookieSaved(true);
    }

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ factionId: string | null }>;
      if (customEvent.detail?.factionId) {
        setAssignedFaction(customEvent.detail.factionId);
        setCookieSaved(true);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("tortilla-faction-changed", handleSync);
      return () => window.removeEventListener("tortilla-faction-changed", handleSync);
    }
  }, []);

  const handleSelectOption = (qId: string, optIndex: number) => {
    const updatedAnswers = { ...answers, [qId]: optIndex };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner faction
      const tallies: Record<string, number> = {
        concebollistas: 0,
        puristas: 0,
        pimientistas: 0,
        ajistas: 0,
        "con-cosas": 0,
      };

      for (const q of QUESTIONS) {
        const choiceIdx = updatedAnswers[q.id];
        if (choiceIdx !== undefined && q.options[choiceIdx]) {
          const points = q.options[choiceIdx].factionPoints;
          for (const [fac, p] of Object.entries(points)) {
            tallies[fac] = (tallies[fac] || 0) + p;
          }
        }
      }

      let topFaction = "concebollistas";
      let maxScore = -1;
      for (const [fac, score] of Object.entries(tallies)) {
        if (score > maxScore) {
          maxScore = score;
          topFaction = fac;
        }
      }

      setAssignedFaction(topFaction);
      setFactionCookie(topFaction);
      setCookieSaved(true);
    }
  };

  const handleDirectSelectFaction = (facId: string) => {
    setAssignedFaction(facId);
    setFactionCookie(facId);
    setCookieSaved(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setAssignedFaction(null);
    setCookieSaved(false);
  };

  const factionInfo = assignedFaction ? FACTION_DATA[assignedFaction] : null;

  return (
    <div className="space-y-8">
      {/* RESULT VIEW IF FINISHED OR ALREADY CHOSEN */}
      {assignedFaction && factionInfo ? (
        <div className="card-notebook p-6 sm:p-8 rounded-2xl bg-[#FFFBF0] border-2 border-[#FFB800] space-y-6 shadow-sm animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8E2D5] pb-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-[#FFB800] text-[#1C1917] shadow-2xs shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8D6E63]">
                  {currentLang === "en" ? "Affinity Determined" : currentLang === "de" ? "Deine Faktion" : "Tu Facción Culinaria Asignada"}
                </span>
                <h3 className="text-2xl font-serif-heading font-black text-[#292521]">
                  {factionInfo.name[currentLang] || factionInfo.name.es}
                </h3>
              </div>
            </div>

            {cookieSaved && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] text-xs font-bold shadow-2xs">
                <Cookie className="w-3.5 h-3.5" />
                <span>{currentLang === "en" ? "Saved in browser cookie" : currentLang === "de" ? "In Cookie gespeichert" : "Guardada en cookie"}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
              {currentLang === "en" ? "Doctrinal Dogma:" : currentLang === "de" ? "Offizielles Dogma:" : "Dogma Doctrinal:"}
            </span>
            <blockquote className="p-4 rounded-xl bg-white border border-[#E8E2D5] text-sm sm:text-base font-serif-heading italic text-[#292521] leading-relaxed">
              &ldquo;{factionInfo.dogma[currentLang] || factionInfo.dogma.es}&rdquo;
            </blockquote>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href={`/${currentLang}/facciones`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] text-white font-serif-heading font-bold text-xs transition-colors shadow-2xs"
            >
              <span>{currentLang === "en" ? "Explore All Factions & Dogmas" : currentLang === "de" ? "Alle Faktionen & Dogmen" : "Explorar Todas las Facciones"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-[#8D6E63] border border-[#E8E2D5] font-sans font-bold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{currentLang === "en" ? "Retake Affinity Test" : currentLang === "de" ? "Test wiederholen" : "Repetir Test"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE STEP QUESTION VIEW */
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63]">
              <span>
                {currentLang === "en" ? `Question ${currentStep + 1} of ${QUESTIONS.length}` : currentLang === "de" ? `Frage ${currentStep + 1} von ${QUESTIONS.length}` : `Pregunta ${currentStep + 1} de ${QUESTIONS.length}`}
              </span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-[#E8E2D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFB800] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="card-notebook p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E2D5] space-y-6 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#292521]">
                {QUESTIONS[currentStep].title[currentLang] || QUESTIONS[currentStep].title.es}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {QUESTIONS[currentStep].desc[currentLang] || QUESTIONS[currentStep].desc.es}
              </p>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].id, idx)}
                  className="w-full text-left p-4 rounded-xl border border-[#E8E2D5] bg-[#FAF6EE] hover:bg-[#FFF7EA] hover:border-[#FFB800] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-[#E8E2D5] text-xs font-bold text-[#8D6E63] flex items-center justify-center shrink-0 group-hover:border-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#292521] leading-relaxed">
                      {opt.label[currentLang] || opt.label.es}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUICK SELECTOR: DIRECT 1-CLICK ALLIANCE */}
      <section className="card-notebook p-6 rounded-2xl bg-[#FCF9F2] border border-[#E8E2D5] space-y-4">
        <div className="flex items-center gap-2">
          <Vote className="w-4 h-4 text-[#FFB800]" />
          <h4 className="font-serif-heading font-bold text-sm text-[#292521]">
            {currentLang === "en" ? "Or choose your allegiance directly (Sets Cookie):" : currentLang === "de" ? "Oder wähle deine Faktion direkt (Setzt Cookie):" : "O declara tu lealtad directamente (Guarda en Cookie):"}
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.values(FACTION_DATA).map((fac) => {
            const isChosen = assignedFaction === fac.id;
            return (
              <button
                key={fac.id}
                type="button"
                onClick={() => handleDirectSelectFaction(fac.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isChosen
                    ? "bg-[#FFB800] text-[#1C1917] border-[#FFB800] shadow-2xs font-extrabold ring-2 ring-[#FFB800]/40"
                    : "bg-white text-[#8D6E63] border-[#E8E2D5] hover:border-amber-300 hover:bg-[#FFF7EA]"
                }`}
              >
                <span>{fac.name[currentLang]?.split(" ")[0] || fac.name.es.split(" ")[0]}</span>
                {isChosen && <CheckCircle2 className="w-3.5 h-3.5 text-[#1C1917]" />}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
