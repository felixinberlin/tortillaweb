import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Sparkles,
  ShieldCheck,
  Flame,
  BookOpen,
  HelpCircle,
  Users,
  CheckCircle2,
  XCircle,
  Share2,
  Copy,
  RotateCcw,
  Play,
  ChevronRight,
  Award,
  Zap,
  Info,
  ExternalLink
} from 'lucide-react';
import type { TriviaFact } from './TriviaGallery';
import {
  QUIZ_LEVELS,
  generateQuizSet,
  evaluateQuizResult,
  type QuizLevel,
  type QuizQuestion,
  type QuizResult
} from '../../lib/trivia/quizGenerator';

interface TriviaGameProps {
  facts: TriviaFact[];
  currentLang: 'es' | 'en' | 'de';
  initialLevel?: QuizLevel;
  initialTopic?: string;
}

export default function TriviaGame({
  facts,
  currentLang = 'es',
  initialLevel = 'master',
  initialTopic = 'all',
}: TriviaGameProps) {
  // Setup States
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel>(initialLevel);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Gameplay States
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'a' | 'b' | 'c' | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'a' | 'b' | 'c'>>({});
  const [score, setScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Share Feedback State
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  // Localized texts
  const t = {
    title: currentLang === 'en' ? 'Tortilla Trivia Challenge Game' : currentLang === 'de' ? 'Das große Tortilla Trivia-Spiel' : 'Juego de Trivia: Desafío de la Tortilla',
    subtitle: currentLang === 'en'
      ? 'Test your knowledge on history, regional myths, giant records, and bactericidal food safety rules.'
      : currentLang === 'de'
      ? 'Teste dein Wissen über Geschichte, Mythen, Rekorde und bakteriologische Sicherheit.'
      : 'Pon a prueba tus conocimientos sobre historia, mitos regionales, récords monumentales y seguridad alimentaria.',
    selectLevel: currentLang === 'en' ? 'Select Difficulty Level' : currentLang === 'de' ? 'Schwierigkeitsgrad wählen' : 'Selecciona el Nivel de Dificultad',
    selectTopic: currentLang === 'en' ? 'Select Topic' : currentLang === 'de' ? 'Thema wählen' : 'Selecciona el Tema',
    startBtn: currentLang === 'en' ? 'Start Trivia Game' : currentLang === 'de' ? 'Spiel starten' : 'Comenzar Juego de Trivia',
    questionOf: currentLang === 'en' ? 'Question' : currentLang === 'de' ? 'Frage' : 'Pregunta',
    of: currentLang === 'en' ? 'of' : currentLang === 'de' ? 'von' : 'de',
    score: currentLang === 'en' ? 'Score' : currentLang === 'de' ? 'Punkte' : 'Puntos',
    streak: currentLang === 'en' ? 'Streak' : currentLang === 'de' ? 'Serie' : 'Racha',
    nextQuestion: currentLang === 'en' ? 'Next Question' : currentLang === 'de' ? 'Nächste Frage' : 'Siguiente Pregunta',
    viewResults: currentLang === 'en' ? 'View Final Results' : currentLang === 'de' ? 'Ergebnis anzeigen' : 'Ver Resultados Finales',
    correct: currentLang === 'en' ? 'Correct!' : currentLang === 'de' ? 'Richtig!' : '¡Correcto!',
    incorrect: currentLang === 'en' ? 'Incorrect' : currentLang === 'de' ? 'Falsch' : 'Incorrecto',
    verdictLabel: currentLang === 'en' ? 'Historical & Scientific Explanation' : currentLang === 'de' ? 'Historische & Wissenschaftliche Erklärung' : 'Explicación Histórica & Científica',
    safetyHighlight: currentLang === 'en' ? 'Food Safety Metric' : currentLang === 'de' ? 'Mikrobiologischer Standard' : 'Estándar Térmico de Seguridad',
    gameCompleted: currentLang === 'en' ? 'Challenge Completed!' : currentLang === 'de' ? 'Challenge Beendet!' : '¡Desafío Completado!',
    accuracy: currentLang === 'en' ? 'Accuracy' : currentLang === 'de' ? 'Genauigkeit' : 'Precisión',
    maxStreakLabel: currentLang === 'en' ? 'Max Streak' : currentLang === 'de' ? 'Max. Serie' : 'Racha Máxima',
    shareScore: currentLang === 'en' ? 'Share Score & Challenge Friends' : currentLang === 'de' ? 'Ergebnis teilen & Freunde herausfordern' : 'Compartir Puntuación y Desafiar Amigos',
    copyScoreCard: currentLang === 'en' ? 'Copy Score Card' : currentLang === 'de' ? 'Ergebniskarte kopieren' : 'Copiar Tarjeta de Resultado',
    playAgain: currentLang === 'en' ? 'Play Again' : currentLang === 'de' ? 'Nochmal spielen' : 'Jugar de Nuevo',
    changeSettings: currentLang === 'en' ? 'Change Level or Topic' : currentLang === 'de' ? 'Level oder Thema ändern' : 'Cambiar Nivel o Tema',
    reviewQuestions: currentLang === 'en' ? 'Question Breakdown & Explanations' : currentLang === 'de' ? 'Fragen-Übersicht & Erklärungen' : 'Desglose de Preguntas & Explicaciones',
    copiedText: currentLang === 'en' ? 'Score card copied to clipboard!' : currentLang === 'de' ? 'Ergebniskarte in Zwischenablage kopiert!' : '¡Tarjeta de resultado copiada al portapapeles!',
    topics: {
      all: { es: 'Todos los Temas (Mix)', en: 'All Topics (Mix)', de: 'Alle Themen (Mix)' },
      history: { es: 'Historia y Orígenes', en: 'History & Origins', de: 'Geschichte & Ursprung' },
      science: { es: 'Ciencia y Seguridad', en: 'Science & Safety', de: 'Wissenschaft & Sicherheit' },
      regions: { es: 'Tradiciones Regionales', en: 'Regional Traditions', de: 'Regionale Traditionen' },
      'pop-culture': { es: 'Cultura Pop y Cómics', en: 'Pop Culture & Comics', de: 'Pop-Kultur & Comics' },
      records: { es: 'Récords Mundiales', en: 'World Records', de: 'Weltrekorde' },
      factions: { es: 'Facciones y Debates', en: 'Factions & Debates', de: 'Fraktionen & Debatten' },
    },
  };

  const topicOptions = [
    { id: 'all', icon: Sparkles, label: t.topics.all[currentLang] },
    { id: 'history', icon: BookOpen, label: t.topics.history[currentLang] },
    { id: 'science', icon: ShieldCheck, label: t.topics.science[currentLang] },
    { id: 'regions', icon: Flame, label: t.topics.regions[currentLang] },
    { id: 'pop-culture', icon: HelpCircle, label: t.topics['pop-culture'][currentLang] },
    { id: 'records', icon: Trophy, label: t.topics.records[currentLang] },
    { id: 'factions', icon: Users, label: t.topics.factions[currentLang] },
  ];

  // Initialize or restart game
  const handleStartGame = (level: QuizLevel = selectedLevel, topic: string = selectedTopic) => {
    const generated = generateQuizSet(facts, level, topic, Math.floor(Math.random() * 1000));
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setUserAnswers({});
    setScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setShowExplanation(false);
    setGameFinished(false);
    setGameStarted(true);
  };

  const currentQuestion = questions[currentIndex];

  // Handle Option Click
  const handleOptionSelect = (optionId: 'a' | 'b' | 'c') => {
    if (selectedOptionId !== null) return; // Prevent changing answer once selected

    setSelectedOptionId(optionId);
    setShowExplanation(true);

    const isCorrect = optionId === currentQuestion.correctOptionId;

    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionId }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setCurrentStreak(0);
    }
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  // Evaluate final result payload
  const finalResult: QuizResult = useMemo(() => {
    return evaluateQuizResult(
      score,
      questions.length,
      maxStreak,
      selectedLevel,
      selectedTopic,
      currentLang
    );
  }, [score, questions.length, maxStreak, selectedLevel, selectedTopic, currentLang]);

  // Handle Copy / Share
  const handleCopyScoreCard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(finalResult.shareText);
        setCopiedToast(t.copiedText);
        setTimeout(() => setCopiedToast(null), 4000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.title,
          text: finalResult.shareText,
          url: finalResult.challengeUrl,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      handleCopyScoreCard();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292521] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-bold border border-amber-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#FFB800]" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* SECTION 1: GAME SETUP SCREEN */}
      {!gameStarted && (
        <div className="card-notebook p-6 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-8 shadow-md">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 text-xs font-extrabold shadow-2xs">
              <Trophy className="w-4 h-4 text-[#8D6E63]" />
              <span>{t.title}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold text-[#292521]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Level Selection */}
          <div className="space-y-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFB800]" />
              <span>{t.selectLevel}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['apprentice', 'master', 'legend', 'marathon'] as QuizLevel[]).map((levelKey) => {
                const conf = QUIZ_LEVELS[levelKey];
                const isSelected = selectedLevel === levelKey;
                return (
                  <button
                    key={levelKey}
                    type="button"
                    onClick={() => setSelectedLevel(levelKey)}
                    className={`p-5 rounded-2xl text-left border transition-all cursor-pointer space-y-2 relative ${
                      isSelected
                        ? 'bg-[#FFF9EA] border-[#FFB800] ring-2 ring-[#FFB800]/50 shadow-sm'
                        : 'bg-white border-[#E8E2D5] hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#F5E6BE] text-[#8D6E63]">
                        {conf.badge[currentLang]}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">
                        {conf.questionCount} {currentLang === 'en' ? 'Questions' : currentLang === 'de' ? 'Fragen' : 'Preguntas'}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif-heading font-extrabold text-[#292521]">
                      {conf.label[currentLang]}
                    </h3>
                    <p className="text-xs text-foreground/70 font-sans leading-relaxed">
                      {conf.description[currentLang]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="space-y-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8D6E63]" />
              <span>{t.selectTopic}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {topicOptions.map((topic) => {
                const IconComponent = topic.icon;
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#292521] text-white border-[#292521] shadow-xs'
                        : 'bg-white text-foreground/90 border-[#E8E2D5] hover:bg-stone-100'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#FFB800]' : 'text-[#8D6E63]'}`} />
                    <span className="truncate">{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Safety Rule Banner */}
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {currentLang === 'es' ? (
                <>Todos los desafíos incluyen preguntas de ciencia térmica: recuerda que la pasteurización exige <strong class="font-bold">70°C durante 2 minutos</strong> (o <strong class="font-bold">63°C durante 20 segundos</strong>) y consumo en máximo <strong class="font-bold">4 horas</strong> a temperatura ambiente.</>
              ) : currentLang === 'de' ? (
                <>Das Quiz berücksichtigt Mikrobiologie: <strong class="font-bold">70°C für 2 Minuten</strong> (oder <strong class="font-bold">63°C für 20 Sekunden</strong>), max <strong class="font-bold">4 Stunden</strong> ungekühlt.</>
              ) : (
                <>All challenges cover food safety: thermal core requires <strong class="font-bold">70°C for 2 minutes</strong> (or <strong class="font-bold">63°C for 20 seconds</strong>), max <strong class="font-bold">4 hours</strong> unrefrigerated.</>
              )}
            </p>
          </div>

          {/* Start CTA */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => handleStartGame(selectedLevel, selectedTopic)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFB800] hover:bg-amber-400 text-stone-950 font-serif-heading font-black text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t.startBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: ACTIVE GAMEPLAY SCREEN */}
      {gameStarted && !gameFinished && currentQuestion && (
        <div className="card-notebook p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-6 shadow-md">
          {/* Top Progress & Stats Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#8D6E63]">
              <span>
                {t.questionOf} {currentIndex + 1} {t.of} {questions.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-[#2E7D32]" />
                  {t.score}: {score}
                </span>
                {currentStreak > 1 && (
                  <span className="flex items-center gap-1 text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 font-black animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    {t.streak}: x{currentStreak}
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFB800] to-amber-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
              <span className="px-3 py-1 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300">
                {currentQuestion.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black ${
                currentQuestion.status === 'proved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {currentQuestion.status === 'proved' ? 'HECHO PROBADO' : 'MITO / NO PROBADO'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-heading font-extrabold text-[#292521] leading-snug">
              {currentQuestion.title[currentLang] || currentQuestion.title.es}
            </h3>

            <p className="text-sm sm:text-base text-foreground/90 font-sans leading-relaxed">
              {currentQuestion.questionText[currentLang] || currentQuestion.questionText.es}
            </p>
          </div>

          {/* 3 Options (A, B, C) */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option) => {
              const optionLetter = option.id.toUpperCase();
              const isSelected = selectedOptionId === option.id;
              const isCorrectOption = option.id === currentQuestion.correctOptionId;

              let btnStyle = 'bg-white border-[#E8E2D5] text-foreground hover:bg-stone-50 hover:border-amber-300';
              if (selectedOptionId !== null) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-50 border-[#2E7D32] text-emerald-950 font-bold ring-2 ring-emerald-500/40';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-red-50 border-[#D32F2F] text-red-950 ring-2 ring-red-400/40';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-muted-foreground opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={selectedOptionId !== null}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-start gap-4 transition-all min-h-[56px] cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-serif-heading font-black text-sm border ${
                    isSelected && isCorrectOption
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : isSelected && !isCorrectOption
                      ? 'bg-[#D32F2F] text-white border-[#D32F2F]'
                      : isCorrectOption && selectedOptionId !== null
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : 'bg-[#F5E6BE] text-[#8D6E63] border-amber-300'
                  }`}>
                    {optionLetter}
                  </span>
                  <div className="flex-1 text-sm sm:text-base font-sans leading-relaxed pt-0.5">
                    <span dangerouslySetInnerHTML={{ __html: option.text[currentLang] || option.text.es }} />
                  </div>
                  {selectedOptionId !== null && isCorrectOption && (
                    <CheckCircle2 className="w-6 h-6 text-[#2E7D32] shrink-0 mt-0.5" />
                  )}
                  {selectedOptionId !== null && isSelected && !isCorrectOption && (
                    <XCircle className="w-6 h-6 text-[#D32F2F] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className={`p-5 rounded-2xl border space-y-3 transition-all animate-fadeIn ${
              selectedOptionId === currentQuestion.correctOptionId
                ? 'bg-[#F0FDF4] border-emerald-300 text-emerald-950'
                : 'bg-[#FFF5F5] border-red-200 text-stone-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
                <Info className="w-4 h-4 text-[#8D6E63]" />
                <span>{t.verdictLabel}</span>
              </div>
              <p className="text-sm font-sans leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: currentQuestion.explanation[currentLang] || currentQuestion.explanation.es }} />
              </p>
              {currentQuestion.evidence && (
                <p className="text-xs text-muted-foreground italic border-t border-stone-200/60 pt-2">
                  <strong>Evidencia:</strong> {currentQuestion.evidence}
                </p>
              )}

              {/* Source & Web Verification Link */}
              {currentQuestion.source && (
                <div className="pt-2 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-[#8D6E63]">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>Fuente: {currentQuestion.source}</span>
                  </div>
                  {currentQuestion.sourceUrl && (
                    <a
                      href={currentQuestion.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-black transition-all cursor-pointer w-fit"
                      title="Verificar fuente en la web"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                      <span>{currentLang === 'en' ? 'Verify Source 🔗' : currentLang === 'de' ? 'Quelle Prüfen 🔗' : 'Verificar Fuente en la Web 🔗'}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {selectedOptionId !== null && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3.5 rounded-xl bg-[#292521] hover:bg-stone-800 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>{currentIndex + 1 < questions.length ? t.nextQuestion : t.viewResults}</span>
                <ChevronRight className="w-4 h-4 text-[#FFB800]" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: FINAL GAME RESULTS SCREEN */}
      {gameFinished && (
        <div className="card-notebook p-6 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-8 shadow-md">
          {/* Header & Rank Badge */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF9EA] border-2 border-[#FFB800] shadow-md mx-auto">
              <Trophy className="w-10 h-10 text-[#FFB800]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#8D6E63] px-3.5 py-1 rounded-full bg-[#F5E6BE]">
                {t.gameCompleted}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-heading font-black text-[#292521]">
                {finalResult.rankTitle[currentLang]}
              </h2>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] text-center space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">{t.score}</span>
              <p className="text-3xl font-serif-heading font-black text-[#292521]">
                {score} / {questions.length}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] text-center space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">{t.accuracy}</span>
              <p className="text-3xl font-serif-heading font-black text-[#2E7D32]">
                {finalResult.percentage}%
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] text-center space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">{t.maxStreakLabel}</span>
              <p className="text-3xl font-serif-heading font-black text-[#FFB800] flex items-center justify-center gap-1">
                <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                {maxStreak}
              </p>
            </div>
          </div>

          {/* Sharing Section */}
          <div className="p-6 rounded-2xl bg-[#FFF9EA] border border-amber-300 space-y-4">
            <div className="space-y-1">
              <h4 className="text-base font-serif-heading font-extrabold text-[#292521]">
                {t.shareScore}
              </h4>
              <p className="text-xs text-foreground/80 font-sans">
                {currentLang === 'es'
                  ? 'Comparte tu hazaña con amigos para desafiarlos a resolver exactamente tus mismas preguntas.'
                  : currentLang === 'de'
                  ? 'Teile dein Ergebnis mit Freunden und fordere sie heraus.'
                  : 'Share your score card with friends and challenge them.'}
              </p>
            </div>

            {/* Share Text Box Preview */}
            <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] font-mono text-xs text-stone-800 whitespace-pre-wrap leading-relaxed shadow-2xs">
              {finalResult.shareText}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex-1 px-5 py-3 rounded-xl bg-[#292521] hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Share2 className="w-4 h-4 text-[#FFB800]" />
                <span>{currentLang === 'es' ? 'Compartir Desafío' : currentLang === 'de' ? 'Challenge teilen' : 'Share Challenge'}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyScoreCard}
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#292521] border border-[#E8E2D5] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 text-[#8D6E63]" />
                <span>{t.copyScoreCard}</span>
              </button>
            </div>
          </div>

          {/* Question Review Breakdown */}
          <div className="space-y-4 pt-2">
            <h4 className="text-lg font-serif-heading font-bold text-[#292521]">
              {t.reviewQuestions}
            </h4>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.correctOptionId;
                return (
                  <div
                    key={q.factId + idx}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#8D6E63]">
                        #{idx + 1} - {q.title[currentLang] || q.title.es}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-black ${
                        isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                      }`}>
                        {isCorrect ? t.correct : t.incorrect}
                      </span>
                    </div>
                    <p className="text-foreground/90 font-sans leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: q.explanation[currentLang] || q.explanation.es }} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E8E2D5]">
            <button
              type="button"
              onClick={() => handleStartGame(selectedLevel, selectedTopic)}
              className="flex-1 px-6 py-3.5 rounded-xl bg-[#FFB800] hover:bg-amber-400 text-stone-950 font-serif-heading font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>
            <button
              type="button"
              onClick={() => setGameStarted(false)}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-[#292521] border border-[#E8E2D5] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{t.changeSettings}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
