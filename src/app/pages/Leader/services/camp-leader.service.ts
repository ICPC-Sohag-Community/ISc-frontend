import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CasheService } from '../../../shared/services/cashe.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
@Injectable({
  providedIn: 'root',
})
export class CampLeaderService {
  http = inject(HttpClient);
  casheService = inject(CasheService);

  getAllWithPagination(currentPage: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', pageSize);
    return this.casheService.get<any>(
      `${environment.BASE_URL}/api/Leader/camps/getAllWithPagination`,
      params
    );
  }

  deleteCamp(id: number): Observable<ResponseHeader> {
    return this.http.delete<any>(
      `${environment.BASE_URL}/api/Leader/camps/${id}`
    );
  }

  emptyCamp(id: number): Observable<ResponseHeader> {
    return this.http.delete<any>(
      `${environment.BASE_URL}/api/Leader/camps/Emtpy/${id}`
    );
  }

  standingCamp(campId: number): Observable<ResponseHeader> {
    const params = new HttpParams().set('campId', campId);
    return this.http.get<any>(`${environment.BASE_URL}/api/Leader/standing`, {
      params,
    });
  }
}
