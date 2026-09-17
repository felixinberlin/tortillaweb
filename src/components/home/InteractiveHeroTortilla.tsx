import React, { useState, useRef, useEffect, useId } from "react";
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  MapPin, 
  ChefHat
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveHeroTortillaProps {
  lang?: string;
  className?: string;
}

type IngredientId = "potato" | "egg" | "oil" | "onion" | "skillet" | "salt";

interface IngredientInfo {
  id: IngredientId;
  name: Record<string, string>;
  subtitle: Record<string, string>;
  temperature: string;
  badge: Record<string, string>;
  url: Record<string, string>;
  icon: string;
  accentColor: string;
  hotspot: { x: number; y: number };
}

const INGREDIENTS: Record<IngredientId, IngredientInfo> = {
  potato: {
    id: "potato",
    name: {
      es: "Patata Monalisa / Kennebec",
      en: "Potato (Kennebec / Monalisa)",
      de: "Kartoffel (Kennebec / Monalisa)",
    },
    subtitle: {
      es: "Confitado uniforme a 140°C en láminas panadera de 3 mm",
      en: "Poached gently at 140°C in uniform 3mm panadera slices",
      de: "Sanft confitiert bei 140°C in 3mm Panadera-Scheiben",
    },
    temperature: "140°C Confit",
    badge: {
      es: "Ingrediente Pilar",
      en: "Pillar Ingredient",
      de: "Hauptzutat",
    },
    url: {
      es: "/es/ingredientes/patata",
      en: "/en/ingredientes/patata",
      de: "/de/ingredientes/patata",
    },
    icon: "🥔",
    accentColor: "#FFB800",
    hotspot: { x: 210, y: 160 },
  },
  egg: {
    id: "egg",
    name: {
      es: "Huevo Campero Gallego",
      en: "Free-Range Egg (Molten Yolk)",
      de: "Freilandei (Flüssiges Eigelb)",
    },
    subtitle: {
      es: "Coagulación sedosa de ovotransferrina a 63°C y melosidad pura",
      en: "Silky ovotransferrin coagulation at 63°C for rich runniness",
      de: "Cremige Ovotransferrin-Stockung bei 63°C für perfekten Kern",
    },
    temperature: "63°C / 70°C",
    badge: {
      es: "Emulsión & Yema",
      en: "Emulsion & Yolk",
      de: "Emulsion & Dotter",
    },
    url: {
      es: "/es/ingredientes/huevo",
      en: "/en/ingredientes/huevo",
      de: "/de/ingredientes/huevo",
    },
    icon: "🥚",
    accentColor: "#FF8A00",
    hotspot: { x: 252, y: 192 },
  },
  oil: {
    id: "oil",
    name: {
      es: "Aceite de Oliva Virgen Extra (AOVE)",
      en: "Extra Virgin Olive Oil (EVOO)",
      de: "Natives Olivenöl Extra (AOVE)",
    },
    subtitle: {
      es: "Variedades Arbequina y Picual: baño térmico que no desnaturaliza",
      en: "Cold-pressed Arbequina & Picual: gentle thermal poaching bath",
      de: "Kaltgepresstes Arbequina & Picual: schonendes Pochierbad",
    },
    temperature: "130-140°C",
    badge: {
      es: "Medio Térmico",
      en: "Thermal Medium",
      de: "Thermisches Medium",
    },
    url: {
      es: "/es/ingredientes/aceite-de-oliva",
      en: "/en/ingredientes/aceite-de-oliva",
      de: "/de/ingredientes/aceite-de-oliva",
    },
    icon: "🫒",
    accentColor: "#84CC16",
    hotspot: { x: 330, y: 175 },
  },
  onion: {
    id: "onion",
    name: {
      es: "Cebolla Confitada (El Gran Debate)",
      en: "Caramelized Onion (The Great Debate)",
      de: "Geschmorte Zwiebel (Die Große Debatte)",
    },
    subtitle: {
      es: "Pochado lento a 110°C y caramelización natural de azúcares libres",
      en: "Slow 110°C poaching and natural sugar caramelization",
      de: "Langsames 110°C Schmoren & natürliche Maillard-Süße",
    },
    temperature: "110°C Pochado",
    badge: {
      es: "Debate Histórico",
      en: "Historic Debate",
      de: "Kulturerbe-Debatte",
    },
    url: {
      es: "/es/facciones/concebollistas",
      en: "/en/factions/concebollistas",
      de: "/de/factions/concebollistas",
    },
    icon: "🧅",
    accentColor: "#8D6E63",
    hotspot: { x: 280, y: 235 },
  },
  skillet: {
    id: "skillet",
    name: {
      es: "Sartén de Hierro Fundido & Mango",
      en: "Cast Iron Skillet & Grip",
      de: "Gusseisenpfanne & Wende-Griff",
    },
    subtitle: {
      es: "Retención térmica de 52 W/(m·K) y volteo seguro con inercia controlada",
      en: "52 W/(m·K) thermal conductivity & safe inertia-driven flipping",
      de: "52 W/(m·K) Wärmeleitfähigkeit & sicheres, kontrolliertes Wenden",
    },
    temperature: "Hierro Curado",
    badge: {
      es: "Menaje Maestro",
      en: "Master Gear",
      de: "Meister-Ausrüstung",
    },
    url: {
      es: "/es/utensilios",
      en: "/en/utensilios",
      de: "/de/utensilios",
    },
    icon: "🍳",
    accentColor: "#A8A29E",
    hotspot: { x: 485, y: 200 },
  },
  salt: {
    id: "salt",
    name: {
      es: "Flor de Sal Marina",
      en: "Flaky Sea Salt Crystals",
      de: "Pyramiden-Meersalzflocken",
    },
    subtitle: {
      es: "Equilibrio osmótico que abre el almidón y sazona la matriz del huevo",
      en: "Osmotic balance seasoning egg proteins without premature weeping",
      de: "Osmotische Würze zur Veredelung von Kartoffelstärke & Ei",
    },
    temperature: "0.8% - 1.0% Salinidad",
    badge: {
      es: "Ciencia Osmótica",
      en: "Osmotic Science",
      de: "Osmotische Balance",
    },
    url: {
      es: "/es/science",
      en: "/en/science",
      de: "/de/science",
    },
    icon: "🧂",
    accentColor: "#E2E8F0",
    hotspot: { x: 220, y: 185 },
  },
};

export default function InteractiveHeroTortilla({ lang = "es", className = "" }: InteractiveHeroTortillaProps) {
  const [activeIngredient, setActiveIngredient] = useState<IngredientId | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isSizzling, setIsSizzling] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const audioNoiseNodeRef = useRef<AudioNode | null>(null);
  const idPrefix = useId().replace(/:/g, "_");

  // Handle navigation to ingredient page
  const navigateTo = (url: string) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  // Web Audio Pan Sizzle Synthesizer (Zero external assets, safe, realistic brown noise filter)
  const toggleSizzleAudio = () => {
    if (typeof window === "undefined") return;

    if (audioEnabled) {
      if (audioGainRef.current && audioCtxRef.current) {
        audioGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      setAudioEnabled(false);
      setIsSizzling(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Generate brown/pink noise buffer for realistic oil sizzle
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter centered around 1800Hz with moderate Q
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1600, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Gentle gain node
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.setTargetAtTime(0.065, ctx.currentTime, 0.15); // soft kitchen volume

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start();

      audioGainRef.current = gainNode;
      audioNoiseNodeRef.current = whiteNoise;
      setAudioEnabled(true);
      setIsSizzling(true);
    } catch {
      // Audio autoplay policy fallback
      setAudioEnabled(false);
      setIsSizzling(!isSizzling);
    }
  };

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const currentIngredient = activeIngredient ? INGREDIENTS[activeIngredient] : null;

  return (
    <div 
      className={`relative w-full rounded-2xl bg-stone-950 p-2 sm:p-3 select-none flex flex-col items-center justify-center overflow-hidden ${className}`}
      onMouseLeave={() => setActiveIngredient(null)}
    >
      {/* Top Interactive Controls Bar */}
      <div className="w-full flex items-center justify-between gap-2 px-2 py-1.5 z-20 mb-1">
        {/* Hotspot Guide & Interaction Hint */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-medium text-stone-300">
          <span className="flex h-2 w-2 rounded-full bg-[#FFB800] animate-ping" />
          <span className="text-[#FFB800] font-bold">
            {lang === "de" ? "Interaktive Pfanne" : lang === "en" ? "Interactive Skillet" : "Sartén Interactiva"}
          </span>
          <span className="text-stone-500 hidden sm:inline">•</span>
          <span className="text-stone-400 text-[10px] sm:text-[11px] hidden sm:inline">
            {lang === "de" 
              ? "Klicke auf die Zutaten" 
              : lang === "en" 
              ? "Click any ingredient to explore" 
              : "Haz clic en cada ingrediente para explorar"}
          </span>
        </div>

        {/* Right action toggles: Chup-Chup sizzle & Hotspot pins */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="hero-toggle-hotspots"
            onClick={() => setShowHotspots(!showHotspots)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-semibold transition-all border ${
              showHotspots
                ? "bg-[#FFB800]/20 border-[#FFB800]/50 text-[#FFB800]"
                : "bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200"
            }`}
            title={lang === "de" ? "Punkte ein-/ausblenden" : lang === "en" ? "Toggle ingredient markers" : "Mostrar/ocultar puntos clave"}
          >
            <MapPin className="h-3 w-3" />
            <span className="hidden xs:inline">
              {lang === "de" ? "Markierungen" : lang === "en" ? "Markers" : "Puntos"}
            </span>
          </button>

          <button
            type="button"
            id="hero-toggle-sizzle"
            onClick={toggleSizzleAudio}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all border shadow-xs ${
              isSizzling
                ? "bg-[#FF8A00] border-[#FF8A00] text-stone-950 animate-pulse"
                : "bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-stone-100"
            }`}
            title={
              lang === "de"
                ? "Bratgeräusch & Simmer-Effekt (Chup-Chup)"
                : lang === "en"
                ? "Pan sizzle & simmer steam (Chup-Chup)"
                : "Efecto Chup-Chup y chisporroteo térmico"
            }
          >
            <Flame className={`h-3 w-3 ${isSizzling ? "fill-stone-950" : "text-[#FF8A00]"}`} />
            <span>Chup-Chup</span>
            {audioEnabled ? <Volume2 className="h-3 w-3 ml-0.5" /> : <VolumeX className="h-3 w-3 ml-0.5 opacity-60" />}
          </button>
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="relative w-full aspect-[4/3] max-w-[580px] flex items-center justify-center">
        <svg
          id="hero-interactive-tortilla-svg"
          viewBox="0 0 600 400"
          className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-300"
          role="img"
          aria-label={
            lang === "de"
              ? "Interaktive spanische Tortilla in gusseiserner Pfanne: Kartoffeln, Ei, Olivenöl und Zwiebeln"
              : lang === "en"
              ? "Interactive Spanish Tortilla in cast iron skillet: potatoes, egg, olive oil, and onion"
              : "Tortilla de patatas interactiva en sartén de hierro: patata, huevo, AOVE y cebolla"
          }
        >
          <defs>
            {/* Organic Steam Animation */}
            <style>{`
              @keyframes steamDrift1 {
                0% { transform: translate(0, 0) scale(0.95); opacity: 0.12; }
                45% { transform: translate(-8px, -24px) scale(1.2); opacity: 0.55; }
                100% { transform: translate(6px, -48px) scale(1.4); opacity: 0; }
              }
              @keyframes steamDrift2 {
                0% { transform: translate(0, 0) scale(0.9); opacity: 0.15; }
                50% { transform: translate(10px, -28px) scale(1.25); opacity: 0.65; }
                100% { transform: translate(-6px, -55px) scale(1.5); opacity: 0; }
              }
              @keyframes steamDrift3 {
                0% { transform: translate(0, 0) scale(0.92); opacity: 0.1; }
                40% { transform: translate(-10px, -22px) scale(1.18); opacity: 0.5; }
                100% { transform: translate(8px, -45px) scale(1.38); opacity: 0; }
              }
              @keyframes yolkGlowPulse {
                0% { transform: scale(0.98); filter: drop-shadow(0 0 4px #FFB800); }
                50% { transform: scale(1.03); filter: drop-shadow(0 0 12px #FF8A00); }
                100% { transform: scale(0.98); filter: drop-shadow(0 0 4px #FFB800); }
              }
              @keyframes oilSparkleAnim {
                0%, 100% { opacity: 0.7; transform: scale(0.95); }
                50% { opacity: 1; transform: scale(1.25); filter: drop-shadow(0 0 3px #84CC16); }
              }
              @keyframes simmerBubble {
                0% { r: 1.5; opacity: 0.8; }
                50% { r: 3.5; opacity: 1; }
                100% { r: 1.5; opacity: 0.8; }
              }
              .steam-waft-1 { animation: steamDrift1 4s ease-in-out infinite; transform-origin: 225px 110px; }
              .steam-waft-2 { animation: steamDrift2 4.8s ease-in-out infinite 0.6s; transform-origin: 265px 105px; }
              .steam-waft-3 { animation: steamDrift3 4.2s ease-in-out infinite 1.3s; transform-origin: 300px 115px; }
              .yolk-alive { animation: yolkGlowPulse 3.2s ease-in-out infinite; transform-origin: 252px 192px; }
              .oil-twinkle-1 { animation: oilSparkleAnim 2.8s ease-in-out infinite alternate; }
              .oil-twinkle-2 { animation: oilSparkleAnim 3.4s ease-in-out infinite alternate 0.9s; }
              .bubble-pulse { animation: simmerBubble 1.4s ease-in-out infinite; }
            `}</style>

            {/* Skillet Shadow & Metallic Finishes */}
            <filter id={`${idPrefix}_panShadow`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#0A0500" floodOpacity="0.75" />
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
            </filter>

            <filter id={`${idPrefix}_glowActive`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id={`${idPrefix}_ironFlange`} cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#44403C" />
              <stop offset="45%" stopColor="#292524" />
              <stop offset="85%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#0C0A09" />
            </radialGradient>

            <linearGradient id={`${idPrefix}_ironRimBevel`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8D847E" />
              <stop offset="25%" stopColor="#44403C" />
              <stop offset="70%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>

            <linearGradient id={`${idPrefix}_woodHandle`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="35%" stopColor="#78350F" />
              <stop offset="70%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#1C0A00" />
            </linearGradient>

            <radialGradient id={`${idPrefix}_tortillaBase`} cx="44%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="42%" stopColor="#FACC15" />
              <stop offset="78%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#85370A" />
            </radialGradient>

            <radialGradient id={`${idPrefix}_toastedSpot`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0.88" />
              <stop offset="60%" stopColor="#92400E" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
            </radialGradient>

            <radialGradient id={`${idPrefix}_moltenCore`} cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="22%" stopColor="#FFC800" />
              <stop offset="65%" stopColor="#FF8A00" />
              <stop offset="92%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#9A3412" />
            </radialGradient>
          </defs>

          {/* Wooden Kitchen Prep Table Surface */}
          <rect width="600" height="400" fill="#181513" rx="16" />
          <g filter={`url(#${idPrefix}_panShadow)`}>
            <rect x="20" y="20" width="560" height="360" rx="18" fill="#24140D" stroke="#3D1D10" strokeWidth="2.5" />
            {/* Wooden Table Grain Planks */}
            <path
              d="M 60 20 L 60 380 M 140 20 L 140 380 M 220 20 L 220 380 M 300 20 L 300 380 M 380 20 L 380 380 M 460 20 L 460 380 M 540 20 L 540 380"
              stroke="#3D1D10"
              strokeWidth="1.5"
              opacity="0.45"
            />
          </g>

          {/* Sizzling Thermal Heat Under-Glow when Chup-Chup active */}
          {isSizzling && (
            <circle
              cx="260"
              cy="200"
              r="156"
              fill="none"
              stroke="#FF8A00"
              strokeWidth="6"
              opacity="0.4"
              className="animate-pulse"
              filter={`url(#${idPrefix}_glowActive)`}
            />
          )}

          {/* ========================================================= */}
          {/* 1. CAST IRON SKILLET & WOODEN HANDLE (INTERACTIVE) */}
          {/* ========================================================= */}
          <g
            id="hero-skillet-group"
            className="cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label="Sartén de hierro fundido. Clic para ver guía de sartenes."
            onClick={() => navigateTo(INGREDIENTS.skillet.url[lang] || INGREDIENTS.skillet.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.skillet.url[lang] || INGREDIENTS.skillet.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("skillet")}
            onFocus={() => setActiveIngredient("skillet")}
          >
            {/* Cast Iron Handle Attachment Socket */}
            <g filter={`url(#${idPrefix}_panShadow)`}>
              <path
                d="M 370 188 L 430 184 L 430 216 L 370 212 Z"
                fill={activeIngredient === "skillet" ? "#292524" : "#1C1917"}
                stroke={activeIngredient === "skillet" ? "#FFB800" : "#44403C"}
                strokeWidth={activeIngredient === "skillet" ? "2.5" : "1.5"}
              />
              {/* Heavy Duty Rivets */}
              <circle cx="395" cy="194" r="3.2" fill="#78716C" stroke="#292524" strokeWidth="1" />
              <circle cx="395" cy="206" r="3.2" fill="#78716C" stroke="#292524" strokeWidth="1" />

              {/* Wooden Ergonomic Handle with Heat Shield */}
              <path
                d="M 425 182 L 558 172 C 572 172 578 185 578 200 C 578 215 572 228 558 228 L 425 218 Z"
                fill={`url(#${idPrefix}_woodHandle)`}
                stroke={activeIngredient === "skillet" ? "#FFB800" : "#1C0A00"}
                strokeWidth={activeIngredient === "skillet" ? "2.5" : "1.5"}
              />
              {/* Wood Grain Highlights */}
              <path d="M 435 186 C 475 180 525 180 555 184" stroke="#D97706" strokeWidth="1.2" fill="none" opacity="0.75" />
              <path d="M 440 214 C 480 218 520 216 550 212" stroke="#451A03" strokeWidth="1.2" fill="none" opacity="0.8" />
              {/* Brass Hanging Loop */}
              <circle cx="550" cy="200" r="7.5" fill="#0C0A09" stroke="#A8A29E" strokeWidth="1.5" />
              <circle cx="550" cy="200" r="4.5" fill="#24140D" />
            </g>

            {/* Outer Cast Iron Body & Raised Rim */}
            <g filter={`url(#${idPrefix}_panShadow)`}>
              <circle
                cx="260"
                cy="200"
                r="148"
                fill={`url(#${idPrefix}_ironRimBevel)`}
                stroke={activeIngredient === "skillet" ? "#FFB800" : "#0C0A09"}
                strokeWidth={activeIngredient === "skillet" ? "3" : "2"}
              />
              <circle cx="260" cy="200" r="142" fill={`url(#${idPrefix}_ironFlange)`} />
              <circle cx="260" cy="200" r="132" fill="#0C0A09" />
              <circle cx="260" cy="200" r="128" fill="#1C1917" stroke="#44403C" strokeWidth="1" />
            </g>
          </g>

          {/* ========================================================= */}
          {/* TORTILLA BODY: GOLDEN ROASTED CRUST & SURFACE */}
          {/* ========================================================= */}
          <g id="tortilla-crust-foundation">
            {/* Main Round Tortilla Body */}
            <path
              d="M 260 74 C 330 73 386 130 386 200 C 386 270 330 326 260 326 C 190 326 134 270 134 200 C 134 130 190 75 260 74 Z"
              fill={`url(#${idPrefix}_tortillaBase)`}
            />

            {/* Authentic Toasting & Caramelization Spots */}
            <ellipse cx="225" cy="165" rx="55" ry="36" fill={`url(#${idPrefix}_toastedSpot)`} transform="rotate(-15 225 165)" />
            <ellipse cx="305" cy="235" rx="58" ry="38" fill={`url(#${idPrefix}_toastedSpot)`} transform="rotate(25 305 235)" />
            <ellipse cx="205" cy="245" rx="42" ry="26" fill={`url(#${idPrefix}_toastedSpot)`} transform="rotate(-30 205 245)" />
            <ellipse cx="310" cy="150" rx="38" ry="24" fill={`url(#${idPrefix}_toastedSpot)`} transform="rotate(10 310 150)" />

            {/* Skillet Edge Sear Seam */}
            <path
              d="M 142 170 C 135 210 148 265 190 300 C 235 330 295 325 340 295 C 380 260 388 200 375 160"
              stroke="#78350F"
              strokeWidth="5"
              fill="none"
              opacity="0.65"
              strokeLinecap="round"
            />
          </g>

          {/* ========================================================= */}
          {/* 2. POTATO SLICES (PANADERA CUT) - INTERACTIVE */}
          {/* ========================================================= */}
          <g
            id="hero-potato-group"
            className="cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label="Patatas confitadas en láminas panadera. Clic para ver monografía de la patata."
            onClick={() => navigateTo(INGREDIENTS.potato.url[lang] || INGREDIENTS.potato.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.potato.url[lang] || INGREDIENTS.potato.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("potato")}
            onFocus={() => setActiveIngredient("potato")}
          >
            {/* Slice 1: Upper Left (Monalisa Golden) */}
            <g filter={activeIngredient === "potato" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <ellipse
                cx="210"
                cy="160"
                rx="33"
                ry="21"
                fill="#FEF08A"
                stroke={activeIngredient === "potato" ? "#FFB800" : "#D97706"}
                strokeWidth={activeIngredient === "potato" ? "3" : "2"}
                transform="rotate(-20 210 160)"
              />
              <ellipse cx="210" cy="160" rx="25" ry="15" fill="#FFFBEB" opacity="0.85" transform="rotate(-20 210 160)" />
              <ellipse cx="198" cy="155" rx="9" ry="4.5" fill="#B45309" opacity="0.6" />
            </g>

            {/* Slice 2: Upper Right (Kennebec Starch Rich) */}
            <g filter={activeIngredient === "potato" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <ellipse
                cx="295"
                cy="152"
                rx="32"
                ry="19"
                fill="#FDE047"
                stroke={activeIngredient === "potato" ? "#FFB800" : "#D97706"}
                strokeWidth={activeIngredient === "potato" ? "3" : "2"}
                transform="rotate(15 295 152)"
              />
              <ellipse cx="295" cy="152" rx="23" ry="13" fill="#FFFBEB" opacity="0.85" transform="rotate(15 295 152)" />
              <ellipse cx="308" cy="148" rx="8" ry="4" fill="#B45309" opacity="0.6" />
            </g>

            {/* Slice 3: Lower Left */}
            <g filter={activeIngredient === "potato" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <ellipse
                cx="192"
                cy="218"
                rx="35"
                ry="22"
                fill="#FEF08A"
                stroke={activeIngredient === "potato" ? "#FFB800" : "#CA8A04"}
                strokeWidth={activeIngredient === "potato" ? "3" : "2"}
                transform="rotate(35 192 218)"
              />
              <ellipse cx="192" cy="218" rx="26" ry="15" fill="#FFFBEB" opacity="0.85" transform="rotate(35 192 218)" />
            </g>

            {/* Slice 4: Lower Right */}
            <g filter={activeIngredient === "potato" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <ellipse
                cx="312"
                cy="212"
                rx="31"
                ry="20"
                fill="#FEF08A"
                stroke={activeIngredient === "potato" ? "#FFB800" : "#D97706"}
                strokeWidth={activeIngredient === "potato" ? "3" : "2"}
                transform="rotate(-10 312 212)"
              />
              <ellipse cx="312" cy="212" rx="22" ry="13" fill="#FFFBEB" opacity="0.85" transform="rotate(-10 312 212)" />
            </g>

            {/* Slice 5: Bottom Center */}
            <g filter={activeIngredient === "potato" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <ellipse
                cx="252"
                cy="252"
                rx="34"
                ry="20"
                fill="#FDE047"
                stroke={activeIngredient === "potato" ? "#FFB800" : "#CA8A04"}
                strokeWidth={activeIngredient === "potato" ? "3" : "2"}
                transform="rotate(5 252 252)"
              />
              <ellipse cx="252" cy="252" rx="25" ry="14" fill="#FFFBEB" opacity="0.85" transform="rotate(5 252 252)" />
            </g>
          </g>

          {/* ========================================================= */}
          {/* 3. CARAMELIZED ONION RIBBONS (INTERACTIVE) */}
          {/* ========================================================= */}
          <g
            id="hero-onion-group"
            className="cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label="Cebolla confitada a fuego lento. Clic para ver el debate concebollista."
            onClick={() => navigateTo(INGREDIENTS.onion.url[lang] || INGREDIENTS.onion.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.onion.url[lang] || INGREDIENTS.onion.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("onion")}
            onFocus={() => setActiveIngredient("onion")}
          >
            {/* Strand 1: Curling over bottom potatoes */}
            <path
              d="M 225 240 Q 245 220 270 235 Q 290 248 310 230"
              fill="none"
              stroke={activeIngredient === "onion" ? "#FFB800" : "#8D6E63"}
              strokeWidth={activeIngredient === "onion" ? "4.5" : "3"}
              strokeLinecap="round"
              opacity="0.9"
              filter={activeIngredient === "onion" ? `url(#${idPrefix}_glowActive)` : undefined}
            />
            {/* Strand 2: Fine golden caramel thread */}
            <path
              d="M 230 241 Q 250 223 272 236 Q 290 247 308 232"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Strand 3: Upper diagonal ribbon */}
            <path
              d="M 180 185 Q 200 195 218 180 Q 235 170 245 175"
              fill="none"
              stroke={activeIngredient === "onion" ? "#FFB800" : "#8D6E63"}
              strokeWidth={activeIngredient === "onion" ? "4" : "2.8"}
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 285 170 Q 305 185 325 180"
              fill="none"
              stroke={activeIngredient === "onion" ? "#FFB800" : "#92400E"}
              strokeWidth={activeIngredient === "onion" ? "3.8" : "2.6"}
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* ========================================================= */}
          {/* 4. MOLTEN RUNNY EGG YOLK CORE (INTERACTIVE) */}
          {/* ========================================================= */}
          <g
            id="hero-egg-group"
            className="cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label="Yema melosa y cuajado a 63°C. Clic para ver monografía del huevo."
            onClick={() => navigateTo(INGREDIENTS.egg.url[lang] || INGREDIENTS.egg.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.egg.url[lang] || INGREDIENTS.egg.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("egg")}
            onFocus={() => setActiveIngredient("egg")}
          >
            {/* Outer Molten Yolk Halo */}
            <ellipse
              cx="252"
              cy="192"
              rx="38"
              ry="30"
              fill={`url(#${idPrefix}_moltenCore)`}
              className={activeIngredient === "egg" || isSizzling ? "yolk-alive" : ""}
              stroke={activeIngredient === "egg" ? "#FFFFFF" : "#FF8A00"}
              strokeWidth={activeIngredient === "egg" ? "2.5" : "1"}
              filter={activeIngredient === "egg" ? `url(#${idPrefix}_glowActive)` : undefined}
            />

            {/* Core Golden Yolk Custard */}
            <ellipse cx="252" cy="192" rx="26" ry="20" fill="#FEF08A" opacity="0.88" />

            {/* Specular Highlight Gloss (Liquid Reflection) */}
            <path
              d="M 238 184 C 248 177 262 178 270 187"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity={activeIngredient === "egg" ? "1" : "0.85"}
            />
          </g>

          {/* ========================================================= */}
          {/* 5. EXTRA VIRGIN OLIVE OIL GLISTEN (INTERACTIVE) */}
          {/* ========================================================= */}
          <g
            id="hero-oil-group"
            className="cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label="Aceite de oliva virgen extra. Clic para ver monografía del AOVE."
            onClick={() => navigateTo(INGREDIENTS.oil.url[lang] || INGREDIENTS.oil.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.oil.url[lang] || INGREDIENTS.oil.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("oil")}
            onFocus={() => setActiveIngredient("oil")}
          >
            {/* Oil Droplet Cluster 1 (Left Emerald Gold) */}
            <g className="oil-twinkle-1" filter={activeIngredient === "oil" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <circle
                cx="180"
                cy="165"
                r={activeIngredient === "oil" ? "5.5" : "4"}
                fill="#84CC16"
                opacity="0.95"
                stroke={activeIngredient === "oil" ? "#FFFFFF" : "none"}
                strokeWidth="1.5"
              />
              <circle cx="178.5" cy="163.5" r="1.8" fill="#FFFFFF" />
            </g>

            {/* Oil Droplet Cluster 2 (Right Golden) */}
            <g className="oil-twinkle-2" filter={activeIngredient === "oil" ? `url(#${idPrefix}_glowActive)` : undefined}>
              <circle
                cx="330"
                cy="175"
                r={activeIngredient === "oil" ? "6" : "4.5"}
                fill="#EAB308"
                opacity="0.95"
                stroke={activeIngredient === "oil" ? "#FFFFFF" : "none"}
                strokeWidth="1.5"
              />
              <circle cx="328.5" cy="173.5" r="1.8" fill="#FFFFFF" />
            </g>

            {/* Additional Oil Glistening Spheres */}
            <g className="oil-twinkle-1">
              <circle cx="265" cy="255" r="3.5" fill="#84CC16" opacity="0.9" />
              <circle cx="264" cy="254" r="1.2" fill="#FFFFFF" />
              <circle cx="218" cy="130" r="3.8" fill="#EAB308" opacity="0.9" />
              <circle cx="312" cy="245" r="3.2" fill="#84CC16" opacity="0.9" />
            </g>
          </g>

          {/* ========================================================= */}
          {/* 6. SEA SALT FLAKES (INTERACTIVE) */}
          {/* ========================================================= */}
          <g
            id="hero-salt-group"
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Flor de sal marina. Clic para explorar la ciencia culinaria."
            onClick={() => navigateTo(INGREDIENTS.salt.url[lang] || INGREDIENTS.salt.url.es)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo(INGREDIENTS.salt.url[lang] || INGREDIENTS.salt.url.es);
              }
            }}
            onMouseEnter={() => setActiveIngredient("salt")}
            onFocus={() => setActiveIngredient("salt")}
          >
            {/* Pyramid Flake 1 */}
            <polygon
              points="215,185 218,181 222,185 218,189"
              fill="#FFFFFF"
              opacity={activeIngredient === "salt" ? "1" : "0.95"}
              stroke={activeIngredient === "salt" ? "#38BDF8" : "none"}
              strokeWidth="1.5"
              filter={activeIngredient === "salt" ? `url(#${idPrefix}_glowActive)` : undefined}
            />
            {/* Pyramid Flake 2 */}
            <polygon
              points="295,160 299,156 303,160 299,164"
              fill="#FFFFFF"
              opacity={activeIngredient === "salt" ? "1" : "0.95"}
              stroke={activeIngredient === "salt" ? "#38BDF8" : "none"}
              strokeWidth="1.5"
            />
            {/* Pyramid Flake 3 */}
            <polygon
              points="275,235 279,231 283,235 279,239"
              fill="#FFFFFF"
              opacity={activeIngredient === "salt" ? "1" : "0.95"}
            />
            {/* Pyramid Flake 4 */}
            <polygon
              points="230,225 233,222 236,225 233,228"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* ========================================================= */}
          {/* SIZZLE OIL BUBBLES (Chup-Chup active mode) */}
          {/* ========================================================= */}
          {isSizzling && (
            <g id="simmer-bubbles">
              <circle cx="145" cy="180" r="2.5" fill="#FEF08A" className="bubble-pulse" />
              <circle cx="160" cy="260" r="3" fill="#FFC800" className="bubble-pulse" />
              <circle cx="340" cy="270" r="2.8" fill="#FEF08A" className="bubble-pulse" />
              <circle cx="365" cy="170" r="2.5" fill="#FFC800" className="bubble-pulse" />
              <circle cx="280" cy="310" r="3" fill="#FEF08A" className="bubble-pulse" />
            </g>
          )}

          {/* ========================================================= */}
          {/* WARM ORGANIC STEAM WAFTS */}
          {/* ========================================================= */}
          <g id="steam-wisps" opacity={isSizzling ? "0.9" : "0.45"}>
            <path
              className="steam-waft-1"
              d="M 225 110 Q 215 85 232 65 Q 245 45 228 25"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
            <path
              className="steam-waft-2"
              d="M 265 105 Q 285 80 268 55 Q 255 35 272 15"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              className="steam-waft-3"
              d="M 300 115 Q 315 90 298 70 Q 285 50 302 30"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
          </g>

          {/* ========================================================= */}
          {/* INTERACTIVE HOTSPOT PINS (Toggleable or Hover Guidance) */}
          {/* ========================================================= */}
          {showHotspots && (
            <g id="interactive-hotspots" className="pointer-events-none">
              {Object.values(INGREDIENTS).map((item) => {
                const isActive = activeIngredient === item.id;
                return (
                  <g key={item.id} transform={`translate(${item.hotspot.x}, ${item.hotspot.y})`}>
                    {/* Pulsing ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? "16" : "11"}
                      fill={item.accentColor}
                      fillOpacity={isActive ? "0.45" : "0.2"}
                      stroke={item.accentColor}
                      strokeWidth={isActive ? "2" : "1"}
                      className="transition-all duration-300"
                    />
                    {/* Inner solid marker dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? "5" : "3.5"}
                      fill={item.accentColor}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* ========================================================= */}
      {/* QUICK INGREDIENT CHIP SELECTORS */}
      {/* ========================================================= */}
      <div className="w-full flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-1 py-1.5 z-20 mt-1">
        {Object.values(INGREDIENTS).map((item) => {
          const isActive = activeIngredient === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.url[lang] || item.url.es)}
              onMouseEnter={() => setActiveIngredient(item.id)}
              onMouseLeave={() => setActiveIngredient(null)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-[#FFB800] border-[#FFB800] text-stone-950 font-bold scale-105 shadow-sm"
                  : "bg-stone-900/90 hover:bg-stone-800 border-stone-700 text-stone-300 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>
                {item.id === "potato"
                  ? (lang === "de" ? "Kartoffel" : lang === "en" ? "Potato" : "Patata")
                  : item.id === "egg"
                  ? (lang === "de" ? "Ei" : lang === "en" ? "Egg" : "Huevo")
                  : item.id === "oil"
                  ? (lang === "de" ? "AOVE" : lang === "en" ? "EVOO" : "AOVE")
                  : item.id === "onion"
                  ? (lang === "de" ? "Zwiebel" : lang === "en" ? "Onion" : "Cebolla")
                  : item.id === "skillet"
                  ? (lang === "de" ? "Pfanne" : lang === "en" ? "Skillet" : "Sartén")
                  : (lang === "de" ? "Salz" : lang === "en" ? "Salt" : "Sal")}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* KITCHEN NOTEBOOK LIVE INSPECTOR HUD */}
      {/* ========================================================= */}
      <div className="w-full mt-1.5 z-20">
        <AnimatePresence mode="wait">
          {currentIngredient ? (
            <motion.div
              key={currentIngredient.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigateTo(currentIngredient.url[lang] || currentIngredient.url.es)}
              className="cursor-pointer group p-2.5 sm:p-3 rounded-xl bg-card dark:bg-[#1C1917] border border-[#FFB800]/50 shadow-md flex items-center justify-between gap-3 hover:border-[#FFB800] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl sm:text-2xl p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 shrink-0">
                  {currentIngredient.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-[#FFB800] transition-colors">
                      {currentIngredient.name[lang] || currentIngredient.name.es}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] font-mono font-semibold shrink-0">
                      {currentIngredient.temperature}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {currentIngredient.subtitle[lang] || currentIngredient.subtitle.es}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] shrink-0 group-hover:translate-x-0.5 transition-transform">
                <span className="hidden sm:inline">
                  {lang === "de" ? "Erkunden" : lang === "en" ? "Explore" : "Explorar"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default-hud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-2.5 sm:p-3 rounded-xl bg-card/90 dark:bg-[#1C1917]/90 border border-border shadow-xs flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0 text-muted-foreground">
                <ChefHat className="h-4 w-4 text-[#FFB800] shrink-0" />
                <span className="text-xs font-medium truncate">
                  {lang === "de"
                    ? "Tippe auf die Pfanne, um Kartoffel, Ei, Öl oder Zwiebel zu erkunden"
                    : lang === "en"
                    ? "Hover or tap anywhere on the skillet to inspect culinary science"
                    : "Pasa el cursor o toca la patata, huevo, aceite o sartén para inspeccionar su ciencia"}
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-md bg-[#FFB800]/15 text-[#8D6E63] dark:text-[#FFB800] text-[10px] font-mono font-bold shrink-0">
                70°C / 2 min
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
