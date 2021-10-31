import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrUiRecipesGridModule } from '../../ui/recipes-grid/ui-recipes-grid.module';
import { SfrRecipesRoutingModule } from './recipes-routing.module';
import { SfrRecipesComponent } from './recipes.component';

@NgModule({
  declarations: [SfrRecipesComponent],
  imports: [
    CommonModule,
    SfrRecipesRoutingModule,
    SfrUiRecipesGridModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrUiLoaderModule,
  ],
})
export class SfrFeatureRecipesModule {}
