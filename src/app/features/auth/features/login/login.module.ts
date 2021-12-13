import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
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
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrRoundedButtonModule,
    MatButtonModule,
    MatIconModule,
    SfrUiAnnouncementModule,
    FlexLayoutModule,
  ],
})
export class SfrLoginFeatureModule {}
