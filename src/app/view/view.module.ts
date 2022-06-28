import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  SfrButtonModule,
  SfrContainerUiModule,
} from '@sfr/shared/ui/presentational';
import { SfrFooterComponent } from './footer/footer.component';
import { SfrHeaderComponent } from './header/header.component';
import { SfrViewComponent } from './view/view.component';

@NgModule({
  declarations: [SfrHeaderComponent, SfrFooterComponent, SfrViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    SfrContainerUiModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    SfrButtonModule,
  ],
})
export class SfrViewModule {}
