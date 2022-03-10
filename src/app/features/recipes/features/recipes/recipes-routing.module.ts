import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrRecipesComponent } from './recipes.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrRecipesComponent,
    data: {
      title: 'Recipes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfrRecipesRoutingModule {}
