class Global {
  elements = {
    sideBarBurger: () => cy.getByTestId("nav-menu-button"),
    sideBarLinks: (pageName) =>
      cy.getByTestId("nav-menu-popup").contains("a", pageName),
  };

  openDashboard = () => {
    this.elements.sideBarBurger().click();
    cy.getByTestId("nav-account-link").click();
  };

  openSideBar = () => {
    this.elements.sideBarBurger().click();
  };

  navigateSideBar = {
    openPage: (pageName) => {
      this.openSideBar();
      this.elements.sideBarLinks(pageName);
    },
  };
}

export default new Global();
