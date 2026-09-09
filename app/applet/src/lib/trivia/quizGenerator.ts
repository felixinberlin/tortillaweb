import type { TriviaFact } from '../../components/trivia/TriviaGallery';

export type QuizLevel = 'apprentice' | 'master' | 'legend' | 'marathon';

export interface QuizLevelConfig {
  id: QuizLevel;
  questionCount: number;
  label: { es: string; en: string; de: string };
  description: { es: string; en: string; de: string };
  badge: { es: string; en: string; de: string };
}

export const QUIZ_LEVELS: Record<QuizLevel, QuizLevelConfig> = {
  apprentice: {
    id: 'apprentice',
    questionCount: 5,
    label: { es: 'Aprendiz', en: 'Apprentice', de: 'Lehrling' },
    description: { es: '5 preguntas clave para poner a prueba tus conocimientos básicos.', en: '5 core questions to test your baseline knowledge.', de: '5 Kernfragen zum Testen deines Grundlagenwissens.' },
    badge: { es: 'Nivel Inicial', en: 'Basic Level', de: 'Einsteiger' },
  },
  master: {
    id: 'master',
    questionCount: 10,
    label: { es: 'Maestro', en: 'Master', de: 'Meister' },
    description: { es: '10 preguntas variadas sobre historia, ciencia y mitos populares.', en: '10 questions covering history, science, and urban myths.', de: '10 Fragen zu Geschichte, Wissenschaft und Mythen.' },
    badge: { es: 'Nivel Avanzado', en: 'Advanced Level', de: 'Fortgeschritten' },
  },
  legend: {
    id: 'legend',
    questionCount: 15,
    label: { es: 'Leyenda', en: 'Legend', de: 'Legende' },
    description: { es: '15 preguntas de máxima exigencia para verdaderos eruditos.', en: '15 high-demand questions for true tortilla scholars.', de: '15 anspruchsvolle Fragen für echte Experten.' },
    badge: { es: 'Nivel Experto', en: 'Expert Level', de: 'Experte' },
  },
  marathon: {
    id: 'marathon',
    questionCount: 25,
    label: { es: 'Maratón (25Q)', en: 'Marathon (25Q)', de: 'Marathon (25F)' },
    description: { es: '25 preguntas para explorar a fondo el banco de datos con más de 10.000 datos.', en: '25 questions for an extended challenge through the 10,000+ facts database.', de: '25 Fragen für eine erweiterte Challenge durch die Fakten-Datenbank.' },
    badge: { es: 'Modo Maratón', en: 'Marathon Mode', de: 'Marathon-Modus' },
  },
};

export interface QuizOption {
  id: 'a' | 'b' | 'c';
  text: { es: string; en: string; de: string };
  isCorrect: boolean;
}

export interface QuizQuestion {
  factId: string;
  category: string;
  status: 'proved' | 'unproved';
  title: { es: string; en: string; de: string };
  questionText: { es: string; en: string; de: string };
  options: QuizOption[];
  explanation: { es: string; en: string; de: string };
  source?: string;
  sourceUrl?: string;
  evidence?: string;
  correctOptionId: 'a' | 'b' | 'c';
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  streakMax: number;
  level: QuizLevel;
  topic: string;
  rankTitle: { es: string; en: string; de: string };
  shareText: string;
  challengeUrl: string;
}

/**
 * Generates dynamic 3-option multiple choice options for a given trivia fact.
 */
export function generateQuestionForFact(fact: TriviaFact, indexSeed: number = 0): QuizQuestion {
  const isProved = fact.status === 'proved';
  const category = fact.category;

  // Question phrasing based on language
  const questionText = {
    es: `¿Cuál es el veredicto o dato correcto respecto a "${fact.title.es}"?`,
    en: `What is the verified fact or verdict regarding "${fact.title.en}"?`,
    de: `Was ist die verifizierte Tatsache bzgl. "${fact.title.de}"?`,
  };

  // Specific distractor customization based on fact ID or category
  let optionsRaw: { text: { es: string; en: string; de: string }; isCorrect: boolean }[] = [];

  if (fact.id.includes('70') || fact.id.includes('safety') || fact.id.includes('bactericidal') || fact.id.includes('thermal') || category === 'science') {
    if (fact.id.includes('4-hour') || fact.fact.es.includes('4 horas') || fact.explanation.es.includes('4 horas')) {
      optionsRaw = [
        {
          text: {
            es: 'Consumir en un máximo de **4 horas** si permanece a temperatura ambiente.',
            en: 'Consume within a maximum of **4 hours** if left at room temperature.',
            de: 'Bei Raumtemperatur innerhalb von maximal **4 Stunden** verzehren.',
          },
          isCorrect: true,
        },
        {
          text: {
            es: 'Puede permanecer hasta 24 horas a pleno sol sin peligro alguno.',
            en: 'Can be kept for up to 24 hours under direct sun with zero risk.',
            de: 'Kann bis zu 24 Stunden in der Sonne stehen ohne Risiko.',
          },
          isCorrect: false,
        },
        {
          text: {
            es: 'Se conserva indefinidamente a temperatura ambiente si lleva cebolla.',
            en: 'Keeps indefinitely at room temperature if it contains onions.',
            de: 'Hält unbegrenzt ungekühlt, wenn Zwiebeln enthalten sind.',
          },
          isCorrect: false,
        },
      ];
    } else {
      optionsRaw = [
        {
          text: {
            es: 'Mantener el centro térmico a **70°C durante 2 minutos** (o **63°C durante 20 segundos**).',
            en: 'Maintain thermal core at **70°C for 2 minutes** (or **63°C for 20 seconds**).',
            de: 'Kerntemperatur **70°C für 2 Minuten** (oder **63°C für 20 Sekunden**) halten.',
          },
          isCorrect: true,
        },
        {
          text: {
            es: 'Calentar únicamente a 40°C para no modificar la fluidez de la yema.',
            en: 'Heat only to 40°C to preserve runny egg yolk texture.',
            de: 'Nur auf 40°C erwärmen, um die flüssige Eigelbstruktur zu wahren.',
          },
          isCorrect: false,
        },
        {
          text: {
            es: 'Hervir el huevo a 100°C durante 30 minutos hasta desecarlo por completo.',
            en: 'Boil eggs at 100°C for 30 minutes until totally dry.',
            de: 'Eier 30 Minuten lang bei 100°C kochen bis sie komplett trocken sind.',
          },
          isCorrect: false,
        },
      ];
    }
  } else if (fact.id.includes('mortadelo') || fact.id.includes('skin') || fact.id.includes('comic')) {
    optionsRaw = [
      {
        text: {
          es: 'Un mítico gag humorístico de Mortadelo y Filemón (Mito no demostrado gastronómicamente).',
          en: 'A classic Mortadelo y Filemón comic gag (Unproved culinary myth).',
          de: 'Ein klassischer Comic-Gag von Mortadelo & Filemón (Unbewiesener Mythos).',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Una receta real patentada en el siglo XIX por la Real Academia de Gastronomía.',
          en: 'An authentic 19th-century recipe patented by the Royal Gastronomy Academy.',
          de: 'Ein authentisches Rezept aus dem 19. Jahrhundert.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Un mandato nutricional obligatorio en la cocina de los Reyes Católicos.',
          en: 'A mandatory dietary mandate from the Catholic Monarchs court.',
          de: 'Ein Pflichtdekret am Hof der Katholischen Könige.',
        },
        isCorrect: false,
      },
    ];
  } else if (fact.id.includes('1817') || fact.id.includes('navarra') || fact.id.includes('memorial')) {
    optionsRaw = [
      {
        text: {
          es: 'Documento oficial verificado en las Cortes de Navarra (1817) como primera mención exacta.',
          en: 'Verified official document in Navarre Assembly (1817) as earliest exact mention.',
          de: 'Dokumentierte Erwähnung in den Cortes von Navarra (1817).',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Un mito inventado por el cine español en los años 1990.',
          en: 'A modern myth created by Spanish cinema in the 1990s.',
          de: 'Ein moderner Mythos aus dem spanischen Kino der 1990er.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Manuscrito del Imperio Romano del siglo II d.C.',
          en: 'Roman Empire manuscript from the 2nd century AD.',
          de: 'Römisches Manuskript aus dem 2. Jahrhundert n. Chr.',
        },
        isCorrect: false,
      },
    ];
  } else if (fact.id.includes('vitoria') || fact.id.includes('record') || fact.id.includes('1600')) {
    optionsRaw = [
      {
        text: {
          es: 'Récord histórico probado en Vitoria-Gasteiz (2014) con 1.600 kg de tortilla.',
          en: 'Proved world record in Vitoria-Gasteiz (2014) with 1,600 kg of Spanish omelette.',
          de: 'Bewiesener Weltrekord in Vitoria-Gasteiz (2014) mit 1.600 kg Tortilla.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Un montaje publicitario desmentido donde solo se frío 1 kg de patata.',
          en: 'A debunked marketing stunt where only 1 kg of potatoes was cooked.',
          de: 'Ein widerlegter Marketing-Gag mit nur 1 kg Kartoffeln.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Una leyenda medieval sin ningún registro fotográfico ni notarial.',
          en: 'A medieval legend without any photographic or legal notarization.',
          de: 'Eine mittelalterliche Legende ohne jeglichen Bild- oder Notar-Nachweis.',
        },
        isCorrect: false,
      },
    ];
  } else if (fact.id.includes('concebollistas') || fact.id.includes('cis') || category === 'factions') {
    optionsRaw = [
      {
        text: {
          es: 'Hecho probado respaldado por encuestas oficiales del CIS (Gran preferencia por la cebolla).',
          en: 'Proved fact supported by official CIS national polls (High onion preference).',
          de: 'Bewiesener Fakt gestützt auf offizielle CIS-Umfragen (Mehrheit für Zwiebeln).',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Mito urbano falso: el 100% de la población aborrece la cebolla.',
          en: 'False urban myth: 100% of the population detests onions.',
          de: 'Falscher Mythos: 100% der Bevölkerung lehnen Zwiebeln ab.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Leyenda de cómic sin muestra demográfica real.',
          en: 'Comic legend lacking any real demographic data.',
          de: 'Comic-Legende ohne echte demografische Daten.',
        },
        isCorrect: false,
      },
    ];
  } else {
    // Default dynamic distractor template based on verified status
    if (isProved) {
      optionsRaw = [
        {
          text: {
            es: `Hecho verificado: ${fact.fact.es}`,
            en: `Verified Fact: ${fact.fact.en}`,
            de: `Verifizierter Fakt: ${fact.fact.de}`,
          },
          isCorrect: true,
        },
        {
          text: {
            es: 'Mito popular sin fundamento histórico ni respaldo científico.',
            en: 'Popular myth without historical or scientific foundation.',
            de: 'Populärer Mythos ohne historische oder wissenschaftliche Grundlage.',
          },
          isCorrect: false,
        },
        {
          text: {
            es: 'Falsificación moderna desmentida por los archivos oficiales.',
            en: 'Modern forgery debunked by official archives.',
            de: 'Moderne Fälschung, widerlegt durch offizielle Archive.',
          },
          isCorrect: false,
        },
      ];
    } else {
      optionsRaw = [
        {
          text: {
            es: `Mito / Leyenda: ${fact.fact.es}`,
            en: `Myth / Legend: ${fact.fact.en}`,
            de: `Mythos / Legende: ${fact.fact.de}`,
          },
          isCorrect: true,
        },
        {
          text: {
            es: 'Hecho verificado y publicado en el Boletín Oficial del Estado.',
            en: 'Verified fact published in the official government gazette.',
            de: 'Verifizierte Tatsache, veröffentlicht im offiziellen Staatsblatt.',
          },
          isCorrect: false,
        },
        {
          text: {
            es: 'Estándar bactericida térmico obligatorio en toda la Unión Europea.',
            en: 'Mandatory thermal bactericidal standard across the European Union.',
            de: 'Verbindlicher bakterieller Hitze-Standard in der Europäischen Union.',
          },
          isCorrect: false,
        },
      ];
    }
  }

  // Deterministically shuffle options based on indexSeed so position varies A, B, C
  const shift = indexSeed % 3;
  const rotated = [...optionsRaw.slice(shift), ...optionsRaw.slice(0, shift)];

  const optionLetters: ('a' | 'b' | 'c')[] = ['a', 'b', 'c'];
  const options: QuizOption[] = rotated.map((opt, i) => ({
    id: optionLetters[i],
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  const correctOption = options.find((o) => o.isCorrect);

  return {
    factId: fact.id,
    category: fact.category,
    status: fact.status,
    title: fact.title,
    questionText,
    options,
    explanation: fact.explanation,
    source: fact.source,
    sourceUrl: fact.sourceUrl,
    evidence: fact.evidence,
    correctOptionId: correctOption ? correctOption.id : 'a',
  };
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a full quiz question set based on chosen level, topic, and optional seed.
 * Optimized for O(K) complexity so it operates instantly even with 10,000+ facts.
 */
export function generateQuizSet(
  allFacts: TriviaFact[],
  level: QuizLevel = 'apprentice',
  topic: string = 'all',
  seed: number = 42
): QuizQuestion[] {
  // Filter by topic category if specified
  let candidateFacts = allFacts;
  if (topic !== 'all') {
    candidateFacts = allFacts.filter((f) => f.category === topic);
    if (candidateFacts.length === 0) {
      candidateFacts = allFacts;
    }
  }

  const levelConfig = QUIZ_LEVELS[level] || QUIZ_LEVELS.apprentice;
  const targetCount = levelConfig.questionCount;
  const totalCandidates = candidateFacts.length;

  if (totalCandidates === 0) {
    return [];
  }

  const prng = mulberry32(seed || 42);
  const countToPick = Math.min(targetCount, totalCandidates);

  const selectedIndices = new Set<number>();
  const selectedFacts: TriviaFact[] = [];

  if (totalCandidates <= countToPick) {
    selectedFacts.push(...candidateFacts);
  } else {
    // O(K) Partial sampling instead of sorting 10,000+ elements
    let attempts = 0;
    const maxAttempts = countToPick * 15;
    while (selectedIndices.size < countToPick && attempts < maxAttempts) {
      const idx = Math.floor(prng() * totalCandidates);
      if (!selectedIndices.has(idx)) {
        selectedIndices.add(idx);
        selectedFacts.push(candidateFacts[idx]);
      }
      attempts++;
    }

    // Fallback if collision limit was reached
    if (selectedFacts.length < countToPick) {
      for (let i = 0; i < totalCandidates && selectedFacts.length < countToPick; i++) {
        if (!selectedIndices.has(i)) {
          selectedIndices.add(i);
          selectedFacts.push(candidateFacts[i]);
        }
      }
    }
  }

  return selectedFacts.map((fact, index) => generateQuestionForFact(fact, index + seed));
}

/**
 * Evaluates the final quiz results, score, rank badge, and share payload.
 */
export function evaluateQuizResult(
  score: number,
  totalQuestions: number,
  streakMax: number,
  level: QuizLevel,
  topic: string,
  lang: 'es' | 'en' | 'de' = 'es'
): QuizResult {
  const percentage = Math.round((score / Math.max(1, totalQuestions)) * 100);

  let rankTitle = {
    es: 'Aprendiz del Volteado 🥚',
    en: 'Flip Apprentice 🥚',
    de: 'Wende-Lehrling 🥚',
  };

  if (percentage >= 90) {
    rankTitle = {
      es: 'Cocinero Legendario Pasteurizado 🏆',
      en: 'Pasteurized Omelette Legend 🏆',
      de: 'Legendärer Pasteur-Meister 🏆',
    };
  } else if (percentage >= 70) {
    rankTitle = {
      es: 'Maestro Tortillero 🍳',
      en: 'Master Omelette Chef 🍳',
      de: 'Tortilla-Meister 🍳',
    };
  } else if (percentage >= 50) {
    rankTitle = {
      es: 'Erudito de la Patata 📖',
      en: 'Potato Scholar 📖',
      de: 'Kartoffel-Gelehrter 📖',
    };
  }

  const topicLabels: Record<string, { es: string; en: string; de: string }> = {
    all: { es: 'Todos los Temas', en: 'All Topics', de: 'Alle Themen' },
    history: { es: 'Historia y Orígenes', en: 'History & Origins', de: 'Geschichte & Ursprung' },
    science: { es: 'Ciencia y Seguridad (70°C / 2 min)', en: 'Science & Safety (70°C / 2 min)', de: 'Wissenschaft & Sicherheit (70°C / 2 Min)' },
    regions: { es: 'Tradiciones Regionales', en: 'Regional Traditions', de: 'Regionale Traditionen' },
    'pop-culture': { es: 'Cultura Pop y Cómics', en: 'Pop Culture & Comics', de: 'Pop-Kultur & Comics' },
    records: { es: 'Récords Mundiales', en: 'World Records', de: 'Weltrekorde' },
    factions: { es: 'Facciones e Inquisición', en: 'Factions & Debates', de: 'Fraktionen & Debatten' },
  };

  const levelLabel = QUIZ_LEVELS[level]?.label[lang] || level;
  const topicLabel = topicLabels[topic]?.[lang] || topic;

  const originUrl = 'https://tortilladepatatas.org';
  const challengeUrl = `${originUrl}/${lang}/juego-trivia?level=${level}&topic=${topic}`;

  let shareText = '';
  if (lang === 'en') {
    shareText = `🍳 TORTILLA DE PATATAS TRIVIA CHALLENGE 🍳\nLevel: ${levelLabel} | Topic: ${topicLabel}\nScore: ${score}/${totalQuestions} (${percentage}%) - ${rankTitle.en}\nMax Streak: ${streakMax} 🔥\n\nSafety Rule Verified: 70°C for 2 min / max 4 hours ambient.\n\nTake the challenge at:\n${challengeUrl}`;
  } else if (lang === 'de') {
    shareText = `🍳 TORTILLA DE PATATAS TRIVIA-CHALLENGE 🍳\nLevel: ${levelLabel} | Thema: ${topicLabel}\nErgebnis: ${score}/${totalQuestions} (${percentage}%) - ${rankTitle.de}\nMax. Serie: ${streakMax} 🔥\n\nSicherheitsstandard: 70°C für 2 Min / max 4 Std ungekühlt.\n\nSpiel mit unter:\n${challengeUrl}`;
  } else {
    shareText = `🍳 DESAFÍO TRIVIA TORTILLA DE PATATAS 🍳\nNivel: ${levelLabel} | Tema: ${topicLabel}\nPuntuación: ${score}/${totalQuestions} (${percentage}%) - ${rankTitle.es}\nRacha máxima: ${streakMax} 🔥\n\nNorma Térmica: 70°C durante 2 minutos / máx 4 horas ambiente.\n\n¿Puedes superarme? Juega en:\n${challengeUrl}`;
  }

  return {
    score,
    totalQuestions,
    percentage,
    streakMax,
    level,
    topic,
    rankTitle,
    shareText,
    challengeUrl,
  };
}
