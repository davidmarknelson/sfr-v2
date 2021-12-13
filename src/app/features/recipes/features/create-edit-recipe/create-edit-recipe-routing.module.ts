import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrCreateEditRecipeComponent } from './create-edit-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: SfrCreateEditRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditRecipeRoutingModule {}
