import { test, expect } from '@playwright/test';

test.describe('Tortilla Worldstate Simulator & CLI Terminal E2E Test', () => {
  test('user can navigate to Worldstate Simulator, click action buttons, and see state update', async ({ page }) => {
    // 1. Visit the Laboratorio Worldstate Simulator page
    await page.goto('/es/laboratorio/worldstate');

    // Verify title and header
    await expect(page.getByRole('heading', { name: /Simulador & Estado del Mundo de la Tortilla/i })).toBeVisible();

    // 2. Click "Bailar para la Tortilla" button
    const danceBtn = page.getByRole('button', { name: /Bailar para la Tortilla/i });
    await expect(danceBtn).toBeVisible();
    await danceBtn.click();

    // Verify toast notification appears
    await expect(page.getByText(/¡Baile enviado a la Tortilla!/i)).toBeVisible();

    // 3. Click "Mostrar Decepción" button
    const disappointBtn = page.getByRole('button', { name: /Mostrar Decepción/i });
    await expect(disappointBtn).toBeVisible();
    await disappointBtn.click();

    // Verify toast notification for disappointment
    await expect(page.getByText(/¡Decepción registrada!/i)).toBeVisible();

    // 4. Switch to CLI Terminal tab
    const cliTab = page.getByRole('button', { name: /Terminal de Comandos \(CLI\)/i });
    await cliTab.click();

    // 5. Type and submit CLI command "tortilla status"
    const cliInput = page.getByPlaceholder(/Type 'tortilla dance'/i);
    await cliInput.fill('tortilla status');

    const runBtn = page.getByRole('button', { name: /^Run$/i });
    await runBtn.click();

    // 6. Verify JSON output in CLI history
    await expect(page.getByText(/"happiness":/i)).toBeVisible();
  });
});
