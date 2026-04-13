module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    ["allure-jest", { outputDir: "allure-results" }]
  ]
};