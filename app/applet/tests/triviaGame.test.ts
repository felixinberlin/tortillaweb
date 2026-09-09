import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import type { TriviaFact } from '../src/components/trivia/TriviaGallery';
import {
  QUIZ_LEVELS,
  generateQuestionForFact,
  generateQuizSet,
  evaluateQuizResult,
  type QuizLevel
} from '../src/lib/trivia/quizGenerator';

describe('Trivia Game Engine, Level Configuration & Share Tests', () => {
  const rootDir = process.cwd();

  // Load sample facts from trivia category files
  const triviaDir = path.join(rootDir, 'src', 'content', 'pages', 'trivia');
  const catFiles = fs.readdirSync(triviaDir).filter((f) => f.endsWith('.json'));

  let allFacts: TriviaFact[] = [];
  for (const file of catFiles) {
    const raw = fs.readFileSync(path.join(triviaDir, file), 'utf-8');
    const data = JSON.parse(raw);
    if (Array.isArray(data.facts)) {
      allFacts.push(...data.facts);
    }
  }

  it('should validate level configurations for apprentice, master, and legend', () => {
    expect(QUIZ_LEVELS.apprentice.questionCount).toBe(5);
    expect(QUIZ_LEVELS.master.questionCount).toBe(10);
    expect(QUIZ_LEVELS.legend.questionCount).toBe(15);

    for (const level of ['apprentice', 'master', 'legend'] as QuizLevel[]) {
      const conf = QUIZ_LEVELS[level];
      expect(conf).toBeDefined();
      expect(conf.label.es).toBeTruthy();
      expect(conf.label.en).toBeTruthy();
      expect(conf.label.de).toBeTruthy();
    }
  });

  it('should generate valid 3-option questions for any trivia fact', () => {
    expect(allFacts.length).toBeGreaterThan(0);

    for (const fact of allFacts.slice(0, 20)) {
      const q = generateQuestionForFact(fact, 0);

      expect(q.factId).toBe(fact.id);
      expect(q.title.es).toBeTruthy();
      expect(q.questionText.es).toBeTruthy();
      expect(q.explanation.es).toBeTruthy();

      // Must have exactly 3 options (A, B, C)
      expect(q.options).toHaveLength(3);
      expect(q.options.map((o) => o.id)).toEqual(['a', 'b', 'c']);

      // Exactly 1 option must be correct
      const correctOptions = q.options.filter((o) => o.isCorrect);
      expect(correctOptions).toHaveLength(1);
      expect(q.correctOptionId).toBe(correctOptions[0].id);
    }
  });

  it('should rotate option positions across seed variations', () => {
    const sampleFact = allFacts[0];
    const positions = new Set<'a' | 'b' | 'c'>();

    for (let seed = 0; seed < 3; seed++) {
      const q = generateQuestionForFact(sampleFact, seed);
      positions.add(q.correctOptionId);
    }

    // Option position should vary across seeds
    expect(positions.size).toBeGreaterThan(1);
  });

  it('should generate quiz sets with correct question count per level', () => {
    const apprenticeSet = generateQuizSet(allFacts, 'apprentice', 'all', 123);
    expect(apprenticeSet).toHaveLength(5);

    const masterSet = generateQuizSet(allFacts, 'master', 'all', 123);
    expect(masterSet).toHaveLength(10);

    const legendSet = generateQuizSet(allFacts, 'legend', 'all', 123);
    expect(legendSet).toHaveLength(15);
  });

  it('should filter question sets strictly by topic category when requested', () => {
    const scienceSet = generateQuizSet(allFacts, 'master', 'science', 99);
    expect(scienceSet.length).toBeGreaterThan(0);

    for (const q of scienceSet) {
      expect(q.category).toBe('science');
    }

    const historySet = generateQuizSet(allFacts, 'apprentice', 'history', 88);
    for (const q of historySet) {
      expect(q.category).toBe('history');
    }
  });

  it('should evaluate quiz results, rank titles, and build share card strings', () => {
    const result100 = evaluateQuizResult(10, 10, 10, 'legend', 'science', 'es');
    expect(result100.percentage).toBe(100);
    expect(result100.rankTitle.es).toContain('Cocinero Legendario Pasteurizado');
    expect(result100.shareText).toContain('10/10 (100%)');
    expect(result100.shareText).toContain('Racha máxima: 10');
    expect(result100.challengeUrl).toContain('/es/juego-trivia?level=legend&topic=science');

    const resultLow = evaluateQuizResult(2, 5, 1, 'apprentice', 'all', 'en');
    expect(resultLow.percentage).toBe(40);
    expect(resultLow.rankTitle.en).toContain('Flip Apprentice');
    expect(resultLow.shareText).toContain('2/5 (40%)');

    const resultDe = evaluateQuizResult(8, 10, 5, 'master', 'history', 'de');
    expect(resultDe.percentage).toBe(80);
    expect(resultDe.rankTitle.de).toContain('Tortilla-Meister');
    expect(resultDe.shareText).toContain('8/10 (80%)');
  });

  it('should enforce bolding of safety figures in share text and science explanations', () => {
    const res = evaluateQuizResult(5, 5, 5, 'master', 'science', 'es');
    expect(res.shareText).toContain('70°C durante 2 minutos');

    const scienceFacts = allFacts.filter((f) => f.category === 'science');
    expect(scienceFacts.length).toBeGreaterThan(0);

    for (const sf of scienceFacts) {
      const q = generateQuestionForFact(sf, 0);
      const optText = q.options.map((o) => o.text.es).join(' ');
      if (optText.includes('70')) {
        expect(optText).toContain('**70°C');
      }
    }
  });

  it('should scale efficiently to 10,000+ facts dataset in under 50ms', () => {
    // Generate mock array of 10,000 facts
    const largeFactsSet: TriviaFact[] = Array.from({ length: 10000 }, (_, i) => ({
      id: `fact-scale-${i}`,
      status: i % 2 === 0 ? 'proved' : 'unproved',
      category: ['history', 'science', 'regions', 'records', 'factions', 'pop-culture'][i % 6],
      title: { es: `Dato Escalable #${i}`, en: `Scalable Fact #${i}`, de: `Skalierbarer Fakt #${i}` },
      fact: { es: `Descripción del dato #${i}`, en: `Description of fact #${i}`, de: `Beschreibung des Fakts #${i}` },
      explanation: { es: `Explicación #${i}`, en: `Explanation #${i}`, de: `Erklärung #${i}` },
    }));

    const startTime = performance.now();
    const marathonSet = generateQuizSet(largeFactsSet, 'marathon', 'all', 777);
    const duration = performance.now() - startTime;

    expect(marathonSet).toHaveLength(25);
    expect(duration).toBeLessThan(50); // Instant execution O(K)
  });
});
