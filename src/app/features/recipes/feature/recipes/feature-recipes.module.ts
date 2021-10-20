import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrUiPageTitleModule } from '@sfr/shared/ui/page-title/ui-page-title.module';
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
  ],
})
export class SfrFeatureRecipesModule {}
