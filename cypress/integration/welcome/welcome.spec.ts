describe('Welcome page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/welcome');
  });

  it('should link to the recipes page in the page in the first main button', () => {
    cy.get('.cta a').first().click();
    cy.url().should('eq', 'http://localhost:4200/recipes');
  });

  it('should link to the recipes page in the page in the last main button', () => {
    cy.get('.cta a').last().click();
    cy.url().should('eq', 'http://localhost:4200/recipes');
  });
});
