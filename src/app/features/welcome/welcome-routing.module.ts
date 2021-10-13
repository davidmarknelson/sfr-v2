import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SfrWelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '',
    component: SfrWelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfrWelcomeRoutingModule {}
