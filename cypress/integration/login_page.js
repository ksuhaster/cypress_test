describe('Login page tests', () => {
  before(() => {
    cy.visit(Cypress.env('LoginPage'))
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
    cy.contains('Реєстрація')
      .should('have.attr', 'href', '/signup')

    cy.contains('Забули пароль?')
      .should('have.attr', 'href', '\/remind\?email=&.+')
  })

  it('checks login', () => {
    cy.get('#email').type('vl.hutsal@gmail.com');
    cy.get('#password').type('easytobreakinparol{enter}');
    cy.url().should('eq', Cypress.env('InboxPage'));
  })

})
