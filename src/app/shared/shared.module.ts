import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MobileViewComponent } from './components/mobile-view/mobile-view.component';
import { PageCardComponent } from './components/page-card/page-card.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


@NgModule({
  declarations: [
    HeaderComponent,
    MobileViewComponent,
    PageCardComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzSpaceModule,
    NzGridModule,
    NzStatisticModule
  ],
  exports: [
    HeaderComponent,
    MobileViewComponent,
    PageCardComponent,
  ]
})
export class SharedModule { }
