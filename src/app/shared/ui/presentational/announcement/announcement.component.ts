import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sfr-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrUiAnnouncementComponent {}
