import Login from "../pageElements/Login";

describe("COE Webstore store functionality", () => {
  beforeEach(() => {
    Login.loginUser();
  });

  it("Products should be visible in the main view and /store view", () => {
    cy.visit("/");
    cy.getByTestId("product-wrapper")   // TODO: define element in page class
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el).within(() => {
          cy.get("img").should("exist");
        });
      });
    cy.visit("/store");
    cy.getByTestId("product-wrapper") // TODO: define element in page class
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el).within(() => {
          cy.get("img").should("exist");
        });
      });
  });
});
