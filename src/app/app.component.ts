import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {UserService, AuthenticationService, ApplicationSettingsService} from '@core-services';
import {NavigationService} from '@navigation-services';
import {IUserInfo} from '@models';
import { en_US, ru_RU, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthPage = true;
  constructor(
    private location: Location,
    public router: Router,
    public translate: TranslateService,
    public userService: UserService,
    private authenticationService: AuthenticationService,
    private applicationSettingsService: ApplicationSettingsService,
    private navigationService: NavigationService) {
    router.events.subscribe((val) => {
      this.isAuthPage = location.path().indexOf('/auth/') !== -1;
    });
  }

  ngOnInit(): void {
    if (!this.authenticationService.currentUserValue) {
      const browserLang = this.translate.getBrowserLang();
      const code = (browserLang.match(/en|ru/) ? browserLang : 'en');
      this.translate.use(code);
      return;
    }
    this.userService.getUserInfo().subscribe((res: IUserInfo) => {
      this.userService.currentUserInfo = res;
      if (res.locale) { this.translate.use(res.locale); }
    });
    this.applicationSettingsService.getApplicationSettings().subscribe();
  }

  get supportLink(): string {
    return this.applicationSettingsService.instance.getValue().supportLink;
  }

  get onlineCourseLink(): string {
    return this.applicationSettingsService.instance.getValue().onlineCourseLink;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
  goToAccount(): void {
    this.router.navigate(['/account']);
  }
  logOut(): void {
    this.authenticationService.logout().subscribe(() => {
      this.userService.currentUserInfo = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    });
  }

  get isOpen(): boolean {
    return this.navigationService.isOpenMenu.getValue();
  }

  closeMenu(): void {
    this.navigationService.closeMenu();
  }
}
