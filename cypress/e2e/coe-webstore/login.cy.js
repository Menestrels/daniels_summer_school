import Global from "../pageElements/Global";
import Login from "../pageElements/Login";

describe('COE Webstore login functionality', () => {
  beforeEach(() => {
    Cypress.session.clearAllSavedSessions()
  });

  it('should login to COE Webstore', () => {
    Login.loginUser();
    });

  it('opens sidebar and navigates to store page', () => {
    Login.loginUser();
    cy.visit('/');
    Global.navigateSideBar.openPage('Store');
    });
});