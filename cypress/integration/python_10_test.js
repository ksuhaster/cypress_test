describe('Test Python visit', () => {
  it('find python button', () => {
    cy.visit('/');

    const searchWord = new RegExp('python', 'i');
    let total = 0;
    let python = 0;

    cy.wait(300).then(() => {
      cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
        .contains('Python')
        .click().then(() => {
          cy.wait(300).then(() => {
            cy.get('.jobs-list-wrapper').children()
              .each(el => {
                const isValid = el.text().match(searchWord);
                total ++;
                if (isValid) {
                  python++;
                }
              });
          });
        });

    }).then(() => {
        console.log(total);
        console.log(python);
        expect((python / total * 100) >= 80).to.be.true;
    })

  })
})
