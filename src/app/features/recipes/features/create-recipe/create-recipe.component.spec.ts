import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createMockRecipeFullData,
  createMockRecipeInput,
} from '@sfr-testing/helpers';
import { MockRouter, MockUrlReplaceSpacePipe } from '@sfr-testing/mocks';
import { CreateRecipeGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCreateRecipeComponent],
      imports: [
        RouterTestingModule,
        CreateRecipeRoutingModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        SfrCreateEditRecipeUiModule,
        SfrUiAnnouncementModule,
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
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    urlReplaceSpace = TestBed.inject(SfrUrlReplaceSpacePipe);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCreateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should route to the recipe page on success', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const urlReplaceSpaceSpy = jest
      .spyOn(urlReplaceSpace, 'transform')
      .mockReturnValue('sandwich');
    fixture.debugElement
      .query(By.css('sfr-create-edit-recipe'))
      .componentInstance.saveValue.emit(createMockRecipeInput());
    expect(routerSpy).toHaveBeenCalledWith(['recipes', 'sandwich']);
    expect(urlReplaceSpaceSpy).toHaveBeenCalled();
  });

  it('should show an error if the recipe already exists', () => {
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
    const urlReplaceSpaceSpy = jest.spyOn(urlReplaceSpace, 'transform');
    fixture.debugElement
      .query(By.css('sfr-create-edit-recipe'))
      .componentInstance.saveValue.emit(createMockRecipeInput());
    expect(routerSpy).not.toHaveBeenCalled();
    expect(urlReplaceSpaceSpy).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual(
      'A recipe with that name already exists'
    );
    expect(fixture.debugElement.query(By.css('sfr-announcement'))).toBeTruthy();
  });
});
