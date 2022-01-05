import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createMockRecipeFullData,
  createMockRecipeInput,
} from '@sfr-testing/helpers';
import { paramMapDefault } from '@sfr-testing/mock-helpers';
import {
  MockActivateRoute,
  MockRouter,
  MockUrlReplaceSpacePipe,
} from '@sfr-testing/mocks';
import { EditRecipeGQL, RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { of } from 'rxjs';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { SfrEditRecipeComponent } from './edit-recipe.component';

let returnRecipeData: any = {
  data: { recipe: createMockRecipeFullData() },
};
let returnEditRecipeData: any = {
  data: { editRecipe: createMockRecipeFullData() },
};

describe('SfrEditRecipeComponent', () => {
  let component: SfrEditRecipeComponent;
  let fixture: ComponentFixture<SfrEditRecipeComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let urlReplaceSpace: SfrUrlReplaceSpacePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrEditRecipeComponent],
      imports: [
        RouterTestingModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        SfrCreateEditRecipeUiModule,
        SfrUiAnnouncementModule,
        SfrUiLoaderModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: SfrUrlReplaceSpacePipe,
          useClass: MockUrlReplaceSpacePipe,
        },
        {
          provide: EditRecipeGQL,
          useValue: {
            mutate: () => {
              return of(returnEditRecipeData);
            },
          },
        },
        {
          provide: RecipeGQL,
          useValue: {
            fetch: () => {
              return of(returnRecipeData);
            },
          },
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivateRoute,
        },
      ],
    }).compileComponents();
    activatedRoute = TestBed.inject(ActivatedRoute);
    urlReplaceSpace = TestBed.inject(SfrUrlReplaceSpacePipe);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrEditRecipeComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should get the name of the recipe and load the recipe data in the form', () => {
      let paramSpy = jest
        .spyOn(activatedRoute, 'paramMap', 'get')
        .mockReturnValue(
          of({
            ...paramMapDefault,
            get: () => {
              return 'sandwich';
            },
          })
        );

      fixture.detectChanges();
      expect(paramSpy).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-create-edit-recipe'))
      ).toBeTruthy();
    });

    it('should show the loader while loading data', () => {
      let paramSpy = jest.spyOn(activatedRoute, 'paramMap', 'get');
      returnRecipeData = null;
      fixture.detectChanges();
      expect(paramSpy).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('sfr-create-edit-recipe'))
      ).toBeFalsy();
    });

    it('should show an error if there is an error while getting the recipe data', () => {
      let paramSpy = jest
        .spyOn(activatedRoute, 'paramMap', 'get')
        .mockReturnValue(
          of({
            ...paramMapDefault,
            get: () => {
              return 'sandwich';
            },
          })
        );
      returnRecipeData = {
        errors: [
          {
            message: 'Not Found',
            extensions: {
              code: '404',
              response: {
                statusCode: 404,
                message: 'Not Found',
              },
            },
          },
        ],
      };
      fixture.detectChanges();
      expect(paramSpy).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-create-edit-recipe'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
    });
  });

  describe('Save edit', () => {
    beforeEach(() => {
      jest.spyOn(activatedRoute, 'paramMap', 'get').mockReturnValue(
        of({
          ...paramMapDefault,
          get: () => {
            return 'sandwich';
          },
        })
      );
      returnRecipeData = {
        data: { recipe: createMockRecipeFullData() },
      };
      fixture.detectChanges();
    });

    it('should edit a recipe and route to the newly edited recipe', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      const urlReplaceSpaceSpy = jest
        .spyOn(urlReplaceSpace, 'transform')
        .mockReturnValue('sandwich');
      fixture.debugElement
        .query(By.css('sfr-create-edit-recipe'))
        .componentInstance.saveValue.emit(createMockRecipeInput());
      expect(urlReplaceSpaceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
    });

    it('should show an error if the name is already used', () => {
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeFalsy();
      returnEditRecipeData = {
        errors: [
          {
            extensions: {
              response: {
                message: 'A recipe with that name already exists',
              },
            },
          },
        ],
      };
      const routerSpy = jest.spyOn(router, 'navigate');
      const urlReplaceSpaceSpy = jest
        .spyOn(urlReplaceSpace, 'transform')
        .mockReturnValue('sandwich');
      fixture.debugElement
        .query(By.css('sfr-create-edit-recipe'))
        .componentInstance.saveValue.emit(createMockRecipeInput());
      expect(urlReplaceSpaceSpy).not.toHaveBeenCalled();
      expect(routerSpy).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual(
        'A recipe with that name already exists'
      );
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
    });
  });
});
