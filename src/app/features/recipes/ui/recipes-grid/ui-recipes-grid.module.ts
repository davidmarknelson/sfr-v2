import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { SfrUiAnnouncementModule } from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
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
    MatButtonModule,
    SfrRoundedButtonModule,
    SfrRecipePhotoPipeModule,
    SfrUiAnnouncementModule,
    MatIconModule,
    RouterModule,
    SfrUrlReplaceSpaceModule,
    FlexLayoutModule,
  ],
  exports: [SfrRecipesGridComponent],
})
export class SfrUiRecipesGridModule {}
