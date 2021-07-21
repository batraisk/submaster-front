import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPageComponent} from './new-page/new-page.component';
import {PageInfoComponent} from './page-info/page-info.component';
import {DomainBindingComponent} from './domain-binding/domain-binding.component';
import {AccountComponent} from './account/account.component';
// @ts-ignore
import {AuthenticationGuard} from '@core-services';

const routes: Routes = [
  {
    path: 'subscribe-pages',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'new',
        component: NewPageComponent,
      }, {
        path: ':id',
        component: PageInfoComponent,
      },
      ]
  },
  {
    path: 'account',
    canActivate: [AuthenticationGuard],
    component: AccountComponent,
  },
  {
    path: 'domains',
    canActivate: [AuthenticationGuard],
    component: DomainBindingComponent,
  },
  // {
  //   path: 'subscribe-pages',
  //   canActivate: [AuthenticationGuard],
  //   component: DashboardComponent
  // },
  // { path: 'subscribe-pages/new', component: NewPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'subscribes-pages' },
  { canActivate: [AuthenticationGuard], path: 'subscribes-pages', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribesRoutingModule { }
