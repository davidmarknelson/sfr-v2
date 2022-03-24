import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { ProfileRoutingModule } from './profile-routing.module';
import { SfrProfileComponent } from './profile.component';

@NgModule({
  declarations: [SfrProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SfrPageTitleUiModule,
    SfrContainerUiModule,
    SfrLoaderUiModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class SfrProfileFeatureModule {}
