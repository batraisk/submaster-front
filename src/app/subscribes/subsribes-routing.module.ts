import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPageComponent} from './new-page/new-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'subscribe-pages/new', component: NewPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribesRoutingModule { }
