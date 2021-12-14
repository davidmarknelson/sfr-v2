import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

describe('CreateEditRecipeComponent', () => {
  let component: SfrCreateEditRecipeComponent;
  let fixture: ComponentFixture<SfrCreateEditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCreateEditRecipeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCreateEditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
