class swagLabsPO {
    login(username, password) {
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click();
    }
     loginApi(username, password){
         cy.request({
             url: url,
             auth: {
                 username, password
             },
         }).its('status').should('equal', 200);

    }
    addProduct(index) {
        cy.get('.inventory_item button').eq(index).click();
    }
    removeProduct(index) {
        cy.get('.cart_item button').eq(index).click();
    }
    checkoutForm(name, lastName, postalCode) {
        cy.get('#first-name').type(name)
        cy.get('#last-name').type(lastName)
        cy.get('#postal-code').type(postalCode)
        cy.get('#continue').click()
        cy.get('[data-test="finish"]').click();
    }
}
export default swagLabsPO;