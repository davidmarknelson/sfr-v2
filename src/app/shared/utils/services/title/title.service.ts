import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SfrTitleService {
  constructor(
    private readonly pageTitle: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  /** Sets the formatted tab title by appending | Share Family Recipes */
  setTabTitle(title: string): void {
    this.pageTitle.setTitle(`${title} | Share Family Recipes`);
  }

  /** Listens to navigation changes and sets the title if the title is in the data object */
  setTabTitles(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getRouteTitle(this.route.snapshot);
        if (title) {
          this.setTabTitle(title);
        }
      });
  }

  private getRouteTitle(route: ActivatedRouteSnapshot): string | null {
    if (route.firstChild || route.data.title) {
      if (route.data.title || route.firstChild!.data.title) {
        return route.data.title || route.firstChild!.data.title;
      } else {
        return this.getRouteTitle(route.firstChild!);
      }
    } else {
      return null;
    }
  }
}
