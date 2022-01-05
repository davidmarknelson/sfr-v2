import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCreateEditRecipeUiModule } from '../../ui/create-edit-recipe/create-edit-recipe.module';
import { EditRecipeRoutingModule } from './edit-recipe-routing.module';
import { SfrEditRecipeComponent } from './edit-recipe.component';

@NgModule({
  declarations: [SfrEditRecipeComponent],
  imports: [
    CommonModule,
    EditRecipeRoutingModule,
    SfrUiLoaderModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrCreateEditRecipeUiModule,
    SfrUiAnnouncementModule,
  ],
  providers: [SfrUrlReplaceSpacePipe],
})
export class SfrEditRecipeFeatureModule {}
