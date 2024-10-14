import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CasheService } from '../../../shared/services/cashe.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
@Injectable({
  providedIn: 'root',
})
export class LeaderProfileService {
  http = inject(HttpClient);
  casheService = inject(CasheService);

  generalLeaderProfile(): Observable<ResponseHeader> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/User/generalProfile`
    );
  }
  updateLeaderProfile(info: any): Observable<ResponseHeader> {
    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updateProfile`,
      info
    );
  }
  validatePhoneNumber(phoneNumber: number): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validatePhoneNumber/${phoneNumber}`
    );
  }
  validateNationalId(nationalId: number): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validateNationalId/${nationalId}`
    );
  }

  // Account
  accountInfo(): Observable<ResponseHeader> {
    return this.http.get<any>(`${environment.BASE_URL}/api/User/accountInfo`);
  }
  //email
  updateEmail(email: string): Observable<ResponseHeader> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updateEmail`,
      JSON.stringify(email),
      { headers }
    );
  }
  validateEmail(email: string): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validateEmail/${email}`
    );
  }

  // username
  updateUsername(username: string): Observable<ResponseHeader> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updateUsername`,
      JSON.stringify(username),
      { headers }
    );
  }
  validateUsername(username: string): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validateUsername/${username}`
    );
  }
  // codeforces
  updateCodeforceHandle(codeForcesHandle: string): Observable<ResponseHeader> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updateCodeforceHandle`,
      JSON.stringify(codeForcesHandle),
      { headers }
    );
  }
  validateCodeForcesHandle(
    codeForcesHandle: string
  ): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validateCodeForcesHandle/${codeForcesHandle}`
    );
  }

  // codeforces
  updateVjudgeHandle(vjudgeHandle: string): Observable<ResponseHeader> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updateVjudgeHandle`,
      JSON.stringify(vjudgeHandle),
      { headers }
    );
  }
  validateVjudgeHandle(vjudgeHandle: string): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Validations/validateVjudgeHandle/${vjudgeHandle}`
    );
  }

  updatePassword(passInfo: any): Observable<ResponseHeader> {
    return this.http.put<ResponseHeader>(
      `${environment.BASE_URL}/api/User/updatePassword`,
      passInfo
    );
  }
}