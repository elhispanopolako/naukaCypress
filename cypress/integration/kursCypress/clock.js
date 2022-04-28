///<reference types="Cypress"/>
describe('Clock function', () => {
    it('clock function', () => {
        cy.clock()
        cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1')
        cy.get('#start button').click()
        cy.tick(12000)
        cy.get('h4').should('contain', 'Hello World!')
    })

})