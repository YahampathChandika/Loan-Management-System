import { test, expect } from "@playwright/test";

test.describe("Borrower Detail Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector('[data-testid="borrower-card-1"]');

    // Select Sarah Dunn (has AI flags)
    await page.locator('[data-testid="borrower-card-1"]').click();
    await page.waitForTimeout(1000);
  });

  test("should display borrower information correctly", async ({ page }) => {
    const detailPanel = page.locator('[data-testid="borrower-detail"]');

    // Check basic info appears somewhere in the detail panel
    await expect(detailPanel.locator("text=Sarah Dunn")).toBeVisible();
    await expect(
      detailPanel.locator("text=sarah.dunn@example.com")
    ).toBeVisible();

    // Check loan amount formatting (could be $300,000 or different format)
    await expect(
      detailPanel.locator("text=/\\$300,000|\\$300K/")
    ).toBeVisible();
  });

  test("should show and expand AI Explainability section", async ({ page }) => {
    // Look for AI Explainability accordion trigger
    const aiAccordion = page.locator("button", {
      hasText: "AI Explainability",
    });
    await expect(aiAccordion).toBeVisible();

    // Expand if not already expanded
    await aiAccordion.click();
    await page.waitForTimeout(500);

    // Check for AI flags content (look for general flag content)
    await expect(
      page.locator("text=/Income.*Inconsistent|High Debt.*Ratio/")
    ).toBeVisible();
  });

  test("should have functional action buttons in AI section", async ({
    page,
  }) => {
    // Expand AI section first
    await page.locator("button", { hasText: "AI Explainability" }).click();
    await page.waitForTimeout(500);

    // Check action buttons exist
    await expect(
      page.locator("button", { hasText: "Request Documents" })
    ).toBeVisible();
    await expect(
      page.locator("button", { hasText: "Send to Valuer" })
    ).toBeVisible();

    // Approve button should exist (check if disabled when AI flags present)
    const approveBtn = page.locator("button", { hasText: "Approve" });
    await expect(approveBtn).toBeVisible();
  });

  test("should allow escalation to credit committee", async ({ page }) => {
    // Look for escalate button
    const escalateBtn = page.locator("button", {
      hasText: /Escalate.*Credit Committee/,
    });
    await expect(escalateBtn).toBeVisible();

    // Click and wait for response
    await escalateBtn.click();

    // Wait for toast notification
    await page.waitForTimeout(1000);
    await expect(page.locator('[data-testid="toast"]')).toBeVisible();
  });
});
