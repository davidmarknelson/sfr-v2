import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrRoundedButtonDirective } from './rounded-button.directive';

@NgModule({
  declarations: [SfrRoundedButtonDirective],
  imports: [CommonModule],
  exports: [SfrRoundedButtonDirective],
})
export class SfrRoundedButtonModule {}
