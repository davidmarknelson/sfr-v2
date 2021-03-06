import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { getAllHarnesses, getHarness } from '@jscutlery/cypress-harness';
import { recipeNameConstants } from '../../utils';

describe('Create recipe page', () => {
  before(() => {
    cy.resetDatabase();
    cy.createUser();
    cy.loginUser();
    cy.visit('http://localhost:4200/create-recipe');
    cy.addRecipe(recipeNameConstants.morningGloryMuffins);
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
    it('should show an error if the name is empty', () => {
      cy.get('[formcontrolname="name"]').clear().blur();
      getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Name *' }))
        .getTextErrors()
        .should('contain', 'This field is requiredName');
    });

    it('should show an error if the name is too long', () => {
      cy.get('[formcontrolname="name"]')
        .clear()
        .type('a'.padEnd(101, 'a'))
        .blur();
      getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Name *' }))
        .getTextErrors()
        .should('contain', 'Name must not be longer than 100 characters');
    });
  });

  describe('Description', () => {
    it('should show an error if the description is empty', () => {
      cy.get('[formcontrolname="description"]').clear().blur();
      getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Description *' })
      )
        .getTextErrors()
        .should('contain', 'This field is requiredDescription');
    });

    it('should show an error if the description is too long', () => {
      cy.get('[formcontrolname="description"]')
        .clear()
        .type('a'.padEnd(513, 'a'))
        .blur();
      getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Description *' })
      )
        .getTextErrors()
        .should(
          'contain',
          'Description must not be longer than 512 characters'
        );
    });
  });

  describe('Cook time', () => {
    it('should show an error if the cookTime is empty', () => {
      cy.get('[formcontrolname="cookTime"]').clear().blur();
      getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Cook Time *' }))
        .getTextErrors()
        .should('contain', 'This field is requiredCook Time');
    });

    it('should show an error if the cookTime does not only contain numbers', () => {
      cy.get('[formcontrolname="cookTime"]').clear().type('asdf').blur();
      getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Cook Time *' }))
        .getTextErrors()
        .should('contain', 'Must contain only numbers');
    });
  });

  describe('Difficulty', () => {
    it('should show an error if the difficulty does not have a value', () => {
      const difficulty = getHarness(MatSelectHarness);
      difficulty.open();
      difficulty.close();
      getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Difficulty *' })
      )
        .getTextErrors()
        .then(($errors) => {
          expect($errors[0]).contain('This field is required');
        });
    });
  });

  describe('Ingredients', () => {
    it('should show an error if the ingredient does not have a value', () => {
      cy.get('[formarrayname="ingredients"]').find('input').clear().blur();
      const ingredientField = getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Ingredient *' })
      );
      ingredientField
        .getTextErrors()
        .should('contain', 'This field is requiredIngredient 1');
    });

    it('should have a disabled trash button when there is only one ingredient', () => {
      cy.get('[formarrayname="ingredients"]')
        .find('button')
        .last()
        .should('be.disabled');
    });

    it('should add a row and enable the trash button', () => {
      cy.get('[formarrayname="ingredients"]').find('button').first().click();
      cy.get('[formarrayname="ingredients"] input')
        .its('length')
        .should('eq', 2);
    });

    it('should initialize without an error then show an error if the ingredient does not have a value (new row)', () => {
      const ingredientFields = getAllHarnesses(
        MatFormFieldHarness.with({ floatingLabelText: 'Ingredient *' })
      );
      ingredientFields.then(async ($ingredientFields) => {
        expect(
          await $ingredientFields[$ingredientFields.length - 1].getTextErrors()
        ).to.not.contain('This field is requiredIngredient 2');
      });
      cy.get('[formarrayname="ingredients"]')
        .find('input')
        .last()
        .clear()
        .blur();
      ingredientFields.then(async ($ingredientFields) => {
        expect(
          await $ingredientFields[$ingredientFields.length - 1].getTextErrors()
        ).to.contain('This field is requiredIngredient 2');
      });
    });

    it('should delete a row', () => {
      cy.get('[formarrayname="ingredients"]').find('button').last().click();
      cy.get('[formarrayname="ingredients"] input')
        .its('length')
        .should('eq', 1);
    });
  });

  describe('Instructions', () => {
    it('should show an error if the instruction does not have a value', () => {
      cy.get('[formarrayname="instructions"]').find('input').clear().blur();
      const instructionField = getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Instruction *' })
      );
      instructionField
        .getTextErrors()
        .should('contain', 'This field is requiredInstruction 1');
    });

    it('should have a disabled trash button when there is only one instruction', () => {
      cy.get('[formarrayname="instructions"]')
        .find('button')
        .last()
        .should('be.disabled');
    });

    it('should add a row and enable the trash button', () => {
      cy.get('[formarrayname="instructions"]').find('button').first().click();
      cy.get('[formarrayname="instructions"] input')
        .its('length')
        .should('eq', 2);
    });

    it('should initialize without an error then show an error if the instruction does not have a value (new row)', () => {
      const instructionsFields = getAllHarnesses(
        MatFormFieldHarness.with({ floatingLabelText: 'Instruction *' })
      );
      instructionsFields.then(async ($instructionFields) => {
        expect(
          await $instructionFields[
            $instructionFields.length - 1
          ].getTextErrors()
        ).to.not.contain('This field is requiredInstruction 2');
      });
      cy.get('[formarrayname="instructions"]')
        .find('input')
        .last()
        .clear()
        .blur();
      instructionsFields.then(async ($instructionsFields) => {
        expect(
          await $instructionsFields[
            $instructionsFields.length - 1
          ].getTextErrors()
        ).to.contain('This field is requiredInstruction 2');
      });
    });

    it('should delete a row', () => {
      cy.get('[formarrayname="instructions"]').find('button').last().click();
      cy.get('[formarrayname="instructions"] input')
        .its('length')
        .should('eq', 1);
    });
  });

  describe('submit', () => {
    it('should successfully submit and route to the recipe page without an image uploaded', () => {
      cy.get('[formcontrolname="name"]').clear().type('some recipe');
      cy.get('[formcontrolname="description"]')
        .clear()
        .type('some description');
      cy.get('[formcontrolname="cookTime"]').clear().type('20');
      const difficulty = getHarness(MatSelectHarness);
      difficulty.open();
      difficulty.clickOptions({ text: '2' });
      getHarness(MatInputHarness.with({ placeholder: 'Ingredient' })).setValue(
        'ingredient 1'
      );
      getHarness(MatInputHarness.with({ placeholder: 'Instruction' })).setValue(
        'instruction 1'
      );
      cy.get('[type="submit"]').click();
      cy.url().should('equal', 'http://localhost:4200/recipes/some-recipe');
      cy.get('h1').should('contain.text', 'some recipe');
    });

    it('should show an error if you use a duplicate name', () => {
      cy.loginUser();
      cy.visit('http://localhost:4200/create-recipe');
      cy.get('[formcontrolname="name"]')
        .clear()
        .type(recipeNameConstants.morningGloryMuffins);
      cy.get('[formcontrolname="description"]')
        .clear()
        .type('some description');
      cy.get('[formcontrolname="cookTime"]').clear().type('20');
      const difficulty = getHarness(MatSelectHarness);
      difficulty.open();
      difficulty.clickOptions({ text: '2' });
      getHarness(MatInputHarness.with({ placeholder: 'Ingredient' })).setValue(
        'ingredient 1'
      );
      getHarness(MatInputHarness.with({ placeholder: 'Instruction' })).setValue(
        'instruction 1'
      );
      cy.get('[type="submit"]').click();
      cy.url().should('equal', 'http://localhost:4200/create-recipe');
      cy.get('sfr-announcement').should(
        'contain.text',
        'A recipe with that name already exists'
      );
    });

    it('should upload an image and create a recipe', () => {
      cy.loginUser();
      cy.visit('http://localhost:4200/create-recipe');
      cy.get('[formcontrolname="name"]').clear().type('Recipe with Image');
      cy.get('[formcontrolname="description"]')
        .clear()
        .type('some description');
      cy.get('[formcontrolname="cookTime"]').clear().type('20');
      const difficulty = getHarness(MatSelectHarness);
      difficulty.open();
      difficulty.clickOptions({ text: '2' });
      getHarness(MatInputHarness.with({ placeholder: 'Ingredient' })).setValue(
        'ingredient 1'
      );
      getHarness(MatInputHarness.with({ placeholder: 'Instruction' })).setValue(
        'instruction 1'
      );
      cy.get('sfr-image-attach [type="file"]').attachFile('egg-muffin.jpg');
      cy.intercept(
        { method: 'POST', url: '**/image/upload' },
        {
          delay: 1000,
          fixture: 'cloudinary-create-response.json',
          statusCode: 200,
        }
      );
      cy.get('[type="submit"]').click();
      cy.get('[mode="buffer"]').should('exist');
      cy.get('[mode="determinate"]').should('exist');
      cy.url().should(
        'equal',
        'http://localhost:4200/recipes/Recipe-with-Image'
      );
      cy.get('h1').should('contain.text', 'Recipe with Image');
      cy.get('figure img').should('have.attr', 'src', 'example');
    });

    it('should delete an uploaded image when creating a recipe results in an error', () => {
      cy.loginUser();
      cy.visit('http://localhost:4200/create-recipe');
      cy.get('[formcontrolname="name"]').clear().type('Recipe with Image');
      cy.get('[formcontrolname="description"]')
        .clear()
        .type('some description');
      cy.get('[formcontrolname="cookTime"]').clear().type('20');
      const difficulty = getHarness(MatSelectHarness);
      difficulty.open();
      difficulty.clickOptions({ text: '2' });
      getHarness(MatInputHarness.with({ placeholder: 'Ingredient' })).setValue(
        'ingredient 1'
      );
      getHarness(MatInputHarness.with({ placeholder: 'Instruction' })).setValue(
        'instruction 1'
      );
      cy.get('sfr-image-attach [type="file"]').attachFile('egg-muffin.jpg');
      cy.intercept(
        { method: 'POST', url: '**/image/upload' },
        {
          delay: 1000,
          fixture: 'cloudinary-create-response.json',
          statusCode: 200,
        }
      );
      cy.intercept(
        { method: 'POST', url: '**/delete_by_token' },
        {
          fixture: 'cloudinary-delete-response.json',
          statusCode: 200,
        }
      ).as('cloudinaryDelete');
      cy.get('[type="submit"]').click();
      cy.get('[mode="buffer"]').should('exist');
      cy.get('[mode="determinate"]').should('exist');
      cy.wait('@cloudinaryDelete').then(($res) => {
        expect($res.response.body.result).eq('ok');
      });
      cy.url().should('equal', 'http://localhost:4200/create-recipe');
      cy.get('sfr-announcement').should(
        'contain.text',
        'A recipe with that name already exists'
      );
    });
  });
});
