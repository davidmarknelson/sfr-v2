import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrCreateRecipeComponent } from './create-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: SfrCreateRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRecipeRoutingModule {}
