Cypress.Commands.add('login', () => {
  cy.visit(Cypress.env('LoginPage'))
  cy.get('#email').type('vl.hutsal@gmail.com')
  cy.get('#password').type('easytobreakinparol{enter}')
  cy.url().should('eq', Cypress.env('InboxPage'))
})


Cypress.Commands.add('logout', () => {
  cy.visit('https://djinni.co/logout');
})


Cypress.Commands.add('getFirstMsg', () => {
  cy.get('h3').next().children('.inbox-message').first();
})


Cypress.Commands.add('validateUrlResponse', (requestUrl, expectedRespUrl) => {
  const pattern = new RegExp(expectedRespUrl);
  const expStatuses = [302, 200]
  cy.request({
    url: requestUrl,
    followRedirect: false
  })
    .then((response) => {
      expect(expStatuses).to.include(response.status)
      expect(response.allRequestResponses[0]['Request URL']).to.match(pattern)
    });
})


Cypress.Commands.add('checkPictureNotEmpty', () => {
  cy.get('user-picture[picture=""]').should('not.exist');
  cy.get('user-picture[name=""]').should('not.exist');
})


Cypress.Commands.add('validateNavElments', (Ul, expLinks) => {
  cy.wrap(Ul)
    .children('li')
    .each((li, idx) => {
      cy.wrap(li).within(() => {
        cy.get('a')
          .invoke('attr', 'href')
          .then(expUrl => {
            cy.validateUrlResponse(expUrl, expLinks[idx])
          });
      });
    });
})