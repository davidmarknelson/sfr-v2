import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SfrContainerUiModule } from '@sfr/shared/ui/presentational';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';
import { SfrWelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [
    CommonModule,
    SfrWelcomeRoutingModule,
    MatButtonModule,
    SfrContainerUiModule,
    SfrRoundedButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class SfrWelcomeFeatureModule {}
