import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./user-management/user-management.component')
      .then(m => m.UserManagementComponent)
  },
  {
    path: 'config',
    loadComponent: () => import('./system-config/system-config.component')
      .then(m => m.SystemConfigComponent)
  },
  {
    path: 'reports',

    loadComponent: () => import('./reports/reports.component')
      .then(m => m.ReportsComponent)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
