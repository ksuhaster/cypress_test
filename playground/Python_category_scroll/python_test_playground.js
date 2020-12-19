// Its a playground for scroll check of Python category



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
          // .click()
          .then(() => {
            // cy.wait(300)
  
            cy.get('strong.svelte-15vrwdt')
              .then(el => {
  
                const total = el.text().split(' ')[0];
                let scrollTimes = parseInt(total.slice(0, -1));
  
                console.log('API TOTAL: ' + total);
                resolver().then(() => {
                  console.log('TOTAL COUNT: ' + totalFact);
                  console.log('TOTAL PYTHON COUNT: ' + totalPython)
                  expect((totalPython / totalFact * 100) >= 80).to.be.true;
                })
                
                console.log('TOTAL PYTHON COUNT: ' + totalPython)
                expect((totalPython / totalFact * 100) >= 80).to.be.true;
              })
              
                function resolver() {
                  return new Cypress.Promise((resolve, reject) => {
                    const res = scrollToEnd(scrollTimes);
                    console.log(res)
                    if (res) {
                      resolve('bottom is reached')
                    }
                  })
                }
  
  
                function scrollToEnd(scrollTimes) {
                  if (scrollTimes > 0) {
                    console.log(scrollTimes)
                    cy.scrollTo('bottom')
                      .wait(300).then(() => {
                        totalFact = countElements();
                        scrollTimes --;
                        scrollToEnd(scrollTimes);
                      });
                  }
                  else { 
                    return true;
                  }
                }
  
  
                function countElements() {
                  let python = 0;
                  let totalFact = 0;
                  cy.get('.jobs-list-wrapper').children()
                    .each(el => {
                      const isValid = el.text().match(searchWord);
                      totalFact ++;
                      if (isValid) {
                        python++;
                      }
                    })
                  totalPython = python;
                  console.log(totalPython)
                  return totalFact;
                }
          })
      })
  
    })
  })

  

  
  // .then(() => {
  //   console.log('TOTAL COUNT: ' + totalFact);
  //   console.log('TOTAL PYTHON COUNT: ' + totalPython)
  //   expect((totalPython / totalFact * 100) >= 80).to.be.true;
  // })
  
                  // function scrollToEnd(scrollTimes) {
                  //   if (scrollTimes > 0) {
                  //     cy.scrollTo('bottom')
                  //       .wait(300).then(() => {
                  //         const res = countElements();
                  //         totalFact += res;
  
                  //         scrollToEnd(totalFact);
                  //       });
                  //   }
                  //   else { 
                  //     const res = new Cypress.Promise((resolve) => {
                  //       resolve('bottom is reached')
                  //     })
                  //   }
                  // }
  
                                  // while (scrollTimes > 0) {
                  //   console.log(scrollTimes)
                    
                  //   cy.scrollTo('bottom')
                  //     .wait(300).then(() => {
                  //       const res = countElements();
                  //       console.log(res);
                  //       console.log(scrollTimes);
                  //       if (res == total) {
                  //         console.log('resolving')
                  //         resolve();
                  //       }
                  //     })
                  //     scrollTimes --;
                  //   }
  