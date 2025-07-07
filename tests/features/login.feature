@login
Feature: Login functionality

  Scenario Outline: Verify user login to Admin Portal with multiple credentials
    Given user navigates to Admin Portal login page
    When user enters "<username>" and "<password>" to Admin Portal
    Then user should be redirected to the dashboard

    Examples: Admin Credentials
      | username                 | password               |
      | admin@covergo.com        | zVx*bV3Yh2zHJHJYdkwm   |

  Scenario Outline: Verify user login to Member Portal with multiple credentials
    Given user navigates to Member Portal login page
    When user enters "<username>" and "<password>" to Member Portal
    Then user should be redirected to the dashboard

    Examples: Member Credentials
      | username                 | password               |
      | thanG.Le+202507012008    | Covergo2017@           |

  Scenario Outline: Verify error message for invalid Admin Portal login
    Given user navigates to Admin Portal login page
    When user enters "<username>" and "<password>" to Admin Portal
    Then an "<error_message>" error message should be displayed

    Examples: Admin Credentials
      | username                 | password               | error_message                 |
      | user2@covergo.com        | some_other_password    | Invalid username or password  |

  Scenario Outline: Verify error message for invalid Member Portal login
    Given user navigates to Member Portal login page
    When user enters "<username>" and "<password>" to Member Portal
    Then an "<error_message>" error message should be displayed

    Examples: Admin Credentials
      | username                 | password               | error_message                 |
      | user2@covergo.com        | some_other_password    | Invalid username or password  |