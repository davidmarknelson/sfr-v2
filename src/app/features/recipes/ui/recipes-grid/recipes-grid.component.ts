import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfr-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesGridComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
