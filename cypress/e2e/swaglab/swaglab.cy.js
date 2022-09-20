///<reference types="Cypress"/>

import swagLabsPO from "../../support/PageObjects/swaglabPO"

const url = Cypress.env("saucedemo");
const page = new swagLabsPO

describe('testujemy aplikacjie SwagLabs', () => {

})
context('Login tests', () => {
    beforeEach('Website launch', () => {
        cy.visit(url);
    })
    it('correct login', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain', 'Products');
    })
    it('should not login with bad password', () => {
        page.login('locked_out_user', 'secret_sauce')
        cy.get('[data-test="error"]').should('be.visible');
    })
})
context('Order tests', () => {
    beforeEach('Website launch and login', () => {
        cy.visit(url)
        page.login('standard_user', 'secret_sauce')
    })
    it('should add products to shopping cart', () => {
        page.addProduct(0)
        cy.get('.shopping_cart_badge').should('contain', '1')
    })
    it('should remove add product', () => {
        page.addProduct(1)
        cy.get('.shopping_cart_link').click();
        page.removeProduct(0)
        cy.get('.cart_item button').should('not.exist')

    })
    it('should order product', () => {
        page.addProduct(2)
        page.addProduct(3)
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        page.checkoutForm('Alex', 'Testowy', '39-340')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    })
    it('should add 3 products and order 2', () => {
        cy.get('select').select('lohi')
        for (var i = 0; i < 3; i++) {
            page.addProduct(i)
        }
        cy.get('.shopping_cart_link').click()
        page.removeProduct(0)
        cy.get('[data-test="checkout"]').click()
        page.checkoutForm('Alex', 'Testowy', '39-340')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');

    })
    it('should order the most expensive product', () => {
        cy.get('select').select('hilo')
        page.addProduct(0)
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        page.checkoutForm('Alex', 'Testowy', '39-340')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    })
})

context('Extra tests', () => {
    beforeEach('Website launch and login', () => {
        cy.visit(url)
        page.login('standard_user', 'secret_sauce')

    })
    it('should add product from product page', () => {
        cy.get('select').select('za')
        cy.get('.inventory_item_name').eq(0).click()
        cy.get('.inventory_details_desc_container button').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').should('have.length', '1');
    })
    it('should add 1 product after each sorting', () => {
        cy.get('select').select('za')
        page.addProduct(0)
        cy.get('select').select('lohi')
        page.addProduct(0)
        cy.get('select').select('hilo')
        page.addProduct(0)
        cy.get('select').select('az')
        page.addProduct(0)
        cy.get('.shopping_cart_link').click()

        cy.get('.cart_item').should('have.length', '4');
    })
    it('should order all products', () => {
        cy.get('.inventory_item button')
            .then(($el) => {
                const itemCount = Cypress.$($el).length;
                cy.log(itemCount);
            })
        for (var i = 0; i < 6; i++) {
            page.addProduct(i)
        }
        cy.get('.shopping_cart_badge').should('contain', '6')
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        page.checkoutForm('Alex', 'Testowy', '39-340')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');


    })

})
