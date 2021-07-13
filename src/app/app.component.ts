import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, public translate: TranslateService) {
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
