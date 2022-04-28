///<reference types="Cypress"/>
describe('Alias', () => {
    it('clock function', () => {
        cy.visit('https://a.testaddressbook.com')
        cy.get('#sign -in').click()
        cy.get('#session_email').type('test12345@wp.pl')
        cy.get('#session_password').type('12345678')
        cy.get('[data-test="sign-up"]').click()
        cy.get('h4').should('contain', 'Hello World!')
    })

})