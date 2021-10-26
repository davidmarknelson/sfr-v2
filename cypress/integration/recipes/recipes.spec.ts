describe('Recipes page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/recipes');
  });

  afterEach(() => {
    cy.request('post', 'http://localhost:3000/graphql', {
      query: `mutation deleteAllRecipe {
        deleteAllRecipes {
          message
        }
      }`,
    });
  });

  describe('no recipes', () => {
    it('should show a message when there are no recipes', () => {
      cy.request('post', 'http://localhost:3000/graphql', {
        query: `mutation deleteAllRecipe {
          deleteAllRecipes {
            message
          }
        }`,
      });
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
      cy.request('post', 'http://localhost:3000/graphql', {
        query: `mutation addRecipes($numberOfRecipes: Int) {
          addRecipes(numberOfRecipes: $numberOfRecipes) {
            message
          }
        }`,
        variables: {
          numberOfRecipes: 3,
        },
      });
    });

    it('should show recipe cards', () => {
      cy.visit('http://localhost:4200/recipes');
      cy.get('sfr-recipe-card').its('length').should('eq', 3);
    });
  });
});
