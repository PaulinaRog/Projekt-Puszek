describe("App successful start", () => {
  beforeEach("should visit", () => {
    cy.viewport(1400, 800);
    cy.visit("http://127.0.0.1:5173/");
  });
  it("should navigate to careApp after click", () => {
    cy.get('[data-cy="button-care-app"]').click();
    cy.url().should("eq", "http://127.0.0.1:5173/care/sitters");
  });
  it("should download data from server - care app", () => {
    cy.request("http://127.0.0.1:5173/care/sitters").should((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("should navigate to articles after click", () => {
    cy.get('[data-cy="button-articles"]').click();
    cy.url().should("eq", "http://127.0.0.1:5173/articles");
  });
  it("should get data from server - articles", () => {
    cy.request("http://127.0.0.1:5173/care/sitters").should((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("should navigate to contact form after click", () => {
    cy.get('[data-cy="button-contact-form"]').click();
    cy.url().should("eq", "http://127.0.0.1:5173/contact");
  });
  it("should navigate to sign in and sign up site after click", () => {
    cy.get('[data-cy="button-signin"]').click();
    cy.url().should("eq", "http://127.0.0.1:5173/signup");
  });
  it("should submit data when clicked - signin form", () => {
    it("should submit form when clicked", () => {
      cy.visit("http://127.0.0.1:5173/contact");
    });
  });
  it("shuld type in email and password, then submit and log in ", () => {
    cy.visit("http://127.0.0.1:5173/signup");
    cy.get("[data-cy='input-email']").type("user@user.pl");
    cy.get("[data-cy='input-password']").type("1234Qwerty");
    cy.get("[data-cy='submit-button']").click();
    cy.request("http://127.0.0.1:5173/signup").should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
