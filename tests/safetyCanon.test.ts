import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  SAFETY_CANON,
  SAFETY_COLORS,
  getSafetyFullNotice,
  getSafetySummaryNotice,
  getSafetyStatusLabel,
  getPdfSafetyBullets,
  getShareVerifiedRule,
} from '../src/lib/safetyCanon';
import { parseXlf } from '../src/lib/xlfParser';

describe('Safety Canon & XLIFF Standards Tests', () => {
  const xlfDir = path.join(process.cwd(), 'src', 'i18n', 'xlf');

  it('should verify that safety_canon.en.xlf exists and parses correctly', () => {
    const enXlfPath = path.join(xlfDir, 'safety_canon.en.xlf');
    expect(fs.existsSync(enXlfPath)).toBe(true);

    const content = fs.readFileSync(enXlfPath, 'utf-8');
    const parsed = parseXlf(content);

    expect(parsed.sourceLanguage).toBe('es');
    expect(parsed.targetLanguage).toBe('en');
    expect(parsed.units['safety.gold_standard.full']).toBeDefined();
    expect(parsed.units['safety.threshold.optimal']).toBeDefined();
    expect(parsed.units['safety.threshold.intermediate']).toBeDefined();
    expect(parsed.units['safety.threshold.ambient_limit']).toBeDefined();

    // Check mandatory bolding in English target
    const fullTarget = parsed.units['safety.gold_standard.full'].target;
    expect(fullTarget).toContain('**70°C for 2 minutes**');
    expect(fullTarget).toContain('**63°C for 20 seconds**');
    expect(fullTarget).toContain('**4 hours**');
  });

  it('should verify that safety_canon.de.xlf exists and parses correctly', () => {
    const deXlfPath = path.join(xlfDir, 'safety_canon.de.xlf');
    expect(fs.existsSync(deXlfPath)).toBe(true);

    const content = fs.readFileSync(deXlfPath, 'utf-8');
    const parsed = parseXlf(content);

    expect(parsed.sourceLanguage).toBe('es');
    expect(parsed.targetLanguage).toBe('de');
    expect(parsed.units['safety.gold_standard.full']).toBeDefined();

    // Check mandatory bolding in German target
    const fullTarget = parsed.units['safety.gold_standard.full'].target;
    expect(fullTarget).toContain('**70°C für 2 Minuten**');
    expect(fullTarget).toContain('**63°C für 20 Sekunden**');
    expect(fullTarget).toContain('**4 Stunden**');
  });

  it('should verify that SAFETY_CANON covers all 3 languages (es, en, de) with mandatory bolding', () => {
    expect(SAFETY_CANON.optimalThreshold.es).toContain('70°C durante 2 minutos');
    expect(getSafetySummaryNotice('es')).toContain('70°C durante 2 minutos');
    expect(getSafetySummaryNotice('en')).toContain('70°C for 2 minutes');
    expect(getSafetySummaryNotice('de')).toContain('70°C für 2 Minuten');

    for (const lang of ['es', 'en', 'de'] as const) {
      const notice = getSafetyFullNotice(lang);
      expect(notice).toBeDefined();

      if (lang === 'es') {
        expect(notice).toContain('**70°C durante 2 minutos**');
        expect(notice).toContain('**63°C durante 20 segundos**');
        expect(notice).toContain('**4 horas**');
      } else if (lang === 'en') {
        expect(notice).toContain('**70°C for 2 minutes**');
        expect(notice).toContain('**63°C for 20 seconds**');
        expect(notice).toContain('**4 hours**');
      } else {
        expect(notice).toContain('**70°C für 2 Minuten**');
        expect(notice).toContain('**63°C für 20 Sekunden**');
        expect(notice).toContain('**4 Stunden**');
      }
    }
  });

  it('should supply correct status labels and colors for all safety levels', () => {
    expect(SAFETY_COLORS.safe).toBe('#2E7D32');
    expect(SAFETY_COLORS.warning).toBe('#FFC107');
    expect(SAFETY_COLORS.danger).toBe('#B00020');

    expect(getSafetyStatusLabel('safe', 'es')).toContain('70°C durante 2 minutos');
    expect(getSafetyStatusLabel('warning', 'es')).toContain('63°C durante 20 segundos');
    expect(getSafetyStatusLabel('danger', 'es')).toContain('>4 horas');

    expect(getSafetyStatusLabel('safe', 'en')).toContain('70°C for 2 minutes');
    expect(getSafetyStatusLabel('warning', 'en')).toContain('63°C for 20 seconds');
    expect(getSafetyStatusLabel('danger', 'en')).toContain('>4 hours');
  });

  it('should supply verified social share rules and PDF bullets', () => {
    expect(getShareVerifiedRule('es')).toContain('70°C durante 2 minutos');
    expect(getShareVerifiedRule('en')).toContain('70°C for 2 min');
    expect(getShareVerifiedRule('de')).toContain('70°C für 2 Min');

    expect(getPdfSafetyBullets('es')).toContain('70°C durante 2 minutos');
    expect(getPdfSafetyBullets('en')).toContain('70°C for 2 minutes');
    expect(getPdfSafetyBullets('de')).toContain('70°C für 2 Minuten');
  });
});
