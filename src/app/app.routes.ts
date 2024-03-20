import { Routes } from '@angular/router';
import { SubscriptionManagementComponent } from './features/subscription-management/subscription-management.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'subscriptions',
  },
  {
    path: 'subscriptions',
    component: SubscriptionManagementComponent,
  },
  { path: '**', redirectTo: 'subscriptions' },
];
