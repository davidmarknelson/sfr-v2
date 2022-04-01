import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrPasswordEditComponent } from './password-edit.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrPasswordEditComponent,
    data: {
      title: 'Edit Password',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordEditRoutingModule {}
