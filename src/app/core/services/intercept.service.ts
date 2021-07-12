import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('HttpInterceptor');
    const authReq = req.url.startsWith('/api') ? req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }) : req.clone();

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {}
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('currentUser');
              localStorage.removeItem('token');
              this.router.navigate(['/auth/login']);
            }
          }
        }
      )
    );
  }
}
