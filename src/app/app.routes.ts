import { Routes } from '@angular/router';
import { SplashComponent }       from './splash/splash.component';
import { LoginComponent }        from './auth/login/login.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { AuthGuard }             from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '',               component: SplashComponent },
  { path: 'login',          component: LoginComponent },
  { path: 'customers',      component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/form', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'customers/form/:id', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
