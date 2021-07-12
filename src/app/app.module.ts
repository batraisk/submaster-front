import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {SharedModule} from './shared/shared.module';
import {SubscribesModule} from './subscribes/subscribes.module';
import {CoreModule} from './core/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SubscribesRoutingModule } from './subscribes/subsribes-routing.module';
// import { CoreRoutingModule } from './core/core.routing.module';
import {RouterModule} from '@angular/router';
registerLocaleData(en);
registerLocaleData(ru);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    NzButtonModule,
    SubscribesModule,
    CoreModule,
    SubscribesRoutingModule,
    // CoreRoutingModule,
    RouterModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US ,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'fr':
            return ru_RU;
          default:
            return en_US;
        }
      },
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
