import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscribesRoutingModule } from './subsribes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NewPageComponent } from './new-page/new-page.component';
import { PageDetailsComponent } from './new-page/components/page-details/page-details.component';
import { WelcomePageComponent } from './new-page/components/welcome-page/welcome-page.component';
import { AdditionalPagesComponent } from './new-page/components/additional-pages/additional-pages.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';
import {DomainBindingComponent} from './domain-binding/domain-binding.component';
import {DomainsService, PagesService, LoginsService, StatisticsService} from './services';
// @ts-ignore
import {InterceptService} from '@core-services';
import {TranslateModule} from '@ngx-translate/core';
import { PageInfoComponent } from './page-info/page-info.component';
import { LoginsComponent } from './page-info/logins/logins.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PageSettingsComponent } from './page-info/page-settings/page-settings.component';
import { AccountComponent } from './account/account.component';
import { UtmTagsComponent } from './page-info/utm-tags/utm-tags.component';
import { StatisticsComponent } from './page-info/statistics/statistics.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NewPageComponent,
    PageDetailsComponent,
    WelcomePageComponent,
    AdditionalPagesComponent,
    PageInfoComponent,
    LoginsComponent,
    PageSettingsComponent,
    AccountComponent,
    UtmTagsComponent,
    DomainBindingComponent,
    StatisticsComponent,
  ],
  imports: [
    NzIconModule,
    NzButtonModule,
    NzStepsModule,
    NzDescriptionsModule,
    NzGridModule,
    SharedModule,
    CommonModule,
    SubscribesRoutingModule,
    NzDividerModule,
    NzInputModule,
    NzSelectModule,
    NzSpaceModule,
    NzSwitchModule,
    NzRadioModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    NzFormModule,
    NzTabsModule,
    NzTableModule,
    NzTagModule,
    NzModalModule,
    NzDatePickerModule,
    NzCollapseModule,
    NzAlertModule,
    NzCardModule
  ],
  providers: [
    PagesService,
    LoginsService,
    DomainsService,
    StatisticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
  ]
})
export class SubscribesModule { }
