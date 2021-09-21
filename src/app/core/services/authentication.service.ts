import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
// @ts-ignore
import { IUserRegister, IUser } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  register(user: IUserRegister): Observable<IUser> {
    return this.http.post<any>('api/v1/signup', {user});
  }

  login(user: IUserRegister): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>('api/v1/login', {user}, {observe: 'response'});
  }

  confirmEmail(queryParams: string): Observable<any> {
    return this.http.get<any>('/api/v1/confirmation', {params: {confirmation_token: queryParams}});
  }

  verifyEmail(user: {user: {email: string}}): Observable<any> {
    return this.http.post<any>('api/v1/password', user, {observe: 'response'});
  }

  changePassword(user: any): Observable<any> {
    return this.http.put<any>('api/v1/password', user);
  }

  logout(): Observable<any> {
    return this.http.delete<any>('api/v1/logout');
  }
}
