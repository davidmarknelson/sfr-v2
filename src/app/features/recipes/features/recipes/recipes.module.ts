import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRecipesGridUiModule } from '../../ui/recipes-grid/recipes-grid.module';
import { SfrRecipesRoutingModule } from './recipes-routing.module';
import { SfrRecipesComponent } from './recipes.component';

@NgModule({
  declarations: [SfrRecipesComponent],
  imports: [
    CommonModule,
    SfrRecipesRoutingModule,
    SfrRecipesGridUiModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrLoaderUiModule,
  ],
})
export class SfrRecipesFeatureModule {}
