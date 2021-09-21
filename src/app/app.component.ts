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
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    if (!this.authenticationService.currentUserValue) { return; }
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
