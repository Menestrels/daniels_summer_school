class Home {
  elements = {
    headerLink: () => cy.getByTestId("nav-store-link"),
  }
}

export default new Home();