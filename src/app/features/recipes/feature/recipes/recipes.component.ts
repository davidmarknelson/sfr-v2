import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  RecipesAndCountGQL,
  RecipesAndCountQuery,
} from '@sfr/data-access/generated';
import { PaginationDefault, SfrPaginationService } from '@sfr/shared/utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sfr-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesComponent {
  recipesAndCount$: Observable<RecipesAndCountQuery['recipesAndCount']> =
    this.getRecipesWithSkipAndTake$();
  page$: Observable<number> = this.paginationService.getPageFromRoute$;

  constructor(
    private recipesAndCountGQL: RecipesAndCountGQL,
    private paginationService: SfrPaginationService,
    private router: Router
  ) {}

  updatePagination(pageEvent: PageEvent): void {
    this.router.navigate([], {
      queryParams: {
        page: pageEvent.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  private getRecipesWithSkipAndTake$(): Observable<
    RecipesAndCountQuery['recipesAndCount']
  > {
    return this.paginationService.getPageFromRoute$.pipe(
      switchMap((page) => {
        return this.recipesAndCountGQL.watch({
          skip: this.paginationService.getSkip(page),
          take: PaginationDefault.pageSize,
        }).valueChanges;
      }),
      map(({ data }) => data.recipesAndCount)
    );
  }
}
