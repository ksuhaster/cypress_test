describe('Tests navbar if links are valid [Navbar main]', () => {
  before(() => {
    cy.login();
  })

  // after(() => {
  //   cy.logout();
  // })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('validate Djinni button', () => {
    cy.get('.navbar-brand')
      .then(a => {
        const btnUrl = a[0]['href'];
        const expectedUrl = Cypress.config().baseUrl;
        cy.validateUrlResponse(btnUrl, expectedUrl);
      });
  })

  it('validate Inbox and Jobs buttons', () => {
    const expectedUrls = [
      Cypress.env('InboxPage'),
      Cypress.env('JobsPage')
    ];
    cy.get('.collapse > :nth-child(1)')
      .then(ul => {
        cy.validateNavElments(ul, expectedUrls)
    });
  })

  it('validate User profile button', () => {
    const expectedUrl = Cypress.env('UserProfilePage');
    cy.get('.recruiter-images-container').parent()
      .then(a => {
        const btnUrl = a[0]['href'];
        cy.validateUrlResponse(btnUrl, expectedUrl)
      });
  })
})