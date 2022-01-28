import { HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sfr-env/environment';
import { CloudinaryDeleteImageResult } from '@sfr/data-access/cloudinary';
import { CloudinaryProgressResult } from '../../types';
import { SfrCloudinaryService } from './cloudinary.service';

describe('CloudinaryService', () => {
  let service: SfrCloudinaryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SfrCloudinaryService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deleteImageByToken$', () => {
    it('should send a delete token to the cloudinary endpoint', () => {
      let response: any;
      const flushedResult: CloudinaryDeleteImageResult = { result: 'ok' };

      service.deleteImageByToken$('someToken').subscribe((res) => {
        response = res;
      });

      http
        .expectOne(
          `${environment.cloudinaryUrl}${environment.cloudName}/delete_by_token`
        )
        .flush(flushedResult);
      expect(response).toEqual(flushedResult);
      http.verify();
    });

    it('should return an error object on error', () => {
      let errorMessage = { message: 'error' };
      let errorResponse: any;

      service.deleteImageByToken$('someToken').subscribe(
        () => {},
        (err) => (errorResponse = err.error)
      );

      http
        .expectOne(
          `${environment.cloudinaryUrl}${environment.cloudName}/delete_by_token`
        )
        .flush(errorMessage, { status: 400, statusText: 'Bad Request' });
      expect(errorResponse).toEqual(errorMessage);
      http.verify();
    });
  });

  describe('uploadImage$', () => {
    it('should send an initial pending value', () => {
      const pic = new File([new Blob()], 'image.jpeg', { type: 'image/jpeg' });
      let response: any;

      service.uploadImage$(pic).subscribe((res) => {
        response = res;
      });

      http
        .expectOne(
          `${environment.cloudinaryUrl}${environment.cloudName}/image/upload`
        )
        .event({
          // Used to get the observable to fire. It is being filtered out
          type: HttpEventType.Sent,
        });
      expect(response).toEqual({
        state: 'PENDING',
        progress: 0,
        result: null,
      } as CloudinaryProgressResult);
      http.verify();
    });

    it('should show the progress during the upload', () => {
      const pic = new File([new Blob()], 'image.jpeg', { type: 'image/jpeg' });
      let response: any;

      service.uploadImage$(pic).subscribe((res) => {
        response = res;
      });

      http
        .expectOne(
          `${environment.cloudinaryUrl}${environment.cloudName}/image/upload`
        )
        .event({
          type: HttpEventType.UploadProgress,
          loaded: 50,
          total: 100,
        });
      expect(response).toEqual({
        state: 'IN_PROGRESS',
        progress: 50,
        result: null,
      } as CloudinaryProgressResult);
      http.verify();
    });

    it('should show the result at the end of the upload', () => {
      const pic = new File([new Blob()], 'image.jpeg', { type: 'image/jpeg' });
      let response: any;
      let result: CloudinaryProgressResult['result'] = {
        result: 'result',
      } as unknown as CloudinaryProgressResult['result'];

      service.uploadImage$(pic).subscribe((res) => {
        response = res;
      });

      http
        .expectOne(
          `${environment.cloudinaryUrl}${environment.cloudName}/image/upload`
        )
        .flush(result);
      expect(response).toEqual({
        state: 'DONE',
        progress: 100,
        result: { result: 'result' },
      });
      http.verify();
    });
  });
});
