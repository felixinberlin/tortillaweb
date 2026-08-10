import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Terminal,
  RotateCcw,
  Smile,
  History,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import {
  dispatchWorldStateAction,
  executeCliCommand,
  type WorldState,
} from '../../lib/worldstate/worldstateStore';

interface SimulatorProps {
  currentLang?: 'es' | 'en' | 'de';
}

export default function TortillaWorldstateSimulator({ currentLang = 'es' }: SimulatorProps) {
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [cliInput, setCliInput] = useState<string>('');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; out: string; time: string }>>([]);
  const [activeTab, setActiveTab] = useState<'buttons' | 'cli' | 'logs'>('buttons');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<string | null>(null);

  // Load state on mount
  useEffect(() => {
    const loaded = loadWorldState();
    setWorldState(loaded);
  }, []);

  if (!worldState) {
    return (
      <div className="p-8 text-center text-stone-500 font-sans text-sm animate-pulse">
        Cargando Simulador de Estado del Mundo...
      </div>
    );
  }

  // Trigger Action via Button
  const handleAction = (actionType: 'dance' | 'disappoint' | 'flip' | 'offer_onion' | 'check_temp' | 'reset') => {
    setIsAnimating(actionType);
    setTimeout(() => setIsAnimating(null), 800);

    const updated = dispatchWorldStateAction(worldState, actionType, 'button');
    setWorldState(updated);

    const labelMap: Record<string, string> = {
      dance: currentLang === 'en' ? 'Dance sent to Omelette!' : currentLang === 'de' ? 'Tanz gesendet!' : '¡Baile enviado a la Tortilla!',
      disappoint: currentLang === 'en' ? 'Disappointment registered!' : currentLang === 'de' ? 'Enttäuschung registriert!' : '¡Decepción registrada!',
      flip: currentLang === 'en' ? 'Omelette flipped!' : currentLang === 'de' ? 'Gewendet!' : '¡Tortilla volteada!',
      offer_onion: currentLang === 'en' ? 'Onion offered!' : currentLang === 'de' ? 'Zwiebel angeboten!' : '¡Cebolla ofrecida!',
      check_temp: currentLang === 'en' ? 'Thermal core verified!' : currentLang === 'de' ? 'Thermocheck bestanden!' : '¡Centro térmico verificado!',
      reset: currentLang === 'en' ? 'Worldstate reset!' : currentLang === 'de' ? 'Zurückgesetzt!' : '¡Estado del mundo reiniciado!',
    };

    showToast(labelMap[actionType] || 'Acción ejecutada');
  };

  // Submit CLI Command
  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    const { nextState, output } = executeCliCommand(worldState, cliInput, currentLang);
    setWorldState(nextState);

    const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setCliHistory((prev) => [{ cmd: cliInput, out: output, time: timeStr }, ...prev.slice(0, 19)]);
    setCliInput('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const t = {
    title: currentLang === 'en' ? 'Tortilla Worldstate & Action Simulator' : currentLang === 'de' ? 'Tortilla-Weltzustand & Aktion-Simulator' : 'Simulador & Estado del Mundo de la Tortilla',
    subtitle: currentLang === 'en'
      ? 'Interact with the Omelette in real-time. Send actions (Dance, Express Disappointment, Flip, Check Core Temp) or type terminal CLI commands. All actions persist in Worldstate.'
      : currentLang === 'de'
      ? 'Interagiere in Echtzeit mit der Tortilla. Sende Aktionen (Tanzen, Enttäuschung zeigen, Wenden) oder nutze die CLI. Alle Aktionen bleiben im Weltzustand gespeichert.'
      : 'Interactúa con la tortilla en tiempo real. Envía acciones (Bailar, Mostrar Decepción, Voltear, Verificar Centro Térmico) o usa la consola CLI. Todo se guarda en el Worldstate.',
    actionsHeader: currentLang === 'en' ? 'Send Actions to Omelette' : currentLang === 'de' ? 'Aktionen an Tortilla senden' : 'Acciones Directas para la Tortilla',
    cliTab: currentLang === 'en' ? 'Command Line Terminal (CLI)' : currentLang === 'de' ? 'Kommandozeilen-Terminal (CLI)' : 'Terminal de Comandos (CLI)',
    historyTab: currentLang === 'en' ? 'Worldstate Action Log' : currentLang === 'de' ? 'Weltzustand-Protokoll' : 'Historial de Eventos del Estado',
    buttonsTab: currentLang === 'en' ? 'Action Buttons' : currentLang === 'de' ? 'Aktions-Buttons' : 'Botones de Acción',
    happiness: currentLang === 'en' ? 'Happiness Level' : currentLang === 'de' ? 'Fröhlichkeitsgrad' : 'Nivel de Felicidad',
    mood: currentLang === 'en' ? 'Current Mood' : currentLang === 'de' ? 'Aktuelle Stimmung' : 'Estado de Ánimo',
    danceBtn: currentLang === 'en' ? 'Dance for Omelette' : currentLang === 'de' ? 'Für Tortilla tanzen' : 'Bailar para la Tortilla',
    disappointBtn: currentLang === 'en' ? 'Be Disappointed' : currentLang === 'de' ? 'Enttäuschung zeigen' : 'Mostrar Decepción',
    flipBtn: currentLang === 'en' ? 'Flip in Pan' : currentLang === 'de' ? 'In Pfanne wenden' : 'Dar la Vuelta a la Sartén',
    onionBtn: currentLang === 'en' ? 'Offer Onion' : currentLang === 'de' ? 'Zwiebel anbieten' : 'Ofrecer Cebolla Caramelizada',
    tempBtn: currentLang === 'en' ? 'Verify Thermal Core' : currentLang === 'de' ? 'Kerntemperatur prüfen' : 'Verificar Centro Térmico',
    resetBtn: currentLang === 'en' ? 'Reset Worldstate' : currentLang === 'de' ? 'Weltzustand zurücksetzen' : 'Reiniciar Estado del Mundo',
    stats: {
      dances: currentLang === 'en' ? 'Dances' : currentLang === 'de' ? 'Tänze' : 'Bailes',
      disappointments: currentLang === 'en' ? 'Disappointments' : currentLang === 'de' ? 'Enttäuschungen' : 'Decepciones',
      flips: currentLang === 'en' ? 'Pan Flips' : currentLang === 'de' ? 'Wendungen' : 'Volteados',
      safety: currentLang === 'en' ? 'Thermal Core' : currentLang === 'de' ? 'Kerntemperatur' : 'Núcleo Térmico',
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292521] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-bold border border-amber-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#FFB800]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="card-notebook p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-6 shadow-sm">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 text-xs font-black shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#8D6E63]" />
            <span>Worldstate Persistence Engine v1.0</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold text-[#292521]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* LIVE TORTILLA STATUS & ANIMATED AVATAR CARD */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF9EA] via-[#FCF9F2] to-[#FFFDF9] border-2 border-[#FFB800] space-y-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Animated Omelette Visual Representation */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-500 via-[#FFB800] to-yellow-200 border-4 border-amber-600 shadow-xl flex items-center justify-center text-4xl relative transition-all duration-500 ${
                  isAnimating === 'dance'
                    ? 'animate-bounce scale-110 rotate-12 ring-8 ring-amber-300'
                    : isAnimating === 'disappoint'
                    ? 'scale-90 opacity-80 -rotate-12 border-stone-500 grayscale-30'
                    : isAnimating === 'flip'
                    ? 'animate-spin scale-105 ring-4 ring-amber-400'
                    : 'hover:scale-105'
                }`}
              >
                {/* Facial Expression Icon depending on happiness */}
                {worldState.happiness >= 60 ? (
                  <span className="text-4xl select-none">🍳✨</span>
                ) : worldState.happiness >= 30 ? (
                  <span className="text-4xl select-none">🍳😐</span>
                ) : (
                  <span className="text-4xl select-none">🍳💧</span>
                )}
              </div>
              <span className="px-3 py-1 rounded-full bg-[#292521] text-white text-xs font-bold shadow-xs">
                {worldState.currentMood[currentLang] || worldState.currentMood.es}
              </span>
            </div>

            {/* Happiness Progress & Key Stats */}
            <div className="flex-1 space-y-4 w-full">
              {/* Happiness Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#8D6E63]">
                  <span className="flex items-center gap-1.5">
                    <Smile className="w-4 h-4 text-[#FFB800]" />
                    <span>{t.happiness}</span>
                  </span>
                  <span className="font-mono font-black text-sm text-[#292521]">
                    {worldState.happiness} / 100
                  </span>
                </div>
                <div className="w-full h-4 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
                  <div
                    className={`h-full transition-all duration-500 ${
                      worldState.happiness >= 70
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                        : worldState.happiness >= 40
                        ? 'bg-gradient-to-r from-[#FFB800] to-amber-500'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${worldState.happiness}%` }}
                  />
                </div>
              </div>

              {/* Stat Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D5] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">{t.stats.dances}</span>
                  <p className="text-xl font-serif-heading font-black text-[#292521]">
                    {worldState.danceCount}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D5] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">{t.stats.disappointments}</span>
                  <p className="text-xl font-serif-heading font-black text-[#D32F2F]">
                    {worldState.disappointmentCount}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D5] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">{t.stats.flips}</span>
                  <p className="text-xl font-serif-heading font-black text-[#FFB800]">
                    {worldState.flipCount}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D5] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">{t.stats.safety}</span>
                  <p className="text-sm font-serif-heading font-extrabold text-[#2E7D32]">
                    <strong className="font-bold">70°C / 2 min</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex border-b border-[#E8E2D5] gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('buttons')}
            className={`px-5 py-3 font-serif-heading font-extrabold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'buttons'
                ? 'border-[#FFB800] text-[#292521] bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4 text-[#FFB800]" />
            <span>{t.buttonsTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cli')}
            className={`px-5 py-3 font-serif-heading font-extrabold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cli'
                ? 'border-[#FFB800] text-[#292521] bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#8D6E63]" />
            <span>{t.cliTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-3 font-serif-heading font-extrabold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'border-[#FFB800] text-[#292521] bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <History className="w-4 h-4 text-[#2E7D32]" />
            <span>{t.historyTab} ({worldState.actionLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: ACTION BUTTONS PANEL */}
        {activeTab === 'buttons' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Dance Button */}
              <button
                type="button"
                onClick={() => handleAction('dance')}
                className="p-5 rounded-2xl bg-white hover:bg-amber-50/70 border-2 border-[#E8E2D5] hover:border-[#FFB800] text-left space-y-2 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-125 transition-transform">💃</span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    +15 Felicidad
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.danceBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Send rhythmic dancing vibes. Increases happiness and dance counter.'
                    : currentLang === 'de'
                    ? 'Sende Tanz-Vibes an die Tortilla. Steigert die Freude.'
                    : 'Envía ritmo bailable a la sartén. Aumenta la felicidad de la tortilla.'}
                </p>
              </button>

              {/* Express Disappointment Button */}
              <button
                type="button"
                onClick={() => handleAction('disappoint')}
                className="p-5 rounded-2xl bg-white hover:bg-red-50/60 border-2 border-[#E8E2D5] hover:border-red-400 text-left space-y-2 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-125 transition-transform">😞</span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-red-100 text-red-900">
                    -20 Felicidad
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.disappointBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Express dramatic disappointment. Lowers happiness and logs emotional state.'
                    : currentLang === 'de'
                    ? 'Zeige Enttäuschung. Senkt die Freude der Tortilla.'
                    : 'Expresa decepción ante la tortilla. Disminuye su felicidad y registra el estado.'}
                </p>
              </button>

              {/* Flip Button */}
              <button
                type="button"
                onClick={() => handleAction('flip')}
                className="p-5 rounded-2xl bg-white hover:bg-amber-50/70 border-2 border-[#E8E2D5] hover:border-[#FFB800] text-left space-y-2 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-125 transition-transform">🍳</span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    +10 Felicidad
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.flipBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Execute pan flip maneuver. Golden perfection guaranteed.'
                    : currentLang === 'de'
                    ? 'PFannenwendung ausführen. Goldene Bräunung.'
                    : 'Ejecuta el volteado de sartén. Garantiza dorado parejo por ambos lados.'}
                </p>
              </button>

              {/* Offer Onion Button */}
              <button
                type="button"
                onClick={() => handleAction('offer_onion')}
                className="p-5 rounded-2xl bg-white hover:bg-amber-50/70 border-2 border-[#E8E2D5] hover:border-[#FFB800] text-left space-y-2 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-125 transition-transform">🧅</span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    +12 Felicidad
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.onionBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Offer sweet caramelized onions to activate concebollista allegiance.'
                    : currentLang === 'de'
                    ? 'Biete karamellisierte Zwiebeln an.'
                    : 'Ofrece cebolla pochada para activar la lealtad de la facción concebollista.'}
                </p>
              </button>

              {/* Check Core Temp Button */}
              <button
                type="button"
                onClick={() => handleAction('check_temp')}
                className="p-5 rounded-2xl bg-white hover:bg-emerald-50/70 border-2 border-[#E8E2D5] hover:border-emerald-500 text-left space-y-2 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-125 transition-transform">🛡️</span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    {currentLang === 'es' ? 'Seguridad' : currentLang === 'de' ? 'Sicherheit' : 'Safety'}
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.tempBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Verify thermal core stability and safe doneness.'
                    : currentLang === 'de'
                    ? 'Thermische Stabilität und sicheren Garpunkt prüfen.'
                    : 'Verifica la estabilidad térmica y el punto seguro de cuajado.'}
                </p>
              </button>

              {/* Reset Button */}
              <button
                type="button"
                onClick={() => handleAction('reset')}
                className="p-5 rounded-2xl bg-stone-100 hover:bg-stone-200 border-2 border-[#E8E2D5] text-left space-y-2 transition-all shadow-2xs cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <RotateCcw className="w-5 h-5 text-stone-600 group-hover:rotate-180 transition-transform" />
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                    Reset
                  </span>
                </div>
                <h3 className="text-base font-serif-heading font-extrabold text-[#292521]">
                  {t.resetBtn}
                </h3>
                <p className="text-xs text-foreground/70 font-sans">
                  {currentLang === 'en'
                    ? 'Reset Worldstate to initial defaults.'
                    : currentLang === 'de'
                    ? 'Weltzustand auf Standard zurücksetzen.'
                    : 'Restaura el estado del mundo a sus valores iniciales.'}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: COMMAND LINE TERMINAL (CLI) */}
        {activeTab === 'cli' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#1E1B18] text-amber-400 font-mono text-xs space-y-3 shadow-lg border border-stone-800">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-stone-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FFB800]" />
                  <span>Tortilla CLI v1.0.4 — Worldstate Console</span>
                </span>
                <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded">Bash / Terminal</span>
              </div>

              {/* Quick Command Suggestions */}
              <div className="flex flex-wrap gap-2 text-[11px] text-stone-300 pt-1">
                <span className="text-stone-500">Quick commands:</span>
                <button
                  type="button"
                  onClick={() => setCliInput('tortilla dance')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-300 cursor-pointer"
                >
                  tortilla dance
                </button>
                <button
                  type="button"
                  onClick={() => setCliInput('tortilla disappoint')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-300 cursor-pointer"
                >
                  tortilla disappoint
                </button>
                <button
                  type="button"
                  onClick={() => setCliInput('tortilla flip')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-300 cursor-pointer"
                >
                  tortilla flip
                </button>
                <button
                  type="button"
                  onClick={() => setCliInput('tortilla status')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-300 cursor-pointer"
                >
                  tortilla status
                </button>
                <button
                  type="button"
                  onClick={() => setCliInput('help')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-300 cursor-pointer"
                >
                  help
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCliSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Type 'tortilla dance', 'tortilla disappoint', or 'help'..."
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#FFB800]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFB800] hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-all cursor-pointer shrink-0"
                >
                  Run
                </button>
              </form>

              {/* CLI Output History */}
              <div className="max-h-60 overflow-y-auto space-y-3 pt-2 text-[11px] font-mono border-t border-stone-800">
                {cliHistory.length === 0 ? (
                  <p className="text-stone-500 italic">
                    {currentLang === 'en'
                      ? 'No commands executed yet. Type a command above.'
                      : currentLang === 'de'
                      ? 'Noch keine Befehle ausgeführt.'
                      : 'No se han ejecutado comandos aún. Escribe un comando arriba.'}
                  </p>
                ) : (
                  cliHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/80">
                      <div className="flex items-center justify-between text-stone-400 text-[10px]">
                        <span className="text-emerald-400">$ {item.cmd}</span>
                        <span>{item.time}</span>
                      </div>
                      <pre className="text-stone-200 whitespace-pre-wrap leading-relaxed">
                        {item.out}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORLDSTATE ACTION LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-3 animate-fadeIn">
            <h4 className="text-sm font-serif-heading font-extrabold text-[#292521]">
              {t.historyTab}
            </h4>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {worldState.actionLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                    log.actionType === 'dance'
                      ? 'bg-amber-50/70 border-amber-200'
                      : log.actionType === 'disappoint'
                      ? 'bg-red-50/70 border-red-200'
                      : log.actionType === 'check_temp'
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-white border-[#E8E2D5]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold uppercase text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                        {log.actionType}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        via {log.source}
                      </span>
                    </div>
                    <p className="text-foreground/90 font-sans leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: log.message[currentLang] || log.message.es }} />
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Footnote */}
        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {currentLang === 'es' ? (
              <>El simulador de estado del mundo actualiza y valida continuamente la seguridad higiénica y la temperatura ideal del núcleo térmico para garantizar una tortilla perfecta y segura.</>
            ) : currentLang === 'de' ? (
              <>Das Weltzustand-System prüft kontinuierlich die thermische Sicherheit und die Kerntemperatur für eine perfekte, sichere Tortilla.</>
            ) : (
              <>The worldstate engine continuously validates thermal core stability for a perfect, safe omelette experience.</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
