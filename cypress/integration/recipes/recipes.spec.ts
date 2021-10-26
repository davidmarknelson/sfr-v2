import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { getHarness } from '@jscutlery/cypress-harness';
import { aliasQuery } from '../../utils';

describe('Recipes page', () => {
  before(() => {
    cy.deleteAllRecipes();
  });

  beforeEach(() => {
    cy.visit('http://localhost:4200/recipes');
  });

  afterEach(() => {
    cy.deleteAllRecipes();
  });

  describe('no recipes', () => {
    it('should show a message when there are no recipes', () => {
      cy.get('sfr-page-title').should(($title) =>
        expect($title.text().trim()).equal('Browse Recipes')
      );
      cy.get('sfr-announcement').should(($announcement) =>
        expect($announcement.text().trim()).equal('No recipes to show')
      );
    });
  });

  describe('recipes', () => {
    beforeEach(() => {
      cy.addRecipes(15);
    });

    it('should show 9 recipe cards', () => {
      cy.visit('http://localhost:4200/recipes');

      const paginator = getHarness(MatPaginatorHarness);
      cy.get('sfr-recipe-card').its('length').should('eq', 9);
      paginator.getRangeLabel().should('eq', '1 – 9 of 15');
      paginator.getPageSize().should('eq', 9);
    });

    it('should show 6 recipe cards on the second page with a page query param', () => {
      cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
        aliasQuery(req, 'recipesAndCount', { skip: 9, take: 9 });
      });
      cy.visit('http://localhost:4200/recipes');

      const paginator = getHarness(MatPaginatorHarness);
      paginator.goToNextPage().then(() => {
        cy.wait('@gqlrecipesAndCountQuery');
      });

      paginator.getRangeLabel().should('eq', '10 – 15 of 15');
      cy.url().should('eq', 'http://localhost:4200/recipes?page=2');
      cy.get('sfr-recipe-card').its('length').should('eq', 6);
    });

    it('should show 9 recipe cards on the first page after visiting the first page', () => {
      cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
        aliasQuery(req, 'recipesAndCount', { skip: 0, take: 9 });
      });
      cy.visit('http://localhost:4200/recipes?page=2');

      const paginator = getHarness(MatPaginatorHarness);
      paginator.getRangeLabel().should('eq', '10 – 15 of 15');
      paginator.goToFirstPage().then(() => {
        cy.wait('@gqlrecipesAndCountQuery');
      });
      cy.url().should('eq', 'http://localhost:4200/recipes?page=1');
      cy.get('sfr-recipe-card').its('length').should('eq', 9);
    });
  });
});
