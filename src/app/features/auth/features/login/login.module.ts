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
import { LoginRoutingModule } from './login-routing.module';
import { SfrLoginComponent } from './login.component';

@NgModule({
  declarations: [SfrLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrButtonModule,
    MatIconModule,
    SfrAnnouncementUiModule,
    FlexLayoutModule,
  ],
})
export class SfrLoginFeatureModule {}
