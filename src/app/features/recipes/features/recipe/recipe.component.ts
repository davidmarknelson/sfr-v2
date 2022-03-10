import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeGQL, RecipeQuery } from '@sfr/data-access/generated';
import { SfrAuthService, SfrTitleService } from '@sfr/shared/utils/services';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'sfr-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipeComponent {
  recipe$: Observable<RecipeQuery['recipe'] | null> =
    this.getRecipeFromRoute$();
  loading = true;
  error = false;
  decodedToken = this.authService.getTokenPayload();

  constructor(
    private recipeGQL: RecipeGQL,
    private route: ActivatedRoute,
    private authService: SfrAuthService,
    private readonly titleService: SfrTitleService
  ) {}

  private getRecipeFromRoute$(): Observable<RecipeQuery['recipe'] | null> {
    return this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('name') || ''),
      switchMap((name) => this.recipeGQL.watch({ name }).valueChanges),
      map(({ data, loading }) => {
        this.loading = loading;

        return data.recipe;
      }),
      tap((recipe) => {
        this.titleService.setTabTitle(recipe.name);
      }),
      catchError(() => {
        this.error = true;
        return of(null);
      })
    );
  }
}
