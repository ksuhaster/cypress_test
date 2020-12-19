describe('Category check', () => {
  
  it('check that Python button is changing category', () => {
    cy.visit('/').then(() => {
      cy.wait(300);
      cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
      .contains('Python')
      .click();
    })
    .then(() => {
      cy.url({ log: false }).should('eq', Cypress.env('PythonDir'));
      cy.log('**Link has changed to a Python category**');
    });
  })

  it('checks that there are at least 10 results on Python category', () => {
    cy.get('.jobs-list-wrapper').children()
      .should('have.length', 10)
    cy.log('**There are 10 jobs**')
  })

  it('checks that there are at least 50% of jobs that fits', () => {
    const passWords = 'python|machine learning|data science'
    const regexPattern = new RegExp(passWords, 'i');
    let total = 0;
    let python = 0;

    cy.get('.jobs-list-wrapper').children().each(job => {
      const isValid = job.text().match(regexPattern);
      total++;
      if (isValid) { python++; }

    })
      .then(() => {
        cy.log('**Total categories:** ' + total);
        cy.log('**Passed categories:** ' + python);

        cy.wrap({ pythonPercentageIsMore50: ((python / total) * 100) >= 50 })
          .its('pythonPercentageIsMore50').should('to.be.true');

        cy.log('**Pass words occur more than 50% of jobs**');
      })
  })
})
