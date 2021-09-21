import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { MobileViewComponent } from './components/mobile-view/mobile-view.component';
import { PageCardComponent } from './components/page-card/page-card.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { LocalizerComponent } from './components/localizer/localizer.component';
import {TranslateModule} from '@ngx-translate/core';
import {CustomValidationService} from '@validation-services';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {SafePipe} from './pipes/safe.pipe';
// @ts-ignore
import {GraphWrapperComponent} from './graph/graph-wrapper.component';
import { Template1Component } from './components/mobile-view/templates/template1/template1.component';
import { Template2Component } from './components/mobile-view/templates/template2/template2.component';
import { Template3Component } from './components/mobile-view/templates/template3/template3.component';
import { Template4Component } from './components/mobile-view/templates/template4/template4.component';
import { Template5Component } from './components/mobile-view/templates/template5/template5.component';
import { Template6Component } from './components/mobile-view/templates/template6/template6.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MobileViewComponent,
    PageCardComponent,
    LocalizerComponent,
    GraphWrapperComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    Template4Component,
    SafePipe,
    Template5Component,
    Template6Component
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzSpaceModule,
    NzGridModule,
    NzStatisticModule,
    TranslateModule,
    NzModalModule,
    NzListModule
  ],
  exports: [
    GraphWrapperComponent,
    HeaderComponent,
    MobileViewComponent,
    PageCardComponent,
    SafePipe
  ],
  providers: [
    CustomValidationService
  ]
})
export class SharedModule { }
