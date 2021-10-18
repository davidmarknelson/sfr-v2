import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrUiRecipeCardModule } from '../recipe-card/ui-recipe-card.module';
import { SfrRecipesGridComponent } from './recipes-grid.component';

@NgModule({
  declarations: [SfrRecipesGridComponent],
  imports: [CommonModule, SfrUiRecipeCardModule, SfrUiContainerModule],
  exports: [SfrRecipesGridComponent],
})
export class SfrUiRecipesGridModule {}
