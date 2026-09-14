import { describe, it, expect } from 'vitest';
import {
  COOKING_STEPS,
  calculateAssistantDefaults,
  getStepDurations,
  type CookingStyle,
  type PanDiameter,
} from '@/lib/timer/kitchenTimerEngine';
import { getRouteIdFromSlug, getRouteUrl } from '@/lib/routes/resolver';

describe('Kitchen Assistant & Cooking Timer Engine', () => {
  it('calculates accurate defaults for different pan sizes and styles', () => {
    // 20cm pan
    const specs20 = calculateAssistantDefaults('clasica', 20, true);
    expect(specs20.servings).toBe(2);
    expect(specs20.eggsCount).toBe(4);
    expect(specs20.potatoesGrams).toBe(450);

    // 24cm pan Betanzos (+1 egg for ultra-runny emulsion)
    const specs24Betanzos = calculateAssistantDefaults('betanzos', 24, false);
    expect(specs24Betanzos.servings).toBe(4);
    expect(specs24Betanzos.eggsCount).toBe(7); // 6 + 1
    expect(specs24Betanzos.potatoesGrams).toBe(700);

    // 28cm pan
    const specs28 = calculateAssistantDefaults('cuajada', 28, true);
    expect(specs28.servings).toBe(6);
    expect(specs28.eggsCount).toBe(9);
    expect(specs28.potatoesGrams).toBe(1050);
  });

  it('accurately calibrates timing based on style and onion caramelization', () => {
    // Betanzos 24cm with onion
    const betanzosTimes = getStepDurations('betanzos', 24, true);
    expect(betanzosTimes[1]).toBe(180);
    expect(betanzosTimes[2]).toBe(18 * 60 + 4 * 60); // 18m base + 4m onion
    expect(betanzosTimes[3]).toBe(8 * 60); // 8m thermal egg soak
    expect(betanzosTimes[4]).toBe(35); // 35s quick flash sear for Betanzos
    expect(betanzosTimes[5]).toBe(20); // 20s flip window
    expect(betanzosTimes[6]).toBe(30); // 30s reverse sear
    expect(betanzosTimes[7]).toBe(120); // 2 min resting & pasteurization standard

    // Clásica 24cm without onion
    const clasicaTimes = getStepDurations('clasica', 24, false);
    expect(clasicaTimes[2]).toBe(18 * 60); // 18m poach
    expect(clasicaTimes[4]).toBe(60); // 60s side A
    expect(clasicaTimes[6]).toBe(45); // 45s side B

    // Cuajada 20cm
    const cuajadaTimes = getStepDurations('cuajada', 20, false);
    expect(cuajadaTimes[2]).toBe(14 * 60); // 14m for 20cm
    expect(cuajadaTimes[4]).toBe(90); // 90s side A
    expect(cuajadaTimes[6]).toBe(75); // 75s side B
  });

  it('contains all 7 structured culinary steps with valid metadata across ES, EN, DE', () => {
    expect(COOKING_STEPS.length).toBe(7);

    COOKING_STEPS.forEach((step) => {
      expect(step.id).toBeGreaterThanOrEqual(1);
      expect(step.id).toBeLessThanOrEqual(7);

      // Check all 3 languages exist
      expect(step.name.es).toBeTruthy();
      expect(step.name.en).toBeTruthy();
      expect(step.name.de).toBeTruthy();

      expect(step.shortDesc.es).toBeTruthy();
      expect(step.shortDesc.en).toBeTruthy();
      expect(step.shortDesc.de).toBeTruthy();

      expect(step.detailedTips.es.length).toBeGreaterThan(0);
      expect(step.detailedTips.en.length).toBeGreaterThan(0);
      expect(step.detailedTips.de.length).toBeGreaterThan(0);

      expect(step.spokenPrompt.es).toBeTruthy();
      expect(step.spokenPrompt.en).toBeTruthy();
      expect(step.spokenPrompt.de).toBeTruthy();
    });
  });

  it('mandatorily incorporates bolded biological safety figures in safety step (Step 7)', () => {
    const safetyStep = COOKING_STEPS.find((s) => s.id === 7);
    expect(safetyStep).toBeDefined();

    // Spanish verification
    const esTips = safetyStep!.detailedTips.es.join(' ');
    expect(esTips).toContain('**70°C durante 2 minutos**');
    expect(esTips).toContain('**63°C durante 20 segundos**');
    expect(esTips).toContain('**4 horas**');

    // English verification
    const enTips = safetyStep!.detailedTips.en.join(' ');
    expect(enTips).toContain('**70°C for 2 minutes**');
    expect(enTips).toContain('**63°C for 20 seconds**');
    expect(enTips).toContain('**4 hours**');

    // German verification
    const deTips = safetyStep!.detailedTips.de.join(' ');
    expect(deTips).toContain('**70°C für 2 Minuten**');
    expect(deTips).toContain('**63°C für 20 Sekunden**');
    expect(deTips).toContain('**4 Stunden**');
  });

  it('registers route resolution for timer and assistant slugs', () => {
    expect(getRouteIdFromSlug('asistente')).toBe('timer');
    expect(getRouteIdFromSlug('assistant')).toBe('timer');
    expect(getRouteIdFromSlug('timer')).toBe('timer');
    expect(getRouteIdFromSlug('kuechentimer')).toBe('timer');

    expect(getRouteUrl('timer', 'es')).toBe('/es/asistente');
    expect(getRouteUrl('timer', 'en')).toBe('/en/assistant');
    expect(getRouteUrl('timer', 'de')).toBe('/de/kuechentimer');
  });
});
