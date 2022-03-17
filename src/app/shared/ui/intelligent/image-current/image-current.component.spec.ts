import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SfrImageCurrentComponent } from './image-current.component';

describe('ImageCurrentComponent', () => {
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
    component.value = [
      { id: 1, path: 'path1', cloudinaryPublicId: 'publicId1' },
      { id: 2, path: 'path2', cloudinaryPublicId: 'publicId2' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove an image', () => {
    const removeFileSpy = jest.spyOn(component, 'removeFile');
    expect(component.value.length).toEqual(2);
    fixture.debugElement.query(By.css('[type="button"]')).nativeElement.click();
    fixture.detectChanges();
    expect(component.value.length).toEqual(1);
    expect(component.value[0].id).toEqual(2);
    expect(removeFileSpy).toHaveBeenCalled();
  });
});
