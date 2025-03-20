import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/auth/login/login.component';
import { RegisterComponent } from './presentation/pages/auth/register/register.component';
import { ActivityMessagesComponent } from './presentation/pages/activity-messages/activity-messages.component';
import { adminRoutes } from './presentation/pages/admin/admin.routes';
import { agentRoutes } from './presentation/pages/agent/agent.routes';
import { PropertyListComponent } from './presentation/pages/properties/property-list/property-list.component';
import { AccountSetupFormComponent } from './presentation/pages/properties/publish-property/account-setup-form/account-setup-form.component';
import { MainComponent } from './presentation/pages/properties/publish-property/main/main.component';

export const routes: Routes = [
  // Rutas principales
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'activity-messages',
        component: ActivityMessagesComponent,
      },
      {
        path: 'account-setup',
        component: AccountSetupFormComponent,
      },
      {
        path: 'property',
        children: [
          {
            path: 'publish',
            component: MainComponent,
          },
          {
            path: 'list',
            component: PropertyListComponent,
          },
          {
            path: '**',
            redirectTo: 'publish',
          },
        ],
      },
      {
        path: 'admin',
        children: adminRoutes,
      },
      {
        path: 'agent',
        children: agentRoutes,
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
  // Wildcard route
  {
    path: '**',
    redirectTo: 'home',
  },
];
