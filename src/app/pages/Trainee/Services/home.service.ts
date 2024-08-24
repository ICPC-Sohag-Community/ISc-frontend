import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  _HttpClient = inject(HttpClient);

  constructor() {}
  TraineeCurrentSheet():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/currentSheet` )
  }
  TraineeIncomingContest():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/IncomingContest` )
  }
  TraineeNextSession():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/getNextSession` )
  }
  MentorInfo():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/mentorInfo` )
  }
  QRCode():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/qrCode` )
  }
  nextPractice():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/getNextPractice` )
  }
  HeadsInfo():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/headsInfo` )
  }
  TraineeTasks():Observable<any>{
    return this._HttpClient.get( environment.BASE_URL + `/api/Trainee/tasks` )
  }
  UpdateTraineeTask(model:any):Observable<any>{
    return this._HttpClient.put( environment.BASE_URL + `/api/Trainee/updatetaskStatus`,model )
  }



}
