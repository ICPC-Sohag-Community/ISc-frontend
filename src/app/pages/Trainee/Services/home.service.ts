import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { task } from '../model/trinee-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // BehaviorSubjects to hold data
  inComingContest = new BehaviorSubject<any>('null');
  nextSession = new BehaviorSubject<any>('null');
  currentSheet = new BehaviorSubject<any>('null');
  toDo = new BehaviorSubject<task[]>([]);
  inProgress = new BehaviorSubject<task[]>([]);
  done = new BehaviorSubject<task[]>([]);
  heads = new BehaviorSubject<any>('null');
  mentor = new BehaviorSubject<any>('null');

  constructor(private httpClient: HttpClient) {
    this.initializeData();
  }

  // Initialize all data
  private initializeData(): void {
    this.assignInComingContest();
    this.assignTraineeTasks();
    this.assignHeads();
    this.assignMentor();
    this.assignCurrentSheet();
    this.assignNextSession();
  }

  // API Methods
  private fetchData<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.BASE_URL}${url}`);
  }

  private updateData<T>(url: string, model: T): Observable<any> {
    return this.httpClient.put(`${environment.BASE_URL}${url}`, model);
  }

  // Observable Methods
  TraineeCurrentSheet(): Observable<any> {
    return this.fetchData('/api/Trainee/currentSheet');
  }

  TraineeIncomingContest(): Observable<any> {
    return this.fetchData('/api/Trainee/IncomingContest');
  }

  TraineeNextSession(): Observable<any> {
    return this.fetchData('/api/Trainee/getNextSession');
  }

  MentorInfo(): Observable<any> {
    return this.fetchData('/api/Trainee/mentorInfo');
  }

  HeadsInfo(): Observable<any> {
    return this.fetchData('/api/Trainee/headsInfo');
  }

  TraineeTasks(): Observable<any> {
    return this.fetchData('/api/Trainee/tasks');
  }

  QRCode(): Observable<any> {
    return this.fetchData('/api/Trainee/qrCode');
  }

  nextPractice(): Observable<any> {
    return this.fetchData('/api/Trainee/getNextPractice');
  }

  UpdateTraineeTask(model: any): Observable<any> {
    return this.updateData('/api/Trainee/updatetaskStatus', model);
  }

  // Data Assignment Methods
  private assignCurrentSheet(): void {
    this.TraineeCurrentSheet().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.currentSheet.next(data);
        }
      }
    });
  }

  private assignInComingContest(): void {
    this.TraineeIncomingContest().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.inComingContest.next(data);
        }
      }
    });
  }

  private assignNextSession(): void {
    this.TraineeNextSession().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.nextSession.next(data);
        }
      }
    });
  }

  private assignMentor(): void {
    this.MentorInfo().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.mentor.next(data);
        }
      }
    });
  }

  private assignHeads(): void {
    this.HeadsInfo().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.heads.next(data);
        }
      }
    });
  }

  public assignTraineeTasks(): void {
    this.TraineeTasks().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.toDo.next(this.getTasksByStatus(data, 0));
          this.inProgress.next(this.getTasksByStatus(data, 1));
          this.done.next(this.getTasksByStatus(data, 2));
        }
      }
    });
  }

  // Utility Methods
  private getTasksByStatus(data: any, status: number): task[] {
    const statusData = data.find((item: { status: number }) => item.status === status);
    return statusData ? statusData.task : [];
  }
}
