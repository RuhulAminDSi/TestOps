const { test, expect } = require('@playwright/test');

test.describe('Monitoring - Audit Stats', () => {
  test('should load audit stats page', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('h1')).toContainText('Audit Statistics');
  });

  test('should display stat cards', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('.stat-card')).toHaveCount(4);
    await expect(page.locator('.stat-card').first()).toContainText('Total Events');
  });

  test('should display Events by Type section', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('h3:has-text("Events by Type")')).toBeVisible();
    await expect(page.locator('.event-item')).toHaveCount(6);
  });

  test('should display Top Users section', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('h3:has-text("Top Users")')).toBeVisible();
    await expect(page.locator('.list-rows li')).toHaveCount(4);
  });

  test('should display Event by Event table', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('h3:has-text("Event by Event")')).toBeVisible();
    await expect(page.locator('table.data-table')).toBeVisible();
    await expect(page.locator('table.data-table th')).toHaveCount(5);
  });

  test('should have time period selector', async ({ page }) => {
    await page.goto('http://localhost:8081/monitoring/audit-stats');
    await expect(page.locator('select')).toBeVisible();
  });
});

test.describe('Settings Pages', () => {
  test('should load projects & environments', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/projects');
    await expect(page.locator('h1')).toContainText('Projects');
    await expect(page.locator('table.data-table')).toBeVisible();
  });

  test('should load users & roles', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/users');
    await expect(page.locator('h1')).toContainText('Users');
    await expect(page.locator('table.data-table')).toBeVisible();
  });

  test('should load logs & audit', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/logs');
    await expect(page.locator('h1')).toContainText('Logs');
    await expect(page.locator('table.data-table')).toBeVisible();
  });

  test('should load integrations', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/integrations');
    await expect(page.locator('h1')).toContainText('Integrations');
    await expect(page.locator('.card')).toHaveCount(3);
  });

  test('should load notifications', async ({ page }) => {
    await page.goto('http://localhost:8081/settings/notifications');
    await expect(page.locator('h1')).toContainText('Notifications');
    await expect(page.locator('.checkbox-label')).toHaveCount(6);
  });
});

test.describe('Sidebar Navigation', () => {
  test('should navigate to all main sections', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    
    // Dashboard
    await page.click('a[href="/"]');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Projects
    await page.click('a[href="/projects"]');
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('should expand and collapse nav groups', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    
    // Click on API Automation nav group
    await page.click('button:has-text("API Automation")');
    await expect(page.locator('#api-automation-menu')).toBeVisible();
    
    // Click again to collapse
    await page.click('button:has-text("API Automation")');
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('http://localhost:8081/api-automation/collections');
    await expect(page.locator('a[href="/api-automation/collections"].active')).toBeVisible();
  });
});

test.describe('Responsive Behavior', () => {
  test('should hide search bar on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 800 });
    await page.goto('http://localhost:8081/');
    await expect(page.locator('.search-bar')).not.toBeVisible();
  });

  test('should show project selector on larger screens', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('http://localhost:8081/');
    await expect(page.locator('.select-wrap')).toBeVisible();
  });
});