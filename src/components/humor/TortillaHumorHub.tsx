import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  Laugh,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
  Award,
  Vote,
  Share2,
  HelpCircle,
  Dices,
  Skull,
  Heart,
  ChefHat,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TortillaHumorHubProps {
  lang?: string;
}

interface Excuse {
  id: string;
  situation: { es: string; en: string; de: string };
  excuse: { es: string; en: string; de: string };
  category: 'vuelco' | 'cuajado' | 'cebolla' | 'vanguardia';
  tag: { es: string; en: string; de: string };
}

interface SacrilegeQuestion {
  id: string;
  question: { es: string; en: string; de: string };
  options: {
    text: { es: string; en: string; de: string };
    points: number; // 0 = purist, 10 = heavy sacrilege
    reaction: { es: string; en: string; de: string };
  }[];
}

const excusesList: Excuse[] = [
  {
    id: 'excuse-1',
    category: 'vuelco',
    situation: {
      es: 'La tortilla se ha desparramado por la encimera al darle la vuelta.',
      en: 'The tortilla spilled all over the countertop during the flip.',
      de: 'Die Tortilla ist beim Wenden über die Arbeitsplatte geflossen.'
    },
    excuse: {
      es: '"No se me ha roto. Es un homenaje posmoderno al expresionismo abstracto de Jackson Pollock con base de huevo y almidón."',
      en: '"It didn\'t break. It is a postmodern culinary tribute to Jackson Pollock\'s abstract expressionism with an egg-and-starch base."',
      de: '"Sie ist nicht zerbrochen. Das ist eine postmoderne Hommage an den abstrakten Expressionismus von Jackson Pollock auf Eibasis."'
    },
    tag: { es: 'Alta Cocina Deconstructiva', en: 'Deconstructive Haute Cuisine', de: 'Dekonstruktive Spitzenküche' }
  },
  {
    id: 'excuse-2',
    category: 'cuajado',
    situation: {
      es: 'La tortilla ha quedado como un ladrillo refractario super cuajado.',
      en: 'The tortilla turned out as firm and dense as a refractory brick.',
      de: 'Die Tortilla ist hart und fest wie ein Ziegelstein geworden.'
    },
    excuse: {
      es: '"Está formulada específicamente para resistir terremotos de magnitud 7 y largas travesías en fiambrera de playa sin perder geometría."',
      en: '"It was engineered specifically to withstand magnitude 7 earthquakes and 8-hour beach cooler expeditions without structural failure."',
      de: '"Sie wurde speziell entwickelt, um Erdbeben der Stärke 7 und 8-stündigen Strandtransporten ohne Formverlust standzuhalten."'
    },
    tag: { es: 'Ingeniería Civil', en: 'Civil Engineering', de: 'Bauingenieurwesen' }
  },
  {
    id: 'excuse-3',
    category: 'cuajado',
    situation: {
      es: 'La tortilla está tan líquida que los invitados necesitan pajita.',
      en: 'The tortilla is so runny guests need drinking straws.',
      de: 'Die Tortilla ist so flüssig, dass die Gäste Strohhalme brauchen.'
    },
    excuse: {
      es: '"En Betanzos me condecorarían con la Real Orden del Huevo Meloso. Cualquier cuajado superior es un atentado a la hidrodinámica del caldo de yema."',
      en: '"In Betanzos they would award me the Royal Medal of Melty Yolk. Any firmer texture violates the laws of yolk hydrodynamics."',
      de: '"In Betanzos würde man mir die goldene Dotter-Medaille verleihen. Jedes weitere Stocken verstößt gegen die Hydrodynamik."'
    },
    tag: { es: 'Betancismo Extremo', en: 'Extreme Betanzos Style', de: 'Extremer Betanzos-Stil' }
  },
  {
    id: 'excuse-4',
    category: 'cebolla',
    situation: {
      es: 'La cebolla se ha quedado negra carbón.',
      en: 'The onion got charred pitch-black.',
      de: 'Die Zwiebeln sind kohleschwarz geworden.'
    },
    excuse: {
      es: '"No está quemada. Es cebolla sometida a pirólisis aromática controlada para aportar notas ahumadas de sarmiento riojano."',
      en: '"It\'s not burnt. It is onion subjected to controlled aromatic pyrolysis to introduce barrel-smoke grapevine notes."',
      de: '"Sie ist nicht verbrannt. Das ist kontrollierte aromatische Pyrolyse für rauchige Eichenholz-Noten."'
    },
    tag: { es: 'Alquimia Culinaria', en: 'Culinary Alchemy', de: 'Kulinarische Alchemie' }
  },
  {
    id: 'excuse-5',
    category: 'vuelco',
    situation: {
      es: 'La mitad de la tortilla se quedó pegada en la sartén antiadherente vieja.',
      en: 'Half of the tortilla remained fused to the vintage non-stick skillet.',
      de: 'Die Hälfte der Tortilla klebt unlösbar in der alten Teflonpfanne.'
    },
    excuse: {
      es: '"La sartén sintió apego emocional por la corteza dorada y decidió compartir la custodia."',
      en: '"The skillet developed deep emotional attachment to the golden crust and requested joint custody."',
      de: '"Die Pfanne hat eine emotionale Bindung zur goldenen Kruste aufgebaut und fordert geteiltes Sorgerecht."'
    },
    tag: { es: 'Drama Doméstico', en: 'Domestic Drama', de: 'Küchendrama' }
  },
  {
    id: 'excuse-6',
    category: 'vanguardia',
    situation: {
      es: 'Le echaste chorizo, queso cabrales y maíz dulce sin avisar a nadie.',
      en: 'You tossed in chorizo, blue cheese, and sweet corn without warning anyone.',
      de: 'Du hast heimlich Chorizo, Blauschimmelkäse und Dosenmais hineingeworfen.'
    },
    excuse: {
      es: '"Es un cruce intercultural transatlántico en tres tiempos. Quien no comprenda la audacia no merece el bocado."',
      en: '"It is a three-stage transatlantic intercultural fusion. Those who lack vision do not deserve the forkful."',
      de: '"Das ist eine transatlantische Fusionskreation in drei Akten. Wer den Mut nicht versteht, verdient keinen Bissen."'
    },
    tag: { es: 'Vanguardia Incomprendida', en: 'Misunderstood Avant-Garde', de: 'Verkannte Avantgarde' }
  }
];

const sacrilegeQuestions: SacrilegeQuestion[] = [
  {
    id: 'q1',
    question: {
      es: '¿Qué opinas de ponerle Kétchup o Mayonesa industrial a una tortilla recién hecha?',
      en: 'How do you feel about putting industrial Ketchup or Mayonnaise on fresh tortilla?',
      de: 'Was hältst du von Ketchup oder Industrie-Mayonnaise auf frischer Tortilla?'
    },
    options: [
      {
        text: { es: '¡Cárcel gastronómica sin fianza!', en: 'Straight to culinary jail with no bail!', de: 'Sofortige Haftstrafe ohne Kaution!' },
        points: 0,
        reaction: { es: 'Un purista de honor.', en: 'A true honorable purist.', de: 'Ein wahrer Purist mit Ehre.' }
      },
      {
        text: { es: 'Solo un toque discreto si la tortilla ha quedado seca.', en: 'Only a discreet dab if it turned out too dry.', de: 'Nur ein kleiner Klecks, wenn sie zu trocken geraten ist.' },
        points: 5,
        reaction: { es: 'Peligrosa pendiente resbaladiza.', en: 'A dangerous slippery slope.', de: 'Eine gefährliche Gratwanderung.' }
      },
      {
        text: { es: '¡Me encanta bañarla en kétchup dulce!', en: 'I love drowning it in sweet ketchup!', de: 'Ich ertränke sie am liebsten in Ketchup!' },
        points: 10,
        reaction: { es: 'La Inquisición de Betanzos te busca.', en: 'The Betanzos Inquisition is tracking your IP.', de: 'Die Inquisition sucht nach dir.' }
      }
    ]
  },
  {
    id: 'q2',
    question: {
      es: '¿Cómo cortas las patatas antes de freírlas?',
      en: 'How do you cut your potatoes before cooking?',
      de: 'Wie schneidest du die Kartoffeln vor dem Braten?'
    },
    options: [
      {
        text: { es: 'Láminas finas o chascadas a cuchillo para soltar almidón.', en: 'Thin irregular wafers snapped by knife to release starch.', de: 'Feine Scheiben mit dem Messer gebrochen für optimale Stärke.' },
        points: 0,
        reaction: { es: 'Técnica canónica perfecta.', en: 'Flawless canonical technique.', de: 'Perfekte kanonische Technik.' }
      },
      {
        text: { es: 'En dados regulares como si fuera una ensaladilla rusa.', en: 'Equal geometric cubes like a Russian salad.', de: 'Gleichmäßige Würfel wie für russischen Salat.' },
        points: 4,
        reaction: { es: 'Aceptable, aunque poco tradicional.', en: 'Acceptable, though unorthodox.', de: 'Akzeptabel, wenn auch unüblich.' }
      },
      {
        text: { es: 'Bolsa de patatas fritas de bolsa trituradas con la mano.', en: 'A crushed bag of commercial potato chips.', de: 'Zerdrückte Chips aus der Tüte.' },
        points: 8,
        reaction: { es: 'Homenaje a Ferran Adrià o pereza galáctica.', en: 'Ferran Adrià tribute or galaxy-level laziness.', de: 'Hommage an Ferran Adrià oder extreme Faulheit.' }
      }
    ]
  },
  {
    id: 'q3',
    question: {
      es: 'Al darle la vuelta a la sartén en el aire:',
      en: 'When flipping the tortilla in mid-air:',
      de: 'Beim Wenden der Pfanne in der Luft:'
    },
    options: [
      {
        text: { es: 'Uso un plato llano humedecido con decisión y aplomo.', en: 'I use a moistened flat plate with firmness and composure.', de: 'Ich nehme einen flachen Teller mit ruhiger Entschlossenheit.' },
        points: 0,
        reaction: { es: 'Mano de maestro tortillero.', en: 'Master hands.', de: 'Hände eines Meisters.' }
      },
      {
        text: { es: 'Rezo a tres santos y pongo toallas en el suelo por si acaso.', en: 'I pray to three saints and spread floor towels just in case.', de: 'Ich bete zu drei Heiligen und lege Handtücher auf den Boden.' },
        points: 3,
        reaction: { es: 'La prudencia es la madre de la ciencia.', en: 'Prudence is the mother of safety.', de: 'Vorsicht ist die Mutter der Porzellankiste.' }
      },
      {
        text: { es: 'Intento voltearla al vuelo como un pancake americano y acaba en la campana.', en: 'I try to airborne flip it like a pancake and it hits the ceiling.', de: 'Ich werfe sie wie einen Pfannkuchen in die Luft (landet an der Dunstabzugshaube).' },
        points: 9,
        reaction: { es: 'Héroe trágico de TikTok.', en: 'Tragic TikTok hero.', de: 'Tragischer TikTok-Held.' }
      }
    ]
  },
  {
    id: 'q4',
    question: {
      es: '¿Qué opinas de meter la tortilla sobrante al microondas a máxima potencia?',
      en: 'What is your take on microwaving leftover tortilla on MAX power?',
      de: 'Wie stehst du dazu, Reste bei voller Leistung in die Mikrowelle zu stellen?'
    },
    options: [
      {
        text: { es: '¡Jamás! Se come a temperatura ambiente con un buen pan.', en: 'Never! Eaten at room temperature with good crusty bread.', de: 'Niemals! Auf Zimmertemperatur mit knusprigem Brot genießen.' },
        points: 0,
        reaction: { es: 'Conocedor del placer pausado.', en: 'A connoisseur of slow pleasure.', de: 'Ein wahrer Genießer.' }
      },
      {
        text: { es: 'Un golpe de 15 segundos al 30% solo para quitar el frío de nevera.', en: '15 seconds at 30% power just to take off the fridge chill.', de: '15 Sekunden bei niedriger Wattzahl, um die Kälte zu nehmen.' },
        points: 3,
        reaction: { es: 'Tolerado bajo estricta vigilancia.', en: 'Tolerated under strict surveillance.', de: 'Unter Aufsicht geduldet.' }
      },
      {
        text: { es: '3 minutos hasta que silba como una tetera y suelta goma.', en: '3 minutes until it hisses like a kettle and turns rubbery.', de: '3 Minuten, bis sie zischt und zu Gummi wird.' },
        points: 10,
        reaction: { es: 'Has creado un arma termonuclear.', en: 'You created a rubber thermodynamic weapon.', de: 'Du hast eine thermonukleare Waffe erschaffen.' }
      }
    ]
  }
];

export const TortillaHumorHub: React.FC<TortillaHumorHubProps> = ({ lang = 'es' }) => {
  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  // Random Excuse State
  const [currentExcuseIndex, setCurrentExcuseIndex] = useState<number>(0);
  const [copiedExcuse, setCopiedExcuse] = useState<boolean>(false);

  // Sacrilege Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Commandments State
  const [activeCommandment, setActiveCommandment] = useState<number | null>(null);

  const activeExcuse = excusesList[currentExcuseIndex];

  const handleNextExcuse = () => {
    let nextIdx = Math.floor(Math.random() * excusesList.length);
    if (nextIdx === currentExcuseIndex) {
      nextIdx = (currentExcuseIndex + 1) % excusesList.length;
    }
    setCurrentExcuseIndex(nextIdx);
    setCopiedExcuse(false);
  };

  const handleCopyExcuse = () => {
    const text = `${activeExcuse.situation[lang as 'es'|'en'|'de'] || activeExcuse.situation.es}\n${activeExcuse.excuse[lang as 'es'|'en'|'de'] || activeExcuse.excuse.es} — tortilladepatatas.org`;
    navigator.clipboard.writeText(text);
    setCopiedExcuse(true);
    setTimeout(() => setCopiedExcuse(false), 2000);
  };

  const totalPoints = useMemo(() => {
    return Object.values(quizAnswers).reduce((a, b) => a + b, 0);
  }, [quizAnswers]);

  const maxPoints = sacrilegeQuestions.length * 10;
  const isQuizComplete = Object.keys(quizAnswers).length === sacrilegeQuestions.length;

  const getVerdict = (points: number) => {
    if (points <= 5) {
      return {
        title: isEs ? 'Santo Patrón del Huevo y la Patata 👑' : isDe ? 'Heiliger Schutzpatron der Tortilla 👑' : 'Grand High Patron of Spanish Tortilla 👑',
        desc: isEs ? 'Tu respeto por la técnica, el punto de sal y la sartén roza la divinidad. Betanzos y Villanueva de la Serena lloran de orgullo.' : isDe ? 'Dein Respekt für Technik und Geschmack ist makellos. Ein Meisterkoch mit Ehre.' : 'Your adherence to canonical texture, oil temperature, and flipping composure is divine.',
        color: 'text-[#2E7D32] bg-[#2E7D32]/10 border-[#2E7D32]/30',
        safetyAlert: isEs ? 'Garantizas siempre los 70°C durante 2 minutos o 63°C durante 20 segundos sin arruinar la jugosidad.' : 'Always maintains 70°C for 2 minutes or 63°C for 20 seconds safely.'
      };
    }
    if (points <= 18) {
      return {
        title: isEs ? 'Tortillero Pragmático de Bar de Barrio 🍳' : isDe ? 'Pragmatischer Kneipen-Koch 🍳' : 'Pragmatic Neighborhood Bartender 🍳',
        desc: isEs ? 'Te gusta la fiesta, a veces te tiembla la muñeca en el vuelco, pero tu tortilla siempre sale sabrosa y la gente repite.' : isDe ? 'Manchmal zittert die Hand beim Wenden, aber deine Tortilla schmeckt immer!' : 'You occasionally wobble on the flip, but your tortilla brings people together with joy.',
        color: 'text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30',
        safetyAlert: isEs ? 'Recuerda no dejarla más de 4 horas a temperatura ambiente en la barra.' : 'Remember the 4-hour max room temperature bar limit.'
      };
    }
    return {
      title: isEs ? 'Terrorista Gastronómico Internacional 🚨' : isDe ? 'Kulinarischer Schwerkrimineller 🚨' : 'International Gastronomic Outlaw 🚨',
      desc: isEs ? 'Microondas a tope, patatas en cubitos congelados y mayonesa rosa. La policía del buen gusto tiene una orden de detención a tu nombre.' : isDe ? 'Mikrowelle auf Höchststufe und Ketchup. Das kulinarische Sondereinsatzkommando ist unterwegs.' : 'High-power microwaving, frozen diced tubers, and sweet ketchup. The Taste Police is at your door.',
      color: 'text-[#D32F2F] bg-[#D32F2F]/10 border-[#D32F2F]/30',
      safetyAlert: isEs ? 'Por favor, asiste urgentemente al Laboratorio de Ciencia y lee el protocolo bactericida.' : 'Please read the thermal food safety protocols immediately.'
    };
  };

  const commandments = [
    {
      num: 'I',
      title: { es: 'No titubearás en el vuelco', en: 'Thou shalt not hesitate on the flip', de: 'Du sollst beim Wenden nicht zögern' },
      body: {
        es: 'La física premia la convicción. Un titubeo de medio segundo equivale a un litro de huevo caliente chorreando por el antebrazo.',
        en: 'Physics rewards conviction. A half-second hesitation guarantees raw egg dripping down your forearm.',
        de: 'Die Physik belohnt Entschlossenheit. Ein kurzes Zögern bedeutet rohes Ei am Unterarm.'
      }
    },
    {
      num: 'II',
      title: { es: 'Honrarás el plato plano sin reborde traicionero', en: 'Thou shalt honor the truly flat plate', de: 'Du sollst den flachen Teller ehren' },
      body: {
        es: 'El plato hondo es el caballo de Troya de la cocina. Solo un plato plano más ancho que la sartén garantiza la gloria.',
        en: 'A deep bowl-plate is a Trojan horse. Only a flat lid or plate wider than the pan brings glory.',
        de: 'Tiefe Teller sind tückisch. Nur ein flacher Teller, der breiter als die Pfanne ist, bringt Erfolg.'
      }
    },
    {
      num: 'III',
      title: { es: 'No llamarás tortilla al revuelto de tus fallos', en: 'Thou shalt not rename failures "scramble"', de: 'Nenne Missgeschicke nicht Rührei' },
      body: {
        es: 'Si se rompió, asume la derrota con dignidad. No intentes venderlo a tus invitados como "revuelto gourmet de autor".',
        en: 'If it broke, accept defeat with pride. Do not try to rebrand it as "gourmet deconstructed scramble".',
        de: 'Wenn sie bricht, stehe dazu. Verkaufe es deinen Gästen nicht als "Gourmet-Rührei".'
      }
    },
    {
      num: 'IV',
      title: { es: 'Garantizarás los 70°C con orgullo bactericida', en: 'Thou shalt honor 70°C for 2 minutes', de: 'Ehre 70°C für 2 Minuten' },
      body: {
        es: 'El calor residual es tu aliado: **70°C durante 2 minutos** o **63°C durante 20 segundos** salvan estómagos y coronan campeones.',
        en: 'Residual core heat is your ally: **70°C for 2 minutes** or **63°C for 20 seconds** preserves bellies and crowns champions.',
        de: 'Restwärme im Kern: **70°C für 2 Minuten** oder **63°C für 20 Sekunden** schützen den Magen.'
      }
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="card-notebook p-6 md:p-8 bg-card border border-border rounded-3xl shadow-sm text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/40 shadow-2xs">
              <Laugh className="w-4 h-4 text-[#FFB800]" />
              <span>{isEs ? 'Humor de Bar & Cultura Popular' : isDe ? 'Bar-Humor & Volkskultur' : 'Bar Humor & Tortilla Lore'}</span>
            </div>

            <h1 className="font-serif-heading text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {isEs ? 'El Club del Vuelco & Oráculo Tortillero' : isDe ? 'Das Orakel der Tortilla & Bar-Humor' : 'The Skillet Flip Club & Tortilla Oracle'}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {isEs
                ? 'Porque hacer una tortilla de patatas perfecta es un arte milenario... pero arruinarla en el último segundo es patrimonio inmaterial de toda cocina española. Genera excusas gourmet, audita tus sacrilegios y ríete con anécdotas de barra.'
                : isDe
                ? 'Die perfekte Tortilla ist eine Kunst... sie in letzter Sekunde zu ruinieren, ein spanisches Kulturgut! Finde Ausreden für Missgeschicke und teste dein kulinarisches Gewissen.'
                : 'Flipping a perfect tortilla is ancient art... ruining it at the last second is universal heritage. Generate gourmet excuses, calculate your sacrilege score, and celebrate kitchen triumphs.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary border border-border shrink-0 text-center space-y-2">
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block">
              {isEs ? 'Índice de Autoironía' : 'Humor Quotient'}
            </span>
            <div className="flex items-center justify-center gap-1.5 text-3xl font-black text-[#FFB800]">
              <Flame className="w-7 h-7" />
              <span>100%</span>
            </div>
            <span className="text-3xs text-muted-foreground font-bold block">
              {isEs ? 'Sin filtros ni dramas' : '100% Kitchen Safe'}
            </span>
          </div>
        </div>
      </div>

      {/* Module 1: The Oracle & Excuse Generator */}
      <section className="card-notebook p-6 md:p-8 bg-card border-2 border-[#FFB800]/40 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFB800]" />
              <h2 className="font-serif-heading text-xl md:text-2xl font-bold text-foreground">
                {isEs ? 'Generador de Excusas Culinarias Gourmet' : isDe ? 'Gourmet-Ausreden-Generator' : 'Gourmet Kitchen Excuse Generator'}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              {isEs ? '¿Tu tortilla ha sufrido un accidente? Elige una excusa de alta cocina para quedar como un genio vanguardista.' : 'Did your tortilla fail? Generate an avant-garde excuse to save your chef honor.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleNextExcuse}
              className="bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs gap-1.5 h-9 px-4 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isEs ? 'Otra Excusa' : isDe ? 'Nächste Ausrede' : 'Next Excuse'}</span>
            </Button>
          </div>
        </div>

        {/* Excuse Showcase Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-accent border border-border space-y-4 text-center md:text-left relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-[#8D6E63]/15 text-[#8D6E63] dark:text-[#FFB800] font-extrabold text-3xs border border-[#8D6E63]/25">
              🏷️ {activeExcuse.tag[lang as 'es'|'en'|'de'] || activeExcuse.tag.es}
            </span>

            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyExcuse}
              className="text-3xs font-bold gap-1 bg-card border-border hover:bg-secondary h-7 px-2.5 cursor-pointer"
            >
              {copiedExcuse ? (
                <>
                  <Check className="w-3 h-3 text-[#2E7D32]" />
                  <span>{isEs ? '¡Copiado!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-muted-foreground" />
                  <span>{isEs ? 'Copiar para WhatsApp' : 'Copy Quote'}</span>
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isEs ? 'El Accidente:' : 'The Incident:'}
            </p>
            <h3 className="font-serif-heading text-lg font-bold text-foreground italic">
              «{activeExcuse.situation[lang as 'es'|'en'|'de'] || activeExcuse.situation.es}»
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-1">
            <p className="text-3xs font-extrabold text-[#FFB800] uppercase tracking-wider">
              {isEs ? 'Tu Excusa Oficial de Chef:' : 'Your Official Chef Defense:'}
            </p>
            <p className="text-base md:text-lg font-serif-heading font-extrabold text-foreground leading-relaxed">
              {activeExcuse.excuse[lang as 'es'|'en'|'de'] || activeExcuse.excuse.es}
            </p>
          </div>
        </div>
      </section>

      {/* Module 2: The Sacrilege Detector Quiz */}
      <section className="card-notebook p-6 md:p-8 bg-card border border-border rounded-3xl shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-bold border border-[#D32F2F]/25">
            <Skull className="w-3.5 h-3.5" />
            <span>{isEs ? 'Detector de Herejías Culinarias' : isDe ? 'Ketzerei-Detektor' : 'Sacrilege Quiz'}</span>
          </div>
          <h2 className="font-serif-heading text-2xl md:text-3xl font-bold text-foreground">
            {isEs ? '¿Eres un Purista Canónico o un Hereje del Huevo?' : isDe ? 'Bist du ein Purist oder ein Kulinarkrimineller?' : 'Are You a Purist Canon or a Culinary Rebel?'}
          </h2>
          <p className="text-xs text-muted-foreground">
            {isEs ? 'Responde honestamente a 4 preguntas y descubre el veredicto del Gran Tribunal de la Tortilla.' : 'Answer 4 honest questions to receive the official verdict of the Tortilla Court.'}
          </p>
        </div>

        <div className="space-y-6">
          {sacrilegeQuestions.map((q, qIndex) => {
            const selectedOpt = quizAnswers[q.id];
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-accent border border-border space-y-3">
                <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFB800] text-[#1C1917] text-xs font-black flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <span>{q.question[lang as 'es'|'en'|'de'] || q.question.es}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === opt.points;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt.points })}
                        className={`p-3 rounded-xl text-left text-xs font-medium transition-all border cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#8D6E63] text-white border-[#8D6E63] dark:bg-[#FFB800] dark:text-[#1C1917] dark:border-[#FFB800] font-bold shadow-xs'
                            : 'bg-card border-border text-foreground/90 hover:bg-secondary'
                        }`}
                      >
                        <span>{opt.text[lang as 'es'|'en'|'de'] || opt.text.es}</span>
                        {isSelected && (
                          <span className="text-3xs font-extrabold opacity-80">
                            💡 {opt.reaction[lang as 'es'|'en'|'de'] || opt.reaction.es}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiz Verdict Box */}
        {isQuizComplete && (
          <div className="p-6 rounded-2xl border-2 space-y-4 animate-in fade-in duration-300">
            {(() => {
              const verdict = getVerdict(totalPoints);
              return (
                <div className={`p-6 rounded-2xl border ${verdict.color} space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif-heading text-xl md:text-2xl font-black">
                      {verdict.title}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-card text-foreground border border-border">
                      {isEs ? 'Puntos de Herejía:' : 'Sacrilege Points:'} {totalPoints} / {maxPoints}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed">
                    {verdict.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-card/80 border border-border text-xs text-foreground flex items-center gap-2 font-sans">
                    <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{verdict.safetyAlert}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* Module 3: The 4 Commandments of the Pan Flip */}
      <section className="card-notebook p-6 md:p-8 bg-card border border-border rounded-3xl shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8D6E63]/15 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#8D6E63]/25">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{isEs ? 'Leyes Fundamentales de la Física Tortillera' : isDe ? 'Gesetze der Tortilla-Physik' : 'Fundamental Laws of the Flip'}</span>
          </div>
          <h2 className="font-serif-heading text-2xl md:text-3xl font-bold text-foreground">
            {isEs ? 'Los 4 Mandamientos del Vuelco de la Sartén' : isDe ? 'Die 4 Gebote des Pfannen-Wendens' : 'The 4 Commandments of the Skillet Flip'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commandments.map((cmd, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-accent border border-border space-y-2 hover:border-[#FFB800] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] font-serif-heading font-black text-xs flex items-center justify-center shrink-0">
                  {cmd.num}
                </span>
                <h3 className="font-serif-heading text-base font-bold text-foreground">
                  {cmd.title[lang as 'es'|'en'|'de'] || cmd.title.es}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed font-sans pl-9">
                {cmd.body[lang as 'es'|'en'|'de'] || cmd.body.es}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
