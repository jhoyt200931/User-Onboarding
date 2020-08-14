describe('Testing my form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    it('Adding Tests', () => {
        cy.get("[data-cy=name]").type("John").should("have.value", "John");
        cy.get("[data-cy=email]").type("john@mail.com").should("have.value", "john@mail.com");
        cy.get("[data-cy=password]").type("Batman934521").should("have.value", "Batman934521");
        cy.get("[data-cy=teams]").select("Houston Rockets").should("have.value", "Houston Rockets");
        cy.get("[data-cy=terms]").click().click().should("be.checked");
        cy.get("[data-cy=submit]").click();
    })
})