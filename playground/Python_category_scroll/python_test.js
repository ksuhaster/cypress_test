// This test should go to the Python category of Djinni.co, scroll to the bottom,
// and check if there are at least 80% of results that matches the' python' keyword in the text




describe('Test Python visit', () => {
    it('find python button', () => {
      cy.visit('https://djinni.co/jobs2/?category=scala&experience=5&salary=5500&&');
      
      const searchWord = new RegExp('python', 'i');
      let totalFact = 0;
      let totalPython = 0;

      // cy.intercept('/').as('home');
      // cy.intercept('https:\/\/djinni\.co\/api\/jobs\/\?offset=\d+&limit=10&category=python').as('category');
      // cy.intercept('https://djinni.co/jobs2/?category=python').as('python');

      cy.wait(300).then(() => {
        cy.get('.first > :nth-child(1) > section.svelte-1b8ond5 > .tags-wrapper > ul.svelte-6mlqg1')
          // .contains('Python')
          // .click().then(() => {
            cy.wait(300)
            
            cy.get('strong.svelte-15vrwdt')
            .then((el) => {
              const total = parseInt(el.text().split(' ')[0]);
              
              scrollToEnd(totalFact).then(() => {
                console.log(totalFact);
                console.log(totalPython)
                expect((totalPython/totalFact*100) >= 80).to.be.true;
              })
    
              function scrollToEnd(totalFact) {
                return new Cypress.Promise((resolve, reject) => {
                  if (totalFact < total) {
                    console.log('TOTAL FACT: ' + totalFact)
                    console.log('TOTAL: ' + total)
                    cy.scrollTo('bottom')
                      .wait(500).then(() => {
                        let tf = countElements();
                        console.log('tf' + tf)
                        scrollToEnd(tf);
                      });
                  }
                  else { resolve(); }
                })
              }
    
              function countElements() {
                let python = 0;
                cy.get('.jobs-list-wrapper').children()
                  .each(el => {
                    const isValid = el.text().match(searchWord);
                    totalFact ++;
                    console.log('TOTAL FACT: ' + totalFact)
                      if (isValid) {
                        python ++;
                      }
                  }).then(() => {
                    totalPython = python;
                    return totalFact;
                  })
              }
              
          //   }).then(() => {
          //     console.log(totalFact);
          //     console.log(totalPython)
          //     expect((totalPython/totalFact*100) >= 80).to.be.true;
          // })
      }).wait(10000)
      })
   
      })
    })
