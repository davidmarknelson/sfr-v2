import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SfrDirectivesModule } from '@sfr/shared/utils';
import { SfrRecipeCardComponent } from './recipe-card/recipe-card.component';
import { SfrRecipesGridComponent } from './recipes-grid.component';

@NgModule({
  declarations: [SfrRecipesGridComponent, SfrRecipeCardComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    SfrDirectivesModule,
  ],
  exports: [SfrRecipesGridComponent],
})
export class SfrUiRecipesGridModule {}
