import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrRecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: SfrRecipesComponent,
  },
  {
    path: ':name',
    loadChildren: () =>
      import('../recipe/feature-recipe.module').then(
        (m) => m.SfrFeatureRecipeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfrRecipesRoutingModule {}
