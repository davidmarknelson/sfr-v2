import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { SfrProfileEditComponent } from './profile-edit.component';

@NgModule({
  declarations: [SfrProfileEditComponent],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    SfrPageTitleUiModule,
    SfrContainerUiModule,
    SfrLoaderUiModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SfrAnnouncementUiModule,
  ],
})
export class SfrProfileEditFeatureModule {}
