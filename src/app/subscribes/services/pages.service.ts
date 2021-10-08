import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ILogin} from '@models';
import {toCamelCaseObject} from '@helpers';

const pageUrl = '/api/v1/subscribe_pages';

@Injectable({
  providedIn: 'root'
})

export class PagesService {
  constructor(private http: HttpClient) { }

  createPage(page: any): Observable<any> {
    return this.http.post<any>(pageUrl, page);
  }

  updatePage(pageId: number, page: any): Observable<any> {
    return this.http.patch<any>(`${pageUrl}/${pageId}`, page);
  }

  getPages(): Observable<any> {
    return this.http.get<any>(pageUrl)
      .pipe(map((res: any[]) => res.map(page => (toCamelCaseObject(page)))));
  }

  copyPage(pageId: number): Observable<any> {
    return this.http.get<any>(`/api/v1/subscribe_pages/${pageId}/copy`)
      .pipe(map((res: any) => toCamelCaseObject(res)));
  }

  getPage(pageId: number): Observable<any> {
    return this.http.get<ILogin[]>(`/api/v1/subscribe_pages/${pageId}`)
      .pipe(map((res: any) => toCamelCaseObject(res)));
  }

  removePage(pageId: number): Observable<any> {
    return this.http.delete(`/api/v1/subscribe_pages/${pageId}`);
  }
}

