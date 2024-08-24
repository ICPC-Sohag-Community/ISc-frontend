import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Injectable({
  providedIn: 'root'
})
export class TraineesService {

  constructor(private http:HttpClient) { }
  getData(): Observable<ResponseHeader>{
    
    
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/camps")
  }
  trainees(id:any): Observable<ResponseHeader>{
    
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/trainees?campId="+ id)
  }
  info(id:any): Observable<ResponseHeader>{
    
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/trainees/"+ id)
  }
}
