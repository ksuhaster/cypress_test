// How to follow DRY here?





describe('Tests that navbar links are valid, if the user logged in', () => {
  before(() => {
    cy.visit(Cypress.env('LoginPage'));
    cy.login();

    const navButtonsLinks = [
      Cypress.config().baseUrl,
      Cypress.env('InboxPage'),
      Cypress.env('Jobs2Page'),
      Cypress.env('UserProfilePage')
    ];

    cy.setCookie('navButtonsLinks', `${navButtonsLinks}`);
    cy.setCookie('testsCounter', '0');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
    Cypress.Cookies.preserveOnce('testsCounter');
    Cypress.Cookies.preserveOnce('navButtonsLinks');

    cy.getCookie('testsCounter').then(currentCounter => {
      const count = parseInt(currentCounter.value);
      cy.getCookie('navButtonsLinks').then(buttons => {
        const currentBtn = buttons.value.split(',')[count];
        cy.setCookie('currentBtnLink', `${currentBtn}`)
      });
    })

    cy.visit(Cypress.env('DashboardPage'));
  })

  afterEach(() => {
    cy.getCookie('testsCounter').then(prevCounter => {
      const count = parseInt(prevCounter.value) + 1;
      cy.setCookie('testsCounter', `${count}`);
      console.log(count);
    })
  })


  it('check if Djinni button is valid', () => {
    cy.get('.navbar-brand').invoke('attr', 'href').then(url => {
      cy.getCookie('currentBtnLink').then(btn => {
        cy.request({
          url: url,
          followRedirect: false
        })
          .then((response) => {
            console.log(response)
            expect(response.status).to.eq(302)
            expect(response.allRequestResponses[0]['Request URL']).to.eq(btn.value)
          });
      });
    });
  })

  it('check if Inbox button is valid', () => {
    cy.get('.collapse > :nth-child(1) > :nth-child(1) > a').invoke('attr', 'href').then(url => {
      cy.getCookie('currentBtnLink').then(btn => {
        cy.request({
          url: url,
          followRedirect: false
        })
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.allRequestResponses[0]['Request URL']).to.eq(btn.value)
          });
      });
    });
  })

  it('check if Jobs2 button is valid', () => {
    cy.get(':nth-child(1) > :nth-child(2) > a').invoke('attr', 'href').then(url => {
      cy.getCookie('currentBtnLink').then(btn => {
        cy.request({
          url: url,
          followRedirect: false
        })
          .then((response) => {
            console.log(response)
            expect(response.status).to.eq(302)
            expect(response.allRequestResponses[0]['Request URL']).to.eq(btn.value)
          });
      });
    });
  })
})