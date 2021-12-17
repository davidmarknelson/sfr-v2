import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiLoaderModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
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
    MatSelectModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    MatIconModule,
    SfrUiAnnouncementModule,
    SfrUiLoaderModule,
  ],
  providers: [SfrUrlReplaceSpacePipe],
})
export class SfrCreateEditRecipeFeatureModule {}
