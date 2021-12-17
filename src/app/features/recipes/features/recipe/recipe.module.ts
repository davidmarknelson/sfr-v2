import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
} from '@sfr/shared/ui';
import { SfrUiPageTitleModule } from '@sfr/shared/ui/page-title/ui-page-title.module';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
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
    FlexLayoutModule,
    MatButtonModule,
    SfrRoundedButtonModule,
  ],
})
export class SfrRecipeFeatureModule {}
