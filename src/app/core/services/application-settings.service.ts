import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IApplicationSetting, IUserInfo} from '@models';
import {map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';

const applicationSettingsUrl = '/api/v1/application_settings';

@Injectable({
  providedIn: 'root'
})

export class ApplicationSettingsService {
  instance = new BehaviorSubject<IApplicationSetting>({applicationHost: '', privacyPolicy: '', supportLink: ''});

  constructor(private http: HttpClient) { }

  getApplicationSettings(): Observable<IApplicationSetting> {
    return this.http.get<IApplicationSetting>(applicationSettingsUrl)
     .pipe(map((res: any) => {
       const config = toCamelCaseObject(res);
       this.instance.next(config);
       return config;
     }));
  }
}
