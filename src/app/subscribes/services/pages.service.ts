import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const pageUrl = '/api/v1/subscribe_pages';

@Injectable({
  providedIn: 'root'
})

export class PagesService {
  constructor(private http: HttpClient) { }

  createPage(page: any): Observable<any> {
    return this.http.post<any>(pageUrl, page);
  }

  getPages(): Observable<any> {
    return this.http.get<any>(pageUrl);
  }
}

