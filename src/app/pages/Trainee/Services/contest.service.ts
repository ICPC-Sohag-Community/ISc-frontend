import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  // BehaviorSubjects to hold contest data
  inComingContest = new BehaviorSubject<any>('null');
  nextContest = new BehaviorSubject<any>('null');
  oldContest = new BehaviorSubject<any>('null');

  constructor(private httpClient: HttpClient) {
    this.loadContests();
  }

  // Fetch all trainee contests from the API
  getAllTraineeContest(): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/api/Trainee/contests`);
  }

  // Load and assign contest data to BehaviorSubjects
  private loadContests(): void {
    this.getAllTraineeContest().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.inComingContest.next(data.inComingContests);
          this.nextContest.next(data.nextContest);
          this.oldContest.next(data.oldContests);
        }
      },
      error: (err) => {
        // Handle potential errors here
        console.error('Error loading contests', err);
      }
    });
  }
}
