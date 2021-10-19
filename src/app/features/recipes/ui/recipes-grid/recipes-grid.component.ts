import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipesQuery } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesGridComponent {
  @Input() recipes!: RecipesQuery['recipes'] | null;
}
