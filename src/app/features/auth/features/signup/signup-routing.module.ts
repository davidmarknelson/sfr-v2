import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrSignupComponent } from './signup.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrSignupComponent,
    data: {
      title: 'Signup',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
