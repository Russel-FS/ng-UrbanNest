import { Routes } from '@angular/router';

export const agentRoutes: Routes = [
  {
    path: 'reviews',
    loadComponent: () => import('./property-review/property-review.component')
      .then(m => m.PropertyReviewComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./review-history/review-history.component')
      .then(m => m.ReviewHistoryComponent)
  },
  { path: '', redirectTo: 'reviews', pathMatch: 'full' }
];