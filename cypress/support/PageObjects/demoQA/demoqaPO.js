/// <reference types="cypress" />
import { practiceForm } from "./demoqaSelectors"
class demoqaPO {

    setPersonalData(name, surname, email) {
        cy.get(practiceForm.name).type(name);
        cy.get(practiceForm.lastname).type(surname);
        cy.get(practiceForm.email).type(email);
    }
    setGender(gender) {
        if (gender == 'random') {
            var random = Math.floor(Math.random() * 3);
            cy.get(practiceForm.gender).eq(random).click({ force: true });
        } else if (gender == 'Male') {
            cy.get(practiceForm.gender).eq(0).click({ force: true });
        } else if (gender == 'Female') {
            cy.get(practiceForm.gender).eq(1).click({ force: true });
        } else {
            cy.get(practiceForm.gender).eq(2).click({ force: true });
        }
    }
    setPhone(phone) {
        cy.get(practiceForm.phone).type(phone);
    }
    setBirthDay(year, month, day) {
        cy.get(practiceForm.birthdayInput).click();
        cy.get(practiceForm.yearInput).select(year);
        cy.get(practiceForm.monthInput).select(month);
        cy.get(practiceForm.dayInput + day).click();
        cy.get(practiceForm.birthdayInput).should('have.value', day + ' Apr ' + year);
    }
    setSubject(subject) {
        cy.get(practiceForm.subject).type(subject + '{enter}')
            .should('contain', subject);
    }
    setHobbies(hobbies) {
        if (hobbies == 'random') {
            var random = Math.floor(Math.random() * 3);
            cy.get(practiceForm.checkbox).eq(random).click({ force: true });
        } else if (hobbies == 'all') {
            cy.get(practiceForm.checkbox).each((element) => {
                cy.get(element).click({ force: true })
            })
        } else if (hobbies == 'Sports' || hobbies == 'Reading' || hobbies == 'Music') {
            cy.get(practiceForm.label).contains(hobbies).click({ force: true })
        }

    }
    attachFile(file) {
        cy.get(practiceForm.uploader).attachFile(file)
    }
    typeCurrentAddress(address) {
        cy.get(practiceForm.address).type(address, { delay: 0 });

    }
} export default demoqaPO;
