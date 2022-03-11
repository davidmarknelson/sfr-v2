import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SfrCarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: SfrCarouselComponent;
  let fixture: ComponentFixture<SfrCarouselComponent>;
  const scrollIntoViewMock: jest.Mock<any, any> = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrCarouselComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrCarouselComponent);
    component = fixture.componentInstance;
    component.images = [
      {
        id: 1,
        path: 'path1',
        cloudinaryPublicId: 'publicId1',
      },
      {
        id: 2,
        path: 'path2',
        cloudinaryPublicId: 'publicId2',
      },
      {
        id: 3,
        path: 'path3',
        cloudinaryPublicId: 'publicId3',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the currentIndex to the next index and call scrollIntoView when the previous arrow is clicked', () => {
    expect(component.currentIndex).toEqual(0);
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollIntoViewSpy = jest.spyOn(
      window.HTMLElement.prototype,
      'scrollIntoView'
    );
    const scrollToIndexSpy = jest.spyOn(component, 'scrollToIndex');
    fixture.debugElement.query(By.css('.right')).nativeElement.click();
    fixture.detectChanges();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(1);
    expect(component.currentIndex).toEqual(1);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('should set the currentIndex to the previous index and call scrollIntoView when the next arrow is clicked', () => {
    expect(component.currentIndex).toEqual(0);
    component.currentIndex = 2;
    fixture.detectChanges();
    expect(component.currentIndex).toEqual(2);
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollIntoViewSpy = jest.spyOn(
      window.HTMLElement.prototype,
      'scrollIntoView'
    );
    const scrollToIndexSpy = jest.spyOn(component, 'scrollToIndex');
    fixture.debugElement.query(By.css('.left')).nativeElement.click();
    fixture.detectChanges();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(1);
    expect(component.currentIndex).toEqual(1);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('should set the currentIndex to the next index and call scrollIntoView when the 2nd dot is clicked', () => {
    expect(component.currentIndex).toEqual(0);
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollIntoViewSpy = jest.spyOn(
      window.HTMLElement.prototype,
      'scrollIntoView'
    );
    const scrollToIndexSpy = jest.spyOn(component, 'scrollToIndex');
    fixture.debugElement
      .query(By.css('li > button:nth-of-type(2)'))
      .nativeElement.click();
    fixture.detectChanges();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(1);
    expect(component.currentIndex).toEqual(1);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('should set the currentIndex to the next index and call scrollIntoView when the 2nd dot is clicked and the current image is the last one', () => {
    expect(component.currentIndex).toEqual(0);
    component.currentIndex = 2;
    fixture.detectChanges();
    expect(component.currentIndex).toEqual(2);
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollIntoViewSpy = jest.spyOn(
      window.HTMLElement.prototype,
      'scrollIntoView'
    );
    const scrollToIndexSpy = jest.spyOn(component, 'scrollToIndex');
    fixture.debugElement
      .query(By.css('li > button:nth-of-type(2)'))
      .nativeElement.click();
    fixture.detectChanges();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(1);
    expect(component.currentIndex).toEqual(1);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });
});
