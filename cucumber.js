// playwright-bdd-framework/cucumber.js

module.exports = {
  default: {
    // Automatically find ALL .feature files in the features folder
    paths: ["features/**/*.feature"],

    // This remains the same
    requireModule: ["ts-node/register"],

    // Automatically find ALL .ts files in these folders
    require: [
        "tests/stepDefinitions/**/*.ts",
        "tests/support/**/*.ts"
    ],

    // This remains the same
    format: [
        "summary",
        "progress-bar",
        "json:reports/cucumber-report.json"
    ],

    publishQuiet: true,
  },
};