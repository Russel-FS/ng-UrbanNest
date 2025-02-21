import { Routes } from '@angular/router';

export const agentRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./property-review/property-review.component')
      .then(m => m.PropertyReviewComponent)
  },
  {
    path: 'details',
    loadComponent: () => import('./review-history/review-history.component')
      .then(m => m.ReviewHistoryComponent)
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];