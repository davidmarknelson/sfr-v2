import { Component, OnInit } from '@angular/core';
import { RecipesGQL } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class SfrRecipesComponent implements OnInit {
  constructor(private recipesGQL: RecipesGQL) {}

  ngOnInit(): void {
    this.recipesGQL.watch().valueChanges.subscribe(console.log);
  }
}
