import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
} from '@sfr/shared/ui';
import { SfrUiPageTitleModule } from '@sfr/shared/ui/page-title/ui-page-title.module';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SfrRecipeComponent } from './recipe.component';

@NgModule({
  declarations: [SfrRecipeComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrUiLoaderModule,
    SfrUiAnnouncementModule,
    SfrRecipePhotoPipeModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class SfrFeatureRecipeModule {}
