import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrFooterComponent } from '../footer/footer.component';
import { SfrHeaderComponent } from '../header/header.component';
import { SfrViewComponent } from './view.component';

describe.skip('ViewComponent', () => {
  let component: SfrViewComponent;
  let fixture: ComponentFixture<SfrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrViewComponent, SfrFooterComponent, SfrHeaderComponent],
      imports: [RouterTestingModule, SfrUiContainerModule, MatToolbarModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
