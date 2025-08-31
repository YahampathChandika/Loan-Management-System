import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("should display correctly on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/dashboard");
    await page.waitForTimeout(1000);

    // Check that main panels are visible
    await expect(
      page.locator('[data-testid="borrower-pipeline"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="borrower-detail"]')).toBeVisible();
    await expect(page.locator('[data-testid="broker-overview"]')).toBeVisible();

    // Check desktop search is visible (hidden on mobile with md:block)
    const desktopSearch = page
      .locator('input[placeholder="Search borrowers..."]')
      .first();
    await expect(desktopSearch).toBeVisible();
  });

  test("should display correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/dashboard");
    await page.waitForTimeout(1000);

    // Check panels still exist on mobile
    await expect(
      page.locator('[data-testid="borrower-pipeline"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="borrower-detail"]')).toBeVisible();
    await expect(page.locator('[data-testid="broker-overview"]')).toBeVisible();
  });

  test("should toggle mobile search correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/dashboard");
    await page.waitForTimeout(1000);

    // Look for mobile search toggle (search icon button)
    const searchToggle = page
      .locator("button")
      .filter({
        has: page.locator("svg"),
      })
      .filter({ hasText: "" }); // Empty text = icon only

    // Click first search-like button
    const searchButtons = page.locator("button:has(svg)");
    await searchButtons.first().click();
    await page.waitForTimeout(500);

    // Check if search input becomes visible
    const mobileSearch = page.locator(
      'input[placeholder="Search borrowers..."]'
    );
    const isVisible = await mobileSearch.isVisible();
    expect(isVisible).toBeTruthy();
  });
});
