describe("Logging In - Basic Auth", function () {
  // we can use these values to log in
  const username = "standard_user";
  const password = "secret_sauce";
  const url = "https://www.saucedemo.com/?/inventory.html";

  context("cy.request", () => {
    // https://on.cypress.io/request

    it("without authorization gets 401", () => {
      cy.request({
        url: url,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 200);
    });

    it("with authorization", () => {
      cy.request({
        url: url,
        auth: {
          username,
          password,
        },
      })
        .its("status")
        .should("equal", 200);
    });
    it("send a message", () => {
      cy.request(
        'POST',
       'https://automationintesting.online/message/', 
       {
          name: '12345678901234',
          email: 'email@domain.com',
          phone: '792159500123456',
          subject: 'aasda',
          description: '12345678901234567890',
        }).then((response) => {
          expect(response.status).to.eq(201);
      });
    });
  });
  context("cy.visit", () => {
    // https://on.cypress.io/visit

    it("loads the page using basic auth", () => {
      cy.visit(url, {
        auth: {
          username,
          password,
        },
      });

      // confirm that all static resources have loaded
    });
  });
});
