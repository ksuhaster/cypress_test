describe('[Login page] Tests login page and logging in', () => {
  before(() => {
    cy.visit(Cypress.config('urls').LoginPage)
  })
  
  after(() => {
    cy.clearCookies();
  })

  it('checks if there are social buttons', () => {
    cy.get('.col-social-login')
      .children()
      .each(button => {
        cy.wrap(button)
          .children()
          .should('have.attr', 'name', 'social_auth')
      })
  })

  it('checks Register and Remember password buttons', () => {
    const urlPattern = new RegExp(/\/remind\?email=&.+/);
    cy.contains('Реєстрація')
      .should('have.attr', 'href', '/signup')

    cy.contains('Забули пароль?')
      .should('have.attr', 'href')
      .and('match', urlPattern)
  })

  it('checks logging in and validate redirect to /inbox/', () => {
    cy.reload();
    cy.get('#email').type('vl.hutsal@gmail.com');
    cy.get('#password').type('easytobreakinparol{enter}');
    cy.url().should('eq', Cypress.config('urls').InboxPage);
  })

})
