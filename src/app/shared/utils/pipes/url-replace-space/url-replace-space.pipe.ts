import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sfrUrlReplaceSpace',
})
export class SfrUrlReplaceSpacePipe implements PipeTransform {
  transform(recipeName: string): string {
    return recipeName.split(' ').join('-');
  }
}
