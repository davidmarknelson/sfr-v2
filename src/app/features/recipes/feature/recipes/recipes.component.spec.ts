import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesAndCountGQL } from '@sfr/data-access/generated';
import { SfrUiContainerModule, SfrUiLoaderModule } from '@sfr/shared/ui';
import { SfrUiPageTitleModule } from '@sfr/shared/ui/page-title/ui-page-title.module';
import { SfrPaginationService } from '@sfr/shared/utils';
import { createMockRecipesAndCountData } from '@testing';
import { of } from 'rxjs';
import { SfrUiRecipesGridModule } from '../../ui/recipes-grid/ui-recipes-grid.module';
import { SfrRecipesComponent } from './recipes.component';

describe('SfrRecipesComponent', () => {
  let component: SfrRecipesComponent;
  let fixture: ComponentFixture<SfrRecipesComponent>;
  let recipesAndCountService: RecipesAndCountGQL;
  let recipeAndCountData: any = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipesComponent],
      imports: [
        SfrUiRecipesGridModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        SfrUiLoaderModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: RecipesAndCountGQL,
          useValue: {
            watch: () => {
              return { valueChanges: of(recipeAndCountData) };
            },
          },
        },
        {
          provide: SfrPaginationService,
          useValue: {
            getPageFromRoute$: of(1),
            getSkip: () => 0,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    recipesAndCountService =
      TestBed.inject<RecipesAndCountGQL>(RecipesAndCountGQL);
    fixture = TestBed.createComponent(SfrRecipesComponent);
    component = fixture.componentInstance;
  });

  describe('an array of recipes', () => {
    it('should show the loading component before an data is loaded', () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('sfr-recipes-grid'))
      ).toBeFalsy();
    });

    xit('should load the data and hide the loader', () => {
      recipeAndCountData = {
        loading: false,
        data: createMockRecipesAndCountData(1),
      };

      fixture.detectChanges();

      expect(component.loading).toEqual(false);

      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-recipes-grid'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('sfr-recipe-card'))
      ).toBeTruthy();
    });

    xit('should update the query params when the page change is emitted from the grid components', () => {});
  });
});
