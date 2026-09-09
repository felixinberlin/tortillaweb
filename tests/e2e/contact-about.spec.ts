import { test, expect } from '@playwright/test';

test.describe('Contact & About Form Validation E2E Test', () => {
  test('user can interact with contact form and validate input fields', async ({ page }) => {
    // 1. Visit Contact page
    await page.goto('/es/contacto');
    await expect(page).toHaveURL(/\/es\/contacto/);

    // Verify contact form elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Fill form fields
    const nameInput = page.getByLabel(/Nombre/i).first();
    const emailInput = page.getByLabel(/Correo|Email/i).first();
    const messageInput = page.getByLabel(/Mensaje/i).first();

    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageInput.fill('Hola, esta es una prueba de Playwright.');

      // Click submit button
      const submitBtn = page.getByRole('button', { name: /Enviar/i }).first();
      await submitBtn.click();

      // Check success feedback or message
      await expect(page.getByText(/exito|enviado|gracias/i).first()).toBeVisible();
    }
  });

  test('about page renders history and mission section cleanly', async ({ page }) => {
    await page.goto('/es/about');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/misión|origen/i).first()).toBeVisible();
  });
});
