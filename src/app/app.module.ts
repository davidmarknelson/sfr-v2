import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SfrAppRoutingModule } from './app-routing.module';
import { SfrAppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  declarations: [SfrAppComponent],
  imports: [
    BrowserModule,
    SfrAppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [SfrAppComponent],
})
export class SfrAppModule {}
