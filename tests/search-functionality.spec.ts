import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector('[data-testid="borrower-card-1"]');
  });

  test("should filter borrowers by search term", async ({ page }) => {
    // Get the search input (desktop version)
    const searchInput = page
      .locator('input[placeholder="Search borrowers..."]')
      .first();

    // Type in search box
    await searchInput.fill("Sarah");
    await page.waitForTimeout(500);

    // Check search indication in header
    await expect(page.locator('text=Searching for: "Sarah"')).toBeVisible();

    // Should show only Sarah's card
    await expect(page.locator('[data-testid="borrower-card-1"]')).toBeVisible();

    // Clear search by clicking X button or clearing input
    await searchInput.clear();
    await page.waitForTimeout(500);

    // All borrowers should be visible again
    await expect(page.locator('[data-testid="borrower-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="borrower-card-3"]')).toBeVisible();
  });

  test("should show no results message for invalid search", async ({
    page,
  }) => {
    const searchInput = page
      .locator('input[placeholder="Search borrowers..."]')
      .first();

    await searchInput.fill("NonExistentName");
    await page.waitForTimeout(500);

    // Look for no results message
    await expect(
      page.locator("text=/No borrowers found|Try adjusting your search/")
    ).toBeVisible();
  });
});
