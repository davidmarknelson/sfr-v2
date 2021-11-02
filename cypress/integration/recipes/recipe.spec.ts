import { MatSelectionListHarness } from '@angular/material/list/testing';
import { getAllHarnesses } from '@jscutlery/cypress-harness';

describe('Recipe page', () => {
  before(() => {
    cy.deleteAllRecipes();
  });

  describe('no recipe', () => {
    it('should show a message when there are no recipes and pass an accessibility check', () => {
      cy.visit('http://localhost:4200/recipes/Egg-muffin');
      cy.injectAxe();
      cy.get('sfr-announcement').should(($announcement) =>
        expect($announcement.text().trim()).equal('No recipe found')
      );
      cy.checkA11y();
    });
  });

  describe.only('recipes', () => {
    before(() => {
      cy.addRecipe();
      cy.visit('http://localhost:4200/recipes/Egg-muffin');
    });

    it('should show the recipe and pass an accessibility check', () => {
      cy.injectAxe();
      const selectionLists = getAllHarnesses(MatSelectionListHarness);
      selectionLists.should('have.length', 2);
      selectionLists.then(($lists) => {
        $lists[0].getItems().then(($ingredients) => {
          expect($ingredients).to.have.length(4);
        });
        $lists[1].getItems().then(($instructions) => {
          expect($instructions).to.have.length(9);
        });
      });
      cy.checkA11y();
    });

    it('should cross out the ingredient and instruction when clicked on', () => {
      const selectionLists = getAllHarnesses(MatSelectionListHarness);
      selectionLists.then(($lists) => {
        $lists[0].getItems().then(($ingredients) => {
          $ingredients[0].select();
          cy.get('.mat-list-text')
            .first()
            .should(
              'have.css',
              'text-decoration',
              'line-through solid rgba(0, 0, 0, 0.87)'
            );
        });
        $lists[1].getItems().then(($instructions) => {
          $instructions[0].select();
          cy.get('.mat-list-text')
            .first()
            .should(
              'have.css',
              'text-decoration',
              'line-through solid rgba(0, 0, 0, 0.87)'
            );
        });
      });
    });
  });
});
