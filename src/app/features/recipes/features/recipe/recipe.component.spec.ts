import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipeFullData } from '@sfr-testing/helpers';
import { RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrRecipeComponent } from './recipe.component';

class MockActivateRoute {
  get paramMap() {
    return of({ get: () => 'Egg muffin' });
  }
  snapshot = {};
}

describe('SfrRecipeComponent', () => {
  let fixture: ComponentFixture<SfrRecipeComponent>;
  let recipeData: any = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipeComponent],
      imports: [
        RouterTestingModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        SfrUiLoaderModule,
        SfrUiAnnouncementModule,
        SfrRecipePhotoPipeModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: RecipeGQL,
          useValue: {
            watch: () => {
              return { valueChanges: of(recipeData) };
            },
          },
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivateRoute,
        },
        {
          provide: SfrAuthService,
          useValue: {
            getTokenPayload: jest.fn().mockReturnValue({ sub: 1 }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrRecipeComponent);
  });

  describe('No recipe', () => {
    it('should show a message', () => {
      recipeData = {
        errors: [
          {
            message: 'Not Found',
            extentions: {
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
      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
    });
  });

  describe('Found recipe', () => {
    it('should show a recipe', () => {
      recipeData = {
        data: {
          recipe: createMockRecipeFullData(),
        },
      };
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeFalsy();
      expect(fixture.debugElement.query(By.css('sfr-page-title'))).toBeTruthy();
    });
  });
});
