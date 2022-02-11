import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrFileReaderPipeModule } from '@sfr/shared/utils/pipes';
import { SfrLoaderUiModule } from '../../presentational';
import { SfrImageAttachComponent } from './image-attach.component';

@NgModule({
  declarations: [SfrImageAttachComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    SfrRoundedButtonModule,
    FlexLayoutModule,
    SfrFileReaderPipeModule,
    SfrLoaderUiModule,
  ],
  exports: [SfrImageAttachComponent],
})
export class SfrImageUploadUiModule {}