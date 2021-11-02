import '@jscutlery/cypress-harness/support';
import 'cypress-axe';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      deleteAllRecipes(): Chainable<any>;
      addRecipes(multipliedBy?: number): Chainable<any>;
      addRecipe(recipeName?: string): Chainable<any>;
    }
  }
}
