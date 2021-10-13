import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SfrHeaderComponent } from './header/header.component';
import { SfrFooterComponent } from './footer/footer.component';
import { SfrViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SfrHeaderComponent, SfrFooterComponent, SfrViewComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule],
})
export class SfrViewModule {}
