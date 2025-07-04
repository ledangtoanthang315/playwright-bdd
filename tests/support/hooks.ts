import { After, Before } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import fs from "fs";
import path from "path";

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.page = page;
});

After(async function (scenario) {
  const screenshotDir = path.join("reports", "screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const now = new Date();
  const timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}`;

  const scenarioName = scenario.pickle.name.replace(/\s+/g, "_");
  const status = scenario.result?.status?.toUpperCase() || "UNKNOWN";

  const fileName = `${scenarioName}_${status}_${timestamp}.png`;
  const filePath = path.join(screenshotDir, fileName);

  if (this.page) {
    await this.page.screenshot({ path: filePath, fullPage: true });
    this.attach(`Screenshot saved at: ${filePath}`);
  }

  if (browser) {
    await browser.close();
  }
});
