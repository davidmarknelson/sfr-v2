import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SfrContainerModule } from '@sfr/shared/ui';
import { SfrDirectivesModule } from '@sfr/shared/utils';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';
import { SfrWelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [
    CommonModule,
    SfrWelcomeRoutingModule,
    MatButtonModule,
    SfrDirectivesModule,
    SfrContainerModule,
  ],
})
export class SfrWelcomeModule {}
