import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SfrUiContainerModule } from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrFooterComponent } from './footer/footer.component';
import { SfrHeaderComponent } from './header/header.component';
import { SfrViewComponent } from './view/view.component';

@NgModule({
  declarations: [SfrHeaderComponent, SfrFooterComponent, SfrViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    SfrUiContainerModule,
    MatButtonModule,
    SfrRoundedButtonModule,
  ],
})
export class SfrViewModule {}
