import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initialCloudinaryState } from '@sfr/shared/utils/constants';
import {
  SfrCloudinaryService,
  SfrCompressorService,
} from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'sfr-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrImageUploaderComponent implements OnInit {
  private readonly fileUploadsSubj$: BehaviorSubject<
    CloudinaryProgressResult[]
  > = new BehaviorSubject<CloudinaryProgressResult[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: File[] = [],
    private readonly dialogRef: MatDialogRef<SfrImageUploaderComponent>,
    private readonly cloudinary: SfrCloudinaryService,
    private readonly compressor: SfrCompressorService,
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.formatFileUploads();
  }

  get fileUploads$(): Observable<CloudinaryProgressResult[]> {
    return this.fileUploadsSubj$.asObservable();
  }

  private formatFileUploads(): void {
    combineLatest(this.data.map((file) => this.uploadFile$(file))).subscribe(
      (val) => {
        this.fileUploadsSubj$.next(val);
        this.cd.detectChanges();
      },
      (err) => {
        this.dialogRef.close(err);
      },
      () => {
        this.ngZone.run(() => {
          this.dialogRef.close(this.fileUploadsSubj$.getValue());
        });
      }
    );
  }

  private uploadFile$(file: File): Observable<CloudinaryProgressResult> {
    return this.compressor.compressImage$(file).pipe(
      mergeMap((compressedFile) =>
        this.cloudinary.uploadImage$(compressedFile)
      ),
      startWith(initialCloudinaryState),
      map((cloudinaryResult) => {
        return { ...cloudinaryResult, fileName: file.name };
      })
    );
  }
}
