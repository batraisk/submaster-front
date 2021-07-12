import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  param = {value: 'world'};
  constructor(public router: Router, public translate: TranslateService) {
    // translate.addLangs(['en', 'ru']);
    // translate.setDefaultLang('en');
    //
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    // translate.setDefaultLang('en');
    //
    // // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use('en');
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
