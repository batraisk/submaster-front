import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPageComponent} from './new-page/new-page.component';
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
      },
      ]
  },
  // { path: 'subscribe-pages/new', component: NewPageComponent },
  { canActivate: [AuthenticationGuard], path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribesRoutingModule { }
