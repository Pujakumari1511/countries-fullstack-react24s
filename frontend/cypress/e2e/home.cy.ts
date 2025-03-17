import "../support/commands";
import "@testing-library/cypress/add-commands";

describe("Countries Application", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Displays the navigation bar correctly", () => {
        //cy.findByRole("banner").should("exist");
        cy.findByRole("link", {name: "Home"}).should("exist");
        cy.findByRole("link", {name: "Countries" }).should("exist");
    });

    it('Shows a list of countries', () => {
        cy.findByRole('link', {name: "Countries" }).click();
        cy.url().should('include', '/countries');
    })

    it("shows the list of test table", () => {
        cy.findByRole('link', {name: "Test"}).click();
        cy.url().should('include', '/test');
    });

    it("More than 200 countries displayed", () => {
        cy.findByRole('link', {name: "Countries"}).click();
        cy.get('.MuiCard-root').should('have.length.greaterThan', 200);
    })
});