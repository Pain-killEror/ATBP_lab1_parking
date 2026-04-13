module.exports = {
  // Теперь Allure подключается как среда выполнения, а не репортер
  testEnvironment: "allure-jest/node",
  testEnvironmentOptions: {
    resultsDir: "allure-results"
  }
};