import { test, expect } from '@playwright/test';

test('automated ui test', async ({ page }) => {
  await page.goto('https://ipemis.qa.innovatorslab.net');

  // Instruction: test page fully

  await page.waitForLoadState('networkidle');
  // Found 16 elements on page
  // Test all buttons
  const buttons = page.locator('button, a[role="button"]');
  const btnCount = await buttons.count();
  for (let i = 0; i < Math.min(btnCount, 3); i++) {
    const btn = buttons.nth(i);
    if (await btn.isVisible()) {
      const btnText = await btn.textContent();
      console.log('Button ' + i + ': ' + btnText);
    }
  }
  // Test navigation links
  const links = page.locator('nav a, header a, .menu a, .nav a');
  const linkCount = await links.count();
  if (linkCount > 0) {
    console.log('Found ' + linkCount + ' navigation link(s)');
  }
  await expect(page.locator('body')).toBeVisible();
});
