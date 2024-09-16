import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CasheService } from '../../../shared/services/cashe.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { SessionAttendance } from '../model/attenances-hoc';
@Injectable({
  providedIn: 'root',
})
export class AttendanceHocService {
  http = inject(HttpClient);
  casheService = inject(CasheService);

  getAllAttendances(
    currentPage: number,
    pageSize: number,
    KeyWord?: string
  ): Observable<ResponseHeader> {
    const params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', pageSize)
      .set('KeyWord', KeyWord ? KeyWord : '');
    return this.casheService.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Head/attendance`,
      params
    );
  }

  getAttendanceBySessionId(sessionId: number): Observable<ResponseHeader> {
    return this.http.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Head/attendanceBySessionId/${sessionId}`
    );
  }
  getTopics(): Observable<ResponseHeader> {
    return this.casheService.get<ResponseHeader>(
      `${environment.BASE_URL}/api/Head/sessions/getTopics`
    );
  }

  updateAatendance(info: any): Observable<ResponseHeader> {
    return this.http.put<any>(
      `${environment.BASE_URL}/api/Head/updateAatendance`,
      info
    );
  }
}
