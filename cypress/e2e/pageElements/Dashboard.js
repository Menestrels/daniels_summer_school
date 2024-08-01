class Dashboard {
  elements = {
    getDashboardLink: () => "/dashboard", // TODO: not sure if this url fits best under 'elements'. would be nice to have elements like cy.getByTestId("first-name-input") defined here
  };

  visitDashboard = () => {
    cy.visit(this.elements.getDashboardLink());
  };

  fillAndSubmitAddressForm = (userData) => {
    cy.url().should("include", "/dashboard/addresses");
    cy.intercept("POST", "/dashboard/addresses").as("addAddress");

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
  };
}

export default new Dashboard();
