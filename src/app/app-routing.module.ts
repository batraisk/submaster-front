import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { subscribesRouting } from './subscribes/subsribes-routing.module';

const routes: Routes = [
  // ...subscribesRouting
  // { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', loadChildren: () => import('./subscribes/subscribes.module').then(m => m.SubscribesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
