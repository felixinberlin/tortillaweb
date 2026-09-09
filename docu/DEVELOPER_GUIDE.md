# Developer Guide & Tortilla CLI Manual — tortilladepatatas.org

## 1. Overview of the WorldState & Command System

The **Tortilla WorldState Engine** (`src/lib/worldstate/worldstateStore.ts`) provides a persistent, interactive state store for the Omelette in the Laboratorio module (`/laboratorio/worldstate` or `/laboratorio/simulador`).

End users and developers can send interactive actions to the Tortilla either through:
1. **Interactive Action Buttons** in the UI.
2. **Command Line Interface (CLI)** in the embedded terminal console.
3. **TypeScript API** programmatically in tests or custom components.

All actions immediately update state attributes, recalculate mood, append to the action history audit log, and save persistently in browser `localStorage` under `tortilladepatatas_worldstate_v1`.

---

## 2. WorldState Attributes

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `happiness` | `number` (0 - 100) | `75` | Current happiness index of the Omelette |
| `danceCount` | `number` | `0` | Total dance actions performed |
| `disappointmentCount` | `number` | `0` | Total disappointment expressions logged |
| `flipCount` | `number` | `0` | Total pan flips executed |
| `onionStatus` | `'neutral' \| 'loved' \| 'rejected'` | `'loved'` | Faction alignment towards caramelized onion |
| `thermalSafety` | `'safe' \| 'warning' \| 'danger'` | `'safe'` | Hygiene thermal status (**70°C for 2 min**) |
| `coreTemperature` | `number` | `70` | Core temperature in °C |
| `currentMood` | `Record<Lang, string>` | `'Melosa y Serena'` | Current mood text badge |
| `actionLogs` | `WorldStateActionLog[]` | `[...]` | Reverse chronological audit history log |

---

## 3. Command Line Interface (CLI) Commands

In the Laboratorio Terminal console (or programmatically via `executeCliCommand(currentState, input)`), you can run the following commands:

### `tortilla dance` (or `dance`, `bailar`)
- **Action**: Sends dance vibrations to the Omelette.
- **Worldstate Effect**: Increases `happiness` (+15 up to 100), increments `danceCount`, sets mood to *"¡Bailarina & Alegre en la Sartén!"*.
- **CLI Output Example**:
  ```
  OK: Acción "bailar" enviada a la Tortilla (+15 felicidad). Contador de bailes: 1
  ```

### `tortilla disappoint` (or `disappoint`, `decepcionar`)
- **Action**: Expresses disappointment to the Omelette.
- **Worldstate Effect**: Decreases `happiness` (-20 down to 0), increments `disappointmentCount`, sets mood to *"Decepcionada & Melancólica"*.
- **CLI Output Example**:
  ```
  OK: Acción "decepcionar" enviada a la Tortilla (-20 felicidad). Contador de decepciones: 1
  ```

### `tortilla flip` (or `flip`, `voltear`)
- **Action**: Executes a pan flip maneuver (volteado de sartén).
- **Worldstate Effect**: Increments `flipCount`, increases `happiness` (+10), sets mood to *"¡Épica & Dorada por Ambos Lados!"*.

### `tortilla onion` (or `onion`, `cebolla`)
- **Action**: Offers caramelized onion to the Omelette.
- **Worldstate Effect**: Sets `onionStatus` to `'loved'`, increases `happiness` (+12), aligns with Concebollista faction.

### `tortilla temp` (or `temp`, `temperatura`)
- **Action**: Inspects and enforces thermal pasteurization.
- **Worldstate Effect**: Confirms thermal core at **70°C for 2 minutes** (or **63°C for 20 seconds**), sets `thermalSafety` to `'safe'`.

### `tortilla status` (or `status`, `estado`)
- **Action**: Queries full worldstate.
- **CLI Output Example**:
  ```json
  {
    "happiness": 90,
    "mood": "¡Bailarina & Alegre en la Sartén!",
    "danceCount": 1,
    "disappointmentCount": 0,
    "flipCount": 0,
    "thermalSafety": "70°C (70°C / 2 min rule guaranteed)",
    "onionStatus": "loved",
    "lastUpdated": "2026-08-10T06:50:00.000Z"
  }
  ```

### `tortilla log` (or `log`, `history`)
- **Action**: Prints reverse chronological event history log.

### `tortilla reset` (or `reset`, `clear`)
- **Action**: Resets worldstate back to default initial values.

---

## 4. Programmatic Usage in TypeScript

```typescript
import {
  loadWorldState,
  dispatchWorldStateAction,
  executeCliCommand
} from '@/lib/worldstate/worldstateStore';

// 1. Load current worldstate from localStorage
let state = loadWorldState();

// 2. Dispatch button action directly
state = dispatchWorldStateAction(state, 'dance', 'button');
state = dispatchWorldStateAction(state, 'disappoint', 'button');

// 3. Or execute CLI command string
const result = executeCliCommand(state, 'tortilla status', 'es');
console.log(result.output);
```

---

## 5. Food Safety Rules Compliance
All worldstate thermal checks enforce the bactericidal threshold:
- **70°C for 2 minutes** (or **63°C for 20 seconds**).
- Maximum **4 hours** exposure time for uncuajada/runny omelette served at ambient room temperature.
