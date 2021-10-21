import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrLoaderComponent } from './loader.component';

@NgModule({
  declarations: [SfrLoaderComponent],
  imports: [CommonModule],
  exports: [SfrLoaderComponent],
})
export class SfrUiLoaderModule {}
