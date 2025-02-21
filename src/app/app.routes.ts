import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/auth/login/login.component';
import { RegisterComponent } from './presentation/pages/auth/register/register.component';
import { ActivityMessagesComponent } from './presentation/pages/activity-messages/activity-messages.component';
import { adminRoutes } from './presentation/pages/admin/admin.routes';
import { agentRoutes } from './presentation/pages/agent/agent.routes';

export const routes: Routes = [
  {
    path: 'admin',
    children: adminRoutes,
  },
  {
    path: 'agent',
    children: agentRoutes,
  },
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
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
