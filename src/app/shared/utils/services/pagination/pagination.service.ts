import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationDefault } from '../..';

@Injectable({
  providedIn: 'root',
})
export class SfrPaginationService {
  constructor(private route: ActivatedRoute) {}

  get getPageFromRoute$(): Observable<number> {
    return this.route.queryParamMap.pipe(
      map((paramMap) => +(paramMap.get('page') || 1))
    );
  }

  getSkip(page: number): number {
    return (page - 1) * PaginationDefault.pageSize;
  }
}
