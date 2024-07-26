import Login from "../pageElements/Login";
import CleanupHelper from "../pageElements/CleanupHelper";
import Cart from "../pageElements/Cart";

describe("Complete User Jorney", () => {

  beforeEach(() => {
    Login.loginUser();
    
    CleanupHelper.cleanCart();
    CleanupHelper.cleanShippingAddress();

    cy.visit("/");
  });

  it("should add a product to the cart and proceed to order the item", () => {
    Cart.addDefaultProductToCart();
    cy.fixture("defaultUserProfileData").then((userData) => {
      Cart.checkout(userData);
    });
  });
});
