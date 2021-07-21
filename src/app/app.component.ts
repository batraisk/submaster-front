import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '@core-services';
import {IUserInfo} from '@models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public router: Router, public translate: TranslateService, private userService: UserService) {
  }

  ngOnInit(): void {
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
}
