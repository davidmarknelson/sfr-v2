import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRecipesGridUiModule } from '../../ui/recipes-grid/recipes-grid.module';
import { SfrRecipesRoutingModule } from './recipes-routing.module';
import { SfrRecipesComponent } from './recipes.component';

@NgModule({
  declarations: [SfrRecipesComponent],
  imports: [
    CommonModule,
    SfrRecipesRoutingModule,
    SfrRecipesGridUiModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrUiLoaderModule,
  ],
})
export class SfrRecipesFeatureModule {}
