import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipesAndCountData } from '@sfr-testing/helpers';
import { SfrUiAnnouncementModule } from '@sfr/shared/ui/announcement/ui-announcement.module';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import {
  SfrRecipePhotoPipeModule,
  SfrUrlReplaceSpaceModule,
} from '@sfr/shared/utils/pipes';
import { SfrRecipeCardComponent } from './recipe-card/recipe-card.component';
import { SfrRecipesGridComponent } from './recipes-grid.component';

describe('SfrRecipesGridComponent', () => {
  let component: SfrRecipesGridComponent;
  let fixture: ComponentFixture<SfrRecipesGridComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipesGridComponent, SfrRecipeCardComponent],
      imports: [
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        SfrRoundedButtonModule,
        SfrRecipePhotoPipeModule,
        SfrUiAnnouncementModule,
        SfrUrlReplaceSpaceModule,
        RouterTestingModule,
        MatIconModule,
        MatTooltipModule,
      ],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  describe('with an array of recipes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SfrRecipesGridComponent);
      component = fixture.componentInstance;
    });

    it('should display a list of recipes and have the pagination buttons disabled if too few recipes', () => {
      component.recipesAndCount = createMockRecipesAndCountData(1);
      fixture.detectChanges();
      const recipeCards = fixture.debugElement.queryAll(
        By.css('sfr-recipe-card')
      );
      expect(recipeCards.length).toEqual(1);
    });

    describe('multiple pages', () => {
      let recipeCards: DebugElement[];
      let paginator: MatPaginatorHarness;

      beforeEach(async () => {
        loader = TestbedHarnessEnvironment.loader(fixture);
        component.recipesAndCount = createMockRecipesAndCountData(9, 15);
        fixture.detectChanges();
        recipeCards = fixture.debugElement.queryAll(By.css('sfr-recipe-card'));
        paginator = await loader.getHarness(MatPaginatorHarness);
      });

      it('should display a list of 9 recipes on the page and the pagination buttons should not be disabled', async () => {
        expect(recipeCards.length).toEqual(9);
        expect(await paginator.getPageSize()).toEqual(9);
        expect(await paginator.getRangeLabel()).toEqual('1 – 9 of 15');
      });
      it('should emit the page number when the next button is clicked', async () => {
        const pageEventSpy = jest.spyOn(component.pageEvent, 'emit');
        await paginator.goToNextPage();
        fixture.detectChanges();
        expect(pageEventSpy).toHaveBeenCalledWith({
          length: 15,
          pageIndex: 1,
          pageSize: 9,
          previousPageIndex: 0,
        });
      });
    });
  });
});
