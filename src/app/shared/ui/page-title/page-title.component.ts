import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sfr-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrPageTitleComponent {}
