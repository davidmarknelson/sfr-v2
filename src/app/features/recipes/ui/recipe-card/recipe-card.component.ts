import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipesQuery } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipeCardComponent {
  @Input() recipe!: RecipesQuery['recipes'][0];
}
