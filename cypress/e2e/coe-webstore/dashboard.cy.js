import Login from "../pageElements/Login";
import Global from "../pageElements/Global";
import CleanupHelper from "../pageElements/CleanupHelper";

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
          Cypress.env("userEmail"),
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
        .should("contain", Cypress.env("userEmail"))
        .should("be.visible");
      cy.getByTestId("current-info")
        .should("contain", userData.phone)
        .should("be.visible");
    });
  });
  it("user can add a new adress in the dashboard and it dispays correct information", () => {
    Global.openDashboard();
    cy.intercept("POST", "/dashboard/addresses").as("addAddress");

    cy.getByTestId("addresses-link").filter(":visible").click();
    cy.getByTestId("add-address-button").click();

    cy.fixture("defaultUserProfileData").then((userData) => {
      cy.getByTestId("first-name-input").type(userData.firstName);
      cy.getByTestId("last-name-input").type(userData.lastName);
      cy.getByTestId("company-input").type(userData.address.company);
      cy.getByTestId("address-1-input").type(userData.address.street);
      cy.getByTestId("address-2-input").type(userData.address.appartment);
      cy.getByTestId("postal-code-input").type(userData.address.postalCode, {
        force: true,
      });
      cy.getByTestId("city-input").type(userData.address.city);
      cy.getByTestId("country-select").select(userData.address.country);
      cy.getByTestId("phone-input").type(userData.phone);

      cy.getByTestId("save-button").click();
      cy.wait("@addAddress");

      cy.getByTestId("address-container")
        .should("be.visible")
        .within(($el) => {
          cy.wrap($el)
            .getByTestId("address-name")
            .should("contain", userData.firstName);
          cy.wrap($el)
            .getByTestId("address-name")
            .should("contain", userData.lastName);
          cy.wrap($el)
            .getByTestId("address-company")
            .should("contain", userData.address.company);
          cy.wrap($el)
            .getByTestId("address-address")
            .should("contain", userData.address.street);
          cy.wrap($el)
            .getByTestId("address-address")
            .should("contain", userData.address.appartment);
          cy.wrap($el)
            .getByTestId("address-postal-city")
            .should("contain", userData.address.postalCode);
          cy.wrap($el)
            .getByTestId("address-postal-city")
            .should("contain", userData.address.city);
          cy.wrap($el)
            .getByTestId("address-province-country")
            .should("contain", userData.address.countryCode);
        });
    });
  });
});
