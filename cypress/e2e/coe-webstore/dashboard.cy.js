import Login from "../pageElements/Login";
import Global from "../pageElements/Global";

describe("COE Webstore dashboard functionality", () => {
  beforeEach(() => {
    Login.loginUser();
    cy.visit("/");
  });
  it("correct user information is dispayed in the dashboard", () => {
    Global.openDashboard();
    cy.fixture("defaultUserProfileData").then((userData) => {
      //TODO this could be written better
      cy.get(
        `[data-testid="welcome-message"][data-value="${userData.firstName}"]`,
      ).should("be.visible");
      cy.getByTestId("customer-email").should(
        "contain",
        Cypress.env("userEmail"),
      );
      cy.getByTestId("profile-link")
        .should("be.visible")
        .first()
        .click({ force: true });
      cy.getByTestId("current-info")
        .should("contain", userData.firstName)
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", userData.lastName)
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", Cypress.env("userEmail"))
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", userData.phone)
        .should("be.visible");
    });
  });
});
