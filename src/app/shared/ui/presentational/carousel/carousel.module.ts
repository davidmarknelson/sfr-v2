import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { SfrButtonModule } from '../button/button.module';
import { SfrCarouselComponent } from './carousel.component';

@NgModule({
  declarations: [SfrCarouselComponent],
  imports: [
    CommonModule,
    SfrButtonModule,
    SfrRecipePhotoPipeModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [SfrCarouselComponent],
})
export class SfrCarouselUiModule {}
