describe("User visiting the application url", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.localStorage.setItem('entries', '[{"name": "Thomas", "phone": "031-121212", "twitter": "@thomasochman"}, {"name": "Barack", "phone": "+1 202-121212", "twitter": "@barackobama"}]')
      }
    })
    cy.get('[data-cy=address_list] ul').as('displayList')
    cy.get('[data-cy=address_form]').as('addressForm')
  });
  it("is expected to see a header", () => {
    cy.get("h1").should("contain.text", "Address Book");
  });

  it('is expected to see a form', () => {
    cy.get('@addressForm').should('exist')//.and('be.visible')
  });

  it('is expected to see an address list', () => {
    cy.get('@displayList').should('exist').and('be.visible')
  });

  it('is expected to display 2 entries', () => {
    cy.get('@displayList').children().should('have.length', 2)
  });
});
