import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrUrlReplaceSpacePipe } from './url-replace-space.pipe';

@NgModule({
  declarations: [SfrUrlReplaceSpacePipe],
  imports: [CommonModule],
  exports: [SfrUrlReplaceSpacePipe],
})
export class SfrUrlReplaceSpaceModule {}
