import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrContainerComponent } from './container.component';

describe('SfrContainerComponent', () => {
  let component: SfrContainerComponent;
  let fixture: ComponentFixture<SfrContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
