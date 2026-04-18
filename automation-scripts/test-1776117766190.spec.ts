import { test, expect } from '@playwright/test';

test('user login test', async ({ page }) => {
  await page.goto('https://login.ipemis.qa.innovatorslab.net/login');

  // Fill login credentials
  await page.fill('input[name='username'], input[name='email'], input[type='email']', '01738957729');
  await page.fill('input[name='password'], input[type='password']', 'ipem1sq@dsi');
  await page.click('button[type='submit']');

  // Wait for dashboard or error
  await page.waitForLoadState('networkidle');
  const errorMsg = page.locator('.error, .alert, .text-red');
  if (await errorMsg.isVisible()) {
    console.log('Login failed: ' + await errorMsg.textContent());
  } else {
    console.log('Login successful');
  }
  // Click teacher link
  const teacherLink = page.locator('a:has-text("Teacher"), menu a:has-text("Teacher")').first();
  if (await teacherLink.isVisible()) {
    await teacherLink.click();
    await page.waitForLoadState('networkidle');
    console.log('Navigated to teacher page');
  }
});
