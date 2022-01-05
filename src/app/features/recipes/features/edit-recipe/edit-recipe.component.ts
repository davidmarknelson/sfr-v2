import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditRecipeGQL,
  RecipeGQL,
  RecipeInput,
  RecipeQuery,
} from '@sfr/data-access/generated';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface RecipeOrError {
  recipe: RecipeQuery['recipe'];
  error: string;
}

@Component({
  selector: 'sfr-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrEditRecipeComponent implements OnInit {
  recipeOrError$!: Observable<RecipeOrError | null>;
  errorMessage?: string;

  constructor(
    private editRecipeGQL: EditRecipeGQL,
    private route: ActivatedRoute,
    private router: Router,
    private urlReplaceSpace: SfrUrlReplaceSpacePipe,
    private cd: ChangeDetectorRef,
    private recipeGQL: RecipeGQL
  ) {}

  ngOnInit(): void {
    this.recipeOrError$ = this.getRecipeFromRoute$();
  }

  editRecipe(recipeId: number, recipeInput: RecipeInput): void {
    this.editRecipeGQL
      .mutate(
        {
          recipe: {
            id: recipeId,
            ...recipeInput,
          },
        },
        { errorPolicy: 'all' }
      )
      .subscribe(({ data, errors }) => {
        if (!errors) {
          this.router.navigate([
            'recipes',
            this.urlReplaceSpace.transform(data?.editRecipe.name!),
          ]);
        } else {
          this.errorMessage = errors[0].extensions?.response.message;
          this.cd.detectChanges();
        }
      });
  }

  private getRecipeFromRoute$(): Observable<RecipeOrError | null> {
    return this.route.paramMap.pipe(
      map((paramMap) => {
        return paramMap.get('name') || '';
      }),
      mergeMap((name) => {
        return this.recipeGQL.fetch({ name }).pipe(
          map(({ data, errors }) => {
            return {
              recipe: data?.recipe,
              error: errors ? errors[0]?.extensions?.response.message : null,
            };
          })
        );
      })
    );
  }
}
