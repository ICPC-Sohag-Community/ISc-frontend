import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private httpClient: HttpClient) {
  }

  // Fetch all sheets from the API
  getAllSheets(): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/api/Trainee/sheets`);
  }

  // Fetch materials for a specific sheet by ID
  getMaterialsInSheet(id: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/api/Trainee/getMaterialsInSheet/${id}`);
  }
}
