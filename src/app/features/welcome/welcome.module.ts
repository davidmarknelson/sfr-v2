import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';
import { SfrWelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [CommonModule, SfrWelcomeRoutingModule, MatButtonModule],
})
export class SfrWelcomeModule {}
