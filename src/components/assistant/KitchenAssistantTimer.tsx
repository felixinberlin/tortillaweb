import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Flame,
  ChefHat,
  Egg,
  RotateCw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Utensils,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  SunMedium,
  Check,
  Volume1,
  Thermometer,
  Eye,
  Info
} from 'lucide-react';
import {
  COOKING_STEPS,
  calculateAssistantDefaults,
  getStepDurations,
  type CookingStyle,
  type PanDiameter,
  type CookingStepConfig
} from '@/lib/timer/kitchenTimerEngine';
import { kitchenSynth } from '@/lib/audio/kitchenSynth';
import { SAFETY_COLORS, type SupportedLang } from '@/lib/safetyCanon';

interface KitchenAssistantTimerProps {
  lang?: SupportedLang;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  ChefHat,
  Flame,
  Egg,
  RotateCw,
  Sparkles,
  ShieldCheck,
};

export const KitchenAssistantTimer: React.FC<KitchenAssistantTimerProps> = ({
  lang = 'es',
}) => {
  const currentLang: SupportedLang = lang === 'en' || lang === 'de' ? lang : 'es';

  // Config State
  const [style, setStyle] = useState<CookingStyle>('clasica');
  const [panDiameter, setPanDiameter] = useState<PanDiameter>(24);
  const [withOnion, setWithOnion] = useState<boolean>(true);

  // Assistant State
  const derivedSpecs = useMemo(() => {
    return calculateAssistantDefaults(style, panDiameter, withOnion);
  }, [style, panDiameter, withOnion]);

  const stepDurations = useMemo(() => {
    return getStepDurations(style, panDiameter, withOnion);
  }, [style, panDiameter, withOnion]);

  // Stepper & Active Timer State
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const activeStep: CookingStepConfig = COOKING_STEPS[currentStepIndex];
  const totalSteps = COOKING_STEPS.length;

  const [timeLeft, setTimeLeft] = useState<number>(stepDurations[activeStep.id]);
  const [totalStepSeconds, setTotalStepSeconds] = useState<number>(stepDurations[activeStep.id]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedStepIds, setCompletedStepIds] = useState<Set<number>>(new Set());

  // Audio & Hands-Free Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [metronomeActive, setMetronomeActive] = useState<boolean>(false);
  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(false);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const metronomeRef = useRef<NodeJS.Timeout | null>(null);
  const wakeLockSentinelRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Update timeLeft when step or config changes (if not running)
  useEffect(() => {
    if (!isRunning) {
      const duration = stepDurations[activeStep.id];
      setTimeLeft(duration);
      setTotalStepSeconds(duration);
    }
  }, [currentStepIndex, stepDurations, activeStep.id]);

  // Sync sound settings with engine
  useEffect(() => {
    kitchenSynth.setSoundEnabled(soundEnabled);
    kitchenSynth.setVoiceEnabled(voiceEnabled);
  }, [soundEnabled, voiceEnabled]);

  // Screen Wake Lock API (Keeps screen awake on mobile / tablet in the kitchen)
  const requestWakeLock = useCallback(async () => {
    if (typeof window !== 'undefined' && 'wakeLock' in navigator) {
      try {
        const sentinel = await (navigator as any).wakeLock.request('screen');
        wakeLockSentinelRef.current = sentinel;
        setWakeLockActive(true);
        sentinel.addEventListener('release', () => {
          setWakeLockActive(false);
        });
      } catch {
        setWakeLockActive(false);
      }
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockSentinelRef.current) {
      wakeLockSentinelRef.current.release().catch(() => {});
      wakeLockSentinelRef.current = null;
      setWakeLockActive(false);
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => {
      releaseWakeLock();
    };
  }, [isRunning, requestWakeLock, releaseWakeLock]);

  // Metronome for Step 1 (Potato slicing cadence at 60 bpm)
  useEffect(() => {
    if (metronomeActive && soundEnabled) {
      metronomeRef.current = setInterval(() => {
        kitchenSynth.playChime('metronome');
      }, 1000);
    } else {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
    }
    return () => {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
    };
  }, [metronomeActive, soundEnabled]);

  // Step Completion Handler
  const handleStepComplete = useCallback(() => {
    setIsRunning(false);
    setCompletedStepIds((prev) => new Set([...prev, activeStep.id]));

    if (activeStep.isFlipStep) {
      kitchenSynth.playChime('flipCue');
    } else if (activeStep.isSafetyStep) {
      kitchenSynth.playChime('safetyAlert');
      kitchenSynth.playChime('stepComplete');
    } else {
      kitchenSynth.playChime('stepComplete');
    }

    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextStep = COOKING_STEPS[nextIdx];
      setCurrentStepIndex(nextIdx);
      const nextDuration = stepDurations[nextStep.id];
      setTimeLeft(nextDuration);
      setTotalStepSeconds(nextDuration);

      if (voiceEnabled) {
        setTimeout(() => {
          kitchenSynth.speakVoice(nextStep.spokenPrompt[currentLang], currentLang);
        }, 1200);
      }
    } else {
      if (voiceEnabled) {
        setTimeout(() => {
          const finishedMsg: Record<SupportedLang, string> = {
            es: '¡Enhorabuena! Has completado la tortilla según el estándar maestro. ¡A disfrutar!',
            en: 'Congratulations! You have completed your Spanish tortilla following the master standard. Enjoy!',
            de: 'Herzlichen Glückwunsch! Deine spanische Tortilla ist nach Meisterstandard vollendet. Guten Appetit!',
          };
          kitchenSynth.speakVoice(finishedMsg[currentLang], currentLang);
        }, 1000);
      }
    }
  }, [activeStep, currentStepIndex, totalSteps, stepDurations, voiceEnabled, currentLang]);

  // Countdown Timer Interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          // Acoustic warnings at specific milestones
          const nextVal = prev - 1;

          // Halfway chime for long confit poach (Step 2)
          if (activeStep.id === 2 && nextVal === Math.floor(totalStepSeconds / 2)) {
            kitchenSynth.playChime('halfway');
            if (voiceEnabled) {
              const halfMsg: Record<SupportedLang, string> = {
                es: 'Mitad del tiempo de pochado. Comprueba que el aceite burbujee suavemente.',
                en: 'Halfway through poaching. Ensure the oil is simmering gently.',
                de: 'Halbzeit beim Pochieren. Prüfe, ob das Öl sanft perlt.',
              };
              kitchenSynth.speakVoice(halfMsg[currentLang], currentLang);
            }
          }

          // Flip step countdown 3, 2, 1
          if (activeStep.isFlipStep && nextVal <= 3 && nextVal > 0) {
            kitchenSynth.playChime('countdown');
          }

          // Final 3 seconds for searing
          if ((activeStep.id === 4 || activeStep.id === 6) && nextVal <= 3 && nextVal > 0) {
            kitchenSynth.playChime('countdown');
          }

          if (nextVal <= 0) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleStepComplete();
            return 0;
          }
          return nextVal;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, activeStep, totalStepSeconds, voiceEnabled, currentLang, handleStepComplete]);

  // Actions
  const togglePlayPause = () => {
    if (!isRunning) {
      kitchenSynth.playChime('stepStart');
      if (voiceEnabled && timeLeft === totalStepSeconds) {
        kitchenSynth.speakVoice(activeStep.spokenPrompt[currentLang], currentLang);
      }
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleNextStep = () => {
    setIsRunning(false);
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextStep = COOKING_STEPS[nextIdx];
      setCurrentStepIndex(nextIdx);
      const dur = stepDurations[nextStep.id];
      setTimeLeft(dur);
      setTotalStepSeconds(dur);
      kitchenSynth.playChime('stepStart');
      if (voiceEnabled) {
        kitchenSynth.speakVoice(nextStep.spokenPrompt[currentLang], currentLang);
      }
    }
  };

  const handlePrevStep = () => {
    setIsRunning(false);
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      const prevStep = COOKING_STEPS[prevIdx];
      setCurrentStepIndex(prevIdx);
      const dur = stepDurations[prevStep.id];
      setTimeLeft(dur);
      setTotalStepSeconds(dur);
      kitchenSynth.playChime('stepStart');
    }
  };

  const handleResetStep = () => {
    setIsRunning(false);
    const dur = stepDurations[activeStep.id];
    setTimeLeft(dur);
    setTotalStepSeconds(dur);
  };

  const adjustTime = (deltaSeconds: number) => {
    setTimeLeft((prev) => {
      const next = Math.max(5, prev + deltaSeconds);
      if (next > totalStepSeconds) {
        setTotalStepSeconds(next);
      }
      return next;
    });
  };

  const testAudio = () => {
    kitchenSynth.playChime('flipCue');
    if (voiceEnabled) {
      const testMsg: Record<SupportedLang, string> = {
        es: '¡Sonido y voz verificados para el asistente de cocina!',
        en: 'Sound and voice verified for your kitchen assistant!',
        de: 'Audio und Sprachführung erfolgreich geprüft!',
      };
      kitchenSynth.speakVoice(testMsg[currentLang], currentLang);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard Shortcuts for Hands-Free Kitchen Use
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'KeyN' || e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextStep();
      } else if (e.code === 'KeyB' || e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleResetStep();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        setSoundEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Time formatting
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular gauge calculations
  const progressPercent = totalStepSeconds > 0 ? ((totalStepSeconds - timeLeft) / totalStepSeconds) * 100 : 0;
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const ActiveStepIcon = STEP_ICONS[activeStep.icon] || ChefHat;

  // Localized UI strings
  const labels: Record<SupportedLang, Record<string, string>> = {
    es: {
      headerTitle: 'Asistente de Cocina & Temporizador Interactivo',
      headerSubtitle: 'Acompañamiento guiado paso a paso con alertas acústicas y voz manos libres para cocinar tu tortilla perfecta.',
      styleTitle: 'Estilo de Cuajado',
      panTitle: 'Diámetro de Sartén',
      onionLabel: 'Cebolla',
      withOnion: 'Con cebolla caramelizada',
      noOnion: 'Sin cebolla (purista)',
      start: 'Comenzar',
      pause: 'Pausar',
      resume: 'Continuar',
      next: 'Siguiente',
      prev: 'Anterior',
      reset: 'Reiniciar',
      metronome: 'Metrónomo de Corte (60 bpm)',
      wakeLockOn: 'Pantalla activa (Modo Cocina)',
      wakeLockOff: 'Pantalla normal',
      soundOn: 'Efectos activos',
      soundOff: 'Silenciado',
      voiceOn: 'Voz activa',
      voiceOff: 'Voz apagada',
      testSound: 'Probar audio',
      shortcuts: 'Atajos: Espacio (Play/Pausa) • N (Siguiente) • B (Atrás) • R (Reset)',
      diners: 'comensales',
      eggs: 'huevos',
      potatoes: 'g patatas',
      stepXofY: 'Paso',
      of: 'de',
      completed: 'Completado',
      safetyBadge: 'Estándar Bactericida',
      foodSafetyNotice: 'Para máxima seguridad alimentaria, mantén la masa a **70°C durante 2 minutos** (o **63°C durante 20 segundos** para yema líquida de consumo inmediato). Nunca mantengas la tortilla más de **4 horas** a temperatura ambiente.',
    },
    en: {
      headerTitle: 'Interactive Kitchen Assistant & Cooking Timer',
      headerSubtitle: 'Hands-free voice and audio guidance companion designed for frying, egg soak, the crucial pan flip, and food safety.',
      styleTitle: 'Cooking Doneness Style',
      panTitle: 'Pan Diameter',
      onionLabel: 'Onion',
      withOnion: 'With caramelized onion',
      noOnion: 'Without onion (purist)',
      start: 'Start',
      pause: 'Pause',
      resume: 'Resume',
      next: 'Next Step',
      prev: 'Previous',
      reset: 'Reset',
      metronome: 'Slicing Metronome (60 bpm)',
      wakeLockOn: 'Screen Stay Awake (Kitchen Mode)',
      wakeLockOff: 'Screen normal',
      soundOn: 'Audio FX On',
      soundOff: 'Muted',
      voiceOn: 'Voice On',
      voiceOff: 'Voice Off',
      testSound: 'Test Sound',
      shortcuts: 'Shortcuts: Space (Play/Pause) • N (Next) • B (Back) • R (Reset)',
      diners: 'servings',
      eggs: 'eggs',
      potatoes: 'g potatoes',
      stepXofY: 'Step',
      of: 'of',
      completed: 'Completed',
      safetyBadge: 'Bactericidal Standard',
      foodSafetyNotice: 'For peak microbiological safety, reach **70°C for 2 minutes** at core (or **63°C for 20 seconds** for runny yolk immediate consumption). Never leave tortillas over **4 hours** at room temperature.',
    },
    de: {
      headerTitle: 'Interaktiver Küchen-Assistent & Tortilla-Timer',
      headerSubtitle: 'Freihändige Audio- und Sprachbegleitung beim Schneiden, Pochieren, Wenden und für die mikrobiologische Sicherheit.',
      styleTitle: 'Garstufe & Stil',
      panTitle: 'Pfannendurchmesser',
      onionLabel: 'Zwiebel',
      withOnion: 'Mit karamellisierter Zwiebel',
      noOnion: 'Ohne Zwiebel (Puristisch)',
      start: 'Starten',
      pause: 'Pause',
      resume: 'Fortsetzen',
      next: 'Nächster Schritt',
      prev: 'Zurück',
      reset: 'Zurücksetzen',
      metronome: 'Schneide-Metronom (60 bpm)',
      wakeLockOn: 'Display bleibt aktiv (Küchenmodus)',
      wakeLockOff: 'Display normal',
      soundOn: 'Soundeffekte an',
      soundOff: 'Stumm',
      voiceOn: 'Sprachführung an',
      voiceOff: 'Sprachführung aus',
      testSound: 'Audio testen',
      shortcuts: 'Tastenkombinationen: Leertaste (Play/Pause) • N (Weiter) • B (Zurück) • R (Reset)',
      diners: 'Personen',
      eggs: 'Eier',
      potatoes: 'g Kartoffeln',
      stepXofY: 'Schritt',
      of: 'von',
      completed: 'Abgeschlossen',
      safetyBadge: 'Bakterizider Standard',
      foodSafetyNotice: 'Für vollständige Lebensmittelsicherheit **70°C für 2 Minuten** im Kern erreichen (oder **63°C für 20 Sekunden** bei saftig-flüssigem Kern). Niemals länger als **4 Stunden** bei Raumtemperatur lagern.',
    },
  };

  const t = labels[currentLang];

  return (
    <div
      ref={containerRef}
      id="kitchen-assistant-container"
      className={`relative w-full space-y-8 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-[#FDFBF7] dark:bg-[#1C1917] p-6 overflow-y-auto' : ''
      }`}
    >
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#8D6E63]/20 pb-6">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold">
            <Utensils className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{currentLang === 'es' ? 'Manos Libres & Audio Sintetizado' : currentLang === 'de' ? 'Freihändig & Audio-Assistent' : 'Hands-Free & Audio Synthesis'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-heading font-extrabold text-foreground tracking-tight">
            {t.headerTitle}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t.headerSubtitle}
          </p>
        </div>

        {/* Top Control Bar (Audio, Voice, Wake Lock, Fullscreen) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            title={soundEnabled ? t.soundOn : t.soundOff}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-[#FFB800]/20 border-[#FFB800]/50 text-foreground'
                : 'bg-muted border-border text-muted-foreground'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FFB800]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? t.soundOn : t.soundOff}</span>
          </button>

          {/* Voice Guidance Toggle */}
          <button
            type="button"
            onClick={() => setVoiceEnabled((prev) => !prev)}
            title={voiceEnabled ? t.voiceOn : t.voiceOff}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              voiceEnabled
                ? 'bg-[#00A3FF]/15 border-[#00A3FF]/40 text-[#00A3FF] dark:text-[#00A3FF]'
                : 'bg-muted border-border text-muted-foreground'
            }`}
          >
            <Volume1 className="w-4 h-4" />
            <span className="hidden sm:inline">{voiceEnabled ? t.voiceOn : t.voiceOff}</span>
          </button>

          {/* Screen Wake Lock Status */}
          <div
            title={wakeLockActive ? t.wakeLockOn : t.wakeLockOff}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              wakeLockActive
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-muted border-border text-muted-foreground'
            }`}
          >
            <SunMedium className="w-4 h-4" />
            <span className="hidden md:inline">{wakeLockActive ? t.wakeLockOn : t.wakeLockOff}</span>
          </div>

          {/* Sound Test Button */}
          <button
            type="button"
            onClick={testAudio}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-[#FFB800]/10 hover:border-[#FFB800]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span className="hidden lg:inline">{t.testSound}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Pantalla Completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* RECIPE CALIBRATION BAR */}
      <section className="card-notebook p-4 sm:p-5 bg-card/90 border border-border rounded-2xl shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            {/* Style Selector */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-muted-foreground font-mono">{t.styleTitle}:</span>
              <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted/40">
                {(['clasica', 'betanzos', 'cuajada'] as CookingStyle[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      if (!isRunning) setStyle(s);
                    }}
                    disabled={isRunning}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                      style === s
                        ? 'bg-[#FFB800] text-[#2A2421] shadow-2xs font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {s === 'clasica'
                      ? (currentLang === 'es' ? 'Clásica Melosa' : currentLang === 'de' ? 'Klassisch' : 'Classic Runny')
                      : s === 'betanzos'
                      ? 'Betanzos (Babé)'
                      : (currentLang === 'es' ? 'Cuajada Firme' : currentLang === 'de' ? 'Durchgegart' : 'Firm Well-Done')}
                  </button>
                ))}
              </div>
            </div>

            {/* Pan Diameter Selector */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-muted-foreground font-mono">{t.panTitle}:</span>
              <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted/40">
                {([20, 24, 28] as PanDiameter[]).map((diam) => (
                  <button
                    key={diam}
                    type="button"
                    onClick={() => {
                      if (!isRunning) setPanDiameter(diam);
                    }}
                    disabled={isRunning}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                      panDiameter === diam
                        ? 'bg-[#8D6E63] text-white shadow-2xs font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {diam} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Onion Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!isRunning) setWithOnion((prev) => !prev);
                }}
                disabled={isRunning}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  withOnion
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${withOnion ? 'bg-[#FF8A00]' : 'bg-muted-foreground'}`} />
                <span>{withOnion ? t.withOnion : t.noOnion}</span>
              </button>
            </div>
          </div>

          {/* Quick Ingredient Ratios summary */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-[#F5E6BE]/30 dark:bg-[#2A2421]/60 px-3 py-1.5 rounded-xl border border-[#8D6E63]/20">
            <span className="font-mono font-bold text-foreground">
              {derivedSpecs.servings} {t.diners}
            </span>
            <span>•</span>
            <span className="font-semibold text-foreground">
              {derivedSpecs.eggsCount} {t.eggs}
            </span>
            <span>•</span>
            <span className="font-semibold text-foreground">
              {derivedSpecs.potatoesGrams} {t.potatoes}
            </span>
          </div>
        </div>
      </section>

      {/* STEP PROGRESS STEPPER (7 Steps) */}
      <nav aria-label="Cooking Step Progress" className="w-full overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[720px] gap-2">
          {COOKING_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = completedStepIds.has(step.id);
            const StepIconComponent = STEP_ICONS[step.icon] || ChefHat;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setIsRunning(false);
                  setCurrentStepIndex(idx);
                  const dur = stepDurations[step.id];
                  setTimeLeft(dur);
                  setTotalStepSeconds(dur);
                }}
                className={`flex-1 flex flex-col items-center p-2.5 rounded-xl border transition-all text-center group ${
                  isCurrent
                    ? 'bg-[#FFB800]/15 dark:bg-[#FFB800]/25 border-[#FFB800] ring-2 ring-[#FFB800]/40 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-card border-border text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full mb-1.5 transition-transform group-hover:scale-105">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#FFB800] text-[#2A2421] font-bold'
                          : 'bg-muted text-muted-foreground font-mono text-xs'
                      }`}
                    >
                      <StepIconComponent className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold leading-tight line-clamp-1">
                  {step.name[currentLang].split('. ')[1] || step.name[currentLang]}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  {Math.floor(stepDurations[step.id] / 60)}m {stepDurations[step.id] % 60 ? `${stepDurations[step.id] % 60}s` : ''}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN COCKPIT: TIMER DISPLAY & ACTIVE STEP CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT / CENTER: CIRCULAR SVG GAUGE & LARGE DIGITAL DISPLAY */}
        <div className="lg:col-span-6 card-notebook p-6 sm:p-8 bg-card border-2 border-[#8D6E63]/30 rounded-3xl shadow-stacked-parchment flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          {/* Subtle watermarked step background badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-mono font-bold text-muted-foreground">
              {t.stepXofY} {currentStepIndex + 1} {t.of} {totalSteps}
            </span>
            {activeStep.targetTemp && (
              <span className="px-2.5 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-xs font-mono font-bold text-[#FF8A00] flex items-center gap-1">
                <Thermometer className="w-3 h-3" />
                {activeStep.targetTemp}
              </span>
            )}
          </div>

          {/* Slicing Metronome Indicator (Step 1) */}
          {activeStep.hasMetronome && (
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={() => setMetronomeActive((prev) => !prev)}
                className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  metronomeActive
                    ? 'bg-[#00A3FF] text-white border-[#00A3FF] shadow-2xs animate-pulse'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t.metronome}</span>
              </button>
            </div>
          )}

          {/* CIRCULAR GAUGE */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mt-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
              {/* Background circle */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                className="stroke-muted/40"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                className="transition-all duration-500 ease-linear"
                stroke={
                  activeStep.isSafetyStep
                    ? SAFETY_COLORS.safe
                    : activeStep.isFlipStep
                    ? SAFETY_COLORS.orangeThreshold
                    : '#FFB800'
                }
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="p-2.5 rounded-2xl bg-[#FFB800]/15 text-[#8D6E63] dark:text-[#FFB800] mb-1">
                <ActiveStepIcon className="w-7 h-7" />
              </div>

              {/* Ultra-Large Countdown Digits */}
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                {formattedTime}
              </div>

              <div className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wider font-mono">
                {isRunning ? (
                  <span className="text-[#FF8A00] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-ping inline-block" />
                    En marcha
                  </span>
                ) : (
                  <span>Pausado</span>
                )}
              </div>
            </div>
          </div>

          {/* QUICK DURATION ADJUSTMENT BUTTONS */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => adjustTime(-30)}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted font-bold transition-colors"
            >
              -30s
            </button>
            <button
              type="button"
              onClick={() => adjustTime(30)}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted font-bold transition-colors"
            >
              +30s
            </button>
            <button
              type="button"
              onClick={() => adjustTime(60)}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted font-bold transition-colors"
            >
              +1 min
            </button>
          </div>

          {/* EXTRA LARGE HANDS-FREE CONTROLS (Grease-Friendly / Elbow-Tappable) */}
          <div className="w-full flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="p-3.5 min-h-[52px] rounded-2xl border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 font-bold text-sm"
              title={t.prev}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t.prev}</span>
            </button>

            {/* Huge Play/Pause Action Button */}
            <button
              type="button"
              onClick={togglePlayPause}
              className={`px-8 py-3.5 min-h-[56px] rounded-2xl font-serif-heading font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-md transition-all active:scale-95 ${
                isRunning
                  ? 'bg-[#8D6E63] text-white hover:bg-[#7A5E54] ring-2 ring-[#8D6E63]/40'
                  : 'bg-[#FFB800] text-[#2A2421] hover:bg-[#FFA500] ring-4 ring-[#FFB800]/30'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 fill-current" />
                  <span>{t.pause}</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" />
                  <span>{timeLeft === totalStepSeconds ? t.start : t.resume}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStepIndex === totalSteps - 1}
              className="p-3.5 min-h-[52px] rounded-2xl border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 font-bold text-sm"
              title={t.next}
            >
              <span className="hidden sm:inline">{t.next}</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleResetStep}
              className="p-3.5 min-h-[52px] rounded-2xl border border-border bg-card hover:bg-muted transition-all flex items-center gap-1.5 font-bold text-xs text-muted-foreground hover:text-foreground"
              title={t.reset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-muted-foreground font-mono">
            {t.shortcuts}
          </div>
        </div>

        {/* RIGHT: DETAILED STEP GUIDANCE & PAN-FLIP / SAFETY MASTERCLASS */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          {/* ACTIVE STEP CARD */}
          <div className="card-notebook p-6 sm:p-8 bg-card border border-border rounded-3xl shadow-2xs space-y-5 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8D6E63] dark:text-[#FFB800] uppercase tracking-wider">
                  {activeStep.key}
                </span>
                <h2 className="text-2xl font-serif-heading font-extrabold text-foreground tracking-tight mt-1">
                  {activeStep.name[currentLang]}
                </h2>
              </div>

              {activeStep.isFlipStep && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#FF8A00] border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Momento Clave</span>
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed bg-[#F5E6BE]/40 dark:bg-[#2A2421]/50 p-3.5 rounded-2xl border border-[#8D6E63]/20">
              {activeStep.shortDesc[currentLang]}
            </p>

            {/* STEP SPECIFIC TIPS */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Técnicas de Ejecución del Maestro:</span>
              </h3>

              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeStep.detailedTips[currentLang].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SPECIAL ILLUSTRATED DIAGRAM FOR LA VUELTA (STEP 5) */}
            {activeStep.isFlipStep && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#FF8A00] uppercase flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Protocolo Físico de La Vuelta:</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-card border border-border space-y-1">
                    <span className="font-bold text-foreground block">1. Plato Plano</span>
                    <span className="text-[11px] text-muted-foreground block">+2 cm que el diámetro</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border space-y-1">
                    <span className="font-bold text-foreground block">2. Paño Húmedo</span>
                    <span className="text-[11px] text-muted-foreground block">Mano abierta firme</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border space-y-1">
                    <span className="font-bold text-foreground block">3. Inercia Pura</span>
                    <span className="text-[11px] text-[#FF8A00] font-bold block">Giro sin dudar</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOD SAFETY FOOTER COMPLIANCE BANNER */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E7D32] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>{t.safetyBadge} (BOE / CSIC)</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300">
                Salmonella spp. Control
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Para garantizar la inocuidad microbiológica, el estándar de oro sanitario exige alcanzar{' '}
              <strong className="text-foreground font-bold">70°C durante 2 minutos</strong> en el corazón de la masa (o{' '}
              <strong className="text-foreground font-bold">63°C durante 20 segundos</strong> para tortillas jugosas). Nunca conservar a temperatura ambiente durante más de{' '}
              <strong className="text-foreground font-bold">4 horas</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
