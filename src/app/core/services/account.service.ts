import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserInfo, IProfile} from '@models';
import {map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';

const accountURL = '/api/v1/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
    // this.getUserInfo().subscribe(res => this.userInfo = res);
  }

  updateProfile(profile: IProfile): Observable<any> {
    return this.http.put<IProfile>(accountURL, profile);
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.http.get<IUserInfo>('/api/v1/user_info')
      .pipe(map((res: IUserInfo) => toCamelCaseObject(res)));
  }

}
