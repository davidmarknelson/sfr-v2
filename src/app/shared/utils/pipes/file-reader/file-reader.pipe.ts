import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Pipe({
  name: 'sfrFileReader$',
})
export class SfrFileReaderPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(file: File): Observable<string> {
    return new Observable((observer) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        observer.next(
          this.sanitizer.sanitize(
            SecurityContext.URL,
            fileReader.result as string
          )!
        );
        observer.complete();
      };

      fileReader.onerror = () => {
        observer.error(fileReader.error);
      };

      fileReader.readAsDataURL(file);
    });
  }
}
