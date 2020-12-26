
Cypress.Commands.add('noUiLogin', () => {
  cy.request('GET', Cypress.config('urls').LoginPage)
    .its('body')
    .then(body => {
      const html = Cypress.$(body)
      const inputCsrf = html.find('input[name=csrfmiddlewaretoken]').val()
      cy.request({
        url: 'https://djinni.co/login?from=frontpage_main',
        method: 'POST',
        form: true,
        headers: {
          'X-CSRFToken': inputCsrf,
          referer: 'https://djinni.co/login'
        },
        body: {
          email: '',
          password: '',
          csrfmiddlewaretoken: inputCsrf
        }
      });
    });
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
      expect(expStatuses).to.include(response.status);
      expect(response.allRequestResponses[0]['Request URL']).to.match(pattern);
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


Cypress.Commands.add('validateUserPageFields', (blockDiv, expecFieldNames) => {
  cy.wrap(blockDiv)
    .children('div[class="form-group"]')
    .each((fieldDiv, idx) => {
      cy.wrap(fieldDiv)
        .contains(expecFieldNames[idx], { matchCase: false })
        .should('exist');
    });
})
