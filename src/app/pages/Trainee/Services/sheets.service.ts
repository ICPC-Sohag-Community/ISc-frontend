import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  _HttpClient = inject(HttpClient);

  constructor() {}

  getAllSheets():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/sheets` )
  }
  getMatrialInSheet(id:any):Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/getMaterialsInSheet/${id}` )
  }



}
