import { recipeNameConstants } from '../utils';

Cypress.Commands.add('addRecipes', (multipliedBy: number = 1) => {
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
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
Cypress.Commands.add(
  'addRecipe',
  (recipeName: string = recipeNameConstants.eggMuffin) => {
    cy.fixture('../fixtures/recipes').then((recipes) => {
      const recipe = recipes.find((recipe) => recipe.name === recipeName);
      cy.request({
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
  }
);
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
Cypress.Commands.add('loginUser', () => {
  cy.fixture('../fixtures/user').then((user) => {
    cy.request('post', 'http://localhost:3000/graphql', {
      query: `query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
        }
      }`,
      variables: {
        email: user.email,
        password: user.password,
      },
    }).then(($request) => {
      localStorage.setItem('accessToken', $request.body.data.login.accessToken);
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
