///<reference types="Cypress"/>

const baseUrl = "https://swapi.dev/api/";
Cypress.config('baseUrl','https://swapi.dev/api')
describe('Testing API of swapi website', () => {
    it('Root', () => {
        cy.request('/')
            .should((response) => {
                expect(response.status).to.eq(200)
                cy.log(response.body);
                expect(response).property('body').to.contain({
                    starships: "https://swapi.dev/api/starships/",
                    vehicles: "https://swapi.dev/api/vehicles/"
                })
            })
    })
    it('People', () => {
        cy.request("/people/1/")
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.contain({
                    name: "Luke Skywalker",
                    mass: "77"
                })
            })
    })
    it('Films', () => {
        cy.intercept('GET',baseUrl+"/films/1/", (req) => {
            expect(req.body).to.include('')
            req.continue((res) => {
                expect(res.statusCode).to.eq(200)
                expect(res.body).to.include('A New Hope')
            })
        }).as('getFilms')
        cy.visit(baseUrl+'films/1/')
        cy.wait('@getFilms')
        cy.request( "/films/1/")
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.contain({
                    producer: "Gary Kurtz, Rick McCallum",
                    title: "A New Hope",
                    episode_id: 4
                })
            })
    })
    it('Starship', () => {
        cy.request('/starships')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.contain({
                    count: 36,
                })
                expect(response.body).to.have.property('results')
                console.log(response)
            })
    })
})