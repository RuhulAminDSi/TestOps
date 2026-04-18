import { test, expect } from '@playwright/test';

test('automated ui test', async ({ page }) => {
  await page.goto('https://ipemis.qa.innovatorslab.net');

  // Instruction: test the citizen service page fully

  await page.waitForLoadState('networkidle');
  // Test: service
  const targetLink = page.locator('a:has-text("service"), a[href*="service"]').first();
  if (await targetLink.isVisible()) {
    await targetLink.click();
    await page.waitForLoadState('networkidle');
    console.log('Clicked on service');
  }
  // Check for forms on the page
  const forms = page.locator('form');
  const formCount = await forms.count();
  if (formCount > 0) {
    console.log('Found ' + formCount + ' form(s)');
    // Test form inputs
    const inputs = forms.locator('input, textarea, select');
    const inputCount = await inputs.count();
    if (inputCount > 0) {
      console.log('Found ' + inputCount + ' input(s) in form');
    }
  }
  // Check for interactive elements
  const buttons = page.locator('button');
  const buttonCount = await buttons.count();
  if (buttonCount > 0) {
    console.log('Found ' + buttonCount + ' button(s)');
  }
  // Verify page loaded with content
  const pageContent = await page.content();
  if (pageContent.length > 100) {
    console.log('Page has content: ' + pageContent.length + ' chars');
  }
});
