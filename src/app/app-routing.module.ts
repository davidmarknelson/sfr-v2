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
          import('./features/welcome/welcome.module').then(
            (m) => m.SfrWelcomeFeatureModule
          ),
      },
      {
        path: 'recipes/:name',
        loadChildren: () =>
          import('./features/recipes/features/recipe/recipe.module').then(
            (m) => m.SfrRecipeFeatureModule
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./features/recipes/features/recipes/recipes.module').then(
            (m) => m.SfrRecipesFeatureModule
          ),
      },
      {
        path: 'create-recipe',
        canActivate: [SfrAuthenticatedGuard],
        loadChildren: () =>
          import(
            './features/recipes/features/create-recipe/create-recipe.module'
          ).then((m) => m.SfrCreateRecipeFeatureModule),
      },
      {
        path: 'signup',
        canActivate: [SfrUnauthenticatedGuard],
        loadChildren: () =>
          import('./features/auth/features/signup/signup.module').then(
            (m) => m.SfrSignupFeatureModule
          ),
      },
      {
        path: 'login',
        canActivate: [SfrUnauthenticatedGuard],
        loadChildren: () =>
          import('./features/auth/features/login/login.module').then(
            (m) => m.SfrLoginFeatureModule
          ),
      },
      {
        path: 'profile',
        canActivate: [SfrAuthenticatedGuard],
        loadChildren: () =>
          import('./features/auth/features/profile/profile.module').then(
            (m) => m.SfrProfileFeatureModule
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
