describe('Tests that navbar links are valid, if the user logged in', () => {
  before(() => {
    cy.login();
    const navButtonsLinks = [
      Cypress.config().baseUrl,
      Cypress.env('InboxPage'),
      Cypress.env('JobsPage'),
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
        console.log(currentBtn)
        cy.setCookie('currentBtnLink', `${currentBtn}`)
      });
    })
  })

  afterEach(() => {
    cy.getCookie('testsCounter').then(prevCounter => {
      const count = parseInt(prevCounter.value) + 1;
      cy.setCookie('testsCounter', `${count}`);
      console.log(count);
    })
  })


  it('check if Djinni button is valid', () => {
    cy.get('.navbar-brand')
      .invoke('attr', 'href')
      .then(url => {
        console.log(url)
        cy.getCookie('currentBtnLink').then(cookie => {
          cy.validateUrlResponse(url, 302, cookie.value)
        });
    });
  })

  it('check if Inbox button is valid', () => {
    cy.get('.collapse > :nth-child(1) > :nth-child(1) > a')
      .invoke('attr', 'href')
      .then(url => {
        console.log(url)
        cy.getCookie('currentBtnLink').then(cookie => {
          cy.validateUrlResponse(url, 200, cookie.value)
        });
      });
  })

  it('check if Jobs2 button is valid', () => {
    cy.get(':nth-child(1) > :nth-child(2) > a')
      .invoke('attr', 'href')
      .then(url => {
        console.log(url)
        cy.getCookie('currentBtnLink').then(cookie => {
          cy.validateUrlResponse(url, 302, cookie.value)
        });
    });
  })

  it('check if User profile button is valid', () => {
    cy.get('.recruiter-images-container').parent()
      .invoke('attr', 'href')
      .then(url => {
        console.log(url)
        cy.getCookie('currentBtnLink').then(cookie => {
          cy.validateUrlResponse(url, 200, cookie.value)
        });
    });
  })


})