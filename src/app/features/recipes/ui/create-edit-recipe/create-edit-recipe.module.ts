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
  SfrImageCurrentUiModule,
  SfrImageUploadUiModule,
} from '@sfr/shared/ui/intelligent';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

@NgModule({
  declarations: [SfrCreateEditRecipeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    MatIconModule,
    SfrImageUploadUiModule,
    SfrImageCurrentUiModule,
  ],
  exports: [SfrCreateEditRecipeComponent],
})
export class SfrCreateEditRecipeUiModule {}
