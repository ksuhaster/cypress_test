describe('Inbox page tests', () => {
  before(() => {
    cy.login();
  })

  beforeEach(() => {
    cy.get('h3').next().children('.inbox-message').first()
      .as('firstMsg');
  }) 

  it('checks if picture exists', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media > .media-left > user-picture')
      cy.get('[picture=""]')
        .should('not.exist')

      cy.get('[name=""]')
        .should('not.exist')     
    });
  })

  it('checks if recruiters name and position exists', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media-body').then(($el) => {
        expect($el).to.have.descendants('span')
      })
    })
  })
})