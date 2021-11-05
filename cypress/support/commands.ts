Cypress.Commands.add('deleteAllRecipes', () => {
  cy.request('post', 'http://localhost:3000/graphql', {
    query: `query recipesAndCount($skip: Float!, $take: Float!) {
      recipesAndCount(skip: $skip, take: $take) {
        recipes {
          id
        }
      }
    }
    `,
    variables: {
      skip: 0,
      take: 50,
    },
  }).then(($res) => {
    $res.body.data.recipesAndCount.recipes?.forEach((recipe) => {
      cy.request('post', 'http://localhost:3000/graphql', {
        query: `mutation deleteRecipe($id:Float!) {
          deleteRecipe(id:$id) {
            message
          }
        }`,
        variables: {
          id: recipe.id,
        },
      });
    });
  });
});
Cypress.Commands.add('addRecipes', (multipliedBy: number = 1) => {
  cy.fixture('../fixtures/recipes').then((recipes) => {
    for (let i = 0; i < multipliedBy; i++) {
      recipes.forEach((recipe) => {
        cy.request('post', 'http://localhost:3000/graphql', {
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
            recipe: {
              ...recipe,
              name: `${i} ${recipe.name}`,
              photos: i === 0 ? recipe.photos : [],
            },
          },
        });
      });
    }
  });
});
Cypress.Commands.add('addRecipe', (recipeName: string = 'Egg muffin') => {
  cy.fixture('../fixtures/recipes').then((recipes) => {
    const recipe = recipes.find((recipe) => recipe.name === recipeName);
    cy.request('post', 'http://localhost:3000/graphql', {
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
    });
  });
});
