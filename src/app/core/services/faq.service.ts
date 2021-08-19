import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFaq} from '@models';

const faqUrl = '/api/v1/faqs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<IFaq[]> {
    return this.http.get<IFaq[]>(faqUrl);
    // .pipe(map((res: any[]) => res.map(page => (toCamelCaseObject(page)))));
  }
}
