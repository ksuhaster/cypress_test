describe('Test Python visit', () => {
  it('find python button', () => {
    cy.visit('/');

    const passWords = 'python|machine learning|data science'
    const regexPattern = new RegExp(passWords, 'i');
    let total = 0;
    let python = 0;

    cy.wait(300).then(() => {
      cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
        .contains('Python')
        .click().then(() => {

          cy.wait(300);
          cy.url({log: false}).should('eq', Cypress.env('PythonDir'));
          cy.log('**Link has changed to a Python category**')

          cy.get('.jobs-list-wrapper').children().as('JobsWrapper')
            .should('have.length', 10)
            cy.log('**There are 10 jobs**')

          cy.get('@JobsWrapper').each(job => {
              const isValid = job.text().match(regexPattern);
              total ++;
              if (isValid) {
                python++;
              }
            });

        });

    }).then(() => {
      cy.log('**Total categories:** ' + total);
      cy.log('**Passed categories:** ' + python);

      cy.wrap({ pythonPercentageIsMore50: ((python/total)*100) >= 50})
        .its('pythonPercentageIsMore50').should('to.be.true');
      
        cy.log('**Pass words occur more than 50% of jobs**');

    })

  })
})
