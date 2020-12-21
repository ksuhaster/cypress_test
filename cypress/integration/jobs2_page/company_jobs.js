describe('Test company open jobs page [Company jobs page]', () => {
  before(() => {
    cy.login();
    cy.visit('https://djinni.co/r/67295-recruiter-at-sysgears/');

    cy.get('.recruiter-headline-lg > a')
      .then(a => {
        const compName = a[0]['innerText'].toLowerCase();
        cy.setCookie('compName', compName);
      });

    cy.get('.col-sm-8 > :nth-child(1)')
      .find('.light-button')
      .then(btn => {
        const expJobsCount = btn[0]['innerText'].split('(')[1][0];
        const companyJobsUrl = btn[0]['href'];

        cy.setCookie('expJobsC', expJobsCount);
        cy.setCookie('compJobsUrl', companyJobsUrl);

        cy.visit(companyJobsUrl);
      });
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      'sessionid', 
      'compJobsUrl', 
      'expJobsC', 
      'compName'
    );
    cy.get('.jobs-list-wrapper')
      .as('jobs-wrapper');
  })

  after(() => {
    cy.logout();
  })

  it('check if jobs count is equal to expected', () => {
    cy.getCookie('expJobsC').then(countCookie => {
      const expJobsCount = countCookie.value;
      cy.get('@jobs-wrapper')
        .children('div')
        .should('have.length', expJobsCount)
    });
  })

  it('check if all jobs belongs to expected company (without scroll)', () => {
    cy.getCookie('compName').then(compNameCookie => {
      const expCompName = compNameCookie.value;
      cy.get('@jobs-wrapper')
        .children('div').within(() => {
          cy.get('article > .title > small > .company')
            .then(span => {
              const nbsp = String.fromCharCode(160);
              const factCompName = span[0]['innerText'].split(nbsp)[1].toLowerCase();
              expect(factCompName).to.be.eq(expCompName);
            })
        })

    })
  })

})