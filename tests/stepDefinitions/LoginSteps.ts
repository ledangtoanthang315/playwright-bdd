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