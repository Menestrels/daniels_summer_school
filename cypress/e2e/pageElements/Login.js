class Login {
  elements = {
    emailInput: () => cy.getByTestId("email-input"),
    passwordInput: () => cy.getByTestId("password-input"),
    signInButton: () => cy.getByTestId("sign-in-button"),
  };

  loginUser(
    email = Cypress.env("userEmail"),
    password = Cypress.env("userPassword"),
  ) {
    cy.session([email, password], () => {
      cy.visit("/sign-in");
      this.elements.emailInput().type(email);
      this.elements.passwordInput().should("be.visible").type(password);
      this.elements.signInButton().should("be.visible").click();
      cy.url().should("include", "/us");
    });
  }
}

export default new Login();
