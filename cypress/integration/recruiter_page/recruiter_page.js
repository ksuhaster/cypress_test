describe('Recruiters page test', () => {
  before(() => {
    cy.login();
    cy.visit(Cypress.env('InboxPage'));
    cy.getFirstMsg().as('firstMsg');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('cheks if link redirects to valid recruiters page', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media > .media-body > .recruiter-name > a')
        .click()
        .then(() => {
          const urlPattern = (/^https:\/\/djinni\.co\/r\/\d+[-\w+]+\/?$/)
          cy.url().then((chainer) => {
            expect(chainer).to.match(urlPattern);
          });
        });
    });
  })

  it('checks that recruiters name exists', () => {
    cy.get('h1').should('exist');
  })

  it('checks that position exists and leads to the company page', () => {
    const urlPattern = (/\/jobs\/company.+/);
    cy.get('.recruiter-headline-lg').should('not.be.empty')
      .find('a').should('has.attr', 'href')
      .and('match', urlPattern);
  })







  it('checks picture exists and not empty', () => {
    cy.get('.page-header-userpic').within(() => {
      cy.checkPictureNotEmpty();
    });
  })

})
