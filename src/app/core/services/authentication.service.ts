import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import { IUserRegister, IUser } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(user: IUserRegister): Observable<IUser> {
    return this.http.post<any>('api/v1/signup', {user});
  }

  login(user: IUserRegister): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>('api/v1/login', {user}, {observe: 'response'});
  }

  confirmEmail(queryParams: string): Observable<any> {
    return this.http.get<any>('/api/v1/confirmation', {params: {confirmation_token: queryParams}});
  }
}
