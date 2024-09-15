import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CasheService } from '../../../shared/services/cashe.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
@Injectable({
  providedIn: 'root',
})
export class SheetsHOCService {
  http = inject(HttpClient);
  casheService = inject(CasheService);
  getAllSheets(
    currentPage: number,
    pageSize: number,
    KeyWord?: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', pageSize)
      .set('KeyWord', KeyWord ? KeyWord : '');
    return this.casheService.get<any>(
      `${environment.BASE_URL}/api/Head/sheets`,
      params
    );
  }

  deleteSheet(id: number): Observable<ResponseHeader> {
    return this.http.delete<any>(
      `${environment.BASE_URL}/api/Head/sheets/${id}`
    );
  }
  getMaterailsBySheetId(id: number): Observable<ResponseHeader> {
    return this.casheService.get<any>(
      `${environment.BASE_URL}/api/Head/getMaterailsBySheetId/${id}`
    );
  }
}
