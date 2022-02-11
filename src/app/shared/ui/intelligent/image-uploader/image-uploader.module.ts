import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SfrImageUploaderComponent } from './image-uploader.component';

@NgModule({
  declarations: [SfrImageUploaderComponent],
  imports: [CommonModule, MatDialogModule, MatProgressBarModule],
  exports: [SfrImageUploaderComponent],
})
export class SfrImageUploaderUiModule {}
