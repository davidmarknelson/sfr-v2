import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrViewComponent } from './ui/view';

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
            (m) => m.SfrWelcomeModule
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
