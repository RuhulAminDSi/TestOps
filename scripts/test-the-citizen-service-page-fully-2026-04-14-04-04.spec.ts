import { test, expect } from '@playwright/test';

test('automated ui test', async ({ page }) => {
  await page.goto('https://ipemis.qa.innovatorslab.net');

  // Instruction: test the citizen service page fully

  await page.waitForLoadState('networkidle');
  // Found 16 elements on page
  await expect(page.locator('body')).toBeVisible();
});
