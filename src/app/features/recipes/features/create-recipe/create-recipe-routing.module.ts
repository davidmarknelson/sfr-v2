import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrCreateRecipeComponent } from './create-recipe.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrCreateRecipeComponent,
    data: {
      title: 'Create Recipe',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRecipeRoutingModule {}
