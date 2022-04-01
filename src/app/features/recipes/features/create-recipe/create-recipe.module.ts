import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SfrImageUploaderUiModule } from '@sfr/shared/ui/intelligent';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { CreateRecipeRoutingModule } from './create-recipe-routing.module';
import { SfrCreateRecipeComponent } from './create-recipe.component';

@NgModule({
  declarations: [SfrCreateRecipeComponent],
  imports: [
    CommonModule,
    CreateRecipeRoutingModule,
    SfrContainerUiModule,
    SfrPageTitleUiModule,
    SfrCreateEditRecipeUiModule,
    SfrAnnouncementUiModule,
    MatDialogModule,
    SfrImageUploaderUiModule,
    MatSnackBarModule,
  ],
  providers: [SfrUrlReplaceSpacePipe],
})
export class SfrCreateRecipeFeatureModule {}
