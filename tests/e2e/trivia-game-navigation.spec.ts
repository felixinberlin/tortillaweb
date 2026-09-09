import { test, expect } from '@playwright/test';

test.describe('Trivia Game Navigation and Gameplay E2E Test', () => {
  test('user can navigate from Trivia page to Trivia Game and play a quiz', async ({ page }) => {
    // 1. Visit the main Trivia page
    await page.goto('/es/trivia');

    // Verify heading on Trivia page
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // 2. Locate and click the Trivia Game CTA banner button "Jugar Desafío de Trivia"
    const playBannerBtn = page.getByRole('link', { name: /Jugar Desafío de Trivia/i });
    await expect(playBannerBtn).toBeVisible();
    await playBannerBtn.click();

    // 3. Verify navigation to the Trivia Game page URL
    await expect(page).toHaveURL(/\/es\/juego-trivia/);

    // 4. Verify game setup screen headings
    await expect(page.getByText('Juego de Trivia: Desafío de la Tortilla')).toBeVisible();
    await expect(page.getByText('Selecciona el Nivel de Dificultad')).toBeVisible();

    // 5. Select level "Leyenda" and topic "Ciencia y Seguridad"
    const leyendaBtn = page.getByRole('button', { name: /Leyenda/i });
    await leyendaBtn.click();

    const scienceTopicBtn = page.getByRole('button', { name: /Ciencia y Seguridad/i });
    await scienceTopicBtn.click();

    // 6. Click "Comenzar Juego de Trivia" to start active gameplay
    const startBtn = page.getByRole('button', { name: /Comenzar Juego de Trivia/i });
    await startBtn.click();

    // 7. Verify active gameplay screen elements
    await expect(page.getByText(/Pregunta 1 de 15/i)).toBeVisible();
    await expect(page.getByText(/Puntos: 0/i)).toBeVisible();

    // 8. Click Option A to answer question 1
    const optionA = page.getByRole('button', { name: /^A /i }).first();
    await optionA.click();

    // 9. Verify explanation box appears with verdict
    await expect(page.getByText(/Explicación Histórica & Científica/i)).toBeVisible();

    // 10. Click "Siguiente Pregunta"
    const nextBtn = page.getByRole('button', { name: /Siguiente Pregunta/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Verify advanced to question 2
    await expect(page.getByText(/Pregunta 2 de 15/i)).toBeVisible();
  });

  test('user can open trivia game directly from header navigation', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/es');

    // 2. Find and click "Juego de Trivia" link in navigation
    const triviaGameLink = page.getByRole('link', { name: /Juego de Trivia/i }).first();
    await expect(triviaGameLink).toBeVisible();
    await triviaGameLink.click();

    // 3. Confirm arrival at Trivia Game page and start button availability
    await expect(page).toHaveURL(/\/es\/juego-trivia/);
    await expect(page.getByRole('button', { name: /Comenzar Juego de Trivia/i })).toBeVisible();
  });
});
