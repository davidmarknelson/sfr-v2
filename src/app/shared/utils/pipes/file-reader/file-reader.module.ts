import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrFileReaderPipe } from './file-reader.pipe';

@NgModule({
  declarations: [SfrFileReaderPipe],
  imports: [CommonModule],
  exports: [SfrFileReaderPipe],
})
export class SfrFileReaderPipeModule {}
