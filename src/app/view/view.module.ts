import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SfrContainerUiModule } from '@sfr/shared/ui/presentational';
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
    SfrContainerUiModule,
    MatButtonModule,
    SfrRoundedButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class SfrViewModule {}
