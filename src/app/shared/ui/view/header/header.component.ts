import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sfr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrHeaderComponent {}
