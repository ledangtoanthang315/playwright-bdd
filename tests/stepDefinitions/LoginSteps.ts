import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";

Given('user navigates to the login page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('user enters {string} and {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

Then('user should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/.*dashboard/);

});