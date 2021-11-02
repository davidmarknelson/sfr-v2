import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RecipeGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { createMockRecipeData } from '@testing';
import { of } from 'rxjs';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SfrRecipeComponent } from './recipe.component';

let nameObj: { name?: string } = { name: 'Egg muffin' };

class MockActivateRoute {
  get paramMap() {
    return of(nameObj);
  }
}

xdescribe('SfrRecipeComponent', () => {
  let component: SfrRecipeComponent;
  let fixture: ComponentFixture<SfrRecipeComponent>;
  let recipeService: RecipeGQL;
  let route: ActivatedRoute;
  let recipeData: any = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipeComponent],
      imports: [
        RecipeRoutingModule,
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    recipeService = TestBed.inject<RecipeGQL>(RecipeGQL);
    route = TestBed.inject<ActivatedRoute>(ActivatedRoute);
    fixture = TestBed.createComponent(SfrRecipeComponent);
    component = fixture.componentInstance;
  });

  describe('No recipe', () => {
    it('should show a message', () => {
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
          recipe: createMockRecipeData(),
        },
      };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('sfr-loader'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeFalsy();
    });
  });
});
