const { test, expect } = require('@playwright/test');

test.describe('Dashboard', () => {
  test('should load dashboard page', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    await expect(page).toHaveTitle(/AI QA Platform/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should display sidebar navigation', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.nav-link').first()).toContainText('Dashboard');
  });

  test('should display stat cards', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    await expect(page.locator('.stat-card').first()).toBeVisible();
  });
});

test.describe('API Collections', () => {
  test('should load collections page', async ({ page }) => {
    await page.goto('http://localhost:8081/api-automation/collections');
    await expect(page.locator('h1')).toContainText('API Collections');
  });

  test('should display collections table', async ({ page }) => {
    await page.goto('http://localhost:8081/api-automation/collections');
    await expect(page.locator('table.data-table')).toBeVisible();
    await expect(page.locator('thead th').first()).toContainText('Collection Name');
  });

  test('should have import and new collection buttons', async ({ page }) => {
    await page.goto('http://localhost:8081/api-automation/collections');
    await expect(page.locator('button:has-text("Import")')).toBeVisible();
    await expect(page.locator('button:has-text("New Collection")')).toBeVisible();
  });
});

test.describe('Settings', () => {
  test('should load general settings', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/general');
    await expect(page.locator('h1')).toContainText('General Settings');
  });

  test('should have form groups', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/general');
    await expect(page.locator('.form-group').first()).toBeVisible();
  });

  test('should have save button', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/general');
    await expect(page.locator('button:has-text("Save Changes")')).toBeVisible();
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('http://localhost:8081/');
    await expect(page.locator('[data-mobile-menu-toggle]')).toBeVisible();
  });

  test('should hide sidebar on mobile by default', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('http://localhost:8081/');
    await expect(page.locator('.sidebar')).not.toBeVisible();
  });

  test('should open sidebar when menu clicked on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('http://localhost:8081/');
    await page.click('[data-mobile-menu-toggle]');
    await expect(page.locator('.sidebar.mobile-open')).toBeVisible();
  });
});