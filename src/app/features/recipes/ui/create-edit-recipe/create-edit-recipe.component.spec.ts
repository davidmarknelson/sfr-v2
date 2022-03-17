import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createMockRecipeFullData } from '@sfr-testing/helpers';
import {
  apiRecipeConstants,
  apiRecipeMessageConstants,
} from '@sfr/data-access/constants';
import {
  SfrImageCurrentUiModule,
  SfrImageUploadUiModule,
} from '@sfr/shared/ui/intelligent';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

describe('SfrCreateEditRecipeComponent', () => {
  let component: SfrCreateEditRecipeComponent;
  let fixture: ComponentFixture<SfrCreateEditRecipeComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCreateEditRecipeComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatButtonModule,
        SfrRoundedButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        SfrImageUploadUiModule,
        SfrImageCurrentUiModule,
      ],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCreateEditRecipeComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should build the form when no recipe is passed in', async () => {
      component.recipe = undefined;
      fixture.detectChanges();
      expect(
        await loader.getHarness(
          MatFormFieldHarness.with({
            floatingLabelText: 'Name *',
          })
        )
      ).toBeTruthy();
      expect(component.name.value).toEqual('');
    });

    it('should build the form when a recipe is passed in', async () => {
      component.recipe = createMockRecipeFullData();
      fixture.detectChanges();
      expect(
        await loader.getHarness(
          MatFormFieldHarness.with({
            floatingLabelText: 'Name *',
          })
        )
      ).toBeTruthy();
      expect(component.name.value).toEqual('sandwich');
    });
  });

  describe('Name', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Name *',
        })
      );
    });

    it('should show an error if the name is empty', async () => {
      component.name.setValue('');
      component.name.markAsTouched();
      expect((component.name.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredName',
      ]);
    });

    it('should show an error if the name is too long', async () => {
      let longText = 'a'.padEnd(apiRecipeConstants.nameMaxLength + 1, 'a');
      component.name.setValue(longText);
      component.name.markAsTouched();
      expect((component.name.errors || {})['maxlength']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        apiRecipeMessageConstants.nameMaxLengthError,
      ]);
    });
  });

  describe('Description', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Description *',
        })
      );
    });

    it('should show an error if the description is empty', async () => {
      component.description.setValue('');
      component.description.markAsTouched();
      expect((component.description.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredDescription',
      ]);
    });

    it('should show an error if the description is too long', async () => {
      let longText = 'a'.padEnd(
        apiRecipeConstants.descriptionMaxLength + 1,
        'a'
      );
      component.description.setValue(longText);
      component.description.markAsTouched();
      expect((component.description.errors || {})['maxlength']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        apiRecipeMessageConstants.descriptionMaxLengthError,
      ]);
    });
  });

  describe('Cook Time', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Cook Time *',
        })
      );
    });

    it('should show an error if the cookTime is empty', async () => {
      component.cookTime.setValue('');
      component.cookTime.markAsTouched();
      expect((component.cookTime.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredCook Time',
      ]);
    });

    it('should show an error if the cookTime is not only numbers', async () => {
      component.cookTime.setValue('3e');
      component.cookTime.markAsTouched();
      expect((component.cookTime.errors || {})['pattern']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Must contain only numbers',
      ]);
    });
  });

  describe('Difficulty', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Difficulty *',
        })
      );
    });

    it('should show an error if the difficulty is empty', async () => {
      component.difficulty.setValue(null);
      component.difficulty.markAsTouched();
      expect((component.difficulty.errors || {})['required']).toBeTruthy();
      expect((await formFieldHarness.getTextErrors())[0]).toContain(
        'This field is required'
      );
    });
  });

  describe('Ingredients', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Ingredient *',
        })
      );
    });

    it('should show an error if the ingredient is empty', async () => {
      component.ingredients.at(0).setValue('');
      component.ingredients.at(0).markAsTouched();
      expect(
        (component.ingredients.at(0).errors || {})['required']
      ).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredIngredient 1',
      ]);
    });
  });

  describe('Instructions', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Instruction *',
        })
      );
    });

    it('should show an error if the instruction is empty', async () => {
      component.instructions.at(0).setValue('');
      component.instructions.at(0).markAsTouched();
      expect(
        (component.instructions.at(0).errors || {})['required']
      ).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredInstruction 1',
      ]);
    });
  });

  describe('Image Files', () => {
    it('should show an error if there are more than 3 images', () => {
      fixture.detectChanges();
      component.imageFiles.setValue([
        new File([], 'image.jpeg'),
        new File([], 'image.jpeg'),
        new File([], 'image.jpeg'),
      ]);
      expect(component.imageFiles.errors).toEqual(null);
      component.imageFiles.setValue([
        new File([], 'image.jpeg'),
        new File([], 'image.jpeg'),
        new File([], 'image.jpeg'),
        new File([], 'image.jpeg'),
      ]);
      expect(component.imageFiles.errors).toEqual({
        maxlength: { actualLength: 4, requiredLength: 3 },
      });
    });
  });

  describe('submit', () => {
    it('should not emit the form values if there are form errors', () => {
      fixture.detectChanges();
      const saveValueSpy = jest.spyOn(component.saveValue, 'emit');
      component.name.setValue('sandwich');
      component.description.setValue('Make it');
      // Field with error
      component.cookTime.setValue('asdf');
      component.difficulty.setValue(1);
      component.ingredients.at(0).setValue('Meat and bread');
      component.instructions.at(0).setValue('Make the sandwich');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(saveValueSpy).not.toHaveBeenCalled();
    });

    it('should emit the form values if there are no errors', () => {
      fixture.detectChanges();
      const saveValueSpy = jest.spyOn(component.saveValue, 'emit');
      component.name.setValue('sandwich');
      component.description.setValue('Make it');
      component.cookTime.setValue(20);
      component.difficulty.setValue(1);
      component.ingredients.at(0).setValue('Meat and bread');
      component.instructions.at(0).setValue('Make the sandwich');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(saveValueSpy).toHaveBeenCalledWith({
        cookTime: 20,
        description: 'Make it',
        difficulty: 1,
        ingredients: ['Meat and bread'],
        instructions: ['Make the sandwich'],
        name: 'sandwich',
        currentPhotos: [],
        imageFiles: [],
      });
    });
  });
});
