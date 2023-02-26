describe("log in", () => {
  it("user can log in", () => {
    cy.visit("/");

    cy.findByRole("link", {
      name: /sign in/i,
    }).click();

    cy.findByRole("textbox", {
      name: /email address/i,
    }).type("foo@bar.com");

    cy.get("#password").type("123123");

    cy.findByRole("button", {
      name: /login/i,
    }).click();
  });
});
