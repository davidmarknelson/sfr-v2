import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrEditRecipeComponent } from './edit-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: SfrEditRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRecipeRoutingModule {}
