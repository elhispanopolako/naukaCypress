describe("Google test", () => {
   
    it("login", () => {
        cy.visit('https://www.google.com')
        cy.get('#L2AGLb').click()
        cy.get('[name="q"]').type('lol').clear().should('not.contain','lol')
        cy.get('.lnXdpd').click();
            
    })
    


})