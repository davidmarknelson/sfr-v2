import { Component, OnInit } from '@angular/core';
import { RecipesGQL } from './data-access/generated';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private recipesGQL: RecipesGQL) {}

  ngOnInit(): void {
    this.recipesGQL
      .watch()
      .valueChanges.pipe(
        map(({ data }) => data),
        tap(console.log)
      )
      .subscribe();
  }
}
