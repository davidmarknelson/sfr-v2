import '@jscutlery/cypress-harness/support';
import 'cypress-axe';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      deleteAllRecipes(): Chainable<any>;
      addRecipes(numberOfRecipes?: number): Chainable<any>;
    }
  }
}
