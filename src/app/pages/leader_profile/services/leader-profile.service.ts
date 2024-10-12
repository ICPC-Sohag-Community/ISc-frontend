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
}
