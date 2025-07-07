import { type Locator, type Page } from '@playwright/test';

export class MemberPortalLoginPage {
  // Define properties for the page and locators
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use XPath selectors to define the locators
    // This is the direct answer to your question
    this.usernameField = page.locator('#form\\.email');
    this.passwordField = page.locator('#form\\.password');
    this.loginButton = page.locator('#login');
  }

  async navigate() {
    await this.page.goto('https://asia-member.preprod.asia.covergo.cloud/login');
  }

  async login(username: string, password: string) {
    // Use the locator properties to interact with elements
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
