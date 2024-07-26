import Login from "../pageElements/Login";
import Global from "../pageElements/Global";

describe('COE Webstore dashboard functionality', () => {
    beforeEach(() => {
        Login.loginUser();
    });
  it('correct user information is dispayed in the dashboard', () => {
    Global.openDashboard();
    
    cy.get(':nth-child(1) > [data-testid="profile-link"]').click();
    });
});