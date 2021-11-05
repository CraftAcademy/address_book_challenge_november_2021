describe("User visiting the application url", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        // let addressBook = new AddressBook()
        // addressBook.create({"name": "Thomas"})
        window.localStorage.setItem('entries', '[{"name": "Thomas"}]')
      }
    })
  });
  it("is expected to see a header", () => {
    cy.get("h1").should("contain.text", "Address Book");
  });

  it('is expected to see a form', () => {
    cy.get('[data-cy=address_form]').should('exist')//.and('be.displayed')
  });

  it('is expected to see an address list', () => {
    cy.get('[data-cy=address_list]').should('exist')//.and('be.displayed')
  });
});
