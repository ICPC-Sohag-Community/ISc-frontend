import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetpassService {

  constructor(private http : HttpClient) {  }
  reset(data: any): Observable<any> {
    
    return this.http.post<any>("https://icpc.runasp.net/api/Auth/reset-password", data); 
  }
  
}
