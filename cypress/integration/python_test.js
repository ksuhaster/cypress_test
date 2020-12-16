describe('Test Python visit', () => {
    it('find python button', () => {
      cy.visit('/');
      
      const searchWord = new RegExp('python', 'i');
      let totalFact = 0;
      let totalPython = 0;

      // cy.intercept('/').as('home');
      // cy.intercept('https:\/\/djinni\.co\/api\/jobs\/\?offset=\d+&limit=10&category=python').as('category');
      // cy.intercept('https://djinni.co/jobs2/?category=python').as('python');

      cy.wait(300).then(() => {
        cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
          .contains('Python')
          .click().then(() => {
            cy.wait(300)
            
            cy.get('strong.svelte-12hs6o0')
            .then((el) => {
              const total = parseInt(el.text().split(' ')[0]);
              
              scrollToEnd(totalFact);
    
              function scrollToEnd(totalFact) {
                if (totalFact < total) {
                  cy.scrollTo('bottom', {ensureScrollable: false})
                    .wait(300).then(() => {
                      countElements();
                      scrollToEnd(totalFact);
                    });
                }
                else { return; }
              }
    
              function countElements() {
                let python = 0;
                cy.get('.jobs-list-wrapper').children()
                  .each(el => {
                    const isValid = el.text().match(searchWord);
                    console.log(el)
                    totalFact += 10;
                      if (isValid) {
                        python ++;
                      }
                  }).then(() => {
                    if (totalPython < python) { totalPython = python }
                  })
              }
              
            });    
          })
      }).then(() => {
        console.log(totalFact);
        console.log(python)
        expect((python/totalFact*100) >= 80).to.be.true;
      })
   
      })
    })
