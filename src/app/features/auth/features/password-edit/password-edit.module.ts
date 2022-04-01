import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { PasswordEditRoutingModule } from './password-edit-routing.module';
import { SfrPasswordEditComponent } from './password-edit.component';

@NgModule({
  declarations: [SfrPasswordEditComponent],
  imports: [
    CommonModule,
    PasswordEditRoutingModule,
    SfrContainerUiModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SfrAnnouncementUiModule,
    SfrPageTitleUiModule,
    MatIconModule,
  ],
})
export class SfrPasswordEditFeatureModule {}
