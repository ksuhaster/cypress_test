describe('[Navbar main] Tests navbar if links are valid', () => {
  before(() => {
    cy.noUiLogin();
    cy.visit(Cypress.config('urls').DashboardPage)
  })
  
  after(() => {
    cy.clearCookies();
  })
  
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
      Cypress.config('urls').InboxPage,
      Cypress.config('urls').JobsPage
    ];
    cy.get('.collapse > :nth-child(1)')
      .then(ul => {
        cy.validateNavElments(ul, expectedUrls)
    });
  })

  it('validate User profile button', () => {
    const expectedUrl = Cypress.config('urls').UserProfilePage;
    cy.get('.recruiter-images-container').parent()
      .then(a => {
        const btnUrl = a[0]['href'];
        cy.validateUrlResponse(btnUrl, expectedUrl)
      });
  })
})