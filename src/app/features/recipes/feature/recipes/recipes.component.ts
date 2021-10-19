import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RecipesAndCountGQL,
  RecipesAndCountQuery,
} from '@sfr/data-access/generated';
import { PaginationDefault } from '@sfr/shared/utils';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sfr-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesComponent {
  recipesAndCount$: Observable<RecipesAndCountQuery['recipesAndCount']> =
    this.getRecipesWithSkipAndTake$();

  constructor(
    private recipesAndCountGQL: RecipesAndCountGQL,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  updatePagination(pageEvent: PageEvent): void {
    const skip: number =
      pageEvent.pageSize * (pageEvent.pageIndex + 1) - pageEvent.pageSize;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { skip, take: pageEvent.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  private getRecipesWithSkipAndTake$(): Observable<
    RecipesAndCountQuery['recipesAndCount']
  > {
    return combineLatest([
      this.getSkipFromRoute$(),
      this.getTakeFromRoute$(),
    ]).pipe(
      distinctUntilChanged(),
      switchMap(([skip, take]) => {
        return this.recipesAndCountGQL.watch({ skip, take }).valueChanges;
      }),
      map(({ data }) => data.recipesAndCount)
    );
  }

  private getSkipFromRoute$(): Observable<number> {
    return this.route.queryParamMap.pipe(
      map((paramMap) => +(paramMap.get('skip') || 0))
    );
  }

  private getTakeFromRoute$(): Observable<number> {
    return this.route.queryParamMap.pipe(
      map((paramMap) => +(paramMap.get('take') || PaginationDefault.pageSize))
    );
  }
}
