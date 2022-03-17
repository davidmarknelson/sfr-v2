import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from '@sfr-testing/mocks';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { SfrHeaderComponent } from './header.component';

describe('SfrHeaderComponent', () => {
  let component: SfrHeaderComponent;
  let fixture: ComponentFixture<SfrHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrHeaderComponent],
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          {
            path: 'welcome',
            loadChildren: () =>
              import('../../features/welcome/welcome.module').then(
                (m) => m.SfrWelcomeFeatureModule
              ),
          },
        ]),
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: SfrAuthService,
          useValue: MockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('site image', () => {
    it('should navigate to the welcome page when clicked', () => {
      const imageLink = fixture.debugElement.query(By.css('a')).nativeElement;
      const location: Location = TestBed.inject(Location);

      imageLink.click();
      fixture.detectChanges();
      expect(location.path()).toEqual('/welcome');
    });
  });
});
