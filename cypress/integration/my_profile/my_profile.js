describe('Tests my profile navbar', () => {
  before(() => {
    cy.login();
    cy.visit(Cypress.env('UserProfilePage'));
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('validates H1 title', () => {
    cy.get('h1').then(h1 => {
      expect(h1[0]['innerText']).to.be.eq('Мій акаунт')
    })
  })

  it('validate navbar links', () => {
    const expectedUrls = Cypress.env('UserProfileNavLinks');
    cy.get('.page-header > .nav').then(ul => {
      cy.validateNavElments(ul, expectedUrls);
    });
  })
})


describe('Tests first block', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
    cy.get('.page-header > .nav').as('navbar');
    cy.wrap([
      'Посада',
      'Зарплатні очікування',
      'Досвід роботи',
      'Місто',
      'Навички'
    ])
      .as('expectedFieldNames');
  })

  it('validate field names', () => {
    cy.get('@expectedFieldNames')
      .then(fieldNames => {
        cy.get(':nth-child(1) > .col-sm-10')
          .children('div')
          .each((fieldDiv, idx) => {
            cy.wrap(fieldDiv)
              .contains(fieldNames[idx], { matchCase: false })
              .should('exist');
          });
      })
  })

  it('checks that fields exists', () => {
    cy.get(':nth-child(1) > .col-sm-10')
      .find('input')
      .should('length', 6)

  })
})



