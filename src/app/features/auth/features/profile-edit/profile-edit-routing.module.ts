import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrProfileEditComponent } from './profile-edit.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrProfileEditComponent,
    data: {
      title: 'Edit Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEditRoutingModule {}
