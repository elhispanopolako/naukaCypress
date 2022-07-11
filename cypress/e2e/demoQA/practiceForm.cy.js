///<reference types="Cypress"/>

const { default: demoqaPO } = require("../../support/PageObjects/demoqa/demoqaPO");

const url = "/automation-practice-form";
const page=new demoqaPO;
let data;
describe('Testing a practice form', () => {
    before(() => {
        cy.fixture('credentials').then((fData) => {
            data = fData;
        });
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
    it('should refill a form with PO',()=>{
        page.setPersonalData(data.user.name,data.user.surname,data.user.email)
        page.setGender('random')
        page.setPhone(data.user.phone)
        page.setBirthDay()
        page.setSubject(data.user.subject)
        page.setHobbies('all')
        page.attachFile('Sports.jpg')
        page.typeCurrentAddress(data.user.address)
    })
})
})