# 🎭 Playwright BDD Framework

This is an automated end-to-end testing framework using [Playwright](https://playwright.dev/) with [Cucumber.js](https://github.com/cucumber/cucumber-js) for BDD-style testing in TypeScript.

## 🚀 Features

- 🧪 BDD syntax with Gherkin (`.feature` files)
- 🎯 Playwright for browser automation
- 📸 Automatic screenshot capture (on both pass and fail)
- 📊 HTML test report generation with embedded screenshots
- 📁 Organized folder structure for scalability

## 🗂️ Project Structure

playwright-bdd-framework/
├── reports/ # JSON + HTML test reports + screenshots
├── src/ # Page Objects
├── tests/
│ ├── features/ # Gherkin .feature files
│ ├── stepDefinitions/ # Step definitions
│ └── support/ # Hooks (e.g. before/after, screenshots)
├── report-config.js # Custom HTML report generator
├── package.json # NPM scripts and dependencies


## 🔧 Setup

1. Clone this repo:
   ```bash
   git clone https://github.com/ledangtoanthang315/playwright-bdd.git
   cd playwright-bdd

2. Install dependencies:

npm install

3. 🧪 Running Tests
Run specific feature

npm run test:login

Run tests by tag

npm run test:tags

Make sure to define your tags in the .feature file:

@smoke @login
Scenario: Valid login

4. 📸 Screenshots
    Screenshots are captured for both passed and failed steps. 
    Stored in: reports/screenshots/
    Timestamped as: SCENARIO_STATUS_YYYY_MM_DD_hh_mm.png

5. 📊 HTML Report
After test execution, an HTML report is auto-generated and opened:

* File: reports/cucumber-report.html
* Includes links to screenshots

✅ Scripts in package.json
Script	Description
test:login	Run login feature and generate report
test:tags	Run tests by Cucumber tag
report	Generate HTML report from JSON

📦 Tech Stack
Playwright

Cucumber.js

TypeScript

Node.js

📬 Contact
Created by @ledangtoanthang315
Feel free to contribute or open an issue!