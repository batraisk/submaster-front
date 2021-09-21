import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {toCamelCaseObject} from '@helpers';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  setDirection(value: string | null): string {
    if (value === 'ascend') { return 'asc'; }
    return 'desc';
  }

  public getPaymentLink(params): Observable<any> {
    return this.http.post<any>('/api/v1/payments/payment_link', params)
      .pipe(map((res: any) => toCamelCaseObject(res)));
  }

  public applyPromoCode(code): Observable<any> {
    let params = new HttpParams();
    params = params.append('code', code)
    return this.http.get<any>('/api/v1/promocodes/apply_promocode', {params})
      .pipe(map((res: any) => toCamelCaseObject(res)));
  }

  public getPayments(
    pageIndex: number = 0,
    pageSize: number = 20,
    sort: Array<{key: string, value: string | null}> = []
  ): Observable<{data: any[], total_pages: number, total_count: number}> {
    let params = new HttpParams();
    sort.forEach(obj => {
      if (!!obj.value) { params = params.append(`sort[${obj.key}]`, this.setDirection(obj.value)); }
    });
    params = params
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);

    return this.http.get<{data: any[], total_pages: number, total_count: number}>('/api/v1/payments', {params})
      .pipe(map((res: {data: any[], total_pages: number, total_count: number}) => {
        return {
          data: res.data.map(payment => (toCamelCaseObject(payment))),
          total_pages: res.total_pages,
          total_count: res.total_count,
        };
      }));
      // .pipe(map((res: any) => toCamelCaseObject(res)));
  }
}
