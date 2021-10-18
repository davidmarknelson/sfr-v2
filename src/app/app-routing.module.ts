import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrViewComponent } from './view';

const routes: Routes = [
  {
    path: '',
    component: SfrViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./features/welcome').then((m) => m.SfrFeatureWelcomeModule),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./features/recipes/feature/recipes').then(
            (m) => m.SfrFeatureRecipesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SfrAppRoutingModule {}
