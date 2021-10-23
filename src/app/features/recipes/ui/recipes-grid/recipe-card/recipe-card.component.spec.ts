import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  SfrRecipePhotoPipeModule,
  SfrRoundedButtonModule,
} from '@sfr/shared/utils';
import { createMockRecipeData } from '@testing';
import { SfrRecipeCardComponent } from './recipe-card.component';

describe('SfrRecipeCardComponent', () => {
  let component: SfrRecipeCardComponent;
  let fixture: ComponentFixture<SfrRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRecipeCardComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        SfrRoundedButtonModule,
        SfrRecipePhotoPipeModule,
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
