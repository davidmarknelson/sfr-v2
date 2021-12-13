import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrRecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: SfrRecipesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfrRecipesRoutingModule {}
