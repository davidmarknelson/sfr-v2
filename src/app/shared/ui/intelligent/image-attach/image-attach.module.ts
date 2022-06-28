import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SfrFileReaderPipeModule } from '@sfr/shared/utils/pipes';
import { SfrButtonModule, SfrLoaderUiModule } from '../../presentational';
import { SfrImageAttachComponent } from './image-attach.component';

@NgModule({
  declarations: [SfrImageAttachComponent],
  imports: [
    CommonModule,
    SfrButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    SfrFileReaderPipeModule,
    SfrLoaderUiModule,
  ],
  exports: [SfrImageAttachComponent],
})
export class SfrImageUploadUiModule {}
