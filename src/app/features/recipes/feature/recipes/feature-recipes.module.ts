import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrUiRecipesGridModule } from '../../ui/recipes-grid/ui-recipes-grid.module';
import { SfrRecipesRoutingModule } from './recipes-routing.module';
import { SfrRecipesComponent } from './recipes.component';

@NgModule({
  declarations: [SfrRecipesComponent],
  imports: [CommonModule, SfrRecipesRoutingModule, SfrUiRecipesGridModule],
})
export class SfrFeatureRecipesModule {}