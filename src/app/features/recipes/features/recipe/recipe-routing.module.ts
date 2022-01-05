import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrRecipeComponent } from './recipe.component';

const routes: Routes = [
  {
    path: '',
    component: SfrRecipeComponent,
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('../edit-recipe/edit-recipe.module').then(
        (m) => m.SfrEditRecipeFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
