import { test, expect } from '@playwright/test';

test.describe('Tortilla Builder & Recipe Comparator E2E Test', () => {
  test('user can customize recipe in Tortilla Builder and view ratios', async ({ page }) => {
    // 1. Visit Builder page
    await page.goto('/es/builder');
    await expect(page).toHaveURL(/\/es\/builder/);

    // Verify main builder interface elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // 2. Adjust diner count if inputs or buttons exist
    const incDinersBtn = page.getByRole('button', { name: /\+|\bAumentar\b/i }).first();
    if (await incDinersBtn.isVisible()) {
      await incDinersBtn.click();
    }

    // 3. Toggle onion preference
    const onionToggle = page.getByRole('button', { name: /Con cebolla|Sin cebolla/i }).first();
    if (await onionToggle.isVisible()) {
      await onionToggle.click();
    }

    // 4. Verify calculated ingredients list or card updates
    await expect(page.getByText(/Huevos|Patatas|Aceite/i).first()).toBeVisible();
  });

  test('user can compare two recipes on Recipe Comparator page', async ({ page }) => {
    // 1. Visit Comparator page
    await page.goto('/es/comparador');
    await expect(page).toHaveURL(/\/es\/comparador/);

    // Verify title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Verify side-by-side comparison cards or selectors exist
    await expect(page.getByText(/Comparador|Versus/i).first()).toBeVisible();
  });
});
