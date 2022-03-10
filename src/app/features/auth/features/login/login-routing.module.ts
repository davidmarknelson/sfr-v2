import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrLoginComponent } from './login.component';

const routes: SfrRoutes = [
  { path: '', component: SfrLoginComponent, data: { title: 'Login' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
