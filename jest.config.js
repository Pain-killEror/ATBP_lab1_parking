module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-allure", { outputDir: "allure-results" }]
  ]
};