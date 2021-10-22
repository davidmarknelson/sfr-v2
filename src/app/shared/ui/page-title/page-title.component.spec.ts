import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrPageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
  let component: SfrPageTitleComponent;
  let fixture: ComponentFixture<SfrPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrPageTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
