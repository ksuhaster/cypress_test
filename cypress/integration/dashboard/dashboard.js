describe('[Navbar main] Tests navbar if links are valid', () => {
  before(() => {
    cy.login();
  })

  after(() => {
    cy.clearCookies();
  })

  it('validate Djinni button', () => {
    cy.get('.navbar-brand')
      .then(a => {
        cy.visit(a[0]['href']);
        cy.url().should('eq', Cypress.env('DashboardPage'))
      });
  })
})
