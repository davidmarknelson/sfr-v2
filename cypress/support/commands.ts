Cypress.Commands.add('addRecipes', (multipliedBy: number = 1) => {
  cy.createUser().then(($user) => {
    return cy.fixture('../fixtures/recipes').then((recipes) => {
      let updatedRecipes: any[] = [];
      for (let i = 0; i < multipliedBy; i++) {
        updatedRecipes = [
          ...updatedRecipes,
          ...recipes.map((recipe) => {
            return {
              ...recipe,
              name: `${i} ${recipe.name}`,
            };
          }),
        ];
      }
      cy.request({
        headers: {
          authorization: `Bearer ${$user.body.data.signup.accessToken}`,
        },
        method: 'post',
        url: 'http://localhost:3000/graphql',
        body: {
          query: `mutation testingCreateRecipes($recipes: [RecipeInput!]!) {
                testingCreateRecipes(recipes: $recipes) {
                  message
                }
              }`,
          variables: {
            recipes: updatedRecipes,
          },
        },
      });
    });
  });
});
Cypress.Commands.add('addRecipe', (recipeName: string = 'Egg muffin') => {
  cy.createUser().then(($user) => {
    cy.fixture('../fixtures/recipes').then((recipes) => {
      const recipe = recipes.find((recipe) => recipe.name === recipeName);
      cy.request({
        headers: {
          authorization: `Bearer ${$user.body.data.signup.accessToken}`,
        },
        method: 'post',
        url: 'http://localhost:3000/graphql',
        body: {
          query: `mutation createRecipe($recipe:RecipeInput!) {
              createRecipe(recipe:$recipe) {
                cookTime
                description
                difficulty
                id
                ingredients
                instructions
                name
                photos {
                  id
                  path
                }
              }
            }`,
          variables: {
            recipe,
          },
        },
      });
    });
  });
});
Cypress.Commands.add('createUser', () => {
  cy.fixture('../fixtures/user').then((user) => {
    cy.request('post', 'http://localhost:3000/graphql', {
      query: `mutation signup($user: UserInput!) {
        signup(user: $user) {
          accessToken
        }
      }`,
      variables: {
        user,
      },
    });
  });
});
Cypress.Commands.add('resetDatabase', () => {
  cy.request('post', 'http://localhost:3000/graphql', {
    query: `mutation testingResetDatabase {
      testingResetDatabase {
          message
        }
      }`,
  });
});
