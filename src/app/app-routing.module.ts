import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrUnauthenticatedGuard } from './shared/utils/guards';
import { SfrAuthenticatedGuard } from './shared/utils/guards/authenticated/authenticated.guard';
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
        path: 'recipes/:name',
        loadChildren: () =>
          import(
            './features/recipes/feature/recipe/feature-recipe.module'
          ).then((m) => m.SfrFeatureRecipeModule),
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
        canActivate: [SfrUnauthenticatedGuard],
        loadChildren: () =>
          import('./features/auth/feature/signup/feature-signup.module').then(
            (m) => m.SfrFeatureSignupModule
          ),
      },
      {
        path: 'login',
        canActivate: [SfrUnauthenticatedGuard],
        loadChildren: () =>
          import('./features/auth/feature/login/login.module').then(
            (m) => m.SfrFeatureLoginModule
          ),
      },
      {
        path: 'profile',
        canActivate: [SfrAuthenticatedGuard],
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
