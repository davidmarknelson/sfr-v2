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
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  apiRecipeConstants,
  apiRecipeMessageConstants,
} from '@sfr/data-access/constants';
import { CreateRecipeGQL, RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { createMockRecipeFullData } from '@testing';
import { of } from 'rxjs';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

let pageTitle: string = 'Create Recipe';
let paramMapName: string | null = 'Egg-muffin';
class MockActivateRoute {
  get data() {
    return of({
      title: pageTitle,
    });
  }
  get paramMap() {
    return of({
      get: () => paramMapName,
    });
  }
}
describe('SfrCreateEditRecipeComponent', () => {
  let component: SfrCreateEditRecipeComponent;
  let fixture: ComponentFixture<SfrCreateEditRecipeComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCreateEditRecipeComponent],
      imports: [
        RouterTestingModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatButtonModule,
        SfrRoundedButtonModule,
        MatIconModule,
        SfrUiAnnouncementModule,
        SfrUiLoaderModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SfrUrlReplaceSpacePipe,
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: CreateRecipeGQL,
          useValue: {
            mutate: () => {
              return of({ data: { createRecipe: createMockRecipeFullData() } });
            },
          },
        },
        {
          provide: RecipeGQL,
          useValue: {
            fetch: () => {
              return of({ data: { recipe: createMockRecipeFullData() } });
            },
          },
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivateRoute,
        },
      ],
    }).compileComponents();
    activatedRoute = TestBed.inject<ActivatedRoute>(ActivatedRoute);
    router = TestBed.inject<Router>(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCreateEditRecipeComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    let titleSpy: any;
    let paramSpy: any;

    beforeEach(() => {
      titleSpy = jest.spyOn(activatedRoute, 'data', 'get');
      paramSpy = jest.spyOn(activatedRoute, 'paramMap', 'get');
    });

    it('should get the title of the page', () => {
      fixture.detectChanges();
      expect(titleSpy).toHaveBeenCalled();
      expect(component.title).toEqual('Create Recipe');
    });

    it('should get the name of the recipe and load the recipe data in the form', () => {
      fixture.detectChanges();
      expect(paramSpy).toHaveBeenCalled();
      expect(component.loading).toEqual(false);
      expect(component.name.value).toEqual('sandwich');
    });

    it('should get create the form without loading data', () => {
      paramMapName = null;
      fixture.detectChanges();
      expect(paramSpy).toHaveBeenCalled();
      expect(component.loading).toEqual(false);
      expect(component.name.value).toEqual('');
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
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredDifficulty',
      ]);
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

  describe('submit', () => {
    it('should create a recipe and route to the newly created recipe', () => {
      paramMapName = '';
      fixture.detectChanges();
      const routerSpy = jest.spyOn(router, 'navigate');
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
      expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
    });
  });
});
