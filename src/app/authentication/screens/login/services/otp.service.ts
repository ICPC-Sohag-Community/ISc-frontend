import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {



  constructor(private http: HttpClient) {}

  // Method to get data with OTP and email as query parameters
  getData(email: string, otp: string): Observable<any> {
    const params = new HttpParams()
      .set('otp', otp)
      .set('email', email);

    return this.http.get(`https://icpc.runasp.net/api/Auth/checkResetOtp`, { params });
  }
}
