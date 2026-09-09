import { describe, it, expect, beforeEach } from 'vitest';
import {
  DEFAULT_WORLDSTATE,
  dispatchWorldStateAction,
  executeCliCommand,
  type WorldState
} from '../src/lib/worldstate/worldstateStore';

describe('Tortilla Worldstate Engine & CLI Terminal Tests', () => {
  let initialState: WorldState;

  beforeEach(() => {
    initialState = { ...DEFAULT_WORLDSTATE, actionLogs: [...DEFAULT_WORLDSTATE.actionLogs] };
  });

  it('should dispatch dance action and increase happiness and dance count', () => {
    const next = dispatchWorldStateAction(initialState, 'dance', 'button');
    expect(next.happiness).toBe(Math.min(100, initialState.happiness + 15));
    expect(next.danceCount).toBe(1);
    expect(next.currentMood.es).toContain('Bailarina');
    expect(next.actionLogs[0].actionType).toBe('dance');
    expect(next.actionLogs[0].message.es).toContain('Bailaste para la tortilla');
  });

  it('should dispatch disappoint action and decrease happiness and increase disappointment count', () => {
    const next = dispatchWorldStateAction(initialState, 'disappoint', 'button');
    expect(next.happiness).toBe(Math.max(0, initialState.happiness - 20));
    expect(next.disappointmentCount).toBe(1);
    expect(next.currentMood.es).toContain('Decepcionada');
    expect(next.actionLogs[0].actionType).toBe('disappoint');
    expect(next.actionLogs[0].message.es).toContain('Expresaste decepción');
  });

  it('should dispatch flip action and increment flip count', () => {
    const next = dispatchWorldStateAction(initialState, 'flip', 'button');
    expect(next.flipCount).toBe(1);
    expect(next.currentMood.es).toContain('Épica');
    expect(next.actionLogs[0].actionType).toBe('flip');
  });

  it('should dispatch offer_onion action and check_temp action', () => {
    const nextOnion = dispatchWorldStateAction(initialState, 'offer_onion', 'button');
    expect(nextOnion.onionStatus).toBe('loved');
    expect(nextOnion.onionOfferCount).toBe(1);

    const nextTemp = dispatchWorldStateAction(nextOnion, 'check_temp', 'button');
    expect(nextTemp.thermalSafety).toBe('safe');
    expect(nextTemp.coreTemperature).toBe(70);
    expect(nextTemp.actionLogs[0].message.es).toContain('Núcleo térmico verificado');
  });

  it('should reset worldstate back to default', () => {
    const modified = dispatchWorldStateAction(initialState, 'dance', 'button');
    expect(modified.danceCount).toBe(1);

    const resetState = dispatchWorldStateAction(modified, 'reset', 'button');
    expect(resetState.danceCount).toBe(0);
    expect(resetState.actionLogs[0].actionType).toBe('reset');
  });

  it('should execute CLI command "tortilla dance" correctly', () => {
    const { nextState, output } = executeCliCommand(initialState, 'tortilla dance', 'es');
    expect(nextState.danceCount).toBe(1);
    expect(output).toContain('Acción "bailar" enviada a la Tortilla');
  });

  it('should execute CLI command "tortilla disappoint" correctly', () => {
    const { nextState, output } = executeCliCommand(initialState, 'tortilla disappoint', 'es');
    expect(nextState.disappointmentCount).toBe(1);
    expect(output).toContain('Acción "decepcionar" enviada a la Tortilla');
  });

  it('should execute CLI command "tortilla status" and return JSON summary', () => {
    const { output } = executeCliCommand(initialState, 'tortilla status', 'es');
    expect(output).toContain('"happiness"');
    expect(output).toContain('optimal core temperature');
  });

  it('should execute CLI command "help" and return command manual', () => {
    const { output } = executeCliCommand(initialState, 'help', 'es');
    expect(output).toContain('dance');
    expect(output).toContain('disappoint');
    expect(output).toContain('flip');
    expect(output).toContain('status');
  });
});
