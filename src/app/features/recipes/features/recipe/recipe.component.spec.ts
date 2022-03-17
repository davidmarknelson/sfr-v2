import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipeFullData } from '@sfr-testing/helpers';
import { MockActivatedRoute, MockAuthService } from '@sfr-testing/mocks';
import { RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrAnnouncementUiModule,
  SfrCarouselUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrRecipeComponent } from './recipe.component';

describe('SfrRecipeComponent', () => {
  let fixture: ComponentFixture<SfrRecipeComponent>;
  let recipeData: any = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipeComponent],
      imports: [
        RouterTestingModule,
        SfrContainerUiModule,
        SfrPageTitleUiModule,
        SfrLoaderUiModule,
        SfrAnnouncementUiModule,
        SfrRecipePhotoPipeModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
        SfrCarouselUiModule,
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
          useClass: MockActivatedRoute,
        },
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
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
