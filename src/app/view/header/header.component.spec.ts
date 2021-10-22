import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SfrHeaderComponent } from './header.component';

@Component({
  template: '',
})
class DummyComponent {}

describe('SfrHeaderComponent', () => {
  let component: SfrHeaderComponent;
  let fixture: ComponentFixture<SfrHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrHeaderComponent],
      imports: [
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          {
            path: 'welcome',
            loadChildren: () =>
              import('../../features/welcome/feature-welcome.module').then(
                (m) => m.SfrFeatureWelcomeModule
              ),
          },
        ]),
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
