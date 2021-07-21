import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core.routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForgotComponent } from './components/authentication/forgot/forgot.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthenticationGuard} from './services/authentication.guard';
import {TranslateModule} from '@ngx-translate/core';
import {EditPasswordComponent} from './components/authentication/edit-password/edit-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    EditPasswordComponent,
    // DashboardComponent,
    // NewPageComponent,
    // PageDetailsComponent,
    // WelcomePageComponent,
    // AdditionalPagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    NzIconModule,
    NzButtonModule,
    NzStepsModule,
    NzGridModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzInputModule,
    NzSelectModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzAlertModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    TranslateModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ]
})
export class CoreModule { }
