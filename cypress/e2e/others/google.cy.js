/// <reference types="Cypress" />

describe('Cy google się uruchamia', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('google'))
        cy.get('#L2AGLb').click()
    })
    it('should open google.com', () => {
        cy.get('.gLFyf').type('luczniczQA{Enter}');
        cy.get('[href="https://pl-pl.facebook.com/LuczniczQA/"] > .LC20lb')
            .contains('bydgoska społeczność testerska')
    })
    it("login", () => {
        cy.get('[name="q"]').type('lol').clear().should('not.contain', 'lol')
        cy.get('.lnXdpd').click();

    })
})