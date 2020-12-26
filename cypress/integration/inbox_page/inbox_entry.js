describe('[Inbox page] Test first inbox entry', () => {
  before(() => {
    cy.noUiLogin();
    cy.visit(Cypress.config('urls').InboxPage);
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
    cy.getFirstMsg().as('firstMsg');
  })

  it('checks if picture exists and not empty', () => {
    cy.get('@firstMsg')
      .find('.media > .media-left')
      .within(() => {
        cy.checkPictureNotEmpty();

    });
  })

  it('checks if info block exists and not empty', () => {
    cy.get('@firstMsg')
      .find('.media-body > span')
      .each(el => {
        expect(el).not.to.be.empty;

    });
  })

  it('checks if message block exists and not empty', () => {
    cy.get('@firstMsg')
      .within(() => {
      cy.get('.col-sm-6 > .message-text > a')
        .then(el => {
          expect(el).not.to.be.empty;
      });
    });
  })
})


describe('[Inbox page] Test first inbox entry dropdown menu', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
    cy.getFirstMsg()
      .within(() => {
      cy.get('.col-sm-2 > .message-btn-wrapper > .btn-group')
        .as('btn-group');
    });
  })

  after(() => {
    cy.clearCookies();
  })

  it('checks if dropdown is visible', () => {
    cy.get('@btn-group').find('.btn').click();
    cy.get('@btn-group').find('ul').should('be.visible');
  })

  it('checks if dropdown has 3 buttons and divider', () => {
    cy.get('@btn-group')
      .children('ul')
      .find('li')
      .each((li, idx, liArr) => {
        expect(liArr).to.have.length(4);
      });
  })

  it('checks if dropdown buttons has links', () => {
    const urlPatern = (/\/my\/.+/)
    cy.get('@btn-group')
      .children('ul')
      .within(() => {
        cy.get('.divider')
          .siblings()
          .each(el => {
            cy.wrap(el).find('a')
              .should('has.attr', 'href')
              .and('match', urlPatern)
          });
      });
  })
})