import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SfrButtonComponent } from './button.component';

@NgModule({
  declarations: [SfrButtonComponent],
  imports: [CommonModule, MatRippleModule],
  exports: [SfrButtonComponent],
})
export class SfrButtonModule {}
