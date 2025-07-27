import { type Page, type Locator } from '@playwright/test';

/**
 * A class to represent the common sidebar navigation menu.
 * This component can be used on any page where the sidebar is visible.
 */
export class SideBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on a navigation link in the sidebar menu.
   * This method is dynamic and uses the text of the link to find it.
   * @param linkName The exact text of the link to click (e.g., "Proposals", "Claims").
   */
  async navigateTo(linkName: string): Promise<void> {
    // Use getByRole for a robust, user-facing locator.
    // This finds a link element with the specified name/text.
    const navLink = this.page.getByRole('link', { name: linkName, exact: true });
    await navLink.click();
  }
}
