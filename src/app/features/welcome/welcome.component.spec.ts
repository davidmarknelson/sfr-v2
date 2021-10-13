import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfrWelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: SfrWelcomeComponent;
  let fixture: ComponentFixture<SfrWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrWelcomeComponent],
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
