import { describe, it, expect } from 'vitest';
import { calculateIngredients } from '../src/lib/builderMath';

describe('Builder Math & Ratios Unit Tests', () => {
  it('should calculate ratios for 4 diners with onion and jugosa doneness', () => {
    const res = calculateIngredients({
      diners: 4,
      hasOnion: true,
      doneness: 'jugosa',
    });

    expect(res.eggCount).toBe(6); // 4 * 1.5 = 6
    expect(res.potatoGrams).toBe(600); // 4 * 150 = 600
    expect(res.onionGrams).toBe(180); // 4 * 45 = 180
    expect(res.oilMl).toBe(480); // 600 * 0.8 = 480
    expect(res.saltGrams).toBe(5); // Math.round(6 * 0.8) = 5
    expect(res.panSizeCm).toBe(24); // 4 diners => 24cm pan
    expect(res.estimatedHeat).toBe('Medio-Alto 1.5 min/lado');
  });

  it('should calculate ratios for 2 diners without onion (Betanzos style)', () => {
    const res = calculateIngredients({
      diners: 2,
      hasOnion: false,
      doneness: 'betanzos',
    });

    expect(res.eggCount).toBe(3); // 2 * 1.5 = 3
    expect(res.potatoGrams).toBe(300); // 2 * 150 = 300
    expect(res.onionGrams).toBe(0); // no onion
    expect(res.panSizeCm).toBe(20); // 2 diners => 20cm pan
    expect(res.estimatedHeat).toBe('Fuerte 30 seg/lado');
  });

  it('should calculate ratios for 8 diners with cuajada doneness', () => {
    const res = calculateIngredients({
      diners: 8,
      hasOnion: true,
      doneness: 'cuajada',
    });

    expect(res.eggCount).toBe(12); // 8 * 1.5 = 12
    expect(res.potatoGrams).toBe(1200); // 8 * 150 = 1200
    expect(res.panSizeCm).toBe(28); // 8 diners => 28cm pan
    expect(res.estimatedHeat).toBe('Medio-Bajo 3 min/lado');
  });

  it('should enforce minimum threshold of 2 eggs and 1 diner minimum', () => {
    const res = calculateIngredients({
      diners: 1,
      hasOnion: false,
      doneness: 'jugosa',
    });

    expect(res.eggCount).toBe(2);
    expect(res.potatoGrams).toBe(150);
  });
});
