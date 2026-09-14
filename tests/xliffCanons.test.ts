import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { parseXlf } from '../src/lib/xlfParser';
import { FACTIONS_CANON, FACTION_UI_CANON } from '../src/lib/factionsCanon';
import { CULINARY_CANON, getCulinaryRatioText, getCulinaryThermalText } from '../src/lib/culinaryCanon';
import { AUTHENTICITY_CANON, getEditorialTaxonomyLabel, getEditorialSourceLabel } from '../src/lib/authenticityCanon';
import { UI_ACTIONS_CANON, getUiActionLabel } from '../src/lib/uiActionsCanon';
import { SAFETY_CANON, getSafetyFullNotice } from '../src/lib/safetyCanon';

describe('XLIFF Canons and Editorial Standards', () => {
  const xlfDir = path.join(process.cwd(), 'src', 'i18n', 'xlf');

  const expectedCatalogues = [
    { prefix: 'safety_canon', units: ['safety.gold_standard.full', 'safety.threshold.optimal', 'safety.threshold.ambient_limit'] },
    { prefix: 'factions_canon', units: ['factions.puristas.name', 'factions.concebollistas.name', 'factions.cookie.banner_title'] },
    { prefix: 'culinary_canon', units: ['culinary.ratio.potato_egg', 'culinary.thermal.poaching', 'culinary.thermal.searing'] },
    { prefix: 'authenticity_canon', units: ['authenticity.fact', 'authenticity.legend', 'authenticity.opinion'] },
    { prefix: 'ui_actions_canon', units: ['action.download_cooklang', 'action.export_pdf', 'action.verify_source'] },
  ];

  it('should verify that all XLIFF files exist and parse without errors', () => {
    for (const cat of expectedCatalogues) {
      for (const lang of ['en', 'de']) {
        const filePath = path.join(xlfDir, `${cat.prefix}.${lang}.xlf`);
        expect(fs.existsSync(filePath), `File ${cat.prefix}.${lang}.xlf should exist`).toBe(true);

        const xmlContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = parseXlf(xmlContent);

        expect(parsed.sourceLanguage).toBe('es');
        expect(parsed.targetLanguage).toBe(lang);

        for (const unitId of cat.units) {
          expect(parsed.units[unitId], `Missing trans-unit ${unitId} in ${cat.prefix}.${lang}.xlf`).toBeDefined();
          expect(parsed.units[unitId].source.length).toBeGreaterThan(0);
          expect(parsed.units[unitId].target.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should verify Factions Canon aligns with XLIFF data across es, en, and de', () => {
    expect(FACTIONS_CANON.puristas.name.es).toContain('Los Puristas');
    expect(FACTIONS_CANON.puristas.name.en).toContain('The Purists');
    expect(FACTIONS_CANON.puristas.name.de).toContain('Die Puristen');

    expect(FACTIONS_CANON.concebollistas.name.es).toContain('Los Concebollistas');
    expect(FACTIONS_CANON.concebollistas.name.en).toContain('Onion Lovers');
    expect(FACTIONS_CANON.concebollistas.name.de).toContain('Die Zwiebel-Liebhaber');

    expect(FACTION_UI_CANON.bannerTitle.es).toBe('Afinidad Tortillera');
    expect(FACTION_UI_CANON.bannerTitle.en).toBe('Tortilla Allegiance');
    expect(FACTION_UI_CANON.bannerTitle.de).toBe('Tortilla-Gesinnung');
  });

  it('should verify Culinary Canon thermodynamic and ratio figures', () => {
    expect(CULINARY_CANON.thermal.poaching.temperature).toBe('130°C - 140°C');
    expect(CULINARY_CANON.thermal.searing.temperature).toBe('180°C');
    expect(CULINARY_CANON.thermal.eggCoagulation.temperature).toBe('62°C');

    expect(getCulinaryRatioText('potatoPerEgg', 'es')).toContain('100g de patata por cada huevo');
    expect(getCulinaryRatioText('potatoPerEgg', 'en')).toContain('100g potato per egg');
    expect(getCulinaryRatioText('potatoPerEgg', 'de')).toContain('100g Kartoffel pro Ei');

    expect(getCulinaryThermalText('poaching', 'es')).toContain('130°C - 140°C');
    expect(getCulinaryThermalText('searing', 'en')).toContain('180°C');
  });

  it('should verify Authenticity Editorial taxonomy labels', () => {
    expect(getEditorialTaxonomyLabel('fact', 'es')).toBe('Hecho Histórico Documentado (FACT)');
    expect(getEditorialTaxonomyLabel('fact', 'en')).toBe('Documented Historical Fact (FACT)');
    expect(getEditorialTaxonomyLabel('fact', 'de')).toBe('Dokumentierte historische Tatsache (FACT)');

    expect(getEditorialTaxonomyLabel('legend', 'es')).toBe('Leyenda Popular (LEGEND)');
    expect(getEditorialTaxonomyLabel('opinion', 'es')).toBe('Preferencia Cultural / Tradición (OPINION)');

    expect(getEditorialSourceLabel('boe', 'es')).toContain('BOE');
    expect(getEditorialSourceLabel('csic', 'en')).toContain('CSIC');
    expect(getEditorialSourceLabel('bne', 'de')).toContain('BNE');
  });

  it('should verify UI Actions Canon labels across languages', () => {
    expect(getUiActionLabel('downloadCooklang', 'es')).toBe('Descargar Receta Cooklang (.cook)');
    expect(getUiActionLabel('downloadCooklang', 'en')).toBe('Download Cooklang Recipe (.cook)');
    expect(getUiActionLabel('downloadCooklang', 'de')).toBe('Cooklang-Rezept herunterladen (.cook)');

    expect(getUiActionLabel('exportPdf', 'es')).toBe('Exportar Ficha Técnica PDF');
    expect(getUiActionLabel('exportPdf', 'en')).toBe('Export Technical PDF Sheet');
    expect(getUiActionLabel('exportPdf', 'de')).toBe('Technisches Datenblatt exportieren (PDF)');
  });

  it('should maintain mandatory bolding in safety canon across all languages', () => {
    const es = getSafetyFullNotice('es');
    const en = getSafetyFullNotice('en');
    const de = getSafetyFullNotice('de');

    expect(es).toContain('**70°C durante 2 minutos**');
    expect(es).toContain('**63°C durante 20 segundos**');
    expect(es).toContain('**4 horas**');

    expect(en).toContain('**70°C for 2 minutes**');
    expect(en).toContain('**63°C for 20 seconds**');
    expect(en).toContain('**4 hours**');

    expect(de).toContain('**70°C für 2 Minuten**');
    expect(de).toContain('**63°C für 20 Sekunden**');
    expect(de).toContain('**4 Stunden**');
  });
});
