import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { createMockRecipeData } from '@sfr-testing/helpers';
import { SfrButtonModule } from '@sfr/shared/ui/presentational';
import {
  SfrRecipePhotoPipeModule,
  SfrUrlReplaceSpaceModule,
} from '@sfr/shared/utils/pipes';
import { SfrRecipeCardComponent } from './recipe-card.component';

describe('SfrRecipeCardComponent', () => {
  let component: SfrRecipeCardComponent;
  let fixture: ComponentFixture<SfrRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipeCardComponent],
      imports: [
        MatCardModule,
        SfrButtonModule,
        SfrRecipePhotoPipeModule,
        RouterTestingModule,
        SfrUrlReplaceSpaceModule,
        MatIconModule,
        MatTooltipModule,
      ],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrRecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = createMockRecipeData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
