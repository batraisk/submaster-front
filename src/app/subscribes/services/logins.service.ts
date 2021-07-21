import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ILogin} from '@models';
import {catchError} from 'rxjs/operators';

const pageUrl = '/api/v1/subscribe_pages';

@Injectable({
  providedIn: 'root'
})

export class LoginsService {
  constructor(private http: HttpClient) { }

  setDirection(value: string | null): string {
    if (value === 'ascend') { return 'asc'; }
    return 'desc';
  }

  getLogins(
    pageId: number,
    pageIndex: number = 0,
    pageSize: number = 20,
    sort: Array<{key: string, value: string | null}> = [],
    filter: any = null
  ): Observable<{data: ILogin[], total_pages: number, total_count: number}> {
    let params = new HttpParams();
    sort.forEach(obj => {
      if (!!obj.value) { params = params.append(`sort[${obj.key}]`, this.setDirection(obj.value)); }
    });
    params = params
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);
    if (filter) {
      params = params
        .append('filters[from]', `${filter.from}`)
        .append('filters[to]', `${filter.to}`);
    }
    return this.http
      .get<{data: ILogin[], total_pages: number, total_count: number}>(`${pageUrl}/${pageId}/logins`, { params })
      .pipe(catchError(() => of({data: [], total_pages: 0, total_count: 0} )));
  }
}
