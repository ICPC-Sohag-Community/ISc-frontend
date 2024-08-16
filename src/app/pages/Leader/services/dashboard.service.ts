import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  traineesAnalysis(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Leader/dashboard/traineesAnalysis`
    );
  }
}
