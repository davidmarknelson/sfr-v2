import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrFooterComponent } from './footer/footer.component';
import { SfrHeaderComponent } from './header/header.component';
import { SfrViewComponent } from './view/view.component';

@NgModule({
  declarations: [SfrHeaderComponent, SfrFooterComponent, SfrViewComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, SfrUiContainerModule],
})
export class SfrViewModule {}
