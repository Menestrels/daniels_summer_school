import Login from "../pageElements/Login";
import Cart from "../pageElements/Cart";
import CleanupHelper from "../pageElements/CleanupHelper";

describe("COE Webstore cart functionality", () => {
  beforeEach(() => {
    Login.loginUser();
    CleanupHelper.cleanCart();
  });
  it("user is able to add item to a cart", () => {
    Cart.addDefaultProductToCart();
  });

  it("user is able to add multiple pieces of the same item to a cart", () => {
    Cart.addDefaultProductToCart(3);
  });
  it.only("user is able to add multiple different items to a cart", () => {
    cy.fixture("defaultProductData").then((productData) => {
      productData.forEach((product) => {
        Cart.addProductToCart(product.name, product.variants);
        Cart.itemExistsInCart(product.name, product.variants);
      });
    });
    cy.visit("/cart");
  });
});
