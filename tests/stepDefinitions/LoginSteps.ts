import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AdminPortalLoginPage } from "../../src/pages/AdminPortalLoginPage";
import { MemberPortalLoginPage } from "../../src/pages/MemberPortalLoginPage";

Given('user navigates to Admin Portal login page', async function () {
  const loginPage = new AdminPortalLoginPage(this.page);
  await loginPage.navigate();
});

When('user enters {string} and {string} to Admin Portal', async function (username, password) {
  const loginPage = new AdminPortalLoginPage(this.page);
  await loginPage.login(username, password);
});

Given('user navigates to Member Portal login page', async function () {
  const loginPage = new MemberPortalLoginPage(this.page);
  await loginPage.navigate();
});

When('user enters {string} and {string} to Member Portal', async function (username, password) {
  const loginPage = new MemberPortalLoginPage(this.page);
  await loginPage.login(username, password);
});

Then('user should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/.*dashboard/);

});

Then('an {string} error message should be displayed', async function (expectedMessage: string) {
  // Locate the error message element by its text.
  // This is a robust locator that finds an element containing the specific text.
  const errorMessage = this.page.locator(`text=${expectedMessage}`);

  // Assert that the error message is visible on the page.
  await expect(errorMessage).toBeVisible();
});