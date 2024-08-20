import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);

  //Dashboard Service
  traineesAnalysis(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/dashboard/traineesAnalysis`
    );
  }
  dashboardCamps(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/dashboard/camps`
    );
  }
  dashboardFeedbacks(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/dashboard/feedbacks`
    );
  }

  roles(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/Roles/roles`);
  }

  getAllCamps(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/camps/getAll`
    );
  }

  createAccount(formData: any): Observable<any> {
    const myHeaders = new HttpHeaders({
      Accept: 'text/plain',
    });
    return this.http.post<any>(
      `${environment.BASE_URL}/api/Leader/createAccount`,
      formData,
      { headers: myHeaders }
    );
  }

  getAllWithPagination(currentPage: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', pageSize);
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/camps/getAllWithPagination`,

      { headers: headers, params: params }
    );
  }
}
