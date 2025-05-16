import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }       from '@angular/router';
import { provideAnimations }   from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatMenuModule }       from '@angular/material/menu';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { RouterModule }        from '@angular/router';
import { AppComponent }        from './app/app.component';
import { routes }              from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      RouterModule,
      MatToolbarModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule
    )
  ]
})
.catch(err => console.error(err));
