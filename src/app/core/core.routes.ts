import {RouterModule, Routes} from '@angular/router';
import {authRouting} from './components/authentication/authentication.routing';
import {ModuleWithProviders} from '@angular/core';


export const coreRouting: Routes = [
  ...authRouting
];

export const routing: ModuleWithProviders<any> = RouterModule.forChild(coreRouting);
