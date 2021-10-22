import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';
import { SfrWelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [
    CommonModule,
    SfrWelcomeRoutingModule,
    MatButtonModule,
    SfrUiContainerModule,
    SfrRoundedButtonModule,
  ],
})
export class SfrFeatureWelcomeModule {}
