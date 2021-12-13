import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateEditRecipeRoutingModule } from './create-edit-recipe-routing.module';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

@NgModule({
  declarations: [SfrCreateEditRecipeComponent],
  imports: [CommonModule, CreateEditRecipeRoutingModule],
})
export class SfrCreateEditRecipeFeatureModule {}
