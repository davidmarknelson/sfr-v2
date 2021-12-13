import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrProfileComponent } from './profile.component';

describe('SfrProfileComponent', () => {
  let component: SfrProfileComponent;
  let fixture: ComponentFixture<SfrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
