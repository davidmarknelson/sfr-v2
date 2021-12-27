import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrFooterComponent } from '../footer/footer.component';
import { SfrHeaderComponent } from '../header/header.component';
import { SfrViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: SfrViewComponent;
  let fixture: ComponentFixture<SfrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrViewComponent, SfrFooterComponent, SfrHeaderComponent],
      imports: [
        RouterTestingModule,
        SfrUiContainerModule,
        MatToolbarModule,
        MatMenuModule,
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: SfrAuthService,
          useValue: {
            logout: jest.fn(() => {
              return;
            }),
            isAuthenticated$: of(true),
          },
        },
      ],
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
