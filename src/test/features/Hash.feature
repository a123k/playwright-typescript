Feature: Hashing Input
  
  @TC-1 @REQ-1,@REQ-2
  Scenario: TC-1 Verify launch screen
    Given I launch the electron app
    And I wait for "10" seconds
    Then I verify input field is present for user to enter the text
    And I verify that "MD5" is read only
    And I verify that "SHA-1" is read only
    And I verify that "SHA-256" is read only
    And I verify that "SHA-512" is read only

  