const report = require("cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

const screenshotDir = "./reports/screenshots";
let screenshots = "";

// Generate screenshot list if directory exists
if (fs.existsSync(screenshotDir)) {
  const files = fs.readdirSync(screenshotDir);
  screenshots = files
    .map(file => `<a href="./screenshots/${file}" target="_blank">${file}</a>`)
    .join("<br>");
}

const options = {
  theme: "bootstrap",
  jsonFile: "./reports/cucumber-report.json",
  output: "./reports/cucumber-report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Test Environment": "Preprod",
    "Browser": "Chromium",
    Platform: process.platform,
    Executed: "Local",
  },
  customData: {
    title: "Execution Details",
    data: [
      { label: "Project", value: "CoverGo Playwright BDD" },
      { label: "Generated", value: new Date().toLocaleString() },
      {
        label: "Failure Screenshots",
        value: screenshots || "No screenshots captured",
      },
    ],
  },
};

report.generate(options);
