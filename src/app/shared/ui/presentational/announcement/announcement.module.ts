import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrUiAnnouncementComponent } from './announcement.component';

@NgModule({
  declarations: [SfrUiAnnouncementComponent],
  imports: [CommonModule],
  exports: [SfrUiAnnouncementComponent],
})
export class SfrAnnouncementUiModule {}
