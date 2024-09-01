import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http:HttpClient) { }
  getContest(id:any): Observable<ResponseHeader>{
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/contestsTracking/" + id)
  }
  getSheet(id:any): Observable<ResponseHeader>{
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/sheetsTracking/" + id)
  }
  
}


