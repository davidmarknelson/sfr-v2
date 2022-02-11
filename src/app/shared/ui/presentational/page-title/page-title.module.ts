import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrPageTitleComponent } from './page-title.component';

@NgModule({
  declarations: [SfrPageTitleComponent],
  imports: [CommonModule],
  exports: [SfrPageTitleComponent],
})
export class SfrPageTitleUiModule {}
