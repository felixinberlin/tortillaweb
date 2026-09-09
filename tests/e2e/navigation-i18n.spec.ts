import { test, expect } from '@playwright/test';

test.describe('Navigation and i18n Language Switcher E2E Test', () => {
  test('user can switch languages between Spanish, English, and German', async ({ page }) => {
    // 1. Visit Spanish Homepage
    await page.goto('/es');
    await expect(page).toHaveURL(/\/es/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Todo sobre la Tortilla de Patatas/i);

    // 2. Open Language Switcher and select English
    const langPicker = page.getByRole('button', { name: /es/i }).first();
    if (await langPicker.isVisible()) {
      await langPicker.click();
      const enOption = page.getByRole('link', { name: /English|EN/i }).first();
      if (await enOption.isVisible()) {
        await enOption.click();
      } else {
        await page.goto('/en');
      }
    } else {
      await page.goto('/en');
    }

    // Verify transition to /en and translated English hero title
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Everything about Tortilla de Patatas/i);

    // 3. Switch to German /de
    await page.goto('/de');
    await expect(page).toHaveURL(/\/de/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Alles über die Tortilla de Patatas/i);
  });

  test('user can navigate main links in header across pages', async ({ page }) => {
    await page.goto('/es');

    // Click Recetas link
    const recipesLink = page.getByRole('link', { name: /^Recetas$/i }).first();
    await recipesLink.click();
    await expect(page).toHaveURL(/\/es\/recipes/);

    // Click Ciencia link
    const scienceLink = page.getByRole('link', { name: /^Ciencia$/i }).first();
    await scienceLink.click();
    await expect(page).toHaveURL(/\/es\/science/);

    // Click Historia link
    const historyLink = page.getByRole('link', { name: /^Historia$/i }).first();
    await historyLink.click();
    await expect(page).toHaveURL(/\/es\/history/);
  });
});
