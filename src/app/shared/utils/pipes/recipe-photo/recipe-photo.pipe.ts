import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sfrRecipePhoto',
})
export class SfrRecipePhotoPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? value : '/assets/images/defaults/default-recipe-pic.jpg';
  }
}
