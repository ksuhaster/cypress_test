describe('[Dashboard page] Tests dashboard is available', () => {
  before(() => {
    cy.login();
  })

  after(() => {
    cy.clearCookies();
  })

  it('validate that Djinni nav button redirects to dashboard', () => {
    cy.get('.navbar-brand')
      .then(a => {
        cy.visit(a[0]['href']);
        cy.url().should('eq', Cypress.env('DashboardPage'))
      });
  })
})
