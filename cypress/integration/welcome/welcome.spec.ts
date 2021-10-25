describe('Welcome page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/welcome');
  });

  it('should link to the recipes page in the page', () => {
    cy.get('.cta a').first().click();
    cy.url().should('eq', 'http://localhost:4200/recipes');
  });
});
