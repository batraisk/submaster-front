import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';
import {HttpClient, HttpParams} from '@angular/common/http';

const statisticsUrl = '/api/v1/statistics';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  getStats(params): Observable<any> {
    let getParams = new HttpParams();
    if (params) {
      getParams = getParams
        .append('mode', `${params.mode}`)
        .append('date', `${params.date}`);
    }
    return this.http.get<any>(statisticsUrl, {params: getParams});
      // .pipe(map((res: any[]) => res.map(page => (toCamelCaseObject(page)))));
  }

  constructor(private http: HttpClient) { }
}
