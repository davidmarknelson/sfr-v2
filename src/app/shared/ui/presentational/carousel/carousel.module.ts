import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { SfrCarouselComponent } from './carousel.component';

@NgModule({
  declarations: [SfrCarouselComponent],
  imports: [CommonModule, MatButtonModule, SfrRecipePhotoPipeModule],
  exports: [SfrCarouselComponent],
})
export class SfrCarouselUiModule {}
