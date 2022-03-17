import { DomSanitizer } from '@angular/platform-browser';
import { SfrFileReaderPipe } from './file-reader.pipe';

class MockDomSanitizer {
  sanitize() {
    return 'safe-url';
  }
}

describe('SfrFileReaderPipe', () => {
  const sanitizerInstance = new MockDomSanitizer() as unknown as DomSanitizer;
  const domSanitizerSpy = jest.spyOn(sanitizerInstance, 'sanitize');
  const pipe = new SfrFileReaderPipe(sanitizerInstance);

  it('should return a string', (done) => {
    pipe
      .transform(new File([new Blob()], 'image.jpeg', { type: 'image/jpeg' }))
      .subscribe((res) => {
        expect(res).toEqual('safe-url');
        expect(domSanitizerSpy).toHaveBeenCalled();
        done();
      });
  });
});
