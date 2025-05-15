// src/main.ts
import { bootstrapApplication }      from '@angular/platform-browser';
import { provideAnimations }         from '@angular/platform-browser/animations';
import { provideRouter }             from '@angular/router';
import { MatToolbarModule }          from '@angular/material/toolbar';
import { MatMenuModule }             from '@angular/material/menu';
import { MatButtonModule }           from '@angular/material/button';
import { MatIconModule }             from '@angular/material/icon';
import { AppComponent }              from './app/app.component';
import { routes }                    from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    // Material-Module als Providers für Standalone-Components
    importProvidersFrom(
      MatToolbarModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule
    )
  ]
})
.catch(err => console.error(err));
