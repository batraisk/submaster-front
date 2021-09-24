import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserInfo} from '@models';
import {map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: IUserInfo;
  balance = new BehaviorSubject<string>('0');

  constructor(private http: HttpClient) {
    // this.getUserInfo().subscribe(res => this.userInfo = res);
  }

  public get currentUserInfo(): IUserInfo {
    return this.userInfo;
  }

  public set currentUserInfo(info: IUserInfo) {
    this.userInfo = info;
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.http.get<IUserInfo>('/api/v1/user_info')
      .pipe(map((res: IUserInfo) => {
        const localeBalance = + res.balance;
        this.balance.next(localeBalance.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }));
        return toCamelCaseObject(res);
      }));
  }

  setLocale(locale: string): Observable<IUserInfo> {
    return this.http.post<IUserInfo>('/api/v1/user_info/set_locale', {locale})
      .pipe(map((res: IUserInfo) => toCamelCaseObject(res)));
  }
}
