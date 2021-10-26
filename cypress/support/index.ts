import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      deleteAllRecipes(): Chainable<any>;
      addRecipes(numberOfRecipes?: number): Chainable<any>;
    }
  }
}
