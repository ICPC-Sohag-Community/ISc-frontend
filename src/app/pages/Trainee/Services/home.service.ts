import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { task } from '../model/trinee-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  _HttpClient = inject(HttpClient);
  inProgress:BehaviorSubject<any>= new BehaviorSubject('')
  done:BehaviorSubject<any>= new BehaviorSubject('')
  toDo:BehaviorSubject<any>= new BehaviorSubject('')

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

  loadTasks(): void {
    this.TraineeTasks().subscribe({
      next: ({statusCode,data}) => {
        if(statusCode===200){
          this.toDo.next( this.getTasksByStatus(data,0))
          this.inProgress.next( this.getTasksByStatus(data,1))
          this.done.next( this.getTasksByStatus(data,2))
        }
      }
    });
  }
  getTasksByStatus(data: any, status: number): task[] {
    const statusData = data.find((item: { status: number }) => item.status === status);
    return statusData ? statusData.task : [];
  }

}
