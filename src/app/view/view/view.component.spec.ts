import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from '@sfr-testing/mocks';
import { SfrContainerUiModule } from '@sfr/shared/ui/presentational';
import { SfrAuthService } from '@sfr/shared/utils/services';
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
        SfrContainerUiModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
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
