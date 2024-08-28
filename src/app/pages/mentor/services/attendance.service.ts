import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }
  getData(id:any): Observable<ResponseHeader>{
    
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/attendances?campId=" + id)
  }
}
