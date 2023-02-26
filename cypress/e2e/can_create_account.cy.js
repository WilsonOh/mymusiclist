describe("create account", () => {
  it("user can create an account", () => {
    cy.visit("/");

    cy.findByRole("link", {
      name: /sign up/i,
    }).click();

    cy.findByRole("textbox", {
      name: /first name/i,
    }).type("Bob");

    cy.findByRole("textbox", {
      name: /last name/i,
    }).type("Jang");

    cy.findByRole("textbox", {
      name: /email address/i,
    }).type("foo@bar.com");

    cy.get("#password").type("123123");

    cy.findByLabelText(/confirm password\*/i).type("123123");

    cy.findByRole("button", {
      name: /sign up/i,
    }).click();

    // sign out
    cy.get("#signout").click();
  });
});
