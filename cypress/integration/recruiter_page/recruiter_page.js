// ------------ Visit Recruiters page, check recruiters info block and picture
describe('[Recruiters page] Test "Recruiters info" block', () => {
  before(() => {
    cy.noUiLogin();
    cy.visit(Cypress.config('urls').InboxPage)
    cy.getFirstMsg().as('firstMsg');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('cheks if inbox page link redirects to valid recruiters page', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media > .media-body > .recruiter-name > a')
        .click()
        .then(() => {
          const urlPattern = (/^https:\/\/djinni\.co\/r\/\d+[-\w+]+\/?$/);
          cy.url().then((chainer) => {
            expect(chainer).to.match(urlPattern);
          });
        });
    });
  })

  it('checks if recruter picture exists and not empty', () => {
    cy.get('.page-header-userpic').within(() => {
      cy.checkPictureNotEmpty();
    });
  })

  it('checks that recruiters name exists', () => {
    cy.get('h1').should('exist');
  })

  it('checks that recruiters position exists and leads to the company page', () => {
    const expectedPattern = (/^https:\/\/djinni\.co\/jobs\/company.+/);
    cy.get('.recruiter-headline-lg')
      .should('not.be.empty')
      .find('a')
      .then(a => {
        cy.validateUrlResponse(a[0]['href'], expectedPattern)    
  })

  it('checks "on Djinni since.." and "last visited"', () => {
    cy.get('.profile-whois > :nth-child(4) > tbody').as('tbody')
      .children('tr')
      .should('have.length', '2')

    cy.get('@tbody').find(':nth-child(1)')
      .should('include.text', 'На Джині з')
    
    cy.get('@tbody').find(':nth-child(2)')
    .should('include.text', 'Активність на сайті')

  })
  })
})


// ------------ Check Open Jobs block
describe('[Recruiters page] Test "Opened company jobs" block', () => { 
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('sessionid');
      cy.get('.col-sm-8 > :nth-child(1)').as('openJobs');
    })

  it('checks if block is named as "Відкриті вакансії"', () => {
    cy.get('@openJobs')
      .children('h4')
        .then((h4) => {
          expect(h4).to.have.text('Відкриті вакансії');
      })
  })

  it('checks if links exists and are matches expected pattern', () => {
    const urlPattern = (/^https:\/\/djinni\.co\/jobs\/\d+[-\w+]+\/?$/);
    cy.get('@openJobs').find('.list-common')
      .children()
      .each(li => {
        cy.wrap(li).find('a')
          .then(a => {
            cy.validateUrlResponse(a[0]['href'], urlPattern)
          })
      });
  })

  it('checks if all opened jobs links are valid', () => {
    const urlPattern = (/^https:\/\/djinni\.co\/jobs\/company-.+/);
    cy.get('@openJobs')
      .find('.light-button')
      .then(btn => {
        cy.validateUrlResponse(btn[0]['href'], urlPattern);
      });
  })
})


// ------------ Check dialog button, company description and additional links
describe('[Recruiters page] Test "Description block", dialog and additional buttons', () => { 
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  after(() => {
    cy.clearCookies();
  })

  it('validate dialog button text', () => {
    cy.get('.col-sm-8 > .row > .col-sm-10 > .btn')
      .then(a => {
      expect(a).to.include.text('Відкрити діалог')
    });
  })

  it('validate dialog button link', () => {
    const urlPattern = (/^https:\/\/djinni\.co\/my\/inbox\/\d+\/?/);
    cy.get('.col-sm-8 > .row > .col-sm-10 > .btn')
      .then(a => {
        cy.validateUrlResponse(a[0]['href'], urlPattern);
    });
  })

  it('check if description block exists and not empty', () => {
    cy.get('.col-sm-8 > :nth-child(3)')
      .should('not.be.empty')
      .find('h4').should('not.be.empty')

  })

})