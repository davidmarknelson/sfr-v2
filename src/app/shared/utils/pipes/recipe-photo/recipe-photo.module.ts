import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrRecipePhotoPipe } from './recipe-photo.pipe';

@NgModule({
  declarations: [SfrRecipePhotoPipe],
  imports: [CommonModule],
  exports: [SfrRecipePhotoPipe],
})
export class SfrRecipePhotoPipeModule {}
