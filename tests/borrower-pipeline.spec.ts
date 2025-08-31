import { test, expect } from "@playwright/test";

test.describe("Borrower Pipeline", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector('[data-testid="borrower-card-1"]');
  });

  test("should switch between tabs and update borrower list", async ({
    page,
  }) => {
    // Check New tab shows expected borrowers
    await expect(page.locator('[data-testid="borrower-card-1"]')).toBeVisible(); // Sarah
    await expect(page.locator('[data-testid="borrower-card-3"]')).toBeVisible(); // Lisa

    // Switch to In Review tab
    await page.locator('[role="tab"]').filter({ hasText: "In Review" }).click();
    await page.waitForTimeout(500);

    // Should show Alan in In Review tab
    await expect(page.locator('[data-testid="borrower-card-2"]')).toBeVisible();
  });

  test("should update active borrower when card is clicked", async ({
    page,
  }) => {
    // Click on Sarah's card
    await page.locator('[data-testid="borrower-card-1"]').click();
    await page.waitForTimeout(1000);

    // Check that detail panel updates
    const detailPanel = page.locator('[data-testid="borrower-detail"]');
    await expect(detailPanel.locator("text=Sarah Dunn")).toBeVisible();

    // Check active styling (ring classes)
    await expect(page.locator('[data-testid="borrower-card-1"]')).toHaveClass(
      /ring-2/
    );
  });

  test("should filter by active/inactive status", async ({ page }) => {
    // Look for radio buttons by their labels
    const activeLabel = page.locator("label", { hasText: "Active" });
    const inactiveLabel = page.locator("label", { hasText: "Inactive" });

    // Check active is selected
    await expect(activeLabel.locator("..").locator("input")).toBeChecked();

    // Click inactive
    await inactiveLabel.click();
    await page.waitForTimeout(500);

    // Should show empty state
    await expect(
      page.locator("text=No inactive borrowers to display")
    ).toBeVisible();
  });
});
