// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Указываем папку, где лежат твои тесты (на скриншоте это папка tests)
  testDir: './tests', 
  
  // Максимальное время на один тест (30 секунд)
  timeout: 30000, 
  
  // Настройка отчетов: консоль, Allure и стандартный HTML
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { outputFolder: 'playwright-report' }]
  ],

  use: {
    // Адрес твоего запущенного сервера
    baseURL: 'http://localhost:3000',
    // Делать скриншот только если тест упал
    screenshot: 'only-on-failure',
    // Записывать видео только при неудаче
    video: 'retain-on-failure',
    // Сохранять лог действий при неудаче
    trace: 'retain-on-failure',
  },

  // Проверяем в разных браузерах, как того требует лаба
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});