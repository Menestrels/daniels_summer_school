import Global from "../pageElements/Global";
import Login from "../pageElements/Login";

describe("COE Webstore login functionality", () => {
  beforeEach(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("should login to COE Webstore", () => {
    Login.loginUser();
  });
});
