import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
