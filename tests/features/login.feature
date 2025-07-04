@login
Feature: Login functionality

  Scenario: Valid login
    Given user navigates to the login page
    When user enters "admin@covergo.com1" and "zVx*bV3Yh2zHJHJYdkwm"
    Then user should be redirected to the dashboard