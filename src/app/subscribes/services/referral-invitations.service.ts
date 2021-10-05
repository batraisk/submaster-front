import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

const referralInvitationsUrl = '/api/v1/referral_invitations';

@Injectable({
  providedIn: 'root'
})
export class ReferralInvitationsService {

  constructor(private http: HttpClient) { }

  sendInvite(email: string): Observable<any> {
    return this.http.post<any>(referralInvitationsUrl, { email });
  }

  getReferral(token: string): Observable<any> {
    return this.http.get<any>(`${referralInvitationsUrl}/${token}` );
  }
}
