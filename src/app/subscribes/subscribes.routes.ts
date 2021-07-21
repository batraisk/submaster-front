import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPageComponent} from './new-page/new-page.component';

const routes: Routes = [
  {
    path: 'subscribe-pages',
    // component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages'
      },
      {
        path: 'pages',
        component: DashboardComponent
      },
      {
        path: 'new',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'send-email'
          },
          {
            path: '',
            component: NewPageComponent
          }
        ]
      },
    ]
  }
];

export const subscribesRouting: Routes = [
  ...routes
];

export const routing: ModuleWithProviders<any> = RouterModule.forChild(subscribesRouting);
