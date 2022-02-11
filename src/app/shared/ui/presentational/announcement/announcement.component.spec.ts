import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrUiAnnouncementComponent } from './announcement.component';

describe('SfrUiAnnouncementComponent', () => {
  let component: SfrUiAnnouncementComponent;
  let fixture: ComponentFixture<SfrUiAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrUiAnnouncementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrUiAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
