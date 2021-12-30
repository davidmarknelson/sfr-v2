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
import { CreateRecipeRoutingModule } from './create-recipe-routing.module';
import { SfrCreateRecipeComponent } from './create-recipe.component';

@NgModule({
  declarations: [SfrCreateRecipeComponent],
  imports: [
    CommonModule,
    CreateRecipeRoutingModule,
    SfrUiLoaderModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    SfrCreateEditRecipeUiModule,
    SfrUiAnnouncementModule,
  ],
  providers: [SfrUrlReplaceSpacePipe],
})
export class SfrCreateRecipeFeatureModule {}
