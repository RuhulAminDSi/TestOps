import { defineConfig } from '@playwright/test';

module.exports = defineConfig({
  testDir: './.playwright_test',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:8081',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  outputDir: './.playwright_test/test-results',
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'mobile',
      use: { 
        browserName: 'chromium',
        viewport: { width: 375, height: 800 },
      },
    },
  ],
});