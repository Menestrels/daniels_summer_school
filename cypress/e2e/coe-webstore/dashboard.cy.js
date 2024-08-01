import Login from "../pageElements/Login";
import Global from "../pageElements/Global";
import CleanupHelper from "../pageElements/CleanupHelper";
import Dashboard from "../pageElements/Dashboard";

describe("COE Webstore dashboard functionality", () => {
  beforeEach(() => {
    Login.loginUser();
    CleanupHelper.cleanCart();
    CleanupHelper.cleanShippingAddress();
    cy.visit("/");
  });
  it("correct user information is dispayed in the dashboard", () => {
    Global.openDashboard();

    cy.fixture("defaultUserProfileData").then((userData) => {
      if (Cypress.config("viewportWidth") > 1024) {
        //TODO this could be written better
        cy.get(
          `[data-testid="welcome-message"][data-value="${userData.firstName}"]`,
        ).should("be.visible");
        cy.getByTestId("customer-email").should(
          "contain",
          Cypress.env("USER_EMAIL"),
        );
      }
      cy.getByTestId("profile-link").filter(":visible").first().click();
      cy.getByTestId("addresses-link").filter(":visible").first().click();
      cy.getByTestId("current-info")
        .should("contain", userData.firstName)
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", userData.lastName)
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", Cypress.env("USER_EMAIL"))
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", userData.phone)
        .should("be.visible");
    });
  });
  it("user can add a new adress in the dashboard and it dispays correct information", () => {
    Global.openDashboard();

    cy.getByTestId("addresses-link").filter(":visible").click();
    cy.getByTestId("add-address-button").click();

    cy.fixture("defaultUserProfileData").then((userData) => {
      Dashboard.fillAndSubmitAddressForm(userData);
    });
  });
});
