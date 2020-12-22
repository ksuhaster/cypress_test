describe('[Jobs2 page] Tests Python category to show valid results', () => {
  before(() => {
    cy.visit(Cypress.env('Jobs2Page'));
    cy.wait(300);
    cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
      .contains('Python')
      .click();
  })

  it('checks that Python category link is valid', () => {
    cy.url().should('eq', Cypress.env('PythonDir'));
  })

  it('checks that there are at least 10 results on Python category', () => {
    cy.get('.jobs-list-wrapper').children()
      .should('have.length', 10)
  })

  it('checks that there are at least 50% of jobs that fits', () => {
    const passWords = (/python|machine learn|data scien/i);
    let python = 0;

    cy.get('.jobs-list-wrapper')
      .children().each(job => {
        if (job[0]['outerText'].match(passWords)) {
          python++;
        };
      }).then(() => {
        const moreThan50Percents = ((python / 10) * 100) >= 50;
        cy.wrap({ expectTrue: moreThan50Percents })
          .its('expectTrue').should('to.be.true');
      });
  })
})
