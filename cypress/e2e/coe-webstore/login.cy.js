import Login from "../pageElements/Login";
import Global from "../pageElements/Global";

describe("COE Webstore login functionality", () => {
  beforeEach(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("login to COE Webstore", () => {
    Login.loginUser();
  });

  it("logout from COE Webstore via dashboard or side bar menu", () => {
    Login.loginUser();
    Login.logOutUser();

    Login.loginUser();
    cy.visit("/");
    Global.openSideBar();
    cy.getByTestId("logout-button").filter(":visible").click();
    cy.url().should("include", "/sign-in");
  });
});
