import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {
  SfrButtonModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
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
    SfrButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class SfrProfileFeatureModule {}
