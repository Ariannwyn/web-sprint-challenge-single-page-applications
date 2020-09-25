describe("Testing form inputs", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    });
    it("adding text to inputs and submiting form", () => {
        cy.get('[data-cy="name"]')
          .type("Emily")
          .should("have.value", "Emily");
        cy.get('[data-cy="size"]')
          .select("Medium")
          .should("have.value", "Medium");
        cy.get('[data-cy="noPineapple"]')
          .check()
          .should("be.checked");
        cy.get('[data-cy="ham"]')
          .check()
          .should("be.checked");
        cy.get('[data-cy="submit"]')
          .click();
    });
});