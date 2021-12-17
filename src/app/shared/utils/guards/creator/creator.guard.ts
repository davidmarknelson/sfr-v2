import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { RecipeGQL } from '@sfr/data-access/generated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SfrAuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class SfrCreatorGuard implements CanActivate {
  constructor(
    private authService: SfrAuthService,
    private recipeGQL: RecipeGQL
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.recipeGQL
      .fetch({ name: route.paramMap.get('name')! })
      .pipe(
        map(
          ({ data }) =>
            data.recipe.creator.id === this.authService.getTokenPayload()?.sub
        )
      );
  }
}
