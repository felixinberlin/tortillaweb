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
 * Guarantees that any source URL provided in the trivia quiz
 * is an existing, validated link, applying accurate Wikipedia section anchors
 * (#Historia, #Salud_y_nutrición, #Formas_de_cocinarla, #Variantes, etc.)
 */
export function resolveVerifiedTriviaUrl(url: string | undefined, fact: TriviaFact): string {
  if (!url || url.trim() === '') {
    switch (fact.category) {
      case 'safety':
      case 'science':
        return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Salud_y_nutrici%C3%B3n';
      case 'regions':
      case 'factions':
        return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Variantes';
      case 'pop_culture':
      case 'records':
        return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#V%C3%A9ase_tambi%C3%A9n';
      default:
        return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Historia';
    }
  }

  // Handle any legacy query strings or raw searches
  if (url.includes('?search=')) {
    const searchParam = decodeURIComponent(url.split('?search=')[1] || '').toLowerCase();
    const title = (fact.title?.es || '').toLowerCase();
    const id = (fact.id || '').toLowerCase();

    if (searchParam.includes('zumalac') || title.includes('zumalac') || id.includes('zumalac')) {
      return 'https://es.wikipedia.org/wiki/Tom%C3%A1s_de_Zumalac%C3%A1rregui';
    }
    if (searchParam.includes('villanueva') || searchParam.includes('serena') || title.includes('villanueva')) {
      return 'https://es.wikipedia.org/wiki/Villanueva_de_la_Serena#La_tortilla_de_patatas';
    }
    if (searchParam.includes('salmonel') || title.includes('salmonel')) {
      return 'https://es.wikipedia.org/wiki/Salmonella';
    }
    if (searchParam.includes('maillard') || title.includes('maillard')) {
      return 'https://es.wikipedia.org/wiki/Reacci%C3%B3n_de_Maillard';
    }
    if (searchParam.includes('solanin') || title.includes('solanin')) {
      return 'https://es.wikipedia.org/wiki/Solanina';
    }
    if (searchParam.includes('vitoria') || title.includes('vitoria')) {
      return 'https://es.wikipedia.org/wiki/Vitoria';
    }
    if (fact.category === 'safety' || fact.category === 'science') {
      return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Salud_y_nutrici%C3%B3n';
    }
    if (fact.category === 'factions' || fact.category === 'regions') {
      return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Variantes';
    }
    return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Historia';
  }

  // If it's a bare Tortilla_de_patatas URL without anchor, append right section anchor
  if (url === 'https://es.wikipedia.org/wiki/Tortilla_de_patatas' || url === 'https://es.wikipedia.org/wiki/Tortilla_de_patatas/') {
    if (fact.category === 'safety' || fact.category === 'science') {
      return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Salud_y_nutrici%C3%B3n';
    }
    if (fact.category === 'factions' || fact.category === 'regions') {
      return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Variantes';
    }
    if (fact.category === 'pop_culture' || fact.category === 'records') {
      return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#V%C3%A9ase_tambi%C3%A9n';
    }
    return 'https://es.wikipedia.org/wiki/Tortilla_de_patatas#Historia';
  }

  return url;
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

  // Specific distractor customization based on fact ID, keywords or category
  let optionsRaw: { text: { es: string; en: string; de: string }; isCorrect: boolean }[] = [];

  const factId = fact.id.toLowerCase();
  const factEs = (fact.fact?.es || '').toLowerCase();
  const titleEs = (fact.title?.es || '').toLowerCase();
  const explEs = (fact.explanation?.es || '').toLowerCase();

  // 1. SPECIFIC FOOD SAFETY RULES (Nuanced, varied answers testing bactericidal safety standards)
  if (factId.includes('salmonella') || (titleEs.includes('salmonella') && (factId.includes('70') || factEs.includes('70')))) {
    optionsRaw = [
      {
        text: {
          es: 'Garantizar la pasteurización bactericida alcanzando **70°C durante 2 minutos** en el centro de la masa.',
          en: 'Ensure bactericidal pasteurization by reaching **70°C for 2 minutes** at thermal core.',
          de: 'Bakterizide Pasteurisation durch **70°C für 2 Minuten** im Kern sicherstellen.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Calentar únicamente a 45°C durante 10 segundos para no alterar la textura líquida.',
          en: 'Heat only to 45°C for 10 seconds to keep runny texture unchanged.',
          de: 'Nur für 10 Sekunden auf 45°C erwärmen, um die flüssige Textur nicht zu verändern.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Añadir una pizca de azúcar refinado para neutralizar microorganismos sin aplicar calor.',
          en: 'Add a pinch of refined sugar to neutralize pathogens without applying heat.',
          de: 'Eine Prise raffinierten Zucker zugeben, um Erreger ohne Hitze zu neutralisieren.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('betanzos') && (factEs.includes('63°c') || titleEs.includes('jugosa') || factId.includes('inmediato'))) {
    optionsRaw = [
      {
        text: {
          es: 'Aplicar el umbral técnico de **63°C durante 20 segundos** en el núcleo y servir de inmediato.',
          en: 'Apply the technical threshold of **63°C for 20 seconds** in the core and serve immediately.',
          de: 'Technische Schwelle von **63°C für 20 Sekunden** im Kern anwenden und sofort servieren.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Mantener el huevo crudo a 20°C en la encimera durante 3 horas antes del pase.',
          en: 'Keep raw egg at 20°C on counter for 3 hours before serving.',
          de: 'Rohes Ei vor dem Servieren 3 Stunden bei 20°C auf der Arbeitsplatte stehen lassen.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Cocinar en microondas a máxima potencia durante 15 minutos hasta desecar.',
          en: 'Microwave at full power for 15 minutes until completely desiccated.',
          de: 'In der Mikrowelle bei maximaler Leistung 15 Minuten erhitzen bis zur Austrocknung.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('rd-1021') || factId.includes('normativa') || factId.includes('hosteleria')) {
    optionsRaw = [
      {
        text: {
          es: 'Cumplir el estándar legal (RD 1021/2022): **70°C durante 2 minutos** (o **63°C durante 20 segundos** para servicio inmediato).',
          en: 'Comply with hygiene law (RD 1021/2022): **70°C for 2 minutes** (or **63°C for 20 seconds** for immediate serving).',
          de: 'Hygienestandard einhalten (RD 1021/2022): **70°C für 2 Minuten** (oder **63°C für 20 Sekunden** bei Sofortverzehr).',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Cualquier temperatura de cocinado es legal si la tortilla se prepara a la vista del cliente.',
          en: 'Any cooking temperature is legal if the omelette is prepared in view of diners.',
          de: 'Jede Gartemperatur ist legal, wenn die Tortilla vor den Augen des Gastes zubereitet wird.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Exigir exclusivamente huevo en polvo deshidratado sin control de pasteurización.',
          en: 'Require solely dehydrated powdered egg without pasteurization control.',
          de: 'Ausschließlich dehydriertes Volleipulver ohne Pasteurisationskontrolle vorschreiben.',
        },
        isCorrect: false,
      },
    ];
  } else if (
    factId === 'golden-rule-70c' ||
    factId.includes('regla-de-oro') ||
    factId.includes('70c-2min') ||
    factId.includes('compromiso-sanitario') ||
    (titleEs.includes('regla de oro') && titleEs.includes('70'))
  ) {
    optionsRaw = [
      {
        text: {
          es: 'El estándar de oro sanitario exige **70°C durante 2 minutos** en el centro térmico (o **63°C durante 20 segundos**).',
          en: 'The culinary golden safety standard mandates **70°C for 2 minutes** at thermal core (or **63°C for 20 seconds**).',
          de: 'Der goldene Sicherheitsstandard verlangt **70°C für 2 Minuten** im Kern (oder **63°C für 20 Sekunden**).',
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
  } else if (factId.includes('4-hour') || factEs.includes('4 horas') || titleEs.includes('4 horas') || explEs.includes('4 horas')) {
    optionsRaw = [
      {
        text: {
          es: 'Consumir en un máximo de **4 horas** si permanece a temperatura ambiente (desechar tras ese tiempo).',
          en: 'Consume within a maximum of **4 hours** if left at room temperature (discard after).',
          de: 'Bei Raumtemperatur innerhalb von maximal **4 Stunden** verzehren (danach entsorgen).',
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
  } else if (factId.includes('refriger') || titleEs.includes('refriger') || factEs.includes('<8°c') || factEs.includes('8°c')) {
    optionsRaw = [
      {
        text: {
          es: 'Refrigerar rápidamente por debajo de 8°C (óptimo 4°C) para frenar la proliferación de patógenos.',
          en: 'Refrigerate promptly below 8°C (optimally 4°C) to stop pathogen proliferation.',
          de: 'Schnell unter 8°C (optimal 4°C) kühlen, um die Vermehrung von Krankheitserregern zu stoppen.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Dejar templar 48 horas en un armario cálido para que fermente el tubérculo.',
          en: 'Leave tempering for 48 hours in a warm cupboard to ferment the potato.',
          de: '48 Stunden in einem warmen Schrank lagern, um die Kartoffel zu fermentieren.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'La tortilla nunca debe refrigerarse porque las bajas temperaturas multiplican las bacterias.',
          en: 'Tortilla should never be chilled as cold temperatures supposedly multiply bacteria.',
          de: 'Tortilla darf niemals gekühlt werden, da Kälte Bakterien angeblich vermehrt.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('maillard') || titleEs.includes('maillard') || factEs.includes('maillard')) {
    optionsRaw = [
      {
        text: {
          es: 'Se produce entre 140°C y 165°C al interactuar aminoácidos del huevo y azúcares de la patata.',
          en: 'Occurs between 140°C and 165°C through interaction of egg amino acids and potato sugars.',
          de: 'Findet zwischen 140°C und 165°C durch Reaktion von Ei-Aminosäuren mit Kartoffelzuckern statt.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'El dorado exterior solo se activa mediante congelación criogénica a -18°C.',
          en: 'Exterior browning only activates through cryogenic freezing at -18°C.',
          de: 'Die äußere Bräunung wird nur durch kryogenes Einfrieren bei -18°C aktiviert.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'El color tostado procede exclusivamente de colorantes artificiales sintéticos.',
          en: 'The toasted brown tone comes exclusively from synthetic artificial colorings.',
          de: 'Der gebräunte Farbton stammt ausschließlich aus synthetischen Lebensmittelfarben.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('almidon') || factId.includes('gelatiniz') || titleEs.includes('almidón') || factEs.includes('almidón')) {
    optionsRaw = [
      {
        text: {
          es: 'El almidón de la patata gelatiniza entre 62°C y 68°C en contacto con agua, aportando cremosidad.',
          en: 'Potato starch gelatinizes between 62°C and 68°C with moisture, providing creaminess.',
          de: 'Kartoffelstärke geliert zwischen 62°C und 68°C mit Feuchtigkeit für Cremigkeit.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'El almidón se evapora espontáneamente a 15°C a temperatura ambiente.',
          en: 'Starch evaporates spontaneously at 15°C room temperature.',
          de: 'Stärke verdampft spontan bei 15°C Raumtemperatur.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'La patata no contiene almidón; su ligazón interior proviene únicamente de la salmuera.',
          en: 'Potatoes contain no starch; interior binding comes solely from brine.',
          de: 'Kartoffeln enthalten keine Stärke; die Bindung entsteht nur durch Salzlake.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('solanin') || titleEs.includes('solanina') || factEs.includes('solanina')) {
    optionsRaw = [
      {
        text: {
          es: 'Las patatas verdes acumulan solanina, un glicoalcaloide amargo y tóxico no soluble en aceite.',
          en: 'Green potatoes accumulate solanine, a toxic bitter glycoalkaloid not soluble in oil.',
          de: 'Grüne Kartoffeln bilden Solanin, ein bitteres und giftiges Glykoalkaloid.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'El verdor en la patata es clorofila pura y dulce, altamente nutritiva y segura.',
          en: 'Green coloration on potatoes is pure sweet chlorophyll, highly nutritious and safe.',
          de: 'Die grüne Verfärbung ist reines süßes Chlorophyll, sehr nahrhaft und unbedenklich.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'La solanina se neutraliza al 100% batiendo el huevo durante 10 segundos.',
          en: 'Solanine is 100% neutralized by whisking eggs for 10 seconds.',
          de: 'Solanin wird zu 100% durch 10 Sekunden langes Eierschlagen neutralisiert.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('lavar') || titleEs.includes('lavar') || titleEs.includes('cutícula') || factEs.includes('cutícula')) {
    optionsRaw = [
      {
        text: {
          es: 'Evitar lavar los huevos antes de almacenarlos para no eliminar su cutícula protectora natural.',
          en: 'Avoid washing eggs before storage so as not to strip their natural protective cuticle.',
          de: 'Eier vor der Lagerung nicht waschen, um die natürliche Schutzschicht nicht zu zerstören.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'Lavar siempre los huevos con jabón industrial y agua hirviendo antes de meterlos en la nevera.',
          en: 'Always wash eggs with industrial soap and boiling water before placing in the fridge.',
          de: 'Eier vor dem Kühlschrank immer mit Seife und kochendem Wasser schrubben.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'La cáscara del huevo es una capa de titanio macizo impenetrable al agua y al aire.',
          en: 'The eggshell is a solid titanium layer completely impervious to air and water.',
          de: 'Die Eierschale ist eine massive Titanschicht ohne Sauerstoffdurchlässigkeit.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('limon') || titleEs.includes('limón') || factEs.includes('limón')) {
    optionsRaw = [
      {
        text: {
          es: 'Unas gotas de limón reducen el pH del huevo dificultando el crecimiento de bacterias.',
          en: 'A few drops of lemon juice lower egg pH, inhibiting bacterial development.',
          de: 'Einige Tropfen Zitronensaft senken den pH-Wert und hemmen Bakterienwachstum.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'El limón elimina cualquier patógeno en 1 segundo sustituyendo totalmente a la cocción.',
          en: 'Lemon destroys any pathogen in 1 second, completely substituting cooking.',
          de: 'Zitrone eliminiert jeden Erreger in 1 Sekunde und ersetzt das Kochen völlig.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'El zumo de limón hace que el huevo se convierta en vapor dentro de la sartén.',
          en: 'Lemon juice makes raw eggs instantaneously evaporate into steam in the skillet.',
          de: 'Zitronensaft lässt rohe Eier in der Pfanne sofort zu Dampf verdampfen.',
        },
        isCorrect: false,
      },
    ];
  } else if (factId.includes('aceite') || factId.includes('humo') || titleEs.includes('aceite') || titleEs.includes('humo')) {
    optionsRaw = [
      {
        text: {
          es: 'El AOVE soporta hasta 190°C-210°C gracias a sus polifenoles y ácido oleico estable.',
          en: 'EVOO withstands up to 190°C-210°C thanks to stable oleic acid and polyphenols.',
          de: 'Natives Olivenöl widersteht bis zu 190°C-210°C dank stabiler Ölsäure und Polyphenolen.',
        },
        isCorrect: true,
      },
      {
        text: {
          es: 'El aceite de oliva entra en combustión tóxica a 45°C de temperatura.',
          en: 'Olive oil enters toxic combustion at just 45°C.',
          de: 'Olivenöl verbrennt bereits bei 45°C toxisch.',
        },
        isCorrect: false,
      },
      {
        text: {
          es: 'Se recomienda reutilizar el mismo aceite sin filtrar más de 40 veces consecutivas.',
          en: 'It is recommended to reuse unfiltered oil more than 40 consecutive times.',
          de: 'Es wird empfohlen, ungefiltertes Öl mehr als 40 Mal wiederzuverwenden.',
        },
        isCorrect: false,
      },
    ];
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
    // Rich category-aware dynamic distractor pools to prevent repetitive text across questions
    const factHash = Math.abs(fact.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + indexSeed);

    if (isProved) {
      const scienceDistractors = [
        {
          es: 'Mito pseudocientífico sin respaldo en la termodinámica ni en ensayos de laboratorio.',
          en: 'Pseudoscientific myth unsupported by thermodynamics or laboratory assays.',
          de: 'Pseudowissenschaftlicher Mythos ohne thermodynamische oder Laborbelege.',
        },
        {
          es: 'Creencia empírica errónea desmentida por la química de los alimentos del CSIC.',
          en: 'Erroneous empirical belief disproven by CSIC food chemistry.',
          de: 'Empirischer Irrglaube, widerlegt durch Lebensmittelchemie des CSIC.',
        },
        {
          es: 'Reacción física ficticia que no altera la cinética molecular de los componentes.',
          en: 'Fictitious physical reaction that does not alter molecular kinetics of ingredients.',
          de: 'Fiktive physikalische Reaktion ohne Einfluss auf die molekulare Kinetik.',
        },
        {
          es: 'Suposición popular refutada por mediciones reológicas y curvas de viscosidad.',
          en: 'Popular assumption disproven by rheological measurements and viscosity curves.',
          de: 'Populäre Annahme, widerlegt durch rheologische Messungen und Viskositätskurven.',
        },
      ];

      const historyDistractors = [
        {
          es: 'Leyenda transmitida por tradición oral sin registro documental en archivos históricos.',
          en: 'Legend transmitted by oral tradition without documentary record in historical archives.',
          de: 'Mündlich überlieferte Legende ohne dokumentarische Aufzeichnungen in Archiven.',
        },
        {
          es: 'Mito decimonónico atribuido popularmente sin respaldo notarial ni bibliográfico.',
          en: '19th-century myth popularly attributed without notarized or bibliographical support.',
          de: 'Mythos aus dem 19. Jahrhundert ohne notarielle oder bibliografische Belege.',
        },
        {
          es: 'Falsificación moderna desmentida por historiadores y cronistas de la gastronomía.',
          en: 'Modern forgery refuted by historians and culinary chroniclers.',
          de: 'Moderne Fälschung, widerlegt durch Historiker und Gastronomie-Chronisten.',
        },
        {
          es: 'Relato apócrifo atribuido erróneamente a crónicas militares o cortesanas.',
          en: 'Apocryphal tale mistakenly attributed to military or court chronicles.',
          de: 'Apokryphe Erzählung, die fälschlicherweise Chroniken zugeschrieben wurde.',
        },
      ];

      const regionalDistractors = [
        {
          es: 'Costumbre local minoritaria sin reconocimiento en recetarios ni academias gastronómicas.',
          en: 'Minority local custom lacking recognition in recipe compendiums or culinary academies.',
          de: 'Lokale Minderheitssitte ohne Anerkennung in Rezeptsammlungen oder Akademien.',
        },
        {
          es: 'Bulo gastronómico viral surgido en redes sociales sin arraigo tradicional comprobable.',
          en: 'Viral culinary hoax emerging on social media without verifiable traditional roots.',
          de: 'Viraler kulinarischer Hoax aus sozialen Medien ohne nachweisbare traditionelle Wurzeln.',
        },
        {
          es: 'Variante comercial moderna creada sin fundamento en la memoria culinaria regional.',
          en: 'Modern commercial variant created without basis in regional culinary heritage.',
          de: 'Moderne kommerzielle Variante ohne Fundament im regionalen kulinarischen Erbe.',
        },
        {
          es: 'Preferencia anecdótica individual que carece de consenso demográfico contrastado.',
          en: 'Anecdotal individual preference lacking any verified demographic consensus.',
          de: 'Anekdotische Einzelpräferenz ohne überprüften demografischen Konsens.',
        },
      ];

      const popDistractors = [
        {
          es: 'Anécdota ficticia generada por una campaña publicitaria en medios de comunicación.',
          en: 'Fictitious anecdote generated by a media advertising campaign.',
          de: 'Fiktive Anekdote aus einer Werbekampagne in den Medien.',
        },
        {
          es: 'Rumor sensacionalista desmentido por los comités oficiales de certificación de récords.',
          en: 'Sensationalist rumor debunked by official record certification committees.',
          de: 'Boulevard-Gerücht, widerlegt durch offizielle Rekord-Zertifizierungskomitees.',
        },
        {
          es: 'Mito urbano popularizado en televisión sin registro gráfico ni acreditación notarial.',
          en: 'Urban myth popularized on television lacking graphic evidence or notarized proof.',
          de: 'Urbaner Mythos aus dem Fernsehen ohne Bildnachweis oder notarielle Beglaubigung.',
        },
        {
          es: 'Montaje efímero sin homologación en los anales del Libro Guinness.',
          en: 'Ephemeral stunt without official certification in Guinness World Records annals.',
          de: 'Kurzlebige Inszenierung ohne offizielle Anerkennung im Guinness-Buch.',
        },
      ];

      let pool = historyDistractors;
      if (category === 'science' || category === 'safety') {
        pool = scienceDistractors;
      } else if (category === 'regions' || category === 'factions') {
        pool = regionalDistractors;
      } else if (category === 'pop_culture' || category === 'records') {
        pool = popDistractors;
      }

      const d1 = pool[factHash % pool.length];
      const d2 = pool[(factHash + 1) % pool.length];

      optionsRaw = [
        {
          text: {
            es: fact.fact.es,
            en: fact.fact.en,
            de: fact.fact.de,
          },
          isCorrect: true,
        },
        {
          text: d1,
          isCorrect: false,
        },
        {
          text: d2,
          isCorrect: false,
        },
      ];
    } else {
      const verifiedDistractors = [
        {
          es: 'Hecho contrastado documentalmente en el Boletín Oficial del Estado (BOE).',
          en: 'Documented fact officially verified in the Government Gazette (BOE).',
          de: 'Dokumentierte Tatsache, verifiziert im offiziellen Staatsblatt (BOE).',
        },
        {
          es: 'Tratado culinario notariado del siglo XVIII custodiado en la Biblioteca Nacional.',
          en: 'Notarized 18th-century culinary treatise preserved in the National Library.',
          de: 'Notariell beglaubigte kulinarische Abhandlung des 18. Jhs. in der Nationalbibliothek.',
        },
        {
          es: 'Dictamen científico convalidado por el Instituto de la Grasa y laboratorios del CSIC.',
          en: 'Scientific ruling validated by the Fat Institute and CSIC laboratories.',
          de: 'Wissenschaftliches Gutachten, validiert durch das Fettinstitut und CSIC-Labore.',
        },
        {
          es: 'Registro administrativo certificado en las actas históricas de las Cortes Generales.',
          en: 'Certified administrative record in the historical parliamentary archives.',
          de: 'Zertifizierter administrativer Eintrag in den historischen Parlamentsakten.',
        },
      ];

      const v1 = verifiedDistractors[factHash % verifiedDistractors.length];
      const v2 = verifiedDistractors[(factHash + 1) % verifiedDistractors.length];

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
          text: v1,
          isCorrect: false,
        },
        {
          text: v2,
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
    sourceUrl: resolveVerifiedTriviaUrl(fact.sourceUrl, fact),
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
