import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SubscribesRoutingModule } from './subscribes/subsribes-routing.module';
// import { CoreRoutingModule } from './core/core.routing.module';

const routes: Routes = [
  // ...SubscribesRoutingModule
  { path: '', loadChildren: () => import('./subscribes/subscribes.module').then(m => m.SubscribesModule) },
  { path: 'auth', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
