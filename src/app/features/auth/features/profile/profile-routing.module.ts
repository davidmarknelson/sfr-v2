import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SfrRoutes } from '@sfr/shared/utils/types';
import { SfrProfileComponent } from './profile.component';

const routes: SfrRoutes = [
  {
    path: '',
    component: SfrProfileComponent,
    data: {
      title: 'Profile',
    },
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('../profile-edit/profile-edit.module').then(
        (m) => m.SfrProfileEditFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
