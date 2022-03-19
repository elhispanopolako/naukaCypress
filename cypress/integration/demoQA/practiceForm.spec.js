///<reference types="Cypress"/>
const url = "https://demoqa.com/automation-practice-form";
describe('Testing a practice form', () => {
    beforeEach('Open the browser', () => {
        cy.visit(url)
    })
    it('should refill all form', () => {
        cy.get('#firstName').type('Alex');
        cy.get('#lastName').type('Nowak');
        cy.get('#userEmail').type('name@example.com');
        cy.get('[name = "gender"]').eq(0).click({ force: true });
        cy.get('#userNumber').type('6666666666');
        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__year-select').select('1998');
        cy.get('.react-datepicker__month-select').select('April');
        cy.get('.react-datepicker__day--022').click();
        cy.get('#dateOfBirthInput').should('have.value', '22 Apr 1998');
        cy.get('.subjects-auto-complete__value-container').type('Maths{enter}')
            .should('contain', 'Maths');
        cy.get('#hobbies-checkbox-1').click({ force: true });
        cy.get('#hobbies-checkbox-2').click({ force: true });
        cy.get('#hobbies-checkbox-3').click({ force: true });
        cy.get('#uploadPicture').attachFile('Sports.jpg');
        cy.get('#currentAddress').type('Polska Poznań');
    })
})