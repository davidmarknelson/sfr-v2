import { TestBed } from '@angular/core/testing';
import { SfrFileReaderPipe } from './file-reader.pipe';

describe('SfrFileReaderPipe', () => {
  let pipe: SfrFileReaderPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SfrFileReaderPipe],
    });
    pipe = TestBed.inject(SfrFileReaderPipe);
  });

  it('should return a string', (done) => {
    pipe
      .transform(new File([new Blob()], 'image.jpeg', { type: 'image/jpeg' }))
      .subscribe((res) => {
        expect(typeof res).toEqual('string');
        done();
      });
  });
});
