import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CasheService } from '../../../shared/services/cashe.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
@Injectable({
  providedIn: 'root',
})
export class WeeklyFilterService {
  http = inject(HttpClient);
  casheService = inject(CasheService);

  getToFilter(): Observable<ResponseHeader> {
    return this.casheService.get<any>(
      `${environment.BASE_URL}/api/Head/weeklyFilter/getToFilter`
    );
  }
}
