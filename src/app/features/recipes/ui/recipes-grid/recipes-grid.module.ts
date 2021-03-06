import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  SfrAnnouncementUiModule,
  SfrButtonModule,
} from '@sfr/shared/ui/presentational';
import {
  SfrRecipePhotoPipeModule,
  SfrUrlReplaceSpaceModule,
} from '@sfr/shared/utils/pipes';
import { SfrRecipeCardComponent } from './recipe-card/recipe-card.component';
import { SfrRecipesGridComponent } from './recipes-grid.component';

@NgModule({
  declarations: [SfrRecipesGridComponent, SfrRecipeCardComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    SfrButtonModule,
    SfrRecipePhotoPipeModule,
    SfrAnnouncementUiModule,
    MatIconModule,
    RouterModule,
    SfrUrlReplaceSpaceModule,
    FlexLayoutModule,
    MatTooltipModule,
  ],
  exports: [SfrRecipesGridComponent],
})
export class SfrRecipesGridUiModule {}
