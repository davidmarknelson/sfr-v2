describe('Recipes page', () => {
  before(() => {
    cy.deleteAllRecipes();
  });

  beforeEach(() => {
    cy.visit('http://localhost:4200/recipes');
  });

  afterEach(() => {
    cy.deleteAllRecipes();
  });

  describe('no recipes', () => {
    it('should show a message when there are no recipes', () => {
      cy.get('sfr-page-title').should(($title) =>
        expect($title.text().trim()).equal('Browse Recipes')
      );
      cy.get('sfr-announcement').should(($announcement) =>
        expect($announcement.text().trim()).equal('No recipes to show')
      );
    });
  });

  describe('recipes', () => {
    beforeEach(() => {
      cy.addRecipes(3);
    });

    it('should show recipe cards', () => {
      cy.visit('http://localhost:4200/recipes');
      cy.get('sfr-recipe-card').its('length').should('eq', 3);
    });
  });
});
