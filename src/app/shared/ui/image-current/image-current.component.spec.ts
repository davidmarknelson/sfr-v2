import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCurrentComponent } from './image-current.component';

describe('ImageCurrentComponent', () => {
  let component: ImageCurrentComponent;
  let fixture: ComponentFixture<ImageCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
