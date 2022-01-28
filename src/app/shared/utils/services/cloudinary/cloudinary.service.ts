import {
  HttpClient,
  HttpEventType,
  HttpResponse,
  HttpUploadProgressEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@sfr-env/environment';
import {
  CloudinaryDeleteImageResult,
  CloudinaryUploadedImage,
} from '@sfr/data-access/cloudinary';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { initialCloudinaryState } from '../../constants';
import { CloudinaryProgressResult } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SfrCloudinaryService {
  constructor(private http: HttpClient) {}

  uploadImage$(file: File): Observable<CloudinaryProgressResult> {
    let fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('upload_preset', environment.unsignedPreset);

    return this.http
      .post<HttpResponse<CloudinaryUploadedImage> | HttpUploadProgressEvent>(
        `${environment.cloudinaryUrl}${environment.cloudName}/image/upload`,
        fd,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .pipe(
        filter(
          (event) =>
            event.type === HttpEventType.UploadProgress ||
            event.type === HttpEventType.Response
        ),
        map((event) => {
          return {
            state:
              event.type === HttpEventType.Response ? 'DONE' : 'IN_PROGRESS',
            progress:
              event.type === HttpEventType.Response
                ? 100
                : Math.round(
                    ((event as HttpUploadProgressEvent).loaded /
                      (event as HttpUploadProgressEvent).total!) *
                      100
                  ),
            result:
              event.type === HttpEventType.Response
                ? (event as unknown as HttpResponse<CloudinaryUploadedImage>)
                    .body
                : null,
          } as CloudinaryProgressResult;
        }),
        startWith(initialCloudinaryState)
      );
  }

  deleteImageByToken$(
    deleteToken: string
  ): Observable<CloudinaryDeleteImageResult> {
    let fd = new FormData();
    fd.append('token', deleteToken);

    return this.http.post<CloudinaryDeleteImageResult>(
      `${environment.cloudinaryUrl}${environment.cloudName}/delete_by_token`,
      fd
    );
  }
}
