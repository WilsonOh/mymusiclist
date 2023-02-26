describe("search music", () => {
  it("user can search for music", () => {
    cy.visit("/");

    cy.get("#input").type("enemy");

    cy.findByRole("button", {
      name: /search/i,
    }).click();

    cy.findByRole("heading", {
      // eslint-disable-next-line no-useless-escape
      name: /enemy \(with jid\) \- from the series arcane league of legends/i,
    }).should("exist");

    cy.findByRole("button", {
      name: /add to list/i,
    }).click();

    cy.findByRole("link", {
      name: /mylist/i,
    }).click();

    cy.contains(
      "Enemy (with JID) - from the series Arcane League of Legends"
    ).should("exist");
  });
});
