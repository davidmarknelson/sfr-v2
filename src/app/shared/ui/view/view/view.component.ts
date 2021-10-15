import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sfr-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrViewComponent {}
