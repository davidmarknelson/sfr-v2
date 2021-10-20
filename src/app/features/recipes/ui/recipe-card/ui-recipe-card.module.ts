import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SfrDirectivesModule } from '@sfr/shared/utils';
import { SfrRecipeCardComponent } from './recipe-card.component';

@NgModule({
  declarations: [SfrRecipeCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, SfrDirectivesModule],
  exports: [SfrRecipeCardComponent],
})
export class SfrUiRecipeCardModule {}
