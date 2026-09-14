/**
 * Canonical Trivia & Quiz UI text definitions backed by OASIS XLIFF 1.2
 * Source files: src/i18n/xlf/trivia_canon.{en,de}.xlf
 */

export interface TriviaCanonDictionary {
  title: Record<'es' | 'en' | 'de', string>;
  subtitle: Record<'es' | 'en' | 'de', string>;
  selectLevel: Record<'es' | 'en' | 'de', string>;
  selectTopic: Record<'es' | 'en' | 'de', string>;
  startBtn: Record<'es' | 'en' | 'de', string>;
  questionOf: Record<'es' | 'en' | 'de', string>;
  of: Record<'es' | 'en' | 'de', string>;
  score: Record<'es' | 'en' | 'de', string>;
  streak: Record<'es' | 'en' | 'de', string>;
  nextQuestion: Record<'es' | 'en' | 'de', string>;
  viewResults: Record<'es' | 'en' | 'de', string>;
  correct: Record<'es' | 'en' | 'de', string>;
  incorrect: Record<'es' | 'en' | 'de', string>;
  verdictLabel: Record<'es' | 'en' | 'de', string>;
  safetyHighlight: Record<'es' | 'en' | 'de', string>;
  gameCompleted: Record<'es' | 'en' | 'de', string>;
  accuracy: Record<'es' | 'en' | 'de', string>;
  maxStreak: Record<'es' | 'en' | 'de', string>;
  shareScore: Record<'es' | 'en' | 'de', string>;
  copyScoreCard: Record<'es' | 'en' | 'de', string>;
  playAgain: Record<'es' | 'en' | 'de', string>;
  changeSettings: Record<'es' | 'en' | 'de', string>;
  reviewQuestions: Record<'es' | 'en' | 'de', string>;
  copiedText: Record<'es' | 'en' | 'de', string>;
  topics: Record<string, Record<'es' | 'en' | 'de', string>>;
}

export const TRIVIA_CANON: TriviaCanonDictionary = {
  title: {
    es: 'Juego de Trivia: Desafío de la Tortilla',
    en: 'Tortilla Trivia Challenge Game',
    de: 'Das große Tortilla Trivia-Spiel',
  },
  subtitle: {
    es: 'Pon a prueba tus conocimientos sobre historia, mitos regionales, récords monumentales y seguridad alimentaria.',
    en: 'Test your knowledge on history, regional myths, giant records, and bactericidal food safety rules.',
    de: 'Teste dein Wissen über Geschichte, Mythen, Rekorde und bakteriologische Sicherheit.',
  },
  selectLevel: {
    es: 'Selecciona el Nivel de Dificultad',
    en: 'Select Difficulty Level',
    de: 'Schwierigkeitsgrad wählen',
  },
  selectTopic: {
    es: 'Selecciona el Tema',
    en: 'Select Topic',
    de: 'Thema wählen',
  },
  startBtn: {
    es: 'Comenzar Juego de Trivia',
    en: 'Start Trivia Game',
    de: 'Spiel starten',
  },
  questionOf: {
    es: 'Pregunta',
    en: 'Question',
    de: 'Frage',
  },
  of: {
    es: 'de',
    en: 'of',
    de: 'von',
  },
  score: {
    es: 'Puntos',
    en: 'Score',
    de: 'Punkte',
  },
  streak: {
    es: 'Racha',
    en: 'Streak',
    de: 'Serie',
  },
  nextQuestion: {
    es: 'Siguiente Pregunta',
    en: 'Next Question',
    de: 'Nächste Frage',
  },
  viewResults: {
    es: 'Ver Resultados Finales',
    en: 'View Final Results',
    de: 'Ergebnis anzeigen',
  },
  correct: {
    es: '¡Correcto!',
    en: 'Correct!',
    de: 'Richtig!',
  },
  incorrect: {
    es: 'Incorrecto',
    en: 'Incorrect',
    de: 'Falsch',
  },
  verdictLabel: {
    es: 'Explicación Histórica & Científica',
    en: 'Historical & Scientific Explanation',
    de: 'Historische & Wissenschaftliche Erklärung',
  },
  safetyHighlight: {
    es: 'Estándar Térmico de Seguridad',
    en: 'Food Safety Metric',
    de: 'Mikrobiologischer Standard',
  },
  gameCompleted: {
    es: '¡Desafío Completado!',
    en: 'Challenge Completed!',
    de: 'Challenge Beendet!',
  },
  accuracy: {
    es: 'Precisión',
    en: 'Accuracy',
    de: 'Genauigkeit',
  },
  maxStreak: {
    es: 'Racha Máxima',
    en: 'Max Streak',
    de: 'Max. Serie',
  },
  shareScore: {
    es: 'Compartir Puntuación y Desafiar Amigos',
    en: 'Share Score & Challenge Friends',
    de: 'Ergebnis teilen & Freunde herausfordern',
  },
  copyScoreCard: {
    es: 'Copiar Tarjeta de Resultado',
    en: 'Copy Score Card',
    de: 'Ergebniskarte kopieren',
  },
  playAgain: {
    es: 'Jugar de Nuevo',
    en: 'Play Again',
    de: 'Nochmal spielen',
  },
  changeSettings: {
    es: 'Cambiar Nivel o Tema',
    en: 'Change Level or Topic',
    de: 'Level oder Thema ändern',
  },
  reviewQuestions: {
    es: 'Desglose de Preguntas & Explicaciones',
    en: 'Question Breakdown & Explanations',
    de: 'Fragen-Übersicht & Erklärungen',
  },
  copiedText: {
    es: '¡Tarjeta de resultado copiada al portapapeles!',
    en: 'Score card copied to clipboard!',
    de: 'Ergebniskarte in Zwischenablage kopiert!',
  },
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

export function getTriviaUiText(key: keyof Omit<TriviaCanonDictionary, 'topics'>, lang: 'es' | 'en' | 'de' = 'es'): string {
  const entry = TRIVIA_CANON[key];
  return entry[lang] || entry.es;
}

export function getTriviaTopicLabel(topicId: string, lang: 'es' | 'en' | 'de' = 'es'): string {
  const topic = TRIVIA_CANON.topics[topicId];
  if (!topic) return topicId;
  return topic[lang] || topic.es;
}
