import Global from "./Global";

class Cart {
  elements = {};

  addProductToCart(productName, variantsList = [], quantity = 1) {
    cy.intercept("POST", "/products/**").as("productAdded");
    cy.intercept("GET", "/products/**").as("productLoaded");

    cy.visit("/store");
    cy.getByTestId("product-wrapper").contains(productName).click();
    for (let i = 0; i < quantity; i++) {
      if (variantsList.length != 0) {
        variantsList.forEach((variant) => {
          cy.getByTestId("option-button")
            .contains(variant)
            .should("not.be.disabled")
            .click();
        });
      }

      cy.getByTestId("add-product-button").click();

      cy.wait("@productAdded");
      cy.wait("@productLoaded");

      cy.get('[data-testid="nav-cart-dropdown"]', { timeout: 10000 })
        .should("be.visible")
        .then(() => {
          cy.getByTestId("product-link")
            .contains(productName)
            .should("be.visible");
          if (variantsList.length != 0) {
            variantsList.forEach((variant) => {
              cy.getByTestId("cart-item-variant")
                .contains(variant)
                .should("be.visible");
            });
          }
        });
      cy.get('[data-testid="nav-cart-dropdown"]', {
        timeout: 10000,
      }).should("not.exist");
    }
  }
  itemExistsInCart(productName, variantsList = [], quantity = 1) {
    cy.visit("/cart");
    cy.getByTestId("product-title").should("contain", productName);
    if (variantsList.length != 0) {
      variantsList.forEach(($variant) => {
        cy.getByTestId("product-variant")
          .contains($variant)
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
}

export default new Cart();
