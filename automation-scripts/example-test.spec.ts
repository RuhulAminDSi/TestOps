import { test, expect } from '@playwright/test';

test('user login test', async ({ page }) => {
  await page.goto('https://example.com');

  // Fill login credentials
  await page.fill('input[name='username'], input[name='email'], input[type='email']', 'user');
  await page.fill('input[name='password'], input[type='password']', 'pass');
  await page.click('button[type='submit']');

  // Wait for dashboard or error
  await page.waitForLoadState('networkidle');
  const errorMsg = page.locator('.error, .alert, .text-red');
  if (await errorMsg.isVisible()) {
    console.log('Login failed: ' + await errorMsg.textContent());
  } else {
    console.log('Login successful');
  }
});
