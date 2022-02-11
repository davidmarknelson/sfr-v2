import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrImageCurrentComponent } from './image-current.component';

@NgModule({
  declarations: [SfrImageCurrentComponent],
  imports: [
    CommonModule,
    SfrRoundedButtonModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [SfrImageCurrentComponent],
})
export class SfrImageCurrentUiModule {}
