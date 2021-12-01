import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SfrAppRoutingModule } from './app-routing.module';
import { SfrAppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { PaginationConstants } from './shared/utils/constants';
import { SfrAuthService } from './shared/utils/services';
import { SfrViewModule } from './view/view.module';

@NgModule({
  declarations: [SfrAppComponent],
  imports: [
    BrowserModule,
    SfrAppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SfrViewModule,
    GraphQLModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: SfrAuthService) => {
        return () => authService.refreshOrClearToken$();
      },
      multi: true,
      deps: [SfrAuthService],
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: PaginationConstants,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [SfrAppComponent],
})
export class SfrAppModule {}
