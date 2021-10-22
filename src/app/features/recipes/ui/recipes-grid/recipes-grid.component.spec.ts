import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { RecipesAndCountQuery } from '@sfr/data-access/generated';
import {
  SfrRecipePhotoPipeModule,
  SfrRoundedButtonModule,
} from '@sfr/shared/utils';
import { SfrRecipeCardComponent } from './recipe-card/recipe-card.component';
import { SfrRecipesGridComponent } from './recipes-grid.component';

const recipeMockData: RecipesAndCountQuery['recipesAndCount']['recipes'][0] = {
  __typename: 'RecipeType',
  id: 1,
  name: 'sandwich',
  description: '',
  photo: {
    id: 1,
    path: '/recipe-photo/1',
  },
};

const recipesAndCountMockData: RecipesAndCountQuery['recipesAndCount'] = {
  totalCount: 1,
  recipes: [
    {
      __typename: 'RecipeType',
      id: 1,
      name: 'sandwich',
      description: '',
      photo: {
        id: 1,
        path: '/recipe-photo/1',
      },
    },
  ],
};

@Component({
  template: `<sfr-recipes-grid
    [recipesAndCount]="recipesAndCount"
  ></sfr-recipes-grid>`,
})
class TestHostComponent {
  @ViewChild(SfrRecipesGridComponent) recipesGrid!: SfrRecipesGridComponent;
  recipesAndCount!: RecipesAndCountQuery['recipesAndCount'];
}

describe('SfrRecipesGridComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SfrRecipesGridComponent,
        SfrRecipeCardComponent,
        TestHostComponent,
      ],
      imports: [
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        SfrRoundedButtonModule,
        SfrRecipePhotoPipeModule,
      ],
    }).compileComponents();
  });

  describe('with an array of recipes', () => {
    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostComponent.recipesAndCount = recipesAndCountMockData;
      hostFixture.detectChanges();
    });

    it('should display a list of recipes', () => {
      expect(hostComponent.recipesGrid.recipesAndCount).toEqual(
        recipesAndCountMockData
      );
      const recipeCards = hostFixture.debugElement.queryAll(
        By.css('sfr-recipe-card')
      );
      expect(recipeCards.length).toEqual(1);
    });
  });
});
