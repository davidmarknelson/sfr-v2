import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SfrRecipesRoutingModule } from './recipes-routing.module';
import { SfrRecipesComponent } from './recipes.component';

@NgModule({
  declarations: [SfrRecipesComponent],
  imports: [CommonModule, SfrRecipesRoutingModule],
})
export class SfrRecipesModule {}
