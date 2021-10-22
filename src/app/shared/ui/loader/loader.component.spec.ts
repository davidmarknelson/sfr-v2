import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrLoaderComponent } from './loader.component';

describe('SfrLoaderComponent', () => {
  let component: SfrLoaderComponent;
  let fixture: ComponentFixture<SfrLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
