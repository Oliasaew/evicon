import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthResolver } from './auth/auth.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    resolve: { authStatus: AuthResolver },
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard], // Protect the child routes with AuthGuard
  },
];
