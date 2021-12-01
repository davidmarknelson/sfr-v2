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
          import('./features/welcome/feature-welcome.module').then(
            (m) => m.SfrFeatureWelcomeModule
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import(
            './features/recipes/feature/recipes/feature-recipes.module'
          ).then((m) => m.SfrFeatureRecipesModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./features/auth/feature/signup/feature-signup.module').then(
            (m) => m.SfrFeatureSignupModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/auth/feature/profile/profile.module').then(
            (m) => m.SfrFeatureProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class SfrAppRoutingModule {}
