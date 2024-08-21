import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CasheService } from '../../../shared/services/cashe.service';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Injectable({
  providedIn: 'root',
})
export class StaffLeaderService {
  http = inject(HttpClient);
  casheService = inject(CasheService);

  staffWithPagination(
    currentPage: number,
    pageSize: number,
    KeyWord?: string,
    SortBy?: number
  ): Observable<any> {
    console.log(KeyWord);
    const params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', pageSize)
      .set('KeyWord', KeyWord ? KeyWord : '')
      .set('SortBy', SortBy ? SortBy : '');
    return this.casheService.get<any>(
      `${environment.BASE_URL}/api/Leader/staffWithPagination`,
      params
    );
  }

  getStaffById(id: string): Observable<ResponseHeader> {
    return this.http.get<any>(`${environment.BASE_URL}/api/Leader/staff/${id}`);
  }
}
