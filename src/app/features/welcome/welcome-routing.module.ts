import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrWelcomeComponent } from './welcome.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrWelcomeComponent,
    data: {
      title: 'Welcome',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfrWelcomeRoutingModule {}
