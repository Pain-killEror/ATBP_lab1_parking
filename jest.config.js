module.exports = {
  testEnvironment: "allure-jest/node",
  testEnvironmentOptions: {
    resultsDir: "allure-results"
  },
  // Строго говорим Jest: ищи тесты ТОЛЬКО в папке tests/unit и только с окончанием .test.js
  testMatch: [
    "**/tests/unit/**/*.test.js"
  ]
};