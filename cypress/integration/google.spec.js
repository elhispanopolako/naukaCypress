/// <reference types="Cypress" />

describe('Cy google się uruchamia', () => {
    it('should open google.com', () => {
        cy.visit('www.google.com')
        cy.get('#L2AGLb > .QS5gu').click();
        cy.get('.gLFyf').type('luczniczQA{Enter}');
        cy.get('[href="https://pl-pl.facebook.com/LuczniczQA/"] > .LC20lb')
            .contains('bydgoska społeczność testerska')

    })
})