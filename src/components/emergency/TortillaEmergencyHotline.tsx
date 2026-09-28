import React, { useState, useRef, useEffect } from 'react';
import {
  PhoneCall,
  Flame,
  RotateCw,
  Thermometer,
  ShieldAlert,
  Droplet,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  RefreshCw,
  Copy,
  Check,
  Radio,
  ArrowRight,
  ArrowLeft,
  ChefHat,
  Share2,
  BookOpen,
  Timer,
  Info,
  Sparkles
} from 'lucide-react';
import {
  EMERGENCY_SCENARIOS,
  type EmergencyScenario,
  type EmergencyQuestion,
  type EmergencySolution
} from '@/data/emergencyHotline';
import { Button } from '@/components/ui/button';

interface TortillaEmergencyHotlineProps {
  lang?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Flame,
  RotateCw,
  Thermometer,
  ShieldAlert,
  Droplet,
  Droplets,
  AlertTriangle
};

export const TortillaEmergencyHotline: React.FC<TortillaEmergencyHotlineProps> = ({
  lang = 'es'
}) => {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';

  // State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [activeSolution, setActiveSolution] = useState<EmergencySolution | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedBaptism, setCopiedBaptism] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Audio Context Ref for synthesized retro dispatch sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound Synthesizer
  const playSound = (type: 'siren' | 'click' | 'success' | 'alert') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'siren') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.linearRampToValueAtTime(920, now + 0.2);
        osc.frequency.linearRampToValueAtTime(650, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio playback fails gracefully if blocked
    }
  };

  // Translations
  const t = {
    es: {
      hotlineBadge: 'LÍNEA ROJA DE SALVAMENTO CULINARIO 112',
      operatorOnline: 'Operador de Guardia Conectado',
      mainTitle: 'Urgencias Tortilleras',
      mainSubtitle: 'Triaje interactivo de crisis en sartén. Diagnóstico paso a paso y protocolos de salvamento para cuando el desastre acecha tus fogones.',
      selectCrisisHeading: 'Selecciona tu Código de Emergencia',
      selectCrisisSubtitle: 'No apagues el fuego todavía. Haz clic en la catástrofe que estás viviendo ahora mismo:',
      soundToggleOn: 'Sonido de radio activo',
      soundToggleOff: 'Activar sonido de guardia',
      emergencyCode: 'Código',
      beginTriage: 'Iniciar Triaje de Urgencia',
      stepIndicator: 'Paso de Diagnóstico',
      operatorTitle: 'Transmisión del Operador Jefe',
      backButton: 'Volver a la pregunta anterior',
      cancelTriage: 'Cambiar de catástrofe',
      solutionHeading: 'Prescripción Oficial de Salvamento',
      criticalTime: 'Tiempo de reacción crítico',
      successExpectation: 'Probabilidad de éxito',
      safetyNoticeTitle: 'Protocolo de Seguridad Alimentaria',
      whyHappenedTitle: '¿Por qué ocurrió este desastre?',
      stepsTitle: 'Instrucciones Quirúrgicas Paso a Paso',
      markStepCompleted: 'Hecho',
      equipmentTitle: 'Material de Intervención Rápida',
      baptismTitle: 'Bautizo Gourmet para Salvar las Apariencias',
      baptismSubtitle: 'Lo que debes anunciar a tus comensales con total aplomo para parecer un chef vanguardista:',
      copyBaptism: 'Copiar Coartada Gourmet',
      copied: '¡Copiado!',
      proTipTitle: 'Consejo Magistral del Cuaderno',
      copyFullReport: 'Copiar Informe Oficial de Rescate 112',
      restartCall: 'Nueva Consulta de Urgencia',
      firstAidHeading: 'Los 5 Mandamientos de Primeros Auxilios Tortilleros',
      firstAid: [
        {
          title: '1. Jamás aplastes la tortilla con la espátula',
          desc: 'Presionar la masa expulsa la humedad intersticial y estrangula los alvéolos de huevo meloso, convirtiéndola en un mazacote.'
        },
        {
          title: '2. El aceite perimetral actúa por capilaridad',
          desc: 'Si se resiste al fondo, un hilo fino de AOVE por las paredes entra por gravedad bajo la corteza al enfriarse 30 segundos.'
        },
        {
          title: '3. El plato para voltear debe ser completamente plano',
          desc: 'Un plato hondo arquea la base y crea un punto de fractura letal en el centro al dar la vuelta.'
        },
        {
          title: '4. Respeta las temperaturas higiénicas de seguridad',
          desc: 'Recuerda siempre la norma de oro: **63°C durante 20 segundos** para centros cremosos o **70°C durante 2 minutos** para seguridad bacteriológica total.'
        },
        {
          title: '5. Una tortilla rota es un revuelto de alta cocina',
          desc: 'En gastronomía no existen los fracasos, solo las reinterpretaciones de taberna ilustrada servidas sobre tostas calientes de pan.'
        }
      ]
    },
    en: {
      hotlineBadge: 'RED LINE CULINARY RESCUE 112',
      operatorOnline: 'On-Duty Chief Triage Specialist Active',
      mainTitle: 'Tortilla Emergency Hotline',
      mainSubtitle: 'Interactive decision tree for stovetop crises. Step-by-step diagnostic and salvage procedures when disaster strikes your skillet.',
      selectCrisisHeading: 'Select Your Stovetop Emergency Code',
      selectCrisisSubtitle: 'Do not shut down the burner yet. Click the catastrophe you are facing right now:',
      soundToggleOn: 'Radio audio active',
      soundToggleOff: 'Enable dispatch sounds',
      emergencyCode: 'Code',
      beginTriage: 'Begin Emergency Triage',
      stepIndicator: 'Diagnostic Step',
      operatorTitle: 'Chief Dispatcher Radio Transmission',
      backButton: 'Back to previous question',
      cancelTriage: 'Switch catastrophe',
      solutionHeading: 'Official Salvage Prescription',
      criticalTime: 'Critical reaction window',
      successExpectation: 'Rescue probability',
      safetyNoticeTitle: 'Food Safety Threshold Standard',
      whyHappenedTitle: 'Why did this disaster occur?',
      stepsTitle: 'Surgical Step-by-Step Procedure',
      markStepCompleted: 'Done',
      equipmentTitle: 'Intervention Gear Required',
      baptismTitle: 'Gourmet Cover Story for Dinner Guests',
      baptismSubtitle: 'What to tell your guests with utmost composure to look like an avant-garde culinary genius:',
      copyBaptism: 'Copy Gourmet Alibi',
      copied: 'Copied!',
      proTipTitle: 'Master Note from the Kitchen Notebook',
      copyFullReport: 'Copy Official 112 Intervention Report',
      restartCall: 'New Emergency Triage',
      firstAidHeading: 'The 5 Commandments of Tortilla First Aid',
      firstAid: [
        {
          title: '1. Never crush the omelette with a spatula',
          desc: 'Pressing down forces out internal moisture and collapses egg foam cells, turning it dense and chalky.'
        },
        {
          title: '2. Perimeter oil flows via capillary suction',
          desc: 'If stuck, a thin ribbon of warm EVOO along the rim descends beneath the crust as heat settles for 30 seconds.'
        },
        {
          title: '3. Your flipping plate must be strictly flat',
          desc: 'Curved soup plates bow the crust and trigger catastrophic structural fractures down the center.'
        },
        {
          title: '4. Respect the gold microbiological safety norms',
          desc: 'Always verify **63°C for 20 seconds** for molten yolks or **70°C for 2 minutes** for total pathogen clearance.'
        },
        {
          title: '5. A shattered tortilla is a high-end tavern revuelto',
          desc: 'There are no failures in culinary art, only tavern-style deconstructions proudly mounded over crusty sourdough toast.'
        }
      ]
    },
    de: {
      hotlineBadge: 'CULINARY RESCUE NOTRUF 112',
      operatorOnline: 'Diensthabender Tortilla-Notfalloperator aktiv',
      mainTitle: 'Tortilla-Notruf 112',
      mainSubtitle: 'Interaktiver Entscheidungsbaum für Pfannen-Krisen. Schritt-für-Schritt-Diagnose und Rettungsprotokolle für brenzlige Herdsituationen.',
      selectCrisisHeading: 'Wähle deinen Notfall-Code',
      selectCrisisSubtitle: 'Den Herd jetzt noch nicht abschalten! Klicke auf die Katastrophe, die sich gerade abspielt:',
      soundToggleOn: 'Funkton aktiv',
      soundToggleOff: 'Notruf-Sound aktivieren',
      emergencyCode: 'Code',
      beginTriage: 'Notfall-Triagierung starten',
      stepIndicator: 'Diagnoseschritt',
      operatorTitle: 'Funkübertragung des Notruf-Leiters',
      backButton: 'Zurück zur vorigen Frage',
      cancelTriage: 'Andere Katastrophe wählen',
      solutionHeading: 'Offizielles Rettungs-Rezept',
      criticalTime: 'Kritisches Zeitfenster',
      successExpectation: 'Erfolgsquote',
      safetyNoticeTitle: 'Mikrobiologischer Sicherheitsstandard',
      whyHappenedTitle: 'Warum ist dieses Malheur passiert?',
      stepsTitle: 'Präzise Schritt-für-Schritt-Anleitung',
      markStepCompleted: 'Erledigt',
      equipmentTitle: 'Benötigtes Einsatz-Equipment',
      baptismTitle: 'Gourmet-Ausrede vor deinen Gästen',
      baptismSubtitle: 'Was du deinen Gästen mit vollendeter Gelassenheit servierst, um als avantgardistischer Meisterkoch zu glänzen:',
      copyBaptism: 'Gourmet-Ausrede kopieren',
      copied: 'Kopiert!',
      proTipTitle: 'Meistertipp aus dem Küchenbuch',
      copyFullReport: 'Offiziellen 112-Einsatzbericht kopieren',
      restartCall: 'Neuen Notruf starten',
      firstAidHeading: 'Die 5 Gebote der Tortilla-Ersten-Hilfe',
      firstAid: [
        {
          title: '1. Niemals die Tortilla mit dem Spatel flachdrücken',
          desc: 'Druck presst Feuchtigkeit heraus und zerstört die luftige Ei-Emulsion – die Tortilla wird zäh wie Gummi.'
        },
        {
          title: '2. Randöl kriecht durch Kapillarwirkung unter den Boden',
          desc: 'Ein feiner Strahl Olivenöl am Rand zieht sich bei 30 Sekunden Abkühlung unter die verbackene Kruste.'
        },
        {
          title: '3. Der Wende-Teller muss vollkommen flach sein',
          desc: 'Tiefe Teller biegen die Scheibe durch und erzeugen verheerende Längsrisse beim Umdrehen.'
        },
        {
          title: '4. Beachte stets die mikrobiologischen Sicherheitsgrenzen',
          desc: 'Merke dir: **63°C für 20 Sekunden** für saftige Kerne oder **70°C für 2 Minuten** für absolute Keimfreiheit.'
        },
        {
          title: '5. Eine zerbrochene Tortilla ist ein Gourmet-Revuelto',
          desc: 'In der spanischen Küche gibt es kein Scheitern: Heiß auf geröstetes Landbrot geschichtet gilt es als Delikatesse!'
        }
      ]
    }
  }[currentLang];

  const currentScenario: EmergencyScenario | null = selectedScenarioId
    ? EMERGENCY_SCENARIOS[selectedScenarioId] || null
    : null;

  const currentQuestion: EmergencyQuestion | null =
    currentScenario && currentQuestionId
      ? currentScenario.questions[currentQuestionId] || null
      : null;

  // Handlers
  const handleSelectScenario = (scenarioId: string) => {
    playSound('alert');
    setSelectedScenarioId(scenarioId);
    const scenario = EMERGENCY_SCENARIOS[scenarioId];
    if (scenario) {
      setCurrentQuestionId(scenario.initialQuestionId);
      setQuestionHistory([scenario.initialQuestionId]);
      setActiveSolution(null);
      setCompletedSteps({});
    }
  };

  const handleSelectOption = (option: { nextQuestionId?: string; solutionId?: string }) => {
    playSound('click');
    if (!currentScenario) return;

    if (option.solutionId && currentScenario.solutions[option.solutionId]) {
      playSound('success');
      setActiveSolution(currentScenario.solutions[option.solutionId]);
      setCurrentQuestionId(null);
    } else if (option.nextQuestionId && currentScenario.questions[option.nextQuestionId]) {
      setQuestionHistory((prev) => [...prev, option.nextQuestionId!]);
      setCurrentQuestionId(option.nextQuestionId);
    }
  };

  const handleBackQuestion = () => {
    playSound('click');
    if (activeSolution) {
      // Step back from solution to last question
      const lastQ = questionHistory[questionHistory.length - 1];
      setActiveSolution(null);
      setCurrentQuestionId(lastQ);
      return;
    }
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevQ = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestionId(prevQ);
    } else {
      // Return to scenario selection
      handleReset();
    }
  };

  const handleReset = () => {
    playSound('click');
    setSelectedScenarioId(null);
    setQuestionHistory([]);
    setCurrentQuestionId(null);
    setActiveSolution(null);
    setCompletedSteps({});
  };

  const toggleStep = (index: number) => {
    playSound('click');
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const copyBaptismText = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedBaptism(true);
      playSound('success');
      setTimeout(() => setCopiedBaptism(false), 2200);
    }
  };

  const copyFullReportText = () => {
    if (!currentScenario || !activeSolution) return;
    const reportText = `🚨 [INFORME DE INTERVENCIÓN 112 - TORTILLADEPATATAS.ORG]
Catástrofe: ${currentScenario.title[currentLang]} (${currentScenario.code})
Prescripción: ${activeSolution.codeName[currentLang]}
Tiempo Crítico: ${activeSolution.timeLimit[currentLang]}
Probabilidad de Éxito: ${activeSolution.successRate}

COARTADA GOURMET:
${activeSolution.gourmetBaptism[currentLang]}

PASOS DE RESCATE:
${activeSolution.steps.map((s, idx) => `${idx + 1}. ${s[currentLang]}`).join('\n')}

SEGURIDAD:
${activeSolution.safetyNote[currentLang]}

Generado por el Servicio Oficial de Urgencias Tortilleras (tortilladepatatas.org)`;

    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(reportText);
      setCopiedReport(true);
      playSound('success');
      setTimeout(() => setCopiedReport(false), 2200);
    }
  };

  return (
    <div id="tortilla-emergency-hotline-root" className="space-y-10">
      {/* Hotline Dispatch Terminal Header */}
      <section
        id="hotline-header-terminal"
        className="card-notebook p-6 sm:p-8 bg-gradient-to-br from-[#B00020]/10 via-[#FFB800]/5 to-[#FCF9F2] dark:from-[#B00020]/25 dark:via-[#1C1917] dark:to-[#1C1917] border-3 border-[#B00020] rounded-3xl shadow-stacked-parchment relative overflow-hidden"
      >
        {/* Pulsing Emergency Light & Sound Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B00020]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#D32F2F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D32F2F] border-2 border-white dark:border-zinc-900 shadow-md"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-black tracking-widest text-[#B00020] dark:text-[#FF8A00] uppercase">
                {t.hotlineBadge}
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                {t.operatorOnline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="hotline-sound-toggle-btn"
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSound('alert');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                soundEnabled
                  ? 'bg-[#D32F2F] text-white border-[#B00020] shadow-xs'
                  : 'bg-white/80 dark:bg-zinc-800 text-muted-foreground border-zinc-300 dark:border-zinc-700 hover:text-foreground'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? t.soundToggleOn : t.soundToggleOff}</span>
            </button>
          </div>
        </div>

        {/* Title & Siren Hero */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B00020]/15 text-[#B00020] dark:text-[#FF8A00] text-xs font-black tracking-wide font-mono">
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>112 TORTILLA AID UNIT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif-heading text-foreground dark:text-[#F5E6BE] tracking-tight leading-tight">
              {t.mainTitle}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.mainSubtitle}
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-mono space-y-1.5 max-w-xs">
            <div className="font-bold flex items-center gap-1.5 text-[#B00020] dark:text-[#FF8A00]">
              <ShieldAlert className="w-4 h-4" />
              <span>ESTÁNDAR HIGIÉNICO</span>
            </div>
            <p className="leading-snug text-[11px]">
              Rescate térmico verificado: <strong>70°C durante 2 minutos</strong> o <strong>63°C durante 20 segundos</strong>. Límite ambiente: <strong>4 horas</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* VIEW 1: SCENARIO SELECTION (CRISIS GRID) */}
      {!selectedScenarioId && (
        <section id="hotline-scenario-selection" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black font-serif-heading text-foreground dark:text-[#F5E6BE] flex items-center gap-2.5">
              <AlertTriangle className="w-6 h-6 text-[#D32F2F]" />
              <span>{t.selectCrisisHeading}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t.selectCrisisSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.values(EMERGENCY_SCENARIOS).map((scenario) => {
              const IconComp = iconMap[scenario.iconName] || AlertTriangle;
              return (
                <button
                  key={scenario.id}
                  id={`scenario-card-${scenario.id}`}
                  type="button"
                  onClick={() => handleSelectScenario(scenario.id)}
                  className="card-notebook p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#D32F2F] border-2 border-[#E8E2D5] dark:border-zinc-800 bg-[#FCF9F2] dark:bg-[#262220] rounded-2xl flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[#D32F2F]/10 text-[#D32F2F] dark:bg-[#D32F2F]/25 dark:text-[#FF8A00]">
                        {scenario.code}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground bg-zinc-200/60 dark:bg-zinc-800/80 px-2 py-0.5 rounded-full">
                        {scenario.badge[currentLang]}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-foreground dark:text-zinc-100 group-hover:text-[#D32F2F] dark:group-hover:text-[#FF8A00] transition-colors leading-snug">
                        {scenario.title[currentLang]}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {scenario.subtitle[currentLang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-[#D32F2F] dark:text-[#FF8A00]">
                    <span>{t.beginTriage}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW 2: ACTIVE QUESTION STEP (DECISION TREE NODE) */}
      {selectedScenarioId && currentQuestion && !activeSolution && (
        <section
          id="hotline-decision-step"
          className="card-notebook p-6 sm:p-8 bg-[#FAF6EE] dark:bg-[#201D1B] border-2 border-[#FFB800] rounded-3xl shadow-stacked-parchment space-y-6"
        >
          {/* Breadcrumb / Scenario indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D5] dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#D32F2F] text-white">
                {currentScenario?.code}
              </span>
              <span className="text-xs font-bold text-foreground dark:text-zinc-200">
                {currentScenario?.title[currentLang]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-back-triage-step"
                type="button"
                onClick={handleBackQuestion}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/60 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backButton}</span>
              </button>
              <button
                id="btn-cancel-triage"
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[#D32F2F] hover:underline px-2 py-1.5"
              >
                {t.cancelTriage}
              </button>
            </div>
          </div>

          {/* Operator Commentary Box (Radio dispatch style) */}
          <div className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 dark:bg-black dark:border dark:border-zinc-800 space-y-2 relative overflow-hidden shadow-inner">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.operatorTitle}</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed italic">
              {currentQuestion.operatorCommentary[currentLang]}
            </p>
          </div>

          {/* Current Question */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] uppercase font-mono tracking-wider">
              {t.stepIndicator} {questionHistory.length}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-foreground dark:text-[#F5E6BE]">
              {currentQuestion.question[currentLang]}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {currentQuestion.context[currentLang]}
            </p>
          </div>

          {/* Options (Decision Branching) */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                id={`option-btn-${option.id}`}
                type="button"
                onClick={() => handleSelectOption(option)}
                className="w-full text-left p-4 rounded-2xl border-2 border-[#E8E2D5] dark:border-zinc-800 hover:border-[#FFB800] bg-white dark:bg-zinc-900 transition-all hover:translate-x-1 shadow-2xs hover:shadow-md flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/15 text-amber-800 dark:text-[#FFB800] font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#FFB800] group-hover:text-zinc-900 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground dark:text-zinc-200 leading-relaxed">
                    {option.text[currentLang]}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 dark:text-[#FFB800] shrink-0 group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* VIEW 3: OFFICIAL SALVAGE PRESCRIPTION (TERMINAL SOLUTION) */}
      {selectedScenarioId && activeSolution && (
        <section
          id="hotline-solution-card"
          className="card-notebook p-6 sm:p-9 bg-[#FCF9F2] dark:bg-[#1E1B19] border-3 border-emerald-600/70 dark:border-emerald-500/80 rounded-3xl shadow-stacked-parchment space-y-8 animate-in fade-in duration-300"
        >
          {/* Header with Code Name & Success Rate */}
          <div className="space-y-4 border-b border-[#E8E2D5] dark:border-zinc-800 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-xs">
                  {currentScenario?.code} RESOLUTION
                </span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800">
                  {activeSolution.successRate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-stepback-from-solution"
                  type="button"
                  onClick={handleBackQuestion}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.backButton}</span>
                </button>
                <button
                  id="btn-restart-hotline"
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-[#D32F2F] hover:underline px-2 py-1.5 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.restartCall}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                {t.solutionHeading}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif-heading text-foreground dark:text-[#F5E6BE] leading-tight">
                {activeSolution.codeName[currentLang]}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2.5 font-medium">
                <Timer className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>{t.criticalTime}:</strong> {activeSolution.timeLimit[currentLang]}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{t.successExpectation}:</strong> {activeSolution.successRate}
                </span>
              </div>
            </div>
          </div>

          {/* Gourmet Cover Story (Bautizo de Urgencia) */}
          <div
            id="gourmet-baptism-card"
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-[#FFB800] space-y-3 relative shadow-xs"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-black font-mono text-amber-900 dark:text-[#FFB800] uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-[#FF8A00]" />
                <span>{t.baptismTitle}</span>
              </div>
              <button
                id="btn-copy-gourmet-baptism"
                type="button"
                onClick={() => copyBaptismText(activeSolution.gourmetBaptism[currentLang])}
                className="text-xs font-bold text-amber-900 dark:text-[#FFB800] hover:text-foreground flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-zinc-800/80 border border-amber-400/40 hover:bg-white transition-colors"
              >
                {copiedBaptism ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBaptism ? t.copied : t.copyBaptism}</span>
              </button>
            </div>

            <p className="text-sm sm:text-base font-serif-heading font-black text-foreground dark:text-amber-100 italic leading-snug">
              {activeSolution.gourmetBaptism[currentLang]}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.baptismSubtitle}
            </p>
          </div>

          {/* Step-by-Step Surgical Rescue (Interactive Checklist) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold font-serif-heading text-foreground dark:text-zinc-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{t.stepsTitle}</span>
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {Object.values(completedSteps).filter(Boolean).length} / {activeSolution.steps.length} {t.markStepCompleted}
              </span>
            </div>

            <div className="space-y-3">
              {activeSolution.steps.map((step, idx) => {
                const isDone = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    id={`step-item-${idx}`}
                    onClick={() => toggleStep(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isDone
                        ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/40 opacity-85'
                        : 'bg-white dark:bg-zinc-900 border-[#E8E2D5] dark:border-zinc-800 hover:border-amber-400'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-zinc-400 dark:border-zinc-600'
                      }`}
                    >
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="space-y-1">
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDone
                            ? 'line-through text-muted-foreground'
                            : 'font-medium text-foreground dark:text-zinc-200'
                        }`}
                      >
                        {step[currentLang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Food Safety & Microbiological Standard (Adhering to Mandatory Bolding Rule) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#D32F2F]/10 dark:bg-[#D32F2F]/20 border-2 border-[#D32F2F]/40 text-[#B00020] dark:text-[#FF8A00] space-y-2">
            <div className="flex items-center gap-2 text-xs font-black font-mono uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-[#D32F2F]" />
              <span>{t.safetyNoticeTitle}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-foreground dark:text-zinc-200">
              {activeSolution.safetyNote[currentLang]}
            </p>
          </div>

          {/* Intervention Gear & Root Cause */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-[#E8E2D5] dark:border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-foreground dark:text-zinc-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" />
                <span>{t.whyHappenedTitle}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeSolution.whyItHappened[currentLang]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-[#E8E2D5] dark:border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-foreground dark:text-zinc-200 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#FFB800]" />
                <span>{t.equipmentTitle}</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {activeSolution.equipmentNeeded.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{eq[currentLang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Master Pro-Tip */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
            <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider font-mono text-[11px]">
                {t.proTipTitle}
              </span>
              <p className="leading-relaxed">
                {activeSolution.proTip[currentLang]}
              </p>
            </div>
          </div>

          {/* Action Footer: Copy Full Report & Restart */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E2D5] dark:border-zinc-800">
            <button
              id="btn-copy-full-emergency-report"
              type="button"
              onClick={copyFullReportText}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedReport ? t.copied : t.copyFullReport}</span>
            </button>

            <button
              id="btn-bottom-restart-hotline"
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-foreground font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-amber-600" />
              <span>{t.restartCall}</span>
            </button>
          </div>
        </section>
      )}

      {/* QUICK FIRST AID COMMANDMENTS CHEATSHEET */}
      <section
        id="hotline-first-aid-cheatsheet"
        className="card-notebook p-6 sm:p-8 bg-[#FAF6EE] dark:bg-[#201D1B] border-2 border-[#E8E2D5] dark:border-zinc-800 rounded-3xl space-y-6 shadow-stacked-parchment"
      >
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-foreground dark:text-[#F5E6BE] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D32F2F]" />
            <span>{t.firstAidHeading}</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            {currentLang === 'es'
              ? 'Reglas de oro de física de fluidos y termodinámica para tener siempre a mano junto al fuego.'
              : currentLang === 'de'
              ? 'Goldene Regeln der Küchenphysik und Thermodynamik, die du stets griffbereit haben solltest.'
              : 'Golden principles of fluid mechanics and thermodynamics to keep right beside the stovetop.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.firstAid.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-[#E8E2D5] dark:border-zinc-800 space-y-1.5"
            >
              <div className="font-bold text-xs text-[#8D6E63] dark:text-[#FFB800] leading-snug">
                {rule.title}
              </div>
              <p
                className="text-xs text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: rule.desc }}
              />
            </div>
          ))}
        </div>

        {/* Quick Navigation Doors to Sister Tools */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-muted-foreground font-medium">
            {currentLang === 'es' ? '¿Prefieres prevenir antes que curar?' : currentLang === 'de' ? 'Vorbeugen statt heilen?' : 'Prevention beats cure?'}
          </span>
          <div className="flex flex-wrap items-center gap-3 font-bold">
            <a
              href={`/${currentLang}/asistente`}
              className="text-[#FF8A00] hover:underline flex items-center gap-1"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Temporizador & Asistente Manos Libres' : currentLang === 'de' ? 'Küchen-Timer & Assistent' : 'Hands-Free Cooking Timer'}</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href={`/${currentLang}/humor`}
              className="text-amber-800 dark:text-[#FFB800] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Detector de Sacrilegios & Humor' : currentLang === 'de' ? 'Humor & Orakel' : 'Humor & Lore'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
