import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sfr-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrContainerComponent {
  @Input() isSmall = false;
}
