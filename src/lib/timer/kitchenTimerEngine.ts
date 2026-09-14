/**
 * Kitchen Timer Domain Engine
 * Calibrates preparation, confit, thermal egg soak, searing, flip countdown,
 * and safety pasteurization based on pan diameter, style, and ingredients.
 */

import { SAFETY_CANON, SAFETY_COLORS, type SupportedLang } from '../safetyCanon';

export type CookingStyle = 'clasica' | 'betanzos' | 'cuajada';
export type PanDiameter = 20 | 24 | 28;

export interface CookingStepConfig {
  id: number;
  key: string;
  name: Record<SupportedLang, string>;
  shortDesc: Record<SupportedLang, string>;
  detailedTips: Record<SupportedLang, string[]>;
  baseSeconds: number; // default duration
  targetTemp?: string;
  isCountDown: boolean;
  hasMetronome?: boolean;
  isFlipStep?: boolean;
  isSafetyStep?: boolean;
  spokenPrompt: Record<SupportedLang, string>;
  icon: string;
}

export interface KitchenAssistantState {
  style: CookingStyle;
  panDiameter: PanDiameter;
  withOnion: boolean;
  servings: number;
  eggsCount: number;
  potatoesGrams: number;
}

/**
 * Calculates ingredient quantities and pan sizing.
 */
export function calculateAssistantDefaults(
  style: CookingStyle = 'clasica',
  panDiameter: PanDiameter = 24,
  withOnion: boolean = true
): KitchenAssistantState {
  const panSpecs: Record<PanDiameter, { eggs: number; potatoes: number; diners: number }> = {
    20: { eggs: 4, potatoes: 450, diners: 2 },
    24: { eggs: 6, potatoes: 700, diners: 4 },
    28: { eggs: 9, potatoes: 1050, diners: 6 },
  };

  const specs = panSpecs[panDiameter];
  return {
    style,
    panDiameter,
    withOnion,
    servings: specs.diners,
    eggsCount: style === 'betanzos' ? specs.eggs + 1 : specs.eggs,
    potatoesGrams: specs.potatoes,
  };
}

/**
 * Computes exact timing per step based on cooking style, pan size, and onion presence.
 */
export function getStepDurations(
  style: CookingStyle,
  panDiameter: PanDiameter,
  withOnion: boolean
): Record<number, number> {
  // Step 1: Prep & Mise en Place (180s guide/metronome)
  const step1 = 180;

  // Step 2: Confitado / Pochado (130°C–150°C slow olive oil poach)
  // Larger pan / more potato requires slightly longer poach. Onion adds caramelization time.
  const basePoach = panDiameter === 20 ? 14 * 60 : panDiameter === 24 ? 18 * 60 : 22 * 60;
  const onionExtra = withOnion ? 4 * 60 : 0;
  const step2 = basePoach + onionExtra;

  // Step 3: Emulsión Térmica & Reposo en Huevo (Mandatory 8-minute thermal soak)
  // Warm potatoes elevate egg temperature to ~45°C without curding, binding starch and egg lipids.
  const step3 = 8 * 60;

  // Step 4: Sellado Inicial Cara A (High Heat Skillet)
  // Betanzos: 35s flash sear. Clásica: 60s. Cuajada: 90s.
  const step4 = style === 'betanzos' ? 35 : style === 'clasica' ? 60 : 90;

  // Step 5: La Vuelta (Pan flip preparation & 3-2-1 countdown)
  const step5 = 20;

  // Step 6: Sellado Cara B & Perfilado (High Heat Skillet)
  // Betanzos: 30s. Clásica: 45s. Cuajada: 75s.
  const step6 = style === 'betanzos' ? 30 : style === 'clasica' ? 45 : 75;

  // Step 7: Reposo Térmico & Verificación de Seguridad
  // 120s (2 minutes) resting stabilization to reach 70°C for 2 minutes or 63°C for 20 seconds.
  const step7 = 120;

  return {
    1: step1,
    2: step2,
    3: step3,
    4: step4,
    5: step5,
    6: step6,
    7: step7,
  };
}

/**
 * Static master metadata for the 7 culinary steps.
 */
export const COOKING_STEPS: CookingStepConfig[] = [
  {
    id: 1,
    key: 'corte',
    name: {
      es: '1. Corte & Mise en Place',
      en: '1. Slicing & Mise en Place',
      de: '1. Schnitt & Vorbereitung',
    },
    shortDesc: {
      es: 'Corte de patatas en láminas finas de 2 mm y salado uniforme.',
      en: 'Slice potatoes into even 2mm rounds and salt thoroughly.',
      de: 'Kartoffeln in 2 mm feine Scheiben schneiden und gleichmäßig salzen.',
    },
    detailedTips: {
      es: [
        'Corta láminas irregulares de 2 mm de grosor: los bordes finos se doran y el centro queda tierno.',
        'Salar las patatas antes de freír extrae el exceso de agua y potencia la penetración del sabor.',
        'Si usas cebolla, córtala en juliana fina para que se caramelice al mismo ritmo que la patata.',
      ],
      en: [
        'Slice into 2mm irregular wafers: paper-thin edges turn golden while centers remain tender.',
        'Salting potatoes before poaching draws out excess water and enhances flavor depth.',
        'If using onion, slice into fine julienne strips so it sweetens evenly with the potatoes.',
      ],
      de: [
        'Kartoffeln in unregelmäßige 2-mm-Scheiben schneiden: feine Ränder bräunen, die Mitte bleibt zart.',
        'Vorab salzen entzieht überschüssiges Wasser und verstärkt das Aroma.',
        'Zwiebeln in feine Streifen schneiden, damit sie gleichmäßig mit den Kartoffeln karamellisieren.',
      ],
    },
    baseSeconds: 180,
    isCountDown: false,
    hasMetronome: true,
    spokenPrompt: {
      es: 'Paso 1: Mise en place. Corta las patatas a dos milímetros y sazona uniformemente.',
      en: 'Step 1: Mise en place. Slice potatoes to two millimeters and season evenly.',
      de: 'Schritt 1: Vorbereitung. Kartoffeln auf zwei Millimeter schneiden und gleichmäßig salzen.',
    },
    icon: 'ChefHat',
  },
  {
    id: 2,
    key: 'pochado',
    name: {
      es: '2. Pochado & Confitado Lento',
      en: '2. Gentle Olive Oil Confit',
      de: '2. Sanftes Olivenöl-Pochieren',
    },
    shortDesc: {
      es: 'Fuego medio-bajo (130°C - 150°C). Pochar hasta que la patata esté tierna y maleable.',
      en: 'Medium-low heat (130°C - 150°C). Confit until potatoes are meltingly tender.',
      de: 'Sanftes Garen bei 130°C bis 150°C im Olivenöl, bis die Kartoffeln weich sind.',
    },
    detailedTips: {
      es: [
        'Mantén el aceite de oliva virgen extra entre 130°C y 150°C: debe burbujear suavemente sin tostarse.',
        'Prueba del tenedor: la patata debe doblarse y romperse sin resistencia tras 15-20 minutos.',
        'Escurre el aceite con un colador grande reservándolo para futuros cocinados o mayonesas.',
      ],
      en: [
        'Keep extra virgin olive oil between 130°C and 150°C: gentle lazy bubbling without browning.',
        'Fork test: potatoes should yield and break easily under light pressure after 15-20 minutes.',
        'Drain excess oil using a wide colander; save the fragrant oil for future cooking.',
      ],
      de: [
        'Olivenöl auf 130°C bis 150°C halten: sanftes Perlen ohne dunkle Röstung.',
        'Gabelprobe: Nach 15-20 Minuten muss die Kartoffel butterweich nachgeben.',
        'Überflüssiges Öl mit einem Sieb abtropfen lassen und aufbewahren.',
      ],
    },
    baseSeconds: 18 * 60,
    targetTemp: '130°C - 150°C',
    isCountDown: true,
    spokenPrompt: {
      es: 'Paso 2 iniciado: Confitando a fuego lento entre 130 y 150 grados centígrados.',
      en: 'Step 2 started: Gentle confit poaching between 130 and 150 degrees Celsius.',
      de: 'Schritt 2 gestartet: Sanftes Pochieren im Olivenöl bei 130 bis 150 Grad.',
    },
    icon: 'Flame',
  },
  {
    id: 3,
    key: 'emulsion',
    name: {
      es: '3. Reposo & Emulsión Térmica',
      en: '3. Thermal Egg Soak & Rest',
      de: '3. Warme Ei-Emulsion & Rast',
    },
    shortDesc: {
      es: 'Mezcla las patatas calientes con el huevo batido y deja reposar 8 minutos.',
      en: 'Mix hot drained potatoes into beaten eggs and rest for 8 minutes.',
      de: 'Heiße Kartoffeln mit verquirltem Ei vermengen und 8 Minuten ziehen lassen.',
    },
    detailedTips: {
      es: [
        'Ciencia CSIC: El calor residual de la patata eleva el huevo a ~45°C, hidratando el almidón sin cuajar la proteína.',
        'No batas el huevo en exceso: buscamos romper las yemas, no incorporar burbujas de aire.',
        'Aplastamiento selectivo: presiona suavemente algunas patatas con el tenedor para un bocado sedoso.',
      ],
      en: [
        'Food Science: Residual potato heat warms the egg to ~45°C, swelling starches without curding albumen.',
        'Do not over-whisk eggs: break the yolks and whites together without incorporating excess air.',
        'Selective mash: lightly crush a few potato slices with a fork to release natural binding starch.',
      ],
      de: [
        'Lebensmittelwissenschaft: Die Restwärme erwärmt das Ei auf ~45°C und bindet Stärke ohne Gerinnung.',
        'Die Eier nur mit einer Gabel kurz verrühren, ohne Schaum zu schlagen.',
        'Einige Kartoffelscheiben leicht zerdrücken, um cremige Bindung zu erzeugen.',
      ],
    },
    baseSeconds: 8 * 60,
    targetTemp: '~45°C mezcla',
    isCountDown: true,
    spokenPrompt: {
      es: 'Paso 3: Emulsión térmica. Vierte las patatas calientes en el huevo y deja reposar.',
      en: 'Step 3: Thermal emulsion. Fold hot potatoes into beaten eggs and let rest.',
      de: 'Schritt 3: Warme Ei-Emulsion. Heiße Kartoffeln ins Ei geben und ruhen lassen.',
    },
    icon: 'Egg',
  },
  {
    id: 4,
    key: 'sellado_a',
    name: {
      es: '4. Sellado Cara A (Fuego Vivo)',
      en: '4. High-Heat Sear (Side A)',
      de: '4. Scharfes Anbraten (Seite A)',
    },
    shortDesc: {
      es: 'Sartén humeante con unas gotas de aceite. Sellar la primera cara rápidamente.',
      en: 'Smoking hot skillet with a few drops of oil. Sear side A with precision.',
      de: 'Rauchende Pfanne mit wenig Öl. Erste Seite zügig anbraten.',
    },
    detailedTips: {
      es: [
        'La sartén debe estar muy caliente para crear una fina membrana exterior dorada en segundos.',
        'Mueve la sartén en vaivén circular continuo para evitar que la base se pegue.',
        'Recoge los bordes con una espátula de silicona redondeando la silueta de la tortilla.',
      ],
      en: [
        'Pan must be smoking hot to create a paper-thin golden outer crust within seconds.',
        'Keep the pan moving in continuous circular shakes to prevent sticking.',
        'Tuck the perimeter edges with a silicone spatula to form smooth rounded shoulders.',
      ],
      de: [
        'Die Pfanne muss sehr heiß sein, um sofort eine feine goldene Kruste zu bilden.',
        'Ständig kreisend rütteln, damit der Boden frei gleitet.',
        'Ränder mit einem hitzebeständigen Spatel sanft nach unten streichen.',
      ],
    },
    baseSeconds: 60,
    targetTemp: 'Fuego alto (>190°C sartén)',
    isCountDown: true,
    spokenPrompt: {
      es: 'Paso 4: Sellando cara A a fuego vivo. Mueve la sartén con ritmo continuo.',
      en: 'Step 4: Searing side A over high heat. Keep the skillet in continuous motion.',
      de: 'Schritt 4: Scharfes Anbraten von Seite A. Pfanne rhythmisch rütteln.',
    },
    icon: 'Flame',
  },
  {
    id: 5,
    key: 'la_vuelta',
    name: {
      es: '5. La Vuelta (El Momento Cumbre)',
      en: '5. The Pan Flip (La Vuelta)',
      de: '5. Das Wenden (La Vuelta)',
    },
    shortDesc: {
      es: '¡3, 2, 1... Volteo con decisión! Plato llano más ancho que la sartén.',
      en: '3, 2, 1... Decisive flip! Flat plate wider than the pan diameter.',
      de: '3, 2, 1... Entschlossen wenden! Flacher Teller größer als die Pfanne.',
    },
    detailedTips: {
      es: [
        'Usa un plato llano o vueltatortillas al menos 2 cm más ancho que el borde de la sartén.',
        'Coloca la mano dominante abierta y plana sobre el centro del plato con un trapo para no quemarte.',
        'El secreto: el movimiento de giro debe ser continuo, rápido y sin dudar. ¡La inercia es tu aliada!',
      ],
      en: [
        'Use a flat plate or lid at least 2 cm wider than the skillet rim.',
        'Place your dominant hand flat across the plate center using a damp kitchen towel.',
        'The secret: turn in one swift, confident motion without hesitation. Physics and inertia keep it in place!',
      ],
      de: [
        'Einen flachen Teller oder Wendeteller wählen, der 2 cm breiter als die Pfanne ist.',
        'Die Hand flach auf die Tellermitte legen (Küchentuch gegen Hitze verwenden).',
        'Das Geheimnis: Eine flüssige, entschlossene Drehbewegung ohne Zögern ausführen.',
      ],
    },
    baseSeconds: 20,
    isCountDown: true,
    isFlipStep: true,
    spokenPrompt: {
      es: '¡Atención! Prepárate para dar la vuelta en tres, dos, uno... ¡Volteo con decisión!',
      en: 'Attention! Prepare for the flip in three, two, one... Flip with confidence!',
      de: 'Achtung! Bereitmachen zum Wenden in drei, zwei, eins... Entschlossen wenden!',
    },
    icon: 'RotateCw',
  },
  {
    id: 6,
    key: 'sellado_b',
    name: {
      es: '6. Sellado Reverso & Perfilado',
      en: '6. Sear Reverse & Edge Tucking',
      de: '6. Zweite Seite braten & Formen',
    },
    shortDesc: {
      es: 'Desliza la tortilla de vuelta a la sartén y remata los bordes.',
      en: 'Slide the tortilla back into the hot pan and sculpt the edges.',
      de: 'Tortilla zurück in die Pfanne gleiten lassen und Ränder perfekt abrunden.',
    },
    detailedTips: {
      es: [
        'Desliza con suavidad la tortilla desde el plato a la sartén en un ángulo de 30 grados.',
        'Mete los bordes inferiores con la espátula dando forma ovalada perfecta de almohadilla.',
        'No la dejes demasiado tiempo si buscas un interior babé o cremoso.',
      ],
      en: [
        'Gently slide the tortilla from plate into the skillet at a 30-degree shallow incline.',
        'Tuck under the lower edges with your spatula to create the iconic curved pillow profile.',
        'Keep time tight if targeting a runny Betanzos or creamy center.',
      ],
      de: [
        'Die Tortilla im 30-Grad-Winkel sanft vom Teller zurück in die Pfanne gleiten lassen.',
        'Die unteren Ränder mit dem Spatel einschlagen für die klassische Kissenform.',
        'Kurz halten, wenn der Kern saftig oder flüssig bleiben soll.',
      ],
    },
    baseSeconds: 45,
    isCountDown: true,
    spokenPrompt: {
      es: 'Paso 6: Sellando el reverso y redondeando bordes.',
      en: 'Step 6: Searing the reverse side and shaping edges.',
      de: 'Schritt 6: Zweite Seite braten und Ränder formen.',
    },
    icon: 'Sparkles',
  },
  {
    id: 7,
    key: 'seguridad_reposo',
    name: {
      es: '7. Reposo & Seguridad Alimentaria',
      en: '7. Rest & Food Safety Standards',
      de: '7. Rastzeit & Lebensmittelsicherheit',
    },
    shortDesc: {
      es: 'Reposo de 2 minutos para estabilizar el centro. Estándar: **70°C durante 2 minutos**.',
      en: '2-minute rest to settle the core. Standard: **70°C for 2 minutes**.',
      de: '2 Minuten ruhen lassen. Sicherheitsstandard: **70°C für 2 Minuten**.',
    },
    detailedTips: {
      es: [
        'Deja reposar la tortilla 2 minutos fuera del fuego: la inercia térmica asienta los jugos sin resecarla.',
        'Estándar Sanitario Oro: Alcanzar **70°C durante 2 minutos** en el centro garantiza reducción bactericida total (≥ 5 log Salmonella).',
        'Umbral de Precaución: Para tortillas líquidas (Betanzos), el umbral mínimo es **63°C durante 20 segundos** para consumo inmediato.',
        'Límite de Exposición: Nunca conservar tortillas poco cuajadas más de **4 horas** a temperatura ambiente.',
      ],
      en: [
        'Allow the tortilla to rest 2 minutes off heat: thermal inertia redistributes internal juices evenly.',
        'Golden Safety Standard: Reaching **70°C for 2 minutes** at the core guarantees full bactericidal reduction (≥ 5 log Salmonella).',
        'Caution Threshold: For runny tortillas (Betanzos style), the intermediate threshold is **63°C for 20 seconds** for immediate consumption.',
        'Ambient Limit: Never leave runny or undercooked tortillas at room temperature for more than **4 hours**.',
      ],
      de: [
        'Die Tortilla 2 Minuten abseits der Hitze ruhen lassen: die Säfte verteilen sich optimal.',
        'Goldstandard Lebensmittelsicherheit: Das Erreichen von **70°C für 2 Minuten** im Kern tötet Salmonellen zuverlässig ab (≥ 5 log).',
        'Vorsichts-Schwelle: Für saftig-flüssige Tortillas (Betanzos) gilt **63°C für 20 Sekunden** bei sofortigem Verzehr.',
        'Raumtemperatur-Limit: Flüssige Tortillas maximal **4 Stunden** bei Zimmertemperatur stehen lassen.',
      ],
    },
    baseSeconds: 120,
    targetTemp: '70°C 2min (Seguro) / 63°C 20s (Precaución)',
    isCountDown: true,
    isSafetyStep: true,
    spokenPrompt: {
      es: '¡Tortilla completada con éxito! Reposo de dos minutos. Estándar higiénico: 70 grados durante 2 minutos.',
      en: 'Tortilla completed successfully! Two-minute rest. Golden safety standard: 70 degrees for 2 minutes.',
      de: 'Tortilla meisterhaft vollendet! Zwei Minuten ruhen lassen. Sicherheitsstandard: 70 Grad für 2 Minuten.',
    },
    icon: 'ShieldCheck',
  },
];

export { SAFETY_CANON, SAFETY_COLORS };
