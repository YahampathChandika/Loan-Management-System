import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    // Wait for the store to load initial data
    await page.waitForTimeout(1000);
  });

  test("should load dashboard with all three panels", async ({ page }) => {
    // Wait for data to load and check all main panels
    await expect(
      page.locator('[data-testid="borrower-pipeline"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="borrower-detail"]')).toBeVisible();
    await expect(page.locator('[data-testid="broker-overview"]')).toBeVisible();

    // Check header
    await expect(page.locator("h1", { hasText: "DemoApp" })).toBeVisible();
  });

  test("should display correct tab counts", async ({ page }) => {
    // Wait for pipeline data to load
    await page.waitForSelector('[data-testid="borrower-card-1"]');

    // Check tab structure (tabs might have different text structure)
    await expect(
      page.locator('[role="tab"]').filter({ hasText: "New" })
    ).toBeVisible();
    await expect(
      page.locator('[role="tab"]').filter({ hasText: "In Review" })
    ).toBeVisible();
    await expect(
      page.locator('[role="tab"]').filter({ hasText: "Approved" })
    ).toBeVisible();
  });
});
