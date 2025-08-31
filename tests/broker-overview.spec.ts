import { test, expect } from "@playwright/test";

test.describe("Broker Overview Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForTimeout(1000); // Wait for broker info to load
  });

  test("should display broker information and stats", async ({ page }) => {
    const brokerPanel = page.locator('[data-testid="broker-overview"]');

    // Check broker name
    await expect(brokerPanel.locator("text=Robert Turner")).toBeVisible();

    // Check stats (look for numbers, might be formatted differently)
    await expect(brokerPanel.locator("text=16")).toBeVisible();
    await expect(brokerPanel.locator("text=75%")).toBeVisible();
    await expect(brokerPanel.locator("text=/\\$7,660|7660/")).toBeVisible();
  });

  test("should have contact buttons", async ({ page }) => {
    const brokerPanel = page.locator('[data-testid="broker-overview"]');

    // Look for contact buttons (they might be in different formats)
    await expect(
      brokerPanel.locator("button", { hasText: /Call/ })
    ).toBeVisible();
    await expect(
      brokerPanel.locator("button", { hasText: /Email/ })
    ).toBeVisible();
    await expect(
      brokerPanel.locator("button", { hasText: /Chat/ })
    ).toBeVisible();
  });

  test("should show onboarding workflow", async ({ page }) => {
    const brokerPanel = page.locator('[data-testid="broker-overview"]');

    // Check workflow section (might be in accordion on mobile)
    const workflowExists = await brokerPanel
      .locator("text=Onboarding Workflow")
      .isVisible();
    if (!workflowExists) {
      // Try expanding accordion if it's collapsed
      const accordion = brokerPanel.locator("button", {
        hasText: "Onboarding Workflow",
      });
      if (await accordion.isVisible()) {
        await accordion.click();
        await page.waitForTimeout(500);
      }
    }

    // Check for workflow steps
    await expect(
      brokerPanel.locator("text=/Deal Intake|AI Validation/")
    ).toBeVisible();
  });

  test("should have AI assistant toggle", async ({ page }) => {
    const brokerPanel = page.locator('[data-testid="broker-overview"]');

    await expect(brokerPanel.locator("text=AI Assistant")).toBeVisible();
    await expect(brokerPanel.locator('[role="switch"]')).toBeVisible();
  });
});
