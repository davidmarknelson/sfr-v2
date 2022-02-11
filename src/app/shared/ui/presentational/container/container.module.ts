import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrContainerComponent } from './container.component';

@NgModule({
  declarations: [SfrContainerComponent],
  imports: [CommonModule],
  exports: [SfrContainerComponent],
})
export class SfrContainerUiModule {}
