import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipeFullData } from '@sfr-testing/helpers';
import {
  MockCloudinaryService,
  MockRouter,
  MockUrlReplaceSpacePipe,
} from '@sfr-testing/mocks';
import { CreateRecipeGQL } from '@sfr/data-access/generated';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCloudinaryService } from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { of } from 'rxjs';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { CreateRecipeRoutingModule } from './create-recipe-routing.module';
import { SfrCreateRecipeComponent } from './create-recipe.component';

let returnRecipeData: any = {
  data: { createRecipe: createMockRecipeFullData() },
};

describe('CreateRecipeComponent', () => {
  let component: SfrCreateRecipeComponent;
  let fixture: ComponentFixture<SfrCreateRecipeComponent>;
  let router: Router;
  let urlReplaceSpace: SfrUrlReplaceSpacePipe;
  let cloudinaryService: SfrCloudinaryService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCreateRecipeComponent],
      imports: [
        RouterTestingModule,
        CreateRecipeRoutingModule,
        SfrContainerUiModule,
        SfrPageTitleUiModule,
        SfrCreateEditRecipeUiModule,
        SfrAnnouncementUiModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: SfrUrlReplaceSpacePipe,
          useClass: MockUrlReplaceSpacePipe,
        },
        {
          provide: CreateRecipeGQL,
          useValue: {
            mutate: () => {
              return of(returnRecipeData);
            },
          },
        },
        {
          provide: Router,
          useClass: MockRouter,
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
          provide: SfrCloudinaryService,
          useClass: MockCloudinaryService,
        },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    urlReplaceSpace = TestBed.inject(SfrUrlReplaceSpacePipe);
    cloudinaryService = TestBed.inject(SfrCloudinaryService);
    matDialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCreateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should route to the recipe page on success with no image', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const matDialogSpy = jest.spyOn(matDialog, 'open');
    const urlReplaceSpaceSpy = jest
      .spyOn(urlReplaceSpace, 'transform')
      .mockReturnValue('sandwich');
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
      });
    expect(matDialogSpy).not.toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
    expect(urlReplaceSpaceSpy).toHaveBeenCalled();
  });

  it('should upload an image', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const matDialogSpy = jest.spyOn(matDialog, 'open');
    const urlReplaceSpaceSpy = jest
      .spyOn(urlReplaceSpace, 'transform')
      .mockReturnValue('sandwich');
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
      });
    expect(matDialogSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
    expect(urlReplaceSpaceSpy).toHaveBeenCalled();
  });

  it('should show an error if the recipe already exists and delete an image', () => {
    returnRecipeData = {
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
    const matDialogSpy = jest.spyOn(matDialog, 'open');
    const urlReplaceSpaceSpy = jest.spyOn(urlReplaceSpace, 'transform');
    const cloudinarySpy = jest.spyOn(cloudinaryService, 'deleteImageByToken$');
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
      });
    expect(matDialogSpy).toHaveBeenCalled();
    expect(cloudinarySpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
    expect(urlReplaceSpaceSpy).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual(
      'A recipe with that name already exists'
    );
    expect(fixture.debugElement.query(By.css('sfr-announcement'))).toBeTruthy();
  });
});
