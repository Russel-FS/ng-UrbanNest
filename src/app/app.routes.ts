import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/auth/login/login.component';
import { RegisterComponent } from './presentation/pages/auth/register/register.component';
import { ActivityMessagesComponent } from './presentation/pages/activity-messages/activity-messages.component';
import { adminRoutes } from './presentation/pages/admin/admin.routes';
import { agentRoutes } from './presentation/pages/agent/agent.routes';
import { PropertyFormComponent } from './presentation/pages/properties/property-form/property-form.component';
import { PropertyListComponent } from './presentation/pages/properties/property-list/property-list.component';
import { NotificationComponent } from './presentation/shared/components/notification/notification.component';

export const routes: Routes = [
  // Rutas de administración
  {
    path: 'admin',
    children: adminRoutes,
  },
  // Rutas de agentes
  {
    path: 'agent',
    children: agentRoutes,
  },
  // Rutas principales
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'activity-messages',
        component: ActivityMessagesComponent,
      },
    ],
  },
  // Rutas de autenticación
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'property-form',
    component: PropertyFormComponent,
  },
  {
    path: 'property-list',
    component: PropertyListComponent,
  },
  { 
    path: 'noty',
    component: NotificationComponent
  },
  // Redirección por defecto
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
