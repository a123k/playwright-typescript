Feature: Security
  
  @REQ-1,@REQ-2
  Scenario: TC-2 Verify Security Scanning
    Given I launch the electron app
    When I scan the local server with ZAP
    Then ZAP should report no high-risk vulnerabilities

 

  