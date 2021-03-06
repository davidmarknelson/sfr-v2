import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  SfrAnnouncementUiModule,
  SfrButtonModule,
  SfrCarouselUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrRecipePhotoPipeModule } from '@sfr/shared/utils/pipes';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SfrRecipeComponent } from './recipe.component';

@NgModule({
  declarations: [SfrRecipeComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrLoaderUiModule,
    SfrAnnouncementUiModule,
    SfrRecipePhotoPipeModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    SfrButtonModule,
    SfrCarouselUiModule,
  ],
})
export class SfrRecipeFeatureModule {}
