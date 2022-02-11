import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { EditRecipeRoutingModule } from './edit-recipe-routing.module';
import { SfrEditRecipeComponent } from './edit-recipe.component';

@NgModule({
  declarations: [SfrEditRecipeComponent],
  imports: [
    CommonModule,
    EditRecipeRoutingModule,
    SfrLoaderUiModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrCreateEditRecipeUiModule,
    SfrAnnouncementUiModule,
    MatDialogModule,
  ],
  providers: [SfrUrlReplaceSpacePipe],
})
export class SfrEditRecipeFeatureModule {}
