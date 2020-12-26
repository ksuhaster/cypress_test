describe('[Login page] Tests login behavior with wrong input', () => {
  before(() => {
    cy.visit(Cypress.config('urls').LoginPage)
  })

  after(() => {
    cy.clearCookies();
  })
  it('checks if error are visible when password field is empty', () => {
    cy.get('#email').as('email')
      .type('wrongemail@somemail.com{enter}');
    cy.get('#p_empty_password > .text-danger')
      .should('be.visible');
    cy.get('@email').clear();

  })

  it('checks if error is visible when email field is empty', () => {
    cy.get('#password').as('password')
      .type('worngpassword{enter}');
    cy.get('#p_empty_email > .text-danger')
      .should('be.visible');
    cy.get('@password').clear();
  })

  it('checks if there ')

})
