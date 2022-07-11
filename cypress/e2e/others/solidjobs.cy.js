///<reference types="Cypress"/>
const url = "https://solid.jobs/offers/it"
const getEmployerSection = (section) => {
    cy.get('#employer-id').click()
    cy.contains(section).click()
}
describe('Testujemy strone Solid Jobs', () => {
    context('testy wyboru sekcji', () => {
        beforeEach('Launch website', () => {
            cy.visit(url)
            cy.get('.cc-btn').click()
        })
        it('should check the employer section', () => {
            getEmployerSection('Logowanie')
            cy.get('h2').should('have.text', ' Logowanie dla pracodawcy ');
            getEmployerSection('Rejestracja')
            cy.get('h2').should('have.text', ' Rejestracja dla pracodawcy ');
            getEmployerSection('Dlaczego warto?')
            cy.get('.mt-2 > :nth-child(1) > .mt-5 > .col-12 > .btn').should('contain', 'Wypróbuj');
            getEmployerSection('Cennik')
            cy.get('h1').should('contain', 'Wybierz usługę ');
            getEmployerSection('Regulamin')
            cy.get('h1').should('contain', 'Regulamin');
            getEmployerSection('Prywatność')
            cy.get('h1').should('have.text', 'Polityka prywatności');
        })
        it('should find a junior tester with remote work', () => {
            cy.get('.d-block > :nth-child(17) > .badge').click();
            cy.get(':nth-child(5) > .d-block > :nth-child(3) > .badge').click();
            cy.get(':nth-child(7) > .d-block > :nth-child(3) > .badge').click();
            cy.get('.flex-md-row').eq(1).should('contain', 'Tester');
        })
    })


})