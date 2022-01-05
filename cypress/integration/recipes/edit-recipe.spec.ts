import { recipeNameConstants } from '../../utils';

describe('Edit recipe page', () => {
  before(() => {
    cy.resetDatabase();
    cy.createUser();
    cy.loginUser();
    cy.addRecipe(recipeNameConstants.eggMuffin);
    cy.addRecipe(recipeNameConstants.morningGloryMuffins);
    cy.visit('http://localhost:4200/recipes/Egg-muffin/edit');
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('should pass an accessibility check', () => {
    cy.injectAxe();
    cy.get('h1');
    cy.checkA11y();
  });

  describe('Name', () => {
    it('should load with the data filling the input', () => {
      cy.get('[formcontrolname="name"]')
        .invoke('val')
        .should('contain', 'Egg muffin');
    });
  });

  describe('submit', () => {
    it('should successfully submit and route to the recipe page', () => {
      cy.get('[formcontrolname="name"]').clear().type('some recipe');
      cy.get('[type="submit"]').click();
      cy.url().should('equal', 'http://localhost:4200/recipes/some-recipe');
      cy.get('h1').should('contain.text', 'some recipe');
    });

    it('should show an error if you use a duplicate name', () => {
      cy.loginUser();
      cy.visit('http://localhost:4200/recipes/some-recipe/edit');
      cy.get('[formcontrolname="name"]')
        .clear()
        .type(recipeNameConstants.morningGloryMuffins);
      cy.get('[type="submit"]').click();
      cy.url().should(
        'equal',
        'http://localhost:4200/recipes/some-recipe/edit'
      );
      cy.get('sfr-announcement').should(
        'contain.text',
        'A recipe with that name already exists'
      );
    });
  });
});
