import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrRecipeComponent } from './recipe.component';

const routes: SfrRoutes = [
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
