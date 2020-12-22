describe('[Company jobs page] Tests if link ', () => {
  before(() => {
    cy.visit(Cypress.env('CompanyJobsPage'));
  });

  beforeEach(() => {
    const expCompName = Cypress.env('CompanyName').toLowerCase();
    cy.wrap(expCompName).as('expCompName');
  })

  it('validate header', () => {
    cy.get('h1.svelte-1sqbta2').then(title => {
      const titleLower = title[0]['innerText'].toLowerCase()
      cy.get('@expCompName').then(name => {
        expect(titleLower).to.include(name);
      });
    })
  });

  it('check if all jobs belongs to expected company (without scroll)', () => {
    cy.get('.jobs-list-wrapper')
      .children('div').within(() => {
        cy.get('article > .title > small > .company')
          .then(span => {
            const nbsp = String.fromCharCode(160);
            const factCompName = span[0]['innerText'].split(nbsp)[1].toLowerCase();
            cy.get('@expCompName').then(name => {
              expect(factCompName).to.be.eq(name);
            });
          });
      });
  })
})