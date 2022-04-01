import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipeFullData } from '@sfr-testing/helpers';
import { paramMapDefault } from '@sfr-testing/mock-helpers';
import {
  MockActivatedRoute,
  MockCloudinaryService,
  MockRouter,
  MockSnackbar,
  MockUrlReplaceSpacePipe,
} from '@sfr-testing/mocks';
import { EditRecipeGQL, RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCloudinaryService } from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { of } from 'rxjs';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { CreateEditRecipe } from '../../utils';
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
  let cloudinaryService: SfrCloudinaryService;
  let dialog: MatDialog;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrEditRecipeComponent],
      imports: [
        RouterTestingModule,
        SfrContainerUiModule,
        SfrPageTitleUiModule,
        SfrCreateEditRecipeUiModule,
        SfrAnnouncementUiModule,
        SfrLoaderUiModule,
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
          useClass: MockActivatedRoute,
        },
        {
          provide: SfrCloudinaryService,
          useClass: MockCloudinaryService,
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn().mockReturnValue({
              afterClosed: jest.fn().mockReturnValue(
                of([
                  {
                    state: 'DONE',
                    progress: 100,
                    result: {
                      secure_url: 'some-url',
                      public_id: 'some-id',
                      delete_token: 'some-token',
                    },
                  } as CloudinaryProgressResult,
                ])
              ),
            }),
          },
        },
        {
          provide: MatSnackBar,
          useClass: MockSnackbar,
        },
      ],
    }).compileComponents();
    activatedRoute = TestBed.inject(ActivatedRoute);
    urlReplaceSpace = TestBed.inject(SfrUrlReplaceSpacePipe);
    router = TestBed.inject(Router);
    cloudinaryService = TestBed.inject(SfrCloudinaryService);
    dialog = TestBed.inject(MatDialog);
    snackbar = TestBed.inject(MatSnackBar);
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

    it('should edit a recipe and route to the newly edited recipe and upload an image', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      const snackbarSpy = jest.spyOn(snackbar, 'open');
      const urlReplaceSpaceSpy = jest
        .spyOn(urlReplaceSpace, 'transform')
        .mockReturnValue('sandwich');
      const deleteUploadedImagesSpy = jest.spyOn(
        cloudinaryService,
        'deleteImageByToken$'
      );
      const dialogSpy = jest.spyOn(dialog, 'open');
      fixture.debugElement
        .query(By.css('sfr-create-edit-recipe'))
        .componentInstance.saveValue.emit({
          name: 'sandwich',
          description: 'some description',
          cookTime: 20,
          difficulty: 1,
          instructions: ['make sandwich'],
          ingredients: ['meat and bread'],
          imageFiles: [new File([], 'image.jpeg')],
          currentPhotos: [],
        } as CreateEditRecipe);
      expect(urlReplaceSpaceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
      expect(deleteUploadedImagesSpy).not.toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalled();
      expect(snackbarSpy).toHaveBeenCalledWith('Recipe successfully edited');
    });

    it('should edit a recipe and route to the newly edited recipe and not upload an image', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      const snackbarSpy = jest.spyOn(snackbar, 'open');
      const urlReplaceSpaceSpy = jest
        .spyOn(urlReplaceSpace, 'transform')
        .mockReturnValue('sandwich');
      const deleteUploadedImagesSpy = jest.spyOn(
        cloudinaryService,
        'deleteImageByToken$'
      );
      const dialogSpy = jest.spyOn(dialog, 'open');
      fixture.debugElement
        .query(By.css('sfr-create-edit-recipe'))
        .componentInstance.saveValue.emit({
          name: 'sandwich',
          description: 'some description',
          cookTime: 20,
          difficulty: 1,
          instructions: ['make sandwich'],
          ingredients: ['meat and bread'],
          imageFiles: [],
          currentPhotos: [],
        } as CreateEditRecipe);
      expect(urlReplaceSpaceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
      expect(deleteUploadedImagesSpy).not.toHaveBeenCalled();
      expect(dialogSpy).not.toHaveBeenCalled();
      expect(snackbarSpy).toHaveBeenCalledWith('Recipe successfully edited');
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
      const snackbarSpy = jest.spyOn(snackbar, 'open');
      const urlReplaceSpaceSpy = jest
        .spyOn(urlReplaceSpace, 'transform')
        .mockReturnValue('sandwich');
      const deleteUploadedImagesSpy = jest.spyOn(
        cloudinaryService,
        'deleteImageByToken$'
      );
      fixture.debugElement
        .query(By.css('sfr-create-edit-recipe'))
        .componentInstance.saveValue.emit({
          name: 'sandwich',
          description: 'some description',
          cookTime: 20,
          difficulty: 1,
          instructions: ['make sandwich'],
          ingredients: ['meat and bread'],
          imageFiles: [new File([], 'image.jpeg')],
          currentPhotos: [],
        } as CreateEditRecipe);
      fixture.detectChanges();
      expect(urlReplaceSpaceSpy).not.toHaveBeenCalled();
      expect(routerSpy).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual(
        'A recipe with that name already exists'
      );
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
      expect(deleteUploadedImagesSpy).toHaveBeenCalledTimes(1);
      expect(snackbarSpy).not.toHaveBeenCalled();
    });
  });
});
