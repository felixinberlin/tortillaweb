import React, { useState, useMemo } from "react";
import {
  RotateCw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ChefHat,
  Thermometer,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { generateTortillaSvg, type PotatoCut, type TortillaDoneness } from "@/domain/svg";
import LocalizedLink from "@/components/navigation/LocalizedLink";

interface CozyKitchenLabProps {
  lang?: string;
}

type OnionState = "with_onion" | "without_onion" | "caramelized";

interface FlipVerdict {
  title: string;
  badge: string;
  desc: string;
  score: number;
}

const FLIP_VERDICTS: Record<string, FlipVerdict[]> = {
  es: [
    {
      title: "¡Vuelco Ninja de Abuela!",
      badge: "Maestría 10/10",
      desc: "Movimiento de muñeca parabólico perfecto. El plato llano no titubeó ni un milímetro. Ni una gota de yema en la vitrocerámica.",
      score: 100,
    },
    {
      title: "¡Inercia Centrífuga Betanzos!",
      badge: "Temerario 9.5/10",
      desc: "La yema líquida intentó una fuga por el flanco izquierdo, pero tu aceleración angular la devolvió al centro exacto de la sartén.",
      score: 95,
    },
    {
      title: "El Amago con Sudor Frío",
      badge: "Superado 8/10",
      desc: "Dudaste 0.3 segundos. La tortilla olió tu miedo. Cayó ligeramente descentrada, pero con la espumadera la has dejado como de concurso.",
      score: 82,
    },
    {
      title: "Giro Rotundo de Taberna",
      badge: "Clásico 9/10",
      desc: "Sellado homogéneo, sonido crujiente al golpear suavemente el fondo. La taberna entera pide una ronda de cañas en tu honor.",
      score: 90,
    },
  ],
  en: [
    {
      title: "Grandma's Ninja Skillet Flip!",
      badge: "Mastery 10/10",
      desc: "Flawless parabolic wrist motion. The ceramic plate never wavered. Not a single drop of golden yolk was lost to the stovetop.",
      score: 100,
    },
    {
      title: "Betanzos Centrifugal Maneuver!",
      badge: "Daring 9.5/10",
      desc: "The liquid runny yolk attempted an escape on the left flank, but your instantaneous angular velocity pulled it right back home.",
      score: 95,
    },
    {
      title: "The Hesitant Heart-Throb",
      badge: "Survived 8/10",
      desc: "You paused for 0.3s. The tortilla smelled your fear. It landed slightly off-center, but a quick spatula nudge hid all evidence.",
      score: 82,
    },
    {
      title: "Classic Madrid Tavern Rotation",
      badge: "Authentic 9/10",
      desc: "Solid, crisp, reassuring sizzle. A triumphant aroma fills the kitchen. The entire bar demands a round of cider in your honor.",
      score: 90,
    },
  ],
  de: [
    {
      title: "Omas meisterhafter Pfannen-Wender!",
      badge: "Perfektion 10/10",
      desc: "Perfekte parabolische Handgelenksbewegung. Kein einziger Tropfen flüssiges Eigelb ging verloren. Reine spanische Magie.",
      score: 100,
    },
    {
      title: "Zentrifugaler Betanzos-Trick!",
      badge: "Mutig 9.5/10",
      desc: "Das flüssige Eigelb wollte fliehen, aber deine Winkelbeschleunigung hat die Tortilla genau zentriert gerettet.",
      score: 95,
    },
    {
      title: "Das Zögern der Angst",
      badge: "Überstanden 8/10",
      desc: "Du hast 0.3 Sekunden gezögert. Die Tortilla roch deine Unsicherheit. Leicht schief gelandet, aber meisterhaft korrigiert.",
      score: 82,
    },
    {
      title: "Klassischer Tavernen-Schwung",
      badge: "Authentisch 9/10",
      desc: "Knackig, heiß und herrlich duftend. Genau so, wie man es in den besten Pintxo-Bars Nordspaniens serviert bekommt.",
      score: 90,
    },
  ],
};

export default function CozyKitchenLab({ lang = "es" }: CozyKitchenLabProps) {
  const safeLang = lang === "es" || lang === "en" || lang === "de" ? lang : "es";

  // Cooking state
  const [doneness, setDoneness] = useState<TortillaDoneness>("melosa");
  const [onionState, setOnionState] = useState<OnionState>("caramelized");
  const [potatoCut, setPotatoCut] = useState<PotatoCut>("panadera");
  const [temperatureC, setTemperatureC] = useState<number>(70);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipCount, setFlipCount] = useState<number>(0);
  const [currentVerdict, setCurrentVerdict] = useState<FlipVerdict | null>(null);

  // Internationalized labels
  const text = useMemo(() => {
    if (safeLang === "en") {
      return {
        badge: "Cozy Kitchen Lab & Physics Simulator",
        title: "The Live Skillet & Flip Simulator",
        subtitle:
          "Test your wrist reflexes with the legendary skillet flip, dial in the thermal safety threshold, and settle the onion diplomacy debate—all rendered in 100% lightweight vector SVG.",
        flipButton: "🍳 Flip the Skillet! (Dar la Vuelta)",
        flipping: "🔄 Mid-Air Rotation in Progress...",
        donenessTitle: "Yolk Doneness & Texture",
        onionTitle: "Onion Treaty Diplomacy",
        potatoTitle: "Potato Cut Geometry",
        tempTitle: "Core Thermal Safety Sensor",
        safetyGold: "Gold Standard: 70°C for 2 minutes",
        safetyCaution: "Caution: 63°C for 20 seconds",
        ambientLimit: "Room Temp Limit: 4 hours max",
        exploreScience: "Read 70°C Science Guide",
        exploreFlipGuide: "Physics of the Skillet Flip",
        exploreBuilder: "Tortilla DNA Calculator",
        donenessLabels: {
          liquida: "Betanzos Runny (Lava)",
          melosa: "Custardy Melosa (Gold Standard)",
          cuajada: "Firm & Traditional",
          muy_cuajada: "Over-Set Brick",
        },
        onionLabels: {
          with_onion: "Concebollista (Gentle Sauté)",
          without_onion: "Sincebollista (Purist Mineral)",
          caramelized: "Slow-Confit Caramelized",
        },
        potatoLabels: {
          panadera: "Panadera (Thin Slices)",
          chascada: "Chascada (Broken Edges)",
          dados: "Rustic Cubes",
        },
      };
    }
    if (safeLang === "de") {
      return {
        badge: "Gemütliches Küchen-Labor & Wende-Simulator",
        title: "Der Pfannen-Simulator & Yolk-Alchemie",
        subtitle:
          "Teste deine Handgelenks-Reflexe beim legendären Wenden der Tortilla, regle die Thermosicherheit und löse die ewige Zwiebel-Frage – 100% reine, federleichte Vektorgrafik.",
        flipButton: "🍳 Pfanne Wenden! (Dar la Vuelta)",
        flipping: "🔄 3D-Flugrotation läuft...",
        donenessTitle: "Gargrad & Textur des Eigelbs",
        onionTitle: "Zwiebel-Diplomatie",
        potatoTitle: "Kartoffelschnitt-Geometrie",
        tempTitle: "Kerntemperatur & Lebensmittelsicherheit",
        safetyGold: "Gold-Standard: 70°C für 2 Minuten",
        safetyCaution: "Achtung: 63°C für 20 Sekunden",
        ambientLimit: "Zimmertemperatur: Maximal 4 Stunden",
        exploreScience: "70°C Sicherheits-Leitfaden",
        exploreFlipGuide: "Physik des Pfannen-Wenders",
        exploreBuilder: "Tortilla DNA-Rechner",
        donenessLabels: {
          liquida: "Betanzos Flüssig (Goldene Lava)",
          melosa: "Cremig Melosa (Der Heilige Gral)",
          cuajada: "Fest & Traditionell",
          muy_cuajada: "Durchgebackener Ziegel",
        },
        onionLabels: {
          with_onion: "Concebollista (Sanft pochiert)",
          without_onion: "Sincebollista (Reine Mineralität)",
          caramelized: "Langsam karamellisiert",
        },
        potatoLabels: {
          panadera: "Panadera (Feine Scheiben)",
          chascada: "Chascada (Gebrochene Kanten)",
          dados: "Rustikale Würfel",
        },
      };
    }
    return {
      badge: "El Laboratorio Caliente & Simulador de Vuelco",
      title: "La Sartén en Vivo & El Gran Vuelco",
      subtitle:
        "Prueba tu pulso de abuela con el legendario volteo de sartén, calibra la termodinámica del cuajado y desata el debate de la cebolla con nuestra tecnología 100% vectorial SVG sin imágenes pesadas.",
      flipButton: "🍳 ¡Dar la Vuelta a la Sartén!",
      flipping: "🔄 ¡Inercia parabólica en el aire!",
      donenessTitle: "Punto de Cuajado de la Yema",
      onionTitle: "Tratado Diplomático de la Cebolla",
      potatoTitle: "Geometría del Corte de Patata",
      tempTitle: "Sensor de Temperatura & Seguridad en Vivo",
      safetyGold: "Estándar de Oro: 70°C por 2 minutos",
      safetyCaution: "Atención: 63°C por 20 segundos",
      ambientLimit: "Límite Ambiente: Máximo 4 horas",
      exploreScience: "Ciencia del Cuajado a 70°C",
      exploreFlipGuide: "Física del Volteo & Inercia",
      exploreBuilder: "Calculadora de ADN Culinario",
      donenessLabels: {
        liquida: "Betanzos Líquida (Lava de Oro)",
        melosa: "Melosa / Jugosa (El Santo Grial)",
        cuajada: "Clásica Cuajada (Noble y Firme)",
        muy_cuajada: "Ladrillo de Hormigón",
      },
      onionLabels: {
        with_onion: "Concebollista (Pochada Suave)",
        without_onion: "Sincebollista (Purismo Mineral)",
        caramelized: "Caramelizada a Fuego Lento",
      },
      potatoLabels: {
        panadera: "Panadera (Láminas Finas)",
        chascada: "Chascada (Bordes Ricos en Almidón)",
        dados: "Dados Rústicos de Taberna",
      },
    };
  }, [safeLang]);

  // Handle Skillet Flip Simulator
  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    const verdicts = FLIP_VERDICTS[safeLang] || FLIP_VERDICTS.es;
    const picked = verdicts[(flipCount + Math.floor(Math.random() * verdicts.length)) % verdicts.length];
    setCurrentVerdict(picked);
    setFlipCount((prev) => prev + 1);

    // Flip animation duration matches keyframe (1.8s)
    setTimeout(() => {
      setIsFlipping(false);
    }, 1800);
  };

  // Live SVG generation (100% in-memory vector math)
  const renderedSvg = useMemo(() => {
    const onionOption =
      onionState === "without_onion"
        ? false
        : onionState === "caramelized"
        ? { style: "caramelizada", percentage: 22 }
        : { style: "pochada", percentage: 18 };

    const rawSvg = generateTortillaSvg({
      id: "cozy_kitchen_lab_svg",
      title: "Tortilla en Directo",
      subtitle: `${doneness} • ${onionState} • ${temperatureC}°C`,
      eggCount: 6,
      potatoWeightG: 650,
      potatoCut,
      potatoCooking: temperatureC > 130 ? "frita_crujiente" : "pochada",
      doneness,
      onion: onionOption,
      presentation: "skillet_top",
      theme: "kitchen_dark",
      showBadge: true,
      showSafetyBadge: true,
      animated: true,
      animatedFlip: isFlipping,
      lang: safeLang as any,
      width: 600,
      height: 400,
      omitXmlDeclaration: true,
    });

    return rawSvg.replace(/^<\?xml[^>]*\?>\s*/i, "");
  }, [doneness, onionState, potatoCut, temperatureC, isFlipping, safeLang]);

  // Temperature status calculation
  const tempStatus = useMemo(() => {
    if (temperatureC < 63) {
      return {
        level: "danger",
        badge: "Yema Líquida Inestable",
        desc: "Proteínas en estado nativo. Si la sirves ahora, la textura es líquida y requiere consumo inmediato.",
        color: "text-amber-500 border-amber-500/30 bg-amber-500/10",
      };
    }
    if (temperatureC < 70) {
      return {
        level: "warning",
        badge: "Ovotransferrina Coagulando",
        desc: `Punto de inicio de gelificación térmica. Requiere al menos 63°C por 20 segundos para textura cremosa y segura.`,
        color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      };
    }
    return {
      level: "safe",
      badge: "Estándar de Oro Certificado",
      desc: `Zona de máxima seguridad alimentaria CSIC / OMS: 70°C por 2 minutos para eliminación total de patógenos sin resecar el huevo.`,
      color: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    };
  }, [temperatureC]);

  return (
    <section className="py-12 md:py-20 bg-notebook-grid border-y border-border/80 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FFB800]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#8D6E63]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFB800]/15 px-3.5 py-1 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#FFB800] animate-pulse" />
            <span>{text.badge}</span>
          </div>

          <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {text.title}
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Master Two-Column Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Skillet View & Flip Stage */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="card-notebook p-2 bg-stone-950 border border-stone-800 rounded-3xl shadow-stacked-parchment overflow-hidden relative group">
              {/* The Live In-Memory Vector SVG Graphic */}
              <div
                className="w-full aspect-[4/3] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-stone-950 relative"
                dangerouslySetInnerHTML={{ __html: renderedSvg }}
              />

              {/* Live Overlay Indicators */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-stone-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-sm">
                  🔥 {temperatureC}°C
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-stone-900/90 text-stone-200 border border-stone-700 backdrop-blur-md shadow-sm">
                  🍳 {text.donenessLabels[doneness]}
                </span>
              </div>

              {/* Zero-Raster Vector Performance Seal */}
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-stone-900/90 border border-amber-400/30 backdrop-blur-xs">
                  ⚡ 100% Vector SVG • ~9KB
                </span>
              </div>
            </div>

            {/* Skillet Flip Button Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleFlip}
                disabled={isFlipping}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-extrabold text-stone-950 transition-all cursor-pointer shadow-md ${
                  isFlipping
                    ? "bg-amber-400 opacity-90 scale-[0.98]"
                    : "bg-[#FFB800] hover:bg-[#FFA000] hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                <RotateCw className={`h-5 w-5 ${isFlipping ? "animate-spin" : ""}`} />
                <span className="text-sm sm:text-base">
                  {isFlipping ? text.flipping : text.flipButton}
                </span>
              </button>

              <LocalizedLink
                to="/guias/fisica-del-volteo-inercia-sarten"
                lang={safeLang}
                className="px-4 py-3.5 rounded-2xl border border-border bg-card hover:bg-accent text-xs sm:text-sm font-bold text-foreground text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="h-4 w-4 text-[#8D6E63] dark:text-[#FFB800]" />
                <span>{text.exploreFlipGuide}</span>
              </LocalizedLink>
            </div>

            {/* Grandma's Flip Verdict Notification (Cozy & Irreverent) */}
            {currentVerdict && (
              <div className="card-notebook p-4 bg-[#F5E6BE]/30 dark:bg-stone-900/80 border border-[#FFB800]/40 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-4 w-4 text-[#8D6E63] dark:text-[#FFB800]" />
                      <h4 className="font-serif-heading font-extrabold text-foreground text-sm sm:text-base">
                        {currentVerdict.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800]">
                        {currentVerdict.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {currentVerdict.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-lg font-black text-amber-500">
                      {currentVerdict.score}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Culinary Sliders, Factions & Thermal Science */}
          <div className="lg:col-span-5 space-y-5">
            {/* Control Panel Card */}
            <div className="card-notebook p-5 bg-card border border-border rounded-3xl space-y-6 shadow-sm">
              {/* Control 1: Yolk Doneness */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#FFB800]" />
                    <span>{text.donenessTitle}</span>
                  </label>
                  <span className="text-xs font-bold text-foreground">
                    {text.donenessLabels[doneness]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(["liquida", "melosa", "cuajada", "muy_cuajada"] as TortillaDoneness[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDoneness(d)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        doneness === d
                          ? "bg-[#FFB800]/15 border-[#FFB800] text-foreground font-extrabold shadow-xs"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      {d === "liquida" && "💧 "}
                      {d === "melosa" && "✨ "}
                      {d === "cuajada" && "🥞 "}
                      {d === "muy_cuajada" && "🧱 "}
                      {text.donenessLabels[d].split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Onion Treaty */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <HeartHandshake className="h-3.5 w-3.5 text-[#8D6E63] dark:text-[#FFB800]" />
                    <span>{text.onionTitle}</span>
                  </label>
                  <LocalizedLink
                    to="/facciones"
                    lang={safeLang}
                    className="text-[11px] font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline"
                  >
                    Ver Facciones →
                  </LocalizedLink>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {(["caramelized", "with_onion", "without_onion"] as OnionState[]).map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOnionState(o)}
                      className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center transition-all border cursor-pointer ${
                        onionState === o
                          ? "bg-[#8D6E63]/15 dark:bg-[#FFB800]/15 border-[#8D6E63] dark:border-[#FFB800] text-foreground font-extrabold shadow-xs"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      {o === "caramelized" && "🧅 Confitada"}
                      {o === "with_onion" && "🧅 Pochada"}
                      {o === "without_onion" && "🛡️ Sin Cebolla"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Potato Cut Geometry */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <ChefHat className="h-3.5 w-3.5 text-[#FFB800]" />
                    <span>{text.potatoTitle}</span>
                  </label>
                  <LocalizedLink
                    to="/ingredientes/patata"
                    lang={safeLang}
                    className="text-[11px] font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline"
                  >
                    Tratado Patata →
                  </LocalizedLink>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {(["panadera", "chascada", "dados"] as PotatoCut[]).map((cut) => (
                    <button
                      key={cut}
                      type="button"
                      onClick={() => setPotatoCut(cut)}
                      className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center transition-all border cursor-pointer ${
                        potatoCut === cut
                          ? "bg-amber-500/15 border-amber-500 text-foreground font-extrabold shadow-xs"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      {text.potatoLabels[cut]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 4: Thermal Safety Dial */}
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Thermometer className="h-3.5 w-3.5 text-rose-500" />
                    <span>{text.tempTitle}</span>
                  </label>
                  <span className="font-mono text-sm font-extrabold text-foreground bg-muted px-2 py-0.5 rounded-md">
                    {temperatureC}°C
                  </span>
                </div>

                <input
                  type="range"
                  min={55}
                  max={150}
                  step={1}
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(Number(e.target.value))}
                  className="w-full accent-[#FFB800] cursor-pointer"
                />

                {/* Thermal Safety Status Card */}
                <div className={`p-3 rounded-xl border ${tempStatus.color} text-xs space-y-1`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    {tempStatus.level === "safe" ? (
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{tempStatus.badge}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{tempStatus.desc}</p>
                </div>
              </div>

              {/* Mandatory Bolding Safety Notice Box */}
              <div className="p-3.5 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/20 border border-[#2E7D32]/30 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#2E7D32] dark:text-[#81C784]">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Protocolo de Seguridad Alimentaria (CSIC & OMS)</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Estándar Oro bactericida: <strong>70°C por 2 minutos</strong>. Coagulación de ovotransferrina a partir de <strong>63°C por 20 segundos</strong>. Nunca superar las <strong>4 horas</strong> de exposición a temperatura ambiente antes de refrigerar a &lt;8°C.
                </p>
              </div>

              {/* Cross-Link Action */}
              <div className="pt-1 flex items-center justify-between text-xs font-bold">
                <LocalizedLink
                  to="/ciencia"
                  lang={safeLang}
                  className="inline-flex items-center gap-1 text-[#8D6E63] dark:text-[#FFB800] hover:underline"
                >
                  <span>{text.exploreScience}</span>
                  <ArrowRight className="h-3 w-3" />
                </LocalizedLink>

                <LocalizedLink
                  to="/builder"
                  lang={safeLang}
                  className="inline-flex items-center gap-1 text-[#8D6E63] dark:text-[#FFB800] hover:underline"
                >
                  <span>{text.exploreBuilder}</span>
                  <ArrowRight className="h-3 w-3" />
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
