import '@jscutlery/cypress-harness/support';
import 'cypress-axe';
import 'cypress-file-upload';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      addRecipes(multipliedBy?: number): Chainable<any>;
      addRecipe(recipeName?: string): Chainable<any>;
      createUser(): Chainable<any>;
      loginUser(): Chainable<any>;
      resetDatabase(): Chainable<any>;
    }
  }
}
