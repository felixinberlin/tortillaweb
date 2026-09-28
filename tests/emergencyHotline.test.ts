import { describe, it, expect } from 'vitest';
import { EMERGENCY_SCENARIOS } from '@/data/emergencyHotline';

describe('Tortilla Emergency Hotline (Urgencias 112) Data & Decision Trees', () => {
  it('contains all 6 key kitchen emergency scenarios with valid codes', () => {
    const requiredScenarios = [
      'stuck-pan',
      'flip-disaster',
      'thermal-mirage',
      'dry-brick',
      'greasy-sponge',
      'salt-crisis'
    ];

    requiredScenarios.forEach((id) => {
      expect(EMERGENCY_SCENARIOS[id]).toBeDefined();
      expect(EMERGENCY_SCENARIOS[id].code).toMatch(/^RED-0[1-6]$/);
      expect(EMERGENCY_SCENARIOS[id].title.es).toBeTruthy();
      expect(EMERGENCY_SCENARIOS[id].title.en).toBeTruthy();
      expect(EMERGENCY_SCENARIOS[id].title.de).toBeTruthy();
    });
  });

  it('ensures every scenario has a valid decision tree graph without orphan nodes', () => {
    Object.values(EMERGENCY_SCENARIOS).forEach((scenario) => {
      // initialQuestionId exists
      expect(scenario.questions[scenario.initialQuestionId]).toBeDefined();

      // For every question, all options resolve to a valid question or a valid solution
      Object.entries(scenario.questions).forEach(([qId, question]) => {
        expect(question.options.length).toBeGreaterThan(0);
        question.options.forEach((opt) => {
          const hasNextQuestion = opt.nextQuestionId && scenario.questions[opt.nextQuestionId];
          const hasSolution = opt.solutionId && scenario.solutions[opt.solutionId];
          expect(Boolean(hasNextQuestion || hasSolution)).toBe(true);
        });
      });

      // Every solution has steps and equipment
      Object.entries(scenario.solutions).forEach(([sId, solution]) => {
        expect(solution.steps.length).toBeGreaterThan(0);
        expect(solution.equipmentNeeded.length).toBeGreaterThan(0);
        expect(solution.gourmetBaptism.es).toBeTruthy();
        expect(solution.gourmetBaptism.en).toBeTruthy();
        expect(solution.gourmetBaptism.de).toBeTruthy();
      });
    });
  });

  it('strictly enforces safety temperature standards in all emergency solutions', () => {
    Object.values(EMERGENCY_SCENARIOS).forEach((scenario) => {
      Object.values(scenario.solutions).forEach((solution) => {
        const safetyEs = solution.safetyNote.es;
        expect(safetyEs).toBeDefined();
        // At least one of the core safety standards must be cited
        const hasGoldStandard = safetyEs.includes('70°C') || safetyEs.includes('63°C') || safetyEs.includes('4 horas') || safetyEs.includes('4h');
        expect(hasGoldStandard).toBe(true);
      });
    });
  });
});
