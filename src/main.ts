// src/main.ts
import { bootstrapApplication }    from '@angular/platform-browser';
import { importProvidersFrom }     from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter }           from '@angular/router';
import { HttpClientModule }        from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // BrowserModule bringt CommonModule & Co.
    // HttpClientModule stellt HttpClient bereit
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),
    // Routing
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));
