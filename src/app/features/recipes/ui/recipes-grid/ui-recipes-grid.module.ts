import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SfrUiRecipeCardModule } from '../recipe-card/ui-recipe-card.module';
import { SfrRecipesGridComponent } from './recipes-grid.component';

@NgModule({
  declarations: [SfrRecipesGridComponent],
  imports: [CommonModule, SfrUiRecipeCardModule, MatPaginatorModule],
  exports: [SfrRecipesGridComponent],
})
export class SfrUiRecipesGridModule {}
