import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  SfrAnnouncementUiModule,
  SfrButtonModule,
  SfrContainerUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { PasswordEditRoutingModule } from './password-edit-routing.module';
import { SfrPasswordEditComponent } from './password-edit.component';

@NgModule({
  declarations: [SfrPasswordEditComponent],
  imports: [
    CommonModule,
    PasswordEditRoutingModule,
    SfrContainerUiModule,
    SfrButtonModule,
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
