import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrWelcomeComponent } from './welcome.component';

describe('SfrWelcomeComponent', () => {
  let component: SfrWelcomeComponent;
  let fixture: ComponentFixture<SfrWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrWelcomeComponent],
      imports: [SfrUiContainerModule, MatIconModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
