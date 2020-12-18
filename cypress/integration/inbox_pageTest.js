describe('Inbox page tests', () => {
    before(() => {
        cy.login()
    })
    it('says hello', () => {
        cy.log('hello!')
    })
})