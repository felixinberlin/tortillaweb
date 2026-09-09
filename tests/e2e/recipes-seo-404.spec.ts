import { test, expect } from '@playwright/test';

test.describe('Recipes, SEO Microdata, and 404 Handling E2E Test', () => {
  test('user can browse recipes, view structured data, and handle 404 pages', async ({ page }) => {
    // 1. Visit recipes catalog
    await page.goto('/es/recipes');

    // Verify main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Verify Recipe items exist in the list with Schema.org itemtypes
    const recipeArticles = page.locator('article[itemtype="https://schema.org/Recipe"]');
    await expect(recipeArticles.first()).toBeVisible();

    // 2. Click on the first recipe
    const firstRecipeLink = recipeArticles.first().getByRole('link').first();
    await firstRecipeLink.click();

    // Verify navigation to recipe detail page
    await expect(page).toHaveURL(/\/es\/recipes\//);

    // Verify recipe detail page has Schema.org Recipe article element
    const recipeArticle = page.locator('article[itemtype="https://schema.org/Recipe"]');
    await expect(recipeArticle).toBeVisible();

    // Verify recipe title and ingredients are present
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Ingredientes')).toBeVisible();
    await expect(page.getByText('Pasos de Elaboración')).toBeVisible();

    // Verify JSON-LD script is present in the DOM
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript.first()).toBeAttached();

    // 3. Test non-existent route for 404 page handling
    await page.goto('/es/route-that-does-not-exist-12345');

    // Verify Clever404View components render cleanly
    await expect(page.getByText(/404/i).first()).toBeVisible();
  });

  test('robots.txt is served and accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const body = await response?.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
  });
});
