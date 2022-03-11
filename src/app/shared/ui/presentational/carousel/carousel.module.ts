import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { SfrCarouselComponent } from './carousel.component';

@NgModule({
  declarations: [SfrCarouselComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SfrRecipePhotoPipeModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [SfrCarouselComponent],
})
export class SfrCarouselUiModule {}
