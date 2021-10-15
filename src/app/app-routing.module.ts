import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrViewComponent } from './shared/ui';

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
          import('./features/welcome').then((m) => m.SfrWelcomeModule),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./features/recipes/features/recipes').then(
            (m) => m.SfrRecipesModule
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
