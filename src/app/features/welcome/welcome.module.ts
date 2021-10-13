import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfrWelcomeComponent } from './welcome.component';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [CommonModule, SfrWelcomeRoutingModule],
})
export class SfrWelcomeModule {}
