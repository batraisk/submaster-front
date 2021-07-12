import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
