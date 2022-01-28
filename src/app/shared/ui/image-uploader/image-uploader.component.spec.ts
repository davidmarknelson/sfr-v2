import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  SfrCloudinaryService,
  SfrCompressorService,
} from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { of } from 'rxjs';
import { SfrImageUploaderComponent } from './image-uploader.component';

const imageFile: File = new File([], 'image.jpg');

describe('SfrImageUploaderComponent', () => {
  let component: SfrImageUploaderComponent;
  let fixture: ComponentFixture<SfrImageUploaderComponent>;
  let cloudinary: SfrCloudinaryService;
  let compressor: SfrCompressorService;
  let dialogRef: MatDialogRef<SfrImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrImageUploaderComponent],
      imports: [MatProgressBarModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: [imageFile] },
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(() => {
              return;
            }),
          },
        },
        {
          provide: SfrCloudinaryService,
          useValue: {
            uploadImage$: jest.fn().mockReturnValue(
              of({
                state: 'DONE',
                progress: 100,
                result: null,
              } as CloudinaryProgressResult)
            ),
          },
        },
        {
          provide: SfrCompressorService,
          useValue: {
            compressImage$: jest.fn().mockReturnValue(of(imageFile)),
          },
        },
      ],
    }).compileComponents();
    cloudinary = TestBed.inject(SfrCloudinaryService);
    compressor = TestBed.inject(SfrCompressorService);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrImageUploaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call the cloudinary compressor services and closes the dialog when the observable is complete', () => {
    let cloudinarySpy = jest.spyOn(cloudinary, 'uploadImage$');
    let compressorSpy = jest.spyOn(compressor, 'compressImage$');
    let dialogRefSpy = jest.spyOn(dialogRef, 'close');

    fixture.detectChanges();
    expect(cloudinarySpy).toHaveBeenCalled();
    expect(compressorSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith([
      { fileName: 'image.jpg', progress: 100, result: null, state: 'DONE' },
    ]);
  });
});
