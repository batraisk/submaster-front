import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserService, AuthenticationService} from '@core-services';
import {NavigationService} from '@navigation-services';
import {IUserInfo} from '@models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public translate: TranslateService,
    public userService: UserService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) {
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
    });
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
      console.log('logOut')
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
