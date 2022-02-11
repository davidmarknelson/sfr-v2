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
import { SignupRoutingModule } from './signup-routing.module';
import { SfrSignupComponent } from './signup.component';

@NgModule({
  declarations: [SfrSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrRoundedButtonModule,
    MatButtonModule,
    MatIconModule,
    SfrAnnouncementUiModule,
    FlexLayoutModule,
  ],
})
export class SfrSignupFeatureModule {}
