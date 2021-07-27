import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {ForgotComponent} from './components/authentication/forgot/forgot.component';
import {EditPasswordComponent} from './components/authentication/edit-password/edit-password.component';
import {BalanceComponent} from './components/balance/balance.component';


const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot', component: ForgotComponent },
  { path: 'auth/edit', component: EditPasswordComponent },
  { path: 'balance', component: BalanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
