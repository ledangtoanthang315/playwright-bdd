@login
Feature: Login functionality

  Scenario Outline: Verify user login to Admin Portal with multiple credentials
    Given user navigates to Admin Portal login page
    When user enters "<username>" and "<password>" to Admin Portal
    Then user should be redirected to the dashboard

    Examples: Admin Credentials
      | username                 | password               |
      | admin@covergo.com        | zVx*bV3Yh2zHJHJYdkwm   |
      | user2@covergo.com        | some_other_password    |

  Scenario Outline: Verify user login to Member Portal with multiple credentials
    Given user navigates to Member Portal login page
    When user enters "<username>" and "<password>" to Member Portal
    Then user should be redirected to the dashboard

    Examples: Member Credentials
      | username                 | password               |
      | 202506181102             | Covergo2017@           |
      | user2@covergo.com        | some_other_password    |
