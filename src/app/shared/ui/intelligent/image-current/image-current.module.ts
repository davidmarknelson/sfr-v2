import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SfrButtonModule } from '../../presentational';
import { SfrImageCurrentComponent } from './image-current.component';

@NgModule({
  declarations: [SfrImageCurrentComponent],
  imports: [CommonModule, SfrButtonModule, FlexLayoutModule],
  exports: [SfrImageCurrentComponent],
})
export class SfrImageCurrentUiModule {}
