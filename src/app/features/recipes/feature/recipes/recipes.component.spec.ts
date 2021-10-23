import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesAndCountGQL } from '@sfr/data-access/generated';
import { SfrUiContainerModule, SfrUiLoaderModule } from '@sfr/shared/ui';
import { SfrUiPageTitleModule } from '@sfr/shared/ui/page-title/ui-page-title.module';
import { SfrPaginationService } from '@sfr/shared/utils';
import { of } from 'rxjs';
import { SfrUiRecipesGridModule } from '../../ui/recipes-grid/ui-recipes-grid.module';
import { SfrRecipesComponent } from './recipes.component';

describe('SfrRecipesComponent', () => {
  let component: SfrRecipesComponent;
  let fixture: ComponentFixture<SfrRecipesComponent>;

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
            watch: of(null),
          },
        },
        {
          provide: SfrPaginationService,
          useValue: {
            getPageFromRoute$: of(1),
            getSkip: 0,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
