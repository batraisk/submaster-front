import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IDomain} from '@models';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';

const pageUrl = '/api/v1/domains';

interface IResponse {
  data: IDomain[];
  total_pages: number;
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

  constructor(private http: HttpClient) { }

  setDirection(value: string | null): string {
    if (value === 'ascend') { return 'asc'; }
    return 'desc';
  }

  createDomain(domain: IDomain): Observable<any> {
    return this.http.post(pageUrl, domain);
  }

  deleteDomain(domainId: number): Observable<any> {
    return this.http.delete(`${pageUrl}/${domainId}`);
  }

  getStatuses(list: number[]): Observable<any> {
    return this.http.post(`${pageUrl}/statuses`, {ids: list});
  }

  getDomains(
    pageIndex: number = 0,
    pageSize: number = 20,
    sort: Array<{key: string, value: string | null}> = [],
  ): Observable<any> {
    let params = new HttpParams();
    if (sort) {
      sort.forEach(obj => {
        if (!!obj.value) { params = params.append(`sort[${obj.key}]`, this.setDirection(obj.value)); }
      });
    }
    params = params
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);
    return this.http
      .get<{data: IDomain[], total_pages: number, total_count: number}>(pageUrl, { params })
      .pipe(map((res: IResponse) => {
        const data: IResponse = {...res};
        data.data = res.data.map(page => (toCamelCaseObject(page)));
        return data;
      }
      ))
      .pipe(catchError(() => of({data: [], total_pages: 0, total_count: 0} )));
      // .get<IResponse>(pageUrl)
      // .pipe(map((res: IResponse) => res.data.map(page => (toCamelCaseObject(page)))));
  }
}
// .get<{data: ILogin[], total_pages: number, total_count: number}>(`${pageUrl}/${pageId}/logins`, { params })
//   .pipe(catchError(() => of({data: [], total_pages: 0, total_count: 0} )));
