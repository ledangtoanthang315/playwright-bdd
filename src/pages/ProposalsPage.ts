import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Represents the Proposals page and the Create New Proposal form.
 * Contains methods for interacting with elements on these pages.
 */
export class ProposalsPage {
  readonly page: Page;

  // Locators for the Proposals Listing Page
  readonly createProposalButton: Locator;

  // Locators for the "Create New Proposal" Form
  readonly agentDropdown: Locator;
  readonly nameInput: Locator;
  readonly industryInput: Locator;
  readonly headcountEmployeeInput: Locator;
  readonly effectiveDateInput: Locator;
  readonly endDateInput: Locator;
  readonly paymentModeDropdown: Locator;
  readonly submitButton: Locator;


  constructor(page: Page) {
    this.page = page;

    // Initializing locators
    this.createProposalButton = page.getByRole('button', { name: 'Create Proposal' });

    // Using getByLabel is a robust way to find form fields.
    // Ensure the <label> text matches exactly.
    this.agentDropdown = page.getByPlaceholder('Select an Agent Code');
    this.nameInput = page.locator('#dataModel\\.companyName');
    this.industryInput = page.locator('#dataModel\\.natureOfBusiness');
    this.headcountEmployeeInput = page.locator('#dataModel\\.numberOfEmployees');
    this.effectiveDateInput = page.locator('#dataModel\\.startDate input');
    this.endDateInput = page.locator('#dataModel\\.endDate input');
    this.paymentModeDropdown = page.locator('#dataModel\\.paymentMode select');
    this.submitButton = page.getByRole('button', { name: 'Create' });
  }

  /**
   * Clicks the "Create Proposal" button on the main proposals listing page.
   */
  async clickCreateProposal(): Promise<void> {
    await this.createProposalButton.click();
  }

  /**
   * Fills out the "Create New Proposal" form with the provided data.
   * @param proposalData - An object containing the data to fill the form with.
   */
  async fillNewProposalForm(proposalData: {
    agentSearchTerm: string;
    agentFullName: string;
    name: string;
    industry: string;
    employeeCount: string;
    effectiveDate: string;
    endDate: string;
    paymentMode: string;
  }): Promise<void> {
    // Note: Handling dropdowns and search fields may require more complex logic,
    // such as clicking and then selecting an option from a list.
    // This is a basic implementation.

    // --- Logic for the dynamic Agent search dropdown ---
    // 1. Fill the dropdown with the search term to filter the list.
    await this.agentDropdown.fill(proposalData.agentSearchTerm);
    // 2. Use a more specific locator to click the correct option from the list.
    //    We target the element that has the exact text of the agent.
    const agentOption = this.page.getByText(proposalData.agentFullName, { exact: true });
    await agentOption.click();

    // Fill out the rest of the form fields
    // ** ADDED EXPLICIT WAIT **
    // Use expect with a timeout to wait for the element to be visible.
    await expect(this.nameInput).toBeVisible({ timeout: 5000 });
    await this.nameInput.fill(proposalData.name);

    // Step 1: Click the industry field container
    await this.industryInput.click();
    // Step 2: Dynamically locate the input used for searching in dropdown
    const dropdownSearchInput = this.page.locator('input[role="combobox"], input[type="text"]').last();
    await expect(dropdownSearchInput).toBeVisible({ timeout: 3000 });
    // Step 3: Fill in the industry
    await dropdownSearchInput.fill(proposalData.industry);
    // Step 4: Wait for dropdown to populate and click the option
    const industryOption = this.page.locator(`text="${proposalData.industry}"`).first();
    await expect(industryOption).toBeVisible({ timeout: 5000 });
    await industryOption.click();

    await this.headcountEmployeeInput.fill(proposalData.employeeCount);

    await this.effectiveDateInput.clear();
    await this.effectiveDateInput.fill(proposalData.effectiveDate);

    await this.endDateInput.clear();
    await this.endDateInput.fill(proposalData.endDate);

    await this.paymentModeDropdown.selectOption({ label: proposalData.paymentMode });
  }

  /**
   * Clicks the final "Create" button to submit the form.
   */
  async submitProposalForm(): Promise<void> {
      await this.submitButton.click();
  }
}