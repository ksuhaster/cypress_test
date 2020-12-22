describe('[User profile page] Tests user profile navbar and iputs count', () => {
  before(() => {
    cy.login();
    cy.visit(Cypress.env('UserProfilePage'));
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('validates H1 title', () => {
    cy.get('h1').then(h1 => {
      expect(h1[0]['innerText']).to.be.eq('Мій акаунт')
    })
  })

  it('validate navbar links', () => {
    const expectedUrls = Cypress.env('UserProfileNavLinks');
    cy.get('.page-header > .nav').then(ul => {
      cy.validateNavElments(ul, expectedUrls);
    });
  })

  it('validate "Оновити профіль" button exists with "submit" type attr', () => {
    cy.get(':nth-child(3) > .col-sm-10')
      .find('.btn')
      .should('have.attr', 'type', 'submit');
  })

  it('validate that all input fields exists in expected amount', () => {
    const expCount = [3, 6, 5, 4, 1, 1, 1];
    const expFields = [
      'textarea',
      'input[type="radio"]',
      'input[type="checkbox"]',
      'input[type="text"]',
      'input[type="number"]',
      'input[class="experience-slider-input"]',
      'input[name="csrfmiddlewaretoken"]',
    ];

    cy.wrap(expFields).each((inputType, idx) => {
      cy.get('.js-profile-form')
        .find(inputType)
        .should('have.length', expCount[idx]);
    });
  })
})


describe('[User profile page] Tests input names', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  after(() => {
    cy.clearCookies();
  })

  it('validate first block names, from "Посада" to "Навички"', () => {
    const expectedFieldNames = [
      'Посада',
      'Зарплатні очікування',
      'Досвід роботи',
      'Місто',
      'Навички'
    ];
    cy.get(':nth-child(1) > .col-sm-10').then(div => {
      cy.validateUserPageFields(div, expectedFieldNames);
    });
  })

  it('validate first block names, from "Категорія" to "Досягнення"', () => {
    const expectedFieldNames = [
      'Категорія',
      'Рівень англійської',
      'Варіанти зайнятості',
      'Досвід роботи',
      'Очікування',
      'Досягнення'
    ];
    cy.get(':nth-child(2) > .col-sm-10 > #extraquestions').then(div => {
      cy.validateUserPageFields(div, expectedFieldNames);
    });
  })

})
