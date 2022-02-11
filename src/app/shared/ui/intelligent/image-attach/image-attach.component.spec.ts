import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SfrFileReaderPipeModule } from '@sfr/shared/utils/pipes';
import { SfrLoaderUiModule } from '../../presentational';
import { SfrImageAttachComponent } from './image-attach.component';

describe('SfrImageAttachComponent', () => {
  let component: SfrImageAttachComponent;
  let fixture: ComponentFixture<SfrImageAttachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrImageAttachComponent],
      imports: [SfrFileReaderPipeModule, SfrLoaderUiModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrImageAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('attachFile', () => {
    it('should attach a file', async () => {
      const fileInput = fixture.debugElement.query(By.css('[type="file"]'));
      const attachFileSpy = jest.spyOn(component, 'attachFile');
      fileInput.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(attachFileSpy).toHaveBeenCalled();
    });

    it('should attach files to the component value', () => {
      const writeValueSpy = jest.spyOn(component, 'writeValue');
      const fileList: FileList = {
        0: new File([], 'image0.jpg'),
        1: new File([], 'image1.jpg'),
        length: 2,
        item: (index: number) => new File([], `image${index}.jpg`),
      };
      const event = { target: { files: fileList } } as unknown as Event;
      component.attachFile(event);
      expect(writeValueSpy).toHaveBeenCalledTimes(1);
      expect(component.value.length).toEqual(2);
      expect(component.value[0].name).toEqual('image0.jpg');
      expect(component.value[1].name).toEqual('image1.jpg');
    });
  });

  describe('removeFile', () => {
    it('should remove a file when the index is passed in', () => {
      component.value = [
        new File([], 'image0.jpg'),
        new File([], 'image1.jpg'),
      ];
      expect(component.value.length).toEqual(2);
      component.removeFile(1);
      expect(component.value[0].name).toEqual('image0.jpg');
    });
  });

  describe('writeValue', () => {
    it('should make the value equal to what is passed in', () => {
      expect(component.value).toEqual([]);
      component.writeValue([
        new File([], 'image0.jpg'),
        new File([], 'image1.jpg'),
      ]);
      expect(component.value.length).toEqual(2);
      expect(component.value[0].name).toEqual('image0.jpg');
      expect(component.value[1].name).toEqual('image1.jpg');
    });
  });
});
