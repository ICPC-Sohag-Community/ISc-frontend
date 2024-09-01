import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http:HttpClient) { }
  getData(id:any): Observable<ResponseHeader>{
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/standing/" + id)
  }
  updateData(data: any): Observable<any> {
    return this.http.put<any>("https://icpc.runasp.net/api/Mentor/updateTraineePoints", data); 
  }
}
