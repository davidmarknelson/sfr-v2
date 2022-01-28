import { TestBed } from '@angular/core/testing';
import { SfrCompressorService } from './compressor.service';

describe('SfrCompressorService', () => {
  let service: SfrCompressorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfrCompressorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Don't know how to test this
  xit('compressImage should return a file', (done) => {
    // service.compressImage(someImage).subscribe((returnedFile) => {
    //   expect(returnedFile).toBeTruthy();
    //   done();
    // });
  }, 15000);
});
