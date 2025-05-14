import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }       from '@angular/router';
import { provideHttpClient }   from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent }        from './app/app.component';
import { routes }              from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                          // Routing
    provideHttpClient(),                            // HttpClient für ApiService/AuthService
    importProvidersFrom(FormsModule, ReactiveFormsModule) // Forms & Reactive Forms
  ]
}).catch(err => console.error(err));
