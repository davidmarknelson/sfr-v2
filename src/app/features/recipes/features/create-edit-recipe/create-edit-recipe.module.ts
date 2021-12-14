import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SfrUiContainerModule, SfrUiPageTitleModule } from '@sfr/shared/ui';
import { CreateEditRecipeRoutingModule } from './create-edit-recipe-routing.module';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

@NgModule({
  declarations: [SfrCreateEditRecipeComponent],
  imports: [
    CommonModule,
    CreateEditRecipeRoutingModule,
    SfrUiContainerModule,
    SfrUiPageTitleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
  ],
})
export class SfrCreateEditRecipeFeatureModule {}
