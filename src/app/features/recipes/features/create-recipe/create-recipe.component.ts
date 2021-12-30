import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { CreateRecipeGQL, RecipeInput } from '@sfr/data-access/generated';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';

@Component({
  selector: 'sfr-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrCreateRecipeComponent {
  errorMessage?: string;

  constructor(
    private router: Router,
    private createRecipeGQL: CreateRecipeGQL,
    private urlReplaceSpace: SfrUrlReplaceSpacePipe,
    private cd: ChangeDetectorRef
  ) {}

  createRecipe(recipeInput: RecipeInput): void {
    this.createRecipeGQL
      .mutate(
        {
          recipe: recipeInput,
        },
        { errorPolicy: 'all' }
      )
      .subscribe(({ data, errors }) => {
        if (!errors) {
          this.router.navigate([
            'recipes',
            this.urlReplaceSpace.transform(data?.createRecipe.name!),
          ]);
        } else {
          this.errorMessage = errors[0].extensions?.response.message;
          this.cd.detectChanges();
        }
      });
  }
}
