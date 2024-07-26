class CleanupHelper {
    
  cleanCart() {
    cy.intercept("POST", "/cart").as("cartPost");
    cy.visit("/cart");
    cy.getByTestId("product-row").if().each(($el) => {
      cy.wrap($el).within(() => {
        cy.get("button").should("not.be.disabled").click();
        cy.wait("@cartPost");
      });
    });
  }

  cleanShippingAddress() {
    cy.visit("/us/dashboard/addresses");
    cy.getByTestId("address-container").if().each(($el) => {
      cy.wrap($el).within(() => {
        cy.getByTestId("address-delete-button").should("not.be.disabled").click();
      });
    });
  }
}

export default new CleanupHelper();