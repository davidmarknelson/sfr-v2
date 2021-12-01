import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SfrProfileComponent } from './profile.component';

@NgModule({
  declarations: [SfrProfileComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class SfrFeatureProfileModule {}
