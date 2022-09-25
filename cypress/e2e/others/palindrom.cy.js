///<reference types="Cypress"/>
const url = Cypress.env('palindromUrl');
const typePalindrom = (text) => {
    cy
        .get('#input')
        .clear()
        .type(text);
    cy
        .get('button')
        .click();
}
const shouldPass = (decision = true) => {
    if (decision) {
        cy
            .get('#output')
            .should('contain', 'Tak');
    } else {
        cy
            .get('#output')
            .should('contain', 'Nie');
    }
}
const assertWords = (word, backwards) => {
    cy.get('#output > :nth-child(1)').should('have.text', word)
    cy.get('#output > :nth-child(2)').should('have.text', backwards)
}



describe('Testujemy palindrom 2000', () => {

    context('uruchomienie strony', () => {
        it('should open the page', () => {
            cy.visit(url);
        })
        it('should contain default heading and description', () => {
            cy.get('h3').should('have.text', 'Palindrom 2000')
            cy.get('p').should('contain', 'This awesome script')
        })
    })

    context('testy', () => {
        beforeEach(() => {
            cy
                .get('#input')
                .clear();
        })
        it('kayak :: ok', () => {
            typePalindrom('kayak')

            cy
                .get('#output')
                .should('contain', 'Tak');

        })
        it('something :: nope', () => {
            typePalindrom('something')

            cy
                .get('#output')
                .should('contain', 'Nie');

        })
        it('Kayak :: nope', () => {
            typePalindrom('Kayak')

            cy
                .get('#output')
                .should('contain', 'Tak');

        })
    })
    const words = [
        { word: 'kayak', back: 'kayak', shouldPass: true },
        { word: 'something', back: 'gnihtemos', shouldPass: false },
        { word: 'Kayak', back: 'kayaK', shouldPass: true }
    ]
    context('test2', () => {
        words.map(item => {
            it(`should pass with word: "${item.word}"`, () => {
                typePalindrom(item.word)
                shouldPass(item.shouldPass)
                assertWords(item.word, item.back)
            })
        })

    })

})

