import { Component, OnInit } from '@angular/core';
import { RecipesGQL, RecipesQuery } from '@sfr/data-access/generated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sfr-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class SfrRecipesComponent implements OnInit {
  recipes$: Observable<RecipesQuery['recipes']> = this.recipesGQL
    .watch({ skip: 0, take: 9 })
    .valueChanges.pipe(map(({ data }) => data.recipes));

  constructor(private recipesGQL: RecipesGQL) {}

  ngOnInit(): void {
    this.recipesGQL
      .watch({ skip: 0, take: 9 })
      .valueChanges.subscribe(console.log);
  }
}
