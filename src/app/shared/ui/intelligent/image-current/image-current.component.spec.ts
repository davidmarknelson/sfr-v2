import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrImageCurrentComponent } from './image-current.component';

describe.skip('ImageCurrentComponent', () => {
  let component: SfrImageCurrentComponent;
  let fixture: ComponentFixture<SfrImageCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrImageCurrentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrImageCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
