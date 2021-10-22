import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrWelcomeComponent } from './welcome.component';

describe('SfrWelcomeComponent', () => {
  let component: SfrWelcomeComponent;
  let fixture: ComponentFixture<SfrWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrWelcomeComponent],
      imports: [SfrUiContainerModule],
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
