import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { SfrAppRoutingModule } from './app-routing.module';
import { SfrAppComponent } from './app.component';
import { PaginationDefault } from './shared/utils';
import { SfrViewModule } from './view/view.module';

@NgModule({
  declarations: [SfrAppComponent],
  imports: [
    BrowserModule,
    SfrAppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SfrViewModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
            headers: new HttpHeaders({
              'Access-Control-Allow-Credentials': 'http://localhost:3000',
            }),
          }),
        };
      },
      deps: [HttpLink],
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: PaginationDefault,
    },
  ],
  bootstrap: [SfrAppComponent],
})
export class SfrAppModule {}
