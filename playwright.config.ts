import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    slowMo: 300,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
