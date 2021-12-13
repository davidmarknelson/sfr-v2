import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrSignupComponent } from './signup.component';

const routes: Routes = [
  {
    path: '',
    component: SfrSignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
