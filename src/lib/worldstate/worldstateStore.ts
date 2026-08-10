export interface WorldStateActionLog {
  id: string;
  timestamp: string;
  actionType: 'dance' | 'disappoint' | 'flip' | 'offer_onion' | 'check_temp' | 'reset' | 'custom';
  source: 'button' | 'cli' | 'system';
  message: {
    es: string;
    en: string;
    de: string;
  };
  moodChange?: {
    es: string;
    en: string;
    de: string;
  };
  happinessDelta?: number;
}

export interface WorldState {
  version: number;
  happiness: number; // 0 - 100
  danceCount: number;
  disappointmentCount: number;
  flipCount: number;
  onionOfferCount: number;
  onionStatus: 'neutral' | 'loved' | 'rejected';
  thermalSafety: 'safe' | 'warning' | 'danger';
  coreTemperature: number; // e.g., 70
  currentMood: {
    es: string;
    en: string;
    de: string;
  };
  actionLogs: WorldStateActionLog[];
  lastActionTimestamp: string;
}

export const STORAGE_KEY = 'tortilladepatatas_worldstate_v1';

export const DEFAULT_WORLDSTATE: WorldState = {
  version: 1,
  happiness: 75,
  danceCount: 0,
  disappointmentCount: 0,
  flipCount: 0,
  onionOfferCount: 0,
  onionStatus: 'loved',
  thermalSafety: 'safe',
  coreTemperature: 70,
  currentMood: {
    es: 'Melosa, Jugosa y Serena',
    en: 'Runny, Juicy & Serene',
    de: 'Saftig, Cremig & Gelassen',
  },
  actionLogs: [
    {
      id: 'init-001',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actionType: 'reset',
      source: 'system',
      message: {
        es: 'Simulador de Mundo inicializado. La tortilla reposa dorada en la sartén.',
        en: 'World Simulator initialized. The omelette rests golden in the pan.',
        de: 'Welt-Simulator initialisiert. Die Tortilla ruht goldbraun in der Pfanne.',
      },
    },
  ],
  lastActionTimestamp: new Date().toISOString(),
};

/**
 * Load current worldstate from localStorage or fallback to defaults
 */
export function loadWorldState(): WorldState {
  if (typeof window === 'undefined') {
    return DEFAULT_WORLDSTATE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WORLDSTATE;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== DEFAULT_WORLDSTATE.version) {
      return DEFAULT_WORLDSTATE;
    }
    return parsed;
  } catch (err) {
    console.warn('Failed to parse tortilla worldstate from localStorage:', err);
    return DEFAULT_WORLDSTATE;
  }
}

/**
 * Save worldstate to localStorage
 */
export function saveWorldState(state: WorldState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save tortilla worldstate to localStorage:', err);
  }
}

/**
 * Execute an action directly on the worldstate
 */
export function dispatchWorldStateAction(
  currentState: WorldState,
  actionType: 'dance' | 'disappoint' | 'flip' | 'offer_onion' | 'check_temp' | 'reset',
  source: 'button' | 'cli' = 'button'
): WorldState {
  const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const logId = `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (actionType === 'reset') {
    const newState: WorldState = {
      ...DEFAULT_WORLDSTATE,
      lastActionTimestamp: new Date().toISOString(),
      actionLogs: [
        {
          id: logId,
          timestamp: timeStr,
          actionType: 'reset',
          source,
          message: {
            es: 'Reiniciaste el estado del mundo de la tortilla.',
            en: 'You reset the tortilla world state.',
            de: 'Du hast den Weltzustand der Tortilla zurückgesetzt.',
          },
        },
      ],
    };
    saveWorldState(newState);
    return newState;
  }

  let nextHappiness = currentState.happiness;
  let nextDanceCount = currentState.danceCount;
  let nextDisappointmentCount = currentState.disappointmentCount;
  let nextFlipCount = currentState.flipCount;
  let nextOnionOfferCount = currentState.onionOfferCount;
  let nextOnionStatus = currentState.onionStatus;
  let nextThermalSafety = currentState.thermalSafety;
  let nextCoreTemp = currentState.coreTemperature;

  let newMood = currentState.currentMood;
  let logMessage = { es: '', en: '', de: '' };

  switch (actionType) {
    case 'dance': {
      nextHappiness = Math.min(100, currentState.happiness + 15);
      nextDanceCount += 1;
      newMood = {
        es: '¡Bailarina & Alegre en la Sartén!',
        en: 'Dancing & Joyful in the Pan!',
        de: 'Tanzend & Fröhlich in der Pfanne!',
      };
      logMessage = {
        es: '💃 ¡Bailaste para la tortilla! Se menea con ritmo dorado en la sartén.',
        en: '💃 You danced for the tortilla! It sizzles and dances merrily in the pan.',
        de: '💃 Du hast für die Tortilla getanzt! Sie schwungvoll in der Pfanne.',
      };
      break;
    }

    case 'disappoint': {
      nextHappiness = Math.max(0, currentState.happiness - 20);
      nextDisappointmentCount += 1;
      newMood = {
        es: 'Decepcionada & Melancólica',
        en: 'Disappointed & Melancholic',
        de: 'Enttäuscht & Traurig',
      };
      logMessage = {
        es: '😞 Expresaste decepción ante la tortilla. Bajo la mirada con tristeza dramática y bordes dorados.',
        en: '😞 You expressed disappointment. The tortilla lowers its golden crust in dramatic sadness.',
        de: '😞 Du hast Enttäuschung gezeigt. Die Tortilla senkt traurig ihren goldenen Rand.',
      };
      break;
    }

    case 'flip': {
      nextFlipCount += 1;
      nextHappiness = Math.min(100, currentState.happiness + 10);
      newMood = {
        es: '¡Épica & Dorada por Ambos Lados!',
        en: 'Epic & Perfectly Golden on Both Sides!',
        de: 'Episch & Beidseitig Goldbraun!',
      };
      logMessage = {
        es: '🍳 ¡Volteado de sartén impecable! La tortilla voló por el aire y aterrizó perfecta.',
        en: '🍳 Flawless pan flip! The tortilla flew through the air and landed golden.',
        de: '🍳 Perfekter Pfannenwender! Die Tortilla flog durch die Luft und landete perfekt.',
      };
      break;
    }

    case 'offer_onion': {
      nextOnionOfferCount += 1;
      nextOnionStatus = 'loved';
      nextHappiness = Math.min(100, currentState.happiness + 12);
      newMood = {
        es: 'Pasionaria Concebollista',
        en: 'Passionate Onion Lover',
        de: 'Leidenschaftlicher Zwiebelliebhaber',
      };
      logMessage = {
        es: '🧅 Le ofreciste cebolla pochada caramelizada. ¡La tortilla vibra de felicidad concebollista!',
        en: '🧅 You offered caramelized sweet onions. The tortilla vibrates with concebollista joy!',
        de: '🧅 Du hast karamellisierte Zwiebeln angeboten. Die Tortilla strahlt vor Freude!',
      };
      break;
    }

    case 'check_temp': {
      nextThermalSafety = 'safe';
      nextCoreTemp = 70;
      nextHappiness = Math.min(100, currentState.happiness + 8);
      newMood = {
        es: 'Melosa, Segura y Perfecta',
        en: 'Juicy, Safe & Perfect',
        de: 'Saftig, Sicher & Perfekt',
      };
      logMessage = {
        es: '🛡️ Verificación higiénica: Núcleo térmico verificado. Temperatura y seguridad del huevo garantizadas.',
        en: '🛡️ Hygiene check: Thermal core verified. Egg safety and ideal texture guaranteed.',
        de: '🛡️ Hygiene-Check: Thermischer Kern geprüft. Sicherheit und ideale Textur garantiert.',
      };
      break;
    }

    default:
      break;
  }

  const newLog: WorldStateActionLog = {
    id: logId,
    timestamp: timeStr,
    actionType,
    source,
    message: logMessage,
    moodChange: newMood,
    happinessDelta: nextHappiness - currentState.happiness,
  };

  const updatedState: WorldState = {
    ...currentState,
    happiness: nextHappiness,
    danceCount: nextDanceCount,
    disappointmentCount: nextDisappointmentCount,
    flipCount: nextFlipCount,
    onionOfferCount: nextOnionOfferCount,
    onionStatus: nextOnionStatus,
    thermalSafety: nextThermalSafety,
    coreTemperature: nextCoreTemp,
    currentMood: newMood,
    actionLogs: [newLog, ...currentState.actionLogs.slice(0, 49)], // Keep last 50
    lastActionTimestamp: new Date().toISOString(),
  };

  saveWorldState(updatedState);
  return updatedState;
}

/**
 * Execute command line string input and return output string & updated state
 */
export function executeCliCommand(
  currentState: WorldState,
  rawInput: string,
  lang: 'es' | 'en' | 'de' = 'es'
): { nextState: WorldState; output: string } {
  const trimmed = rawInput.trim().toLowerCase();
  if (!trimmed) {
    return { nextState: currentState, output: '' };
  }

  // Parse command token
  const tokens = trimmed.split(/\s+/);
  const primaryCmd = tokens[0] === 'tortilla' ? tokens[1] || 'status' : tokens[0];

  switch (primaryCmd) {
    case 'dance':
    case 'bailar':
    case 'baile': {
      const state = dispatchWorldStateAction(currentState, 'dance', 'cli');
      return {
        nextState: state,
        output: lang === 'en'
          ? 'OK: Action "dance" sent to Tortilla (+15 happiness). Dance count: ' + state.danceCount
          : lang === 'de'
          ? 'OK: Aktion "dance" an Tortilla gesendet (+15 Freude). Tanzzähler: ' + state.danceCount
          : 'OK: Acción "bailar" enviada a la Tortilla (+15 felicidad). Contador de bailes: ' + state.danceCount,
      };
    }

    case 'disappoint':
    case 'disappointed':
    case 'decepcionar':
    case 'decepcion': {
      const state = dispatchWorldStateAction(currentState, 'disappoint', 'cli');
      return {
        nextState: state,
        output: lang === 'en'
          ? 'OK: Action "disappoint" sent to Tortilla (-20 happiness). Disappointment count: ' + state.disappointmentCount
          : lang === 'de'
          ? 'OK: Aktion "disappoint" an Tortilla gesendet (-20 Freude). Enttäuschungszähler: ' + state.disappointmentCount
          : 'OK: Acción "decepcionar" enviada a la Tortilla (-20 felicidad). Contador de decepciones: ' + state.disappointmentCount,
      };
    }

    case 'flip':
    case 'voltear':
    case 'vuelta': {
      const state = dispatchWorldStateAction(currentState, 'flip', 'cli');
      return {
        nextState: state,
        output: lang === 'en'
          ? 'OK: Action "flip" sent to Tortilla. Flips performed: ' + state.flipCount
          : lang === 'de'
          ? 'OK: Aktion "flip" an Tortilla gesendet. Wendungen: ' + state.flipCount
          : 'OK: Acción "voltear" enviada a la Tortilla. Volteados realizandos: ' + state.flipCount,
      };
    }

    case 'onion':
    case 'cebolla': {
      const state = dispatchWorldStateAction(currentState, 'offer_onion', 'cli');
      return {
        nextState: state,
        output: lang === 'en'
          ? 'OK: Onion offered to Tortilla. Faction status: Concebollista'
          : lang === 'de'
          ? 'OK: Zwiebel angeboten. Faktion: Concebollista'
          : 'OK: Cebolla ofrecida a la Tortilla. Estado de facción: Concebollista',
      };
    }

    case 'temp':
    case 'safety':
    case 'temperatura': {
      const state = dispatchWorldStateAction(currentState, 'check_temp', 'cli');
      return {
        nextState: state,
        output: 'OK: Thermal core safety verified: ideal temperature achieved.',
      };
    }

    case 'status':
    case 'estado': {
      const summary = {
        happiness: currentState.happiness,
        mood: currentState.currentMood[lang] || currentState.currentMood.es,
        danceCount: currentState.danceCount,
        disappointmentCount: currentState.disappointmentCount,
        flipCount: currentState.flipCount,
        thermalSafety: `${currentState.coreTemperature}°C (optimal core temperature)`,
        onionStatus: currentState.onionStatus,
        lastUpdated: currentState.lastActionTimestamp,
      };
      return {
        nextState: currentState,
        output: JSON.stringify(summary, null, 2),
      };
    }

    case 'log':
    case 'logs':
    case 'history':
    case 'historial': {
      const historyStr = currentState.actionLogs
        .map((l) => `[${l.timestamp}] [${l.actionType.toUpperCase()}] ${l.message[lang] || l.message.es}`)
        .join('\n');
      return {
        nextState: currentState,
        output: historyStr || 'No history logs found.',
      };
    }

    case 'reset':
    case 'clear':
    case 'reiniciar': {
      const state = dispatchWorldStateAction(currentState, 'reset', 'cli');
      return {
        nextState: state,
        output: 'OK: Worldstate reset to initial default state.',
      };
    }

    case 'help':
    case 'ayuda':
    default: {
      return {
        nextState: currentState,
        output: `Available Tortilla CLI Commands:
  • dance / bailar               -> Send dance action to the tortilla (+15 happiness)
  • disappoint / decepcionar     -> Express disappointment to the tortilla (-20 happiness)
  • flip / voltear               -> Perform pan flip action
  • onion / cebolla              -> Offer caramelized onion
  • temp / temperatura           -> Inspect thermal core safety and egg state
  • status / estado              -> Output JSON summary of current worldstate
  • log / history                -> Output action history logs
  • reset / clear                -> Reset worldstate to initial defaults
  • help                         -> Display this CLI manual`,
      };
    }
  }
}
