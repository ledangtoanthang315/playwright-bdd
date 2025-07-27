import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { SideBar } from "../../src/pages/components/SideBar";
import { ProposalsPage } from "../../src/pages/ProposalsPage";

/**
 * Generates a timestamp string in YYYYMMDDHHMM format.
 */
function getTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
}

// This step navigates using the sidebar component.
When('the user navigates to {string} using the sidebar', async function (linkName: string) {
  const sideBar = new SideBar(this.page);
  await sideBar.navigateTo(linkName);
});

// This step clicks the "Create Proposal" button.
When('the user clicks the Create Proposal button', async function () {
    const proposalsPage = new ProposalsPage(this.page);
    await proposalsPage.clickCreateProposal();
});

// This step fills the form using a data table from the feature file.
When('the user fills out the new proposal form with the following details:', async function (dataTable: DataTable) {
  const proposalsPage = new ProposalsPage(this.page);
  // .hashes() converts the table to an array of objects. We take the first one.
  const formData = dataTable.hashes()[0];

    let proposalName = formData.name;

    // Check for the dynamic placeholder
    if (proposalName === '[dynamic_proposal_name]') {
      const timestamp = getTimestamp();
      proposalName = `Playwright ${timestamp}`;
      // Store the generated name in the world context to use in later steps
      this.dynamicProposalName = proposalName;
    }

  await proposalsPage.fillNewProposalForm({
    agentSearchTerm: formData.agentSearchTerm,
    agentFullName: formData.agentFullName,
    name: proposalName,
    industry: formData.industry,
    employeeCount: formData.employeeCount,
    effectiveDate: formData.effectiveDate,
    endDate: formData.endDate,
    paymentMode: formData.paymentMode
  });
});

// This step submits the form. Note: 'And' is replaced with 'When'.
When('the user submits the proposal form', async function () {
    const proposalsPage = new ProposalsPage(this.page);
    await proposalsPage.submitProposalForm();
});

// This step verifies a success message.
Then('a {string} message should be displayed', async function (message: string) {
    const messageLocator = this.page.locator(`text=${message}`);
    await expect(messageLocator).toBeVisible();
});

// This step verifies the new proposal appears in the list.
Then('the proposal for {string} should be visible in the proposals list', async function (proposalName:string) {
    // This assumes you are back on the proposals listing page.
    const proposalInList = this.page.locator(`tr:has-text("${proposalName}")`);
    await expect(proposalInList).toBeVisible();
});
