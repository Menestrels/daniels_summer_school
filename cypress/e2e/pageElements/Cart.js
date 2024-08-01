import Global from "./Global";

class Cart {
  elements = {};

  addProductToCart(productName, variantsList = [], quantity = 1) {
    cy.intercept("POST", "/products/**").as("productAdded");
    cy.intercept("GET", "/products/**").as("productLoaded");

    cy.visit("/store");
    cy.getByTestId("product-wrapper")
      .filter(`:contains("${productName}")`)
      .click();
    for (let i = 0; i < quantity; i++) {
      if (variantsList.length != 0) {
        variantsList.forEach((variant) => {
          //TODO variant selector is a bit naive, could be improved
          cy.getByTestId("option-button")
            .filter(`:contains("${variant}")`)
            .should("not.be.disabled")
            .click();
        });
      }

      cy.getByTestId("add-product-button").click();


      if (
        Cypress.config("viewportWidth") > 1024 &&
        cy.getByTestId("nav-cart-dropdown").if().should("be.visible")
      ) {
        //TODO investigate stability issue - sometimes dropdown is not visible
        cy.getByTestId("nav-cart-dropdown").should("be.visible")
        cy.getByTestId("product-link")
          .filter(`:contains("${productName}")`)
          .should("be.visible");
        if (variantsList.length != 0) {
          variantsList.forEach((variant) => {
            cy.getByTestId("cart-item-variant")
              .filter(`:contains("${variant}")`)
              .should("be.visible");
          });
        }
        cy.get('[data-testid="nav-cart-dropdown"]', { timeout: 10000 }).should(
          "not.exist",
        );
      }
      cy.wait("@productAdded");
      cy.wait("@productLoaded");
    }
  }
  //TODO this assumes that there are no other items in the cart
  itemExistsInCart(productName, variantsList = [], quantity = 1) {
    cy.visit("/cart");
    cy.getByTestId("product-title").should("contain", productName);
    if (variantsList.length != 0) {
      variantsList.forEach(($variant) => {
        cy.getByTestId("product-variant")
          .filter(`:contains("${$variant}")`)
          .should("be.visible");
      });
    }
    cy.getByTestId("product-select-button").should("have.value", quantity);
  }

  fillAdressForm(userData) {
    cy.getByTestId("shipping-first-name-input").type(userData.firstName);
    cy.getByTestId("shipping-last-name-input").type(userData.lastName);

    cy.getByTestId("shipping-address-input").type(userData.address.street);
    cy.getByTestId("shipping-company-input").type(userData.address.company);
    cy.getByTestId("shipping-postal-code-input").type(
      userData.address.postalCode,
    );
    cy.getByTestId("shipping-city-input").type(userData.address.city);
    cy.getByTestId("shipping-country-select").select(userData.address.country);
    cy.getByTestId("shipping-phone-input").type(userData.phone);
  }

  checkout(userData) {
    Global.navigateSideBar.openPage("Cart");
    cy.getByTestId("checkout-button").click();

    //TODO if() does not work; if("include", "step=address") as well
    cy.url()
      .should("include", "step=address")
      .if()
      .then(() => {
        this.fillAdressForm(userData);
        cy.getByTestId("submit-address-button").click();
      });

    cy.url().should("include", "step=delivery");
    cy.getByTestId("delivery-option-radio")
      .contains("span", userData.address.shippingMethod)
      .click();
    cy.getByTestId("submit-delivery-option-button").click();
    cy.getByTestId("submit-payment-button").click();

    cy.url().should("include", "step=review");
    cy.getByTestId("submit-order-button").click();

    cy.url().should("include", "order/confirmed");
  }

  addDefaultProductToCart(quantity = 1) {
    cy.fixture("defaultProductData").then((productData) => {
      this.addProductToCart(
        productData[0].name,
        productData[0].variants,
        quantity,
      );
      this.itemExistsInCart(
        productData[0].name,
        productData[0].variants,
        quantity,
      );
    });
  }

  //TODO add method to remove an item from cart
}

export default new Cart();
