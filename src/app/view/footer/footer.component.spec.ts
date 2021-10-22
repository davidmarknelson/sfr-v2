import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrFooterComponent } from './footer.component';

describe('SfrFooterComponent', () => {
  let component: SfrFooterComponent;
  let fixture: ComponentFixture<SfrFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
