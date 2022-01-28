import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SfrCompressorService {
  constructor() {}

  compressImage$(file: File): Observable<File> {
    return new Observable((observable) => {
      new Compressor(file, {
        quality: 0.6,
        success(blobResult) {
          const compressedFile = new File([blobResult], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          observable.next(compressedFile);
          observable.complete();
        },
        error(err) {
          observable.error(err);
        },
      });
    });
  }
}
