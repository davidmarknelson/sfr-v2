import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {
  SfrButtonModule,
  SfrContainerUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrWelcomeRoutingModule } from './welcome-routing.module';
import { SfrWelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [SfrWelcomeComponent],
  imports: [
    CommonModule,
    SfrWelcomeRoutingModule,
    SfrButtonModule,
    SfrContainerUiModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class SfrWelcomeFeatureModule {}
