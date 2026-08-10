import React, { useState, useEffect } from "react";
import "@/i18n/config";
import { 
  ChefHat, 
  Sparkles, 
  Home, 
  HelpCircle, 
  Search, 
  Compass, 
  History as HistoryIcon,
  Flame,
  RotateCcw,
  Egg,
  Sliders,
  Feather,
  Quote
} from "lucide-react";
import { resolveNavigationTarget, type SupportedLocale } from "@/lib/routes";

interface Clever404ViewProps {
  lang?: string;
  requestedPath?: string;
}

export default function Clever404View({ lang = "es", requestedPath = "" }: Clever404ViewProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const [searchQuery, setSearchQuery] = useState("");

  // Clean raw path
  const cleanPath = decodeURIComponent(requestedPath || (typeof window !== "undefined" ? window.location.pathname : ""))
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");

  const pathSegments = cleanPath.split("/").filter(Boolean);
  const rawSegment = pathSegments[pathSegments.length - 1] || "";

  // View Mode State
  const [activeTab, setActiveTab] = useState<"gods_oracle" | "flip_game" | "quick_routes">("gods_oracle");

  // Oracle Divine & Garlic Parameters
  const [yolks, setYolks] = useState<number>(1); // Extra yolks
  const [garlicCloves, setGarlicCloves] = useState<number>(1); // Real garlic cloves
  const [garlicMode, setGarlicMode] = useState<"infusion" | "rub_pan" | "confit">("infusion"); // Garlic technique
  const [saltLevel, setSaltLevel] = useState<number>(50); // Salt pinch %
  const [temperature, setTemperature] = useState<number>(70); // 70°C target
  
  // Divine Response state
  const [godsProphecy, setGodsProphecy] = useState<string | null>(null);
  const [godSpeaker, setGodSpeaker] = useState<{ name: string; title: string; avatar: string } | null>(null);

  // Pan Flip Mini-Game state
  const [flipProgress, setFlipProgress] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState<"none" | "perfect" | "undercooked" | "burnt">("none");
  const [adventureLog, setAdventureLog] = useState<string[]>([]);

  function getLocalizedHref(path: string) {
    return resolveNavigationTarget({ to: path }, (currentLang as SupportedLocale) || 'es');
  }

  // Animation effect for minigame power meter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === "flip_game" && !isFlipping) {
      interval = setInterval(() => {
        setFlipProgress((prev) => (prev >= 100 ? 0 : prev + 4));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [activeTab, isFlipping]);

  // Consult the Tortilla Gods & Garlic Oracle with real culinary parameters
  const consultTortillaGods = () => {
    if (currentLang === "es") {
      const speakers = [
        { name: "El Dios del Ajo Confitado y la Yema", title: "Patrono del Umami y la Aromatización", avatar: "🧄" },
        { name: "La Diosa del Aceite de Oliva Virgen Extra", title: "Guardiana de la Fritura Lenta", avatar: "🫒" },
        { name: "El Gran Maestro del Volteo de 1798", title: "Oráculo de la Sartén de Cobre", avatar: "🍳" },
      ];
      const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      setGodSpeaker(selectedSpeaker);

      let garlicTechDesc = "";
      if (garlicMode === "infusion") {
        garlicTechDesc = `infundes ${garlicCloves} diente(s) de ajo en el aceite de oliva a 80°C antes de confitar la patata (técnica de Óscar Vidal), retirándolo antes de que amarillee para evitar amargor`;
      } else if (garlicMode === "rub_pan") {
        garlicTechDesc = `frotas medio diente de ajo sobre la sartén caliente antes de añadir el aceite (secreto tradicional de taberna), liberando aceites de alicina directa`;
      } else {
        garlicTechDesc = `incorporas ${garlicCloves} diente(s) de ajo confitado a fuego lento en la masa junto a las patatas poached`;
      }

      const blessing = `Ajustas la fórmula real: +${yolks} yema(s) extra, ${garlicTechDesc}, ${saltLevel}% de sal y mantienes la cocción a ${temperature}°C. El Dios de la Tortilla proclama: "No existen atajos aleatorios ni falsas recetas. Para la mejor tortilla de patatas del mundo, domina el ajo en su justa medida, respeta la pasteurización bactericida a 70°C durante 2 minutos (o 63°C durante 20 segundos) y nunca dejes la mezcla más de 4 horas a temperatura ambiente."`;
      setGodsProphecy(blessing);
    } else if (currentLang === "de") {
      const speakers = [
        { name: "Gott des confierten Knoblauchs & Eigelbs", title: "Patron des Umami & Aromas", avatar: "🧄" },
        { name: "Göttin des nativen Olivenöls", title: "Hüterin des langsamen Frittierens", avatar: "🫒" },
        { name: "Großmeister des Pfannenwendens von 1798", title: "Orakel der Kupferpfanne", avatar: "🍳" },
      ];
      const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      setGodSpeaker(selectedSpeaker);

      let garlicTechDesc = "";
      if (garlicMode === "infusion") {
        garlicTechDesc = `infundierst du ${garlicCloves} Knoblauchzehe(n) im Olivenöl bei 80°C (Óscar Vidal Technik), bevor die Kartoffeln hineinkommen`;
      } else if (garlicMode === "rub_pan") {
        garlicTechDesc = `reibst du die heiße Pfanne mit einer halben Knoblauchzehe ein, um Allicin-Öle freizusetzen`;
      } else {
        garlicTechDesc = `gibst du ${garlicCloves} sanft confierte Knoblauchzehe(n) direkt in die Ei-Kartoffel-Mischung`;
      }

      const blessing = `Du wählst die echte Rezeptur: +${yolks} extra Eigelb, ${garlicTechDesc}, ${saltLevel}% Salz und hältst die Pfanne bei ${temperature}°C. Der Tortilla-Gott verkündet: "Kein Zögern, keine Zufallsdaten. Für die beste Tortilla de Patatas der Welt: Nutze den Knoblauch präzise, halte die Pasteurisierung bei 70°C for 2 minutes (oder 63°C for 20 seconds) ein und lasse die Masse nie länger als 4 hours bei Raumtemperatur stehen."`;
      setGodsProphecy(blessing);
    } else {
      const speakers = [
        { name: "The God of Confit Garlic & Golden Yolk", title: "Patron of Umami & Infusion", avatar: "🧄" },
        { name: "Goddess of Extra Virgin Olive Oil", title: "Guardian of Slow Poaching", avatar: "🫒" },
        { name: "Grand Master of the 1798 Flip", title: "Oracle of the Copper Pan", avatar: "🍳" },
      ];
      const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      setGodSpeaker(selectedSpeaker);

      let garlicTechDesc = "";
      if (garlicMode === "infusion") {
        garlicTechDesc = `infuse ${garlicCloves} garlic clove(s) into EVOO at 80°C before poaching potatoes (Chef Óscar Vidal technique), discarding before browning to avoid bitterness`;
      } else if (garlicMode === "rub_pan") {
        garlicTechDesc = `rub a halved garlic clove onto the hot skillet before adding oil (traditional tavern secret), releasing raw allicin fragrance`;
      } else {
        garlicTechDesc = `mix ${garlicCloves} slow-confitted garlic clove(s) directly into the poached potato and egg batter`;
      }

      const blessing = `You configure real culinary parameters: +${yolks} extra yolk(s), ${garlicTechDesc}, ${saltLevel}% salt, and heat held at ${temperature}°C. The Tortilla God declares: "No pseudo-data, no compromises. To achieve the world's best tortilla de patatas, master garlic infusion, balance your seasoning, and cook to a perfect golden juicy core."`;
      setGodsProphecy(blessing);
    }
  };

  const handleFlipAction = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    if (flipProgress >= 45 && flipProgress <= 65) {
      setFlipResult("perfect");
      setAdventureLog((prev) => [
        ...prev,
        currentLang === "es"
          ? "✨ ¡VOLTEO PERFECTO EN EL AIRE! La tortilla de ajo confitado cayó con precisión en la sartén. ¡Textura melosa y jugosa perfeccionada!"
          : currentLang === "de"
          ? "✨ PERFEKTER WENDESPRUNG IN DER LUFT! Die Knoblauch-Tortilla landete präzise in der Pfanne. Saftige Perfektion erreicht!"
          : "✨ PERFECT AIR FLIP! The confit garlic tortilla landed flawlessly in the skillet. Juicy perfection achieved!"
      ]);
    } else if (flipProgress < 45) {
      setFlipResult("undercooked");
      setAdventureLog((prev) => [
        ...prev,
        currentLang === "es"
          ? "⚠️ Volteo prematuro: La mezcla estaba fría a menos de 60°C. ¡Aumenta el fuego!"
          : currentLang === "de"
          ? "⚠️ Zu frühes Wenden: Masse war unter 60°C. Mehr Hitze!"
          : "⚠️ Premature flip: Mix was under 60°C. Heat it up!"
      ]);
    } else {
      setFlipResult("burnt");
      setAdventureLog((prev) => [
        ...prev,
        currentLang === "es"
          ? "💥 Volteo tardío: ¡Se ha socarrado la superficie! Calibra el tiempo."
          : currentLang === "de"
          ? "💥 Zu spätes Wenden: Äußere Kruste angebrannt!"
          : "💥 Late flip: Burnt surface!"
      ]);
    }

    setTimeout(() => {
      setIsFlipping(false);
    }, 1200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = encodeURIComponent(searchQuery.trim());
    window.location.href = getLocalizedHref(`/builder?q=${query}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 font-sans">
      
      {/* SACRED PARCHMENT TEMPLE CONTAINER */}
      <div className="card-notebook bg-[#FAF6EE] dark:bg-[#262220] border-2 border-[#E8E2D5] dark:border-[#3D352E] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Divine Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D5] dark:border-[#3D352E] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#FFB800] text-[#1C1917] shadow-md ring-4 ring-[#FFB800]/20">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8D6E63] dark:text-[#FFB800] flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5" />
                {currentLang === "es" ? "Santuario de los Dioses de la Tortilla & del Ajo" : currentLang === "de" ? "Heiligtum der Tortilla- & Knoblauch-Götter" : "Sanctuary of the Tortilla & Garlic Gods"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#292521] dark:text-[#F5E6BE]">
                {currentLang === "es" ? "Cuando te pierdes, los Dioses cocinan ajo contigo" : currentLang === "de" ? "Wenn du dich verläufst, kochen die Götter Knoblauch mit dir" : "When you are lost, the Gods cook garlic with you"}
              </h1>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#8D6E63]/10 border border-[#8D6E63]/30 font-mono text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
            PATH: <span className="underline">{cleanPath || "/404"}</span>
          </div>
        </div>

        {/* MODE SELECTOR TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8E2D5] dark:border-[#3D352E] pb-4">
          <button
            onClick={() => setActiveTab("gods_oracle")}
            className={`px-5 py-2.5 rounded-xl font-serif-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "gods_oracle"
                ? "bg-[#FFB800] text-[#1C1917] shadow-md scale-105"
                : "bg-white dark:bg-[#1C1917] text-[#8D6E63] dark:text-[#F5E6BE] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#FFB800]"
            }`}
          >
            <Egg className="w-4 h-4" />
            <span>{currentLang === "es" ? "🧄 Oráculo Culinario del Ajo" : currentLang === "de" ? "🧄 Knoblauch-Orakel" : "🧄 Garlic Culinary Oracle"}</span>
          </button>

          <button
            onClick={() => setActiveTab("flip_game")}
            className={`px-5 py-2.5 rounded-xl font-serif-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "flip_game"
                ? "bg-[#FFB800] text-[#1C1917] shadow-md scale-105"
                : "bg-white dark:bg-[#1C1917] text-[#8D6E63] dark:text-[#F5E6BE] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#FFB800]"
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>{currentLang === "es" ? "🍳 Desafío de Volteo" : currentLang === "de" ? "🍳 Wendesprung-Test" : "🍳 Flip Challenge"}</span>
          </button>

          <button
            onClick={() => setActiveTab("quick_routes")}
            className={`px-5 py-2.5 rounded-xl font-serif-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "quick_routes"
                ? "bg-[#FFB800] text-[#1C1917] shadow-md scale-105"
                : "bg-white dark:bg-[#1C1917] text-[#8D6E63] dark:text-[#F5E6BE] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#FFB800]"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{currentLang === "es" ? "🗺️ Salir del Limbo" : currentLang === "de" ? "🗺️ Wege aus dem Limbo" : "🗺️ Exit Limbo"}</span>
          </button>
        </div>

        {/* TAB 1: DIVINE GARLIC ORACLE & REAL CULINARY SCIENCE */}
        {activeTab === "gods_oracle" && (
          <div className="space-y-6">
            
            {/* Introductory Divine Context */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] shadow-inner space-y-3">
              <div className="flex items-center gap-2 text-[#D89B32] font-serif font-bold text-sm">
                <Quote className="w-4 h-4" />
                <span>
                  {currentLang === "es" 
                    ? "Mensaje de los Fogones Reales de 1798" 
                    : currentLang === "de" 
                    ? "Botschaft der echten Herdfeuer von 1798" 
                    : "Real 1798 Hearth Message"}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#292521]/90 dark:text-[#F5E6BE]/90 leading-relaxed font-sans">
                {rawSegment ? (
                  currentLang === "es" ? (
                    <>
                      Has llegado al limbo de la ruta <code className="bg-[#FAF6EE] dark:bg-[#262220] px-2 py-0.5 rounded text-[#8D6E63] dark:text-[#FFB800] font-mono font-bold">"{rawSegment}"</code>. 
                      Aquí no hay datos aleatorios ni rodeos: los Dioses de la Tortilla te enseñan la técnica real del ajo, la infusión en aceite de oliva y el punto exacto de cuajado y sazón.
                    </>
                  ) : currentLang === "de" ? (
                    <>
                      Du bist auf der Route <code className="bg-[#FAF6EE] dark:bg-[#262220] px-2 py-0.5 rounded text-[#8D6E63] dark:text-[#FFB800] font-mono font-bold">"{rawSegment}"</code> im Limbo gelandet. 
                      Keine Zufallsdaten: Die Tortilla-Götter zeigen dir echte Knoblauch-Technik, Olivenöl-Aromatisierung und exakten Stockungspunkt.
                    </>
                  ) : (
                    <>
                      You reached limbo on route <code className="bg-[#FAF6EE] dark:bg-[#262220] px-2 py-0.5 rounded text-[#8D6E63] dark:text-[#FFB800] font-mono font-bold">"{rawSegment}"</code>. 
                      No random noise: the Tortilla Gods teach you real garlic infusion, EVOO aroma science, and precise setting point.
                    </>
                  )
                ) : (
                  currentLang === "es" ? (
                    <>
                      Ruta no encontrada. Configura la técnica de ajo real y cocina la mejor tortilla de patatas del mundo.
                    </>
                  ) : currentLang === "de" ? (
                    <>
                      Pfad nicht gefunden. Konfiguriere echte Knoblauch-Technik für die beste Tortilla de Patatas der Welt.
                    </>
                  ) : (
                    <>
                      Route not found. Configure real garlic parameters to craft the best tortilla de patatas in the world.
                    </>
                  )
                )}
              </p>
            </div>

            {/* REAL CULINARY GARLIC SLIDERS */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1917] border-2 border-[#FFB800] shadow-md space-y-6">
              <div className="flex items-center gap-2 text-foreground dark:text-[#F5E6BE] font-serif-heading font-bold text-base">
                <Sliders className="w-5 h-5 text-[#FFB800]" />
                <span>
                  {currentLang === "es" ? "Parámetros Reales de Cocina & Aromatización de Ajo:" : currentLang === "de" ? "Echte Küchenparameter & Knoblauch-Aromatisierung:" : "Real Culinary Parameters & Garlic Infusion:"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* PARAM 1: GARLIC CLOVES */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">🧄</span>
                      {currentLang === "es" ? "Dientes de Ajo Confitado" : currentLang === "de" ? "Knoblauchzehen (Confiere)" : "Confit Garlic Cloves"}
                    </span>
                    <span className="font-mono bg-[#FFB800]/20 px-2 py-0.5 rounded text-[#1C1917] dark:text-[#FFB800]">
                      {garlicCloves} Clove(s)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={garlicCloves}
                    aria-label={currentLang === "es" ? "Dientes de ajo confitado" : currentLang === "de" ? "Knoblauchzehen" : "Confit garlic cloves"}
                    onChange={(e) => setGarlicCloves(Number(e.target.value))}
                    className="w-full accent-[#FFB800] cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {currentLang === "es" ? "1 diente confitado en AOVE aporta el umami sutil del chef Óscar Vidal." : currentLang === "de" ? "1 Zehe in Olivenöl verleiht das subtile Umami von Chef Óscar Vidal." : "1 clove confitted in EVOO provides Chef Óscar Vidal's subtle umami baseline."}
                  </p>
                </div>

                {/* PARAM 2: GARLIC TECHNIQUE */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    {currentLang === "es" ? "Técnica de Aplicación del Ajo" : currentLang === "de" ? "Knoblauch-Anwendungstechnik" : "Garlic Application Technique"}
                  </label>
                  <select
                    value={garlicMode}
                    onChange={(e) => setGarlicMode(e.target.value as "infusion" | "rub_pan" | "confit")}
                    className="w-full p-2.5 rounded-xl border border-[#E8E2D5] dark:border-[#3D352E] bg-white dark:bg-[#1C1917] text-xs font-bold text-foreground cursor-pointer focus:ring-2 focus:ring-[#FFB800]"
                  >
                    <option value="infusion">
                      {currentLang === "es" ? "1. Infusión en Aceite a 80°C (Perfume sutil)" : currentLang === "de" ? "1. Öl-Infusion bei 80°C (Subtiles Aroma)" : "1. EVOO Oil Infusion at 80°C (Subtle Perfume)"}
                    </option>
                    <option value="rub_pan">
                      {currentLang === "es" ? "2. Ajo Frotado en la Sartén Caliente (Secreto de Taberna)" : currentLang === "de" ? "2. Knoblauch in heiße Pfanne reiben (Tavernen-Geheimnis)" : "2. Pan Rubbed with Garlic (Tavern Secret)"}
                    </option>
                    <option value="confit">
                      {currentLang === "es" ? "3. Ajo Confitado dentro de la Mezcla" : currentLang === "de" ? "3. Confieter Knoblauch direkt in der Masse" : "3. Confit Garlic Mixed with Eggs & Potatoes"}
                    </option>
                  </select>
                </div>

                {/* PARAM 3: EXTRA YOLKS */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    <span className="flex items-center gap-1.5">
                      <Egg className="w-4 h-4 text-[#FFB800]" />
                      {currentLang === "es" ? "Yemas Extra (Cremosidad)" : currentLang === "de" ? "Extra Eigelbe (Cremigkeit)" : "Extra Yolks (Creaminess)"}
                    </span>
                    <span className="font-mono bg-[#FFB800]/20 px-2 py-0.5 rounded text-[#1C1917] dark:text-[#FFB800]">
                      +{yolks} Yolk(s)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={yolks}
                    aria-label={currentLang === "es" ? "Yemas extra" : currentLang === "de" ? "Extra Eigelbe" : "Extra yolks"}
                    onChange={(e) => setYolks(Number(e.target.value))}
                    className="w-full accent-[#FFB800] cursor-pointer"
                  />
                </div>

                {/* PARAM 4: SALT BALANCE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">🧂</span>
                      {currentLang === "es" ? "Punto de Sal (Sazón)" : currentLang === "de" ? "Salz-Balance" : "Salt Pinch Level"}
                    </span>
                    <span className="font-mono bg-[#8D6E63]/20 px-2 py-0.5 rounded text-[#8D6E63] dark:text-[#FFB800]">
                      {saltLevel}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={saltLevel}
                    aria-label={currentLang === "es" ? "Punto de sal" : currentLang === "de" ? "Salzgehalt" : "Salt pinch level"}
                    onChange={(e) => setSaltLevel(Number(e.target.value))}
                    className="w-full accent-[#8D6E63] cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {currentLang === "es" ? "Sal y ajo potencian mutuamente los compuestos aromáticos de la fritura." : currentLang === "de" ? "Salz und Knoblauch verstärken gegenseitig die Aromastoffe." : "Salt and garlic mutually elevate frying aromatic compounds."}
                  </p>
                </div>

                {/* PARAM 5: CORE HEAT TEMP */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#FF8A00]" />
                      {currentLang === "es" ? "Punto de Cuajado (Tél)" : currentLang === "de" ? "Stockungstemperatur" : "Core Heat Temp"}
                    </span>
                    <span className="font-mono bg-[#2E7D32]/20 px-2 py-0.5 rounded text-[#2E7D32] dark:text-[#81C784]">
                      {temperature}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="85"
                    value={temperature}
                    aria-label={currentLang === "es" ? "Punto de cuajado" : currentLang === "de" ? "Stockungstemperatur" : "Core heat temperature"}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-[#2E7D32] cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {currentLang === "es" ? (
                      <>Temperatura idónea para un cuajado cremoso y seguro.</>
                    ) : currentLang === "de" ? (
                      <>Ideale Temperatur für saftiges und sicheres Stocken.</>
                    ) : (
                      <>Ideal temperature for a juicy, safe, creamy core.</>
                    )}
                  </p>
                </div>

              </div>

              {/* CONSULT BUTTON */}
              <div className="text-center pt-2">
                <button
                  onClick={consultTortillaGods}
                  className="px-8 py-3.5 rounded-2xl bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917] font-serif-heading font-extrabold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>
                    {currentLang === "es" ? "🧄 Consultar el Oráculo Real del Ajo" : currentLang === "de" ? "🧄 Echtes Knoblauch-Orakel befragen" : "🧄 Consult Real Garlic Oracle"}
                  </span>
                </button>
              </div>
            </div>

            {/* GODS PROPHECY RESPONSE CARD */}
            {godsProphecy && godSpeaker && (
              <div className="p-6 rounded-2xl bg-[#F5E6BE]/40 dark:bg-[#3D332A]/50 border-2 border-[#FFB800] shadow-lg space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-2xl bg-[#FFB800]/20">{godSpeaker.avatar}</span>
                  <div>
                    <h3 className="font-serif-heading font-extrabold text-lg text-foreground dark:text-[#F5E6BE]">
                      {godSpeaker.name}
                    </h3>
                    <p className="text-xs text-[#8D6E63] dark:text-[#FFB800] font-mono font-bold">
                      {godSpeaker.title}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] text-sm text-foreground dark:text-[#F5E6BE] leading-relaxed italic">
                  "{godsProphecy}"
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={getLocalizedHref("/ingredientes/garlic")}
                    className="px-5 py-2.5 rounded-xl bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917] text-xs font-extrabold shadow-xs transition-all hover:scale-105 flex items-center gap-1.5"
                  >
                    <span>🧄</span>
                    <span>{currentLang === "es" ? "Aprender Ciencia del Ajo (Ficha Técnica)" : currentLang === "de" ? "Knoblauch-Wissenschaft lesen" : "Read Garlic Science Detail"}</span>
                  </a>
                  <a
                    href={getLocalizedHref("/builder")}
                    className="px-5 py-2.5 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] text-white text-xs font-bold shadow-xs transition-all hover:scale-105"
                  >
                    {currentLang === "es" ? "Aplicar esta Fórmula en el Constructor" : currentLang === "de" ? "Formel im Baukasten anwenden" : "Apply Formula in Builder"}
                  </a>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: MINI-GAME VOLTEO EN SARTÉN */}
        {activeTab === "flip_game" && (
          <div className="space-y-6 bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border-2 border-[#FFB800] shadow-inner text-center">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold">
                <Flame className="w-4 h-4 text-[#FFB800]" />
                <span>
                  {currentLang === "es" ? "Mini-Juego: El Volteo de la Tortilla de Ajo" : currentLang === "de" ? "Mini-Spiel: Knoblauch-Tortilla Wendesprung" : "Mini-Game: Garlic Tortilla Pan Flip"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-extrabold text-[#292521] dark:text-[#F5E6BE]">
                {currentLang === "es" ? "¡Haz clic cuando el indicador entre en la Zona Dorada!" : currentLang === "de" ? "Klicke in der Gold-Zone!" : "Click when the meter reaches the Gold Zone!"}
              </h2>
            </div>

            {/* POWER METER BAR */}
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-xs font-mono font-bold text-[#8D6E63] dark:text-[#FFB800]">
                <span>0°C ({currentLang === "es" ? "Crudo" : currentLang === "de" ? "Roh" : "Raw"})</span>
                <span className="text-[#2E7D32] dark:text-[#81C784]">70°C ({currentLang === "es" ? "Dorado" : currentLang === "de" ? "Gold" : "Golden"})</span>
                <span>100°C ({currentLang === "es" ? "Quemado" : currentLang === "de" ? "Angebrannt" : "Burnt"})</span>
              </div>

              <div className="relative w-full h-8 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden border-2 border-[#E8E2D5] dark:border-[#3D352E] shadow-inner">
                <div className="absolute top-0 bottom-0 left-[45%] w-[20%] bg-[#FFB800] border-x-2 border-[#D89B32] opacity-80 flex items-center justify-center text-[10px] font-extrabold text-[#1C1917]">
                  ZONA GOLD
                </div>

                <div
                  className="absolute top-0 bottom-0 w-3 bg-[#D32F2F] shadow-md transition-all duration-75"
                  style={{ left: `${flipProgress}%` }}
                />
              </div>
            </div>

            {/* FLIP BUTTON */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleFlipAction}
                disabled={isFlipping}
                className="px-8 py-4 rounded-2xl bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917] font-serif-heading font-extrabold text-base shadow-lg hover:scale-105 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <ChefHat className="w-5 h-5" />
                <span>
                  {currentLang === "es" ? "¡VOLTEAR SARTÉN AHORA!" : currentLang === "de" ? "PFANNE JETZT WENDEN!" : "FLIP PAN NOW!"}
                </span>
              </button>

              <button
                onClick={() => { setFlipResult("none"); setFlipProgress(0); }}
                className="px-4 py-4 rounded-2xl bg-[#8D6E63]/10 hover:bg-[#8D6E63]/20 text-[#8D6E63] dark:text-[#F5E6BE] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{currentLang === "es" ? "Reiniciar" : currentLang === "de" ? "Zurücksetzen" : "Reset"}</span>
              </button>
            </div>

            {/* FEEDBACK RESULT */}
            {flipResult === "perfect" && (
              <div className="p-4 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32] text-xs text-[#2E7D32] dark:text-[#81C784] font-bold">
                🎉 {currentLang === "es" ? "¡Volteo perfecto en el momento justo! Los Dioses sonríen." : currentLang === "de" ? "Perfektes Wenden im richtigen Moment! Die Götter lächeln." : "Perfect flip right on time! The Gods smile."}
              </div>
            )}

            {flipResult === "undercooked" && (
              <div className="p-4 rounded-xl bg-[#FFC107]/20 border border-[#FFC107] text-xs text-[#292521] dark:text-[#FFB800] font-bold">
                ⚠️ {currentLang === "es" ? "Demasiado frío (<60°C). Inténtalo en la Zona Gold." : currentLang === "de" ? "Zu kalt (<60°C). Versuche es in der Gold-Zone." : "Too cold (<60°C). Try again in the Gold Zone."}
              </div>
            )}

            {flipResult === "burnt" && (
              <div className="p-4 rounded-xl bg-[#D32F2F]/20 border border-[#D32F2F] text-xs text-[#D32F2F] font-bold">
                💥 {currentLang === "es" ? "¡Capa quemada! Revisa tu tiempo." : currentLang === "de" ? "Angebrannt! Zeit prüfen." : "Burnt surface! Check timing."}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QUICK ROUTE HIGHLIGHTS */}
        {activeTab === "quick_routes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <a
              href={getLocalizedHref("/ingredientes/garlic")}
              className="p-4 rounded-2xl bg-[#FFB800]/10 dark:bg-[#1C1917] border-2 border-[#FFB800] hover:scale-102 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#FFB800] text-[#1C1917]">
                  <span className="text-lg">🧄</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FFB800] text-[#1C1917]">
                  TOP INGREDIENTE
                </span>
              </div>
              <h3 className="font-serif-heading font-extrabold text-base text-foreground dark:text-[#F5E6BE] group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors">
                {currentLang === "es" ? "Ficha Técnica del Ajo" : currentLang === "de" ? "Knoblauch-Wissenschaft" : "Garlic Science Detail"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {currentLang === "es" ? "Ciencia de la infusión en AOVE y descomposición de alicina." : currentLang === "de" ? "Olivenöl-Infusion & Allicin-Wissenschaft." : "EVOO infusion science & allicin breakdown."}
              </p>
            </a>

            <a
              href={getLocalizedHref("/builder")}
              className="p-4 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#FFB800] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF6EE] dark:bg-[#262220] text-muted-foreground">
                  Ratios
                </span>
              </div>
              <h3 className="font-serif-heading font-bold text-base text-foreground dark:text-[#F5E6BE] group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors">
                {currentLang === "es" ? "Constructor de Ratios" : currentLang === "de" ? "Verhältnis-Baukasten" : "Omelette Builder"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {currentLang === "es" ? "Calcula gramos de patata y huevos por persona." : currentLang === "de" ? "Berechne Kartoffeln und Eier pro Gast." : "Calculate potato grams and eggs per guest."}
              </p>
            </a>

            <a
              href={getLocalizedHref("/history")}
              className="p-4 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#8D6E63] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#8D6E63]/20 text-[#8D6E63] dark:text-[#F5E6BE]">
                  <HistoryIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF6EE] dark:bg-[#262220] text-muted-foreground">
                  1798
                </span>
              </div>
              <h3 className="font-serif-heading font-bold text-base text-foreground dark:text-[#F5E6BE] group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors">
                {currentLang === "es" ? "Historia & Personajes" : currentLang === "de" ? "Geschichte & Figuren" : "History & Figures"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {currentLang === "es" ? "Del Marqués de Robledo a las guerras carlistas." : currentLang === "de" ? "Vom Marqués de Robledo bis heute." : "From Marqués de Robledo to Carlist Wars."}
              </p>
            </a>

            <a
              href={getLocalizedHref("/trivia")}
              className="p-4 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#2E7D32] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#2E7D32]/20 text-[#2E7D32] dark:text-[#81C784]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF6EE] dark:bg-[#262220] text-muted-foreground">
                  Quiz
                </span>
              </div>
              <h3 className="font-serif-heading font-bold text-base text-foreground dark:text-[#F5E6BE] group-hover:text-[#2E7D32] dark:group-hover:text-[#81C784] transition-colors">
                {currentLang === "es" ? "Desafío Trivia (200+)" : currentLang === "de" ? "Tortilla-Quiz (200+)" : "Trivia Challenge"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {currentLang === "es" ? "Demuestra tus conocimientos de ciencia e historia." : currentLang === "de" ? "Teste dein Wissen zu Chemie & Kultur." : "Test your science and history knowledge."}
              </p>
            </a>
          </div>
        )}

        {/* SEARCH RECOVERY BAR */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto pt-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === "es" ? "Buscar técnica, personaje o ingrediente (p. ej. ajo)..." : currentLang === "de" ? "Suche nach Technik, Person oder Zutat (z. B. Knoblauch)..." : "Search technique, figure, or ingredient (e.g. garlic)..."}
              className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-[#E8E2D5] dark:border-[#3D352E] bg-white dark:bg-[#1C1917] text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] text-xs font-bold transition-colors cursor-pointer"
            >
              {currentLang === "es" ? "Buscar" : currentLang === "de" ? "Suchen" : "Search"}
            </button>
          </div>
        </form>

        {/* Return Home Button */}
        <div className="text-center pt-2">
          <a
            href={getLocalizedHref("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>{currentLang === "es" ? "Volver a la cocina principal" : currentLang === "de" ? "Zurück zur Hauptküche" : "Return to Main Kitchen"}</span>
          </a>
        </div>

      </div>

      {/* ADVENTURE LOG SYSTEM */}
      {adventureLog.length > 0 && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#262220] border border-[#E8E2D5] dark:border-[#3D352E] space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8D6E63] dark:text-[#FFB800] block">
            {currentLang === "es" ? "📋 Registro de Expedición:" : currentLang === "de" ? "📋 Expeditionsbuch:" : "📋 Expedition Log:"}
          </span>
          <ul className="space-y-1 font-mono text-xs text-[#292521] dark:text-[#F5E6BE]">
            {adventureLog.map((log, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FFB800] shrink-0">&gt;</span>
                <span>{log}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
