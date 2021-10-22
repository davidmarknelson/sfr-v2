import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sfr-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrWelcomeComponent {}
