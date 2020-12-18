Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('LoginPage'))
    cy.get('#email').type('vl.hutsal@gmail.com')
    cy.get('#password').type('easytobreakinparol{enter}')
    cy.url().should('eq', Cypress.env('InboxPage'))
})