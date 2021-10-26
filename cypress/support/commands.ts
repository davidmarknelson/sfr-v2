Cypress.Commands.add('deleteAllRecipes', () => {
  cy.request('post', 'http://localhost:3000/graphql', {
    query: `mutation deleteAllRecipe {
        deleteAllRecipes {
          message
        }
      }`,
  });
});
Cypress.Commands.add('addRecipes', (numberOfRecipes: number = 1) => {
  cy.request('post', 'http://localhost:3000/graphql', {
    query: `mutation addRecipes($numberOfRecipes: Int) {
      addRecipes(numberOfRecipes: $numberOfRecipes) {
        message
      }
    }`,
    variables: {
      numberOfRecipes,
    },
  });
});
