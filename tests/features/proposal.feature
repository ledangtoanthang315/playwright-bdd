@proposal
Feature: Proposal Management

  Background: User is logged in and on the Proposals page
    Given user navigates to Admin Portal login page
    When user enters "admin@covergo.com" and "zVx*bV3Yh2zHJHJYdkwm" to Admin Portal
    Then user should be redirected to the dashboard

  Scenario: Successfully create a new proposal
    When the user navigates to "Proposals" using the sidebar
    And the user clicks the Create Proposal button
    And the user fills out the new proposal form with the following details:
      | agentSearchTerm | agentFullName           | name                    | industry                    | employeeCount | effectiveDate | endDate    | paymentMode |
      | AIDApr18        | AIDApr18 - Thang Agent  | [dynamic_proposal_name] | Mining of coal and lignite  | 1             | 01/07/2025    | 30/06/2026 | Quarterly   |
    And the user submits the proposal form
    Then a "Proposal has been created successfully!" message should be displayed
