import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  constructor(private http:HttpClient) { }
  getData(id:any): Observable<ResponseHeader>{
    return this.http.get<ResponseHeader>("https://icpc.runasp.net/api/Mentor/practices/" + id)
  }
  addPractice(data: any): Observable<any> {
    return this.http.post<any>("https://icpc.runasp.net/api/Mentor/practices", data); 
  }
  upd(item: any): Observable<any> {
    return this.http.put<any>("https://icpc.runasp.net/api/Mentor/updatePracticeStatus",  {
      practiceId: item.practiceId,
      title: item.title,
      meetingLink: item.meetingLink,
      note: item.note,
      time: item.time,
      state: item.state
    }
    ); 
  }
  del(data: any): Observable<any> {
    return this.http.delete<any>("https://icpc.runasp.net/api/Mentor/practices",  {
      
      body: {
        "practiceId":data
      }
    }); 
  }
}
