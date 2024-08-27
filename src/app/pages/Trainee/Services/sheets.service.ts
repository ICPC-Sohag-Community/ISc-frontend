import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  // BehaviorSubject to hold sheets data
  allsheets = new BehaviorSubject<any>('null');

  constructor(private httpClient: HttpClient) {
    this.loadSheets();
  }

  // Fetch all sheets from the API
  getAllSheets(): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/api/Trainee/sheets`);
  }

  // Load and assign sheets data to BehaviorSubject
  private loadSheets(): void {
    this.getAllSheets().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allsheets.next(data);
        }
      },
      error: (err) => console.error('Error loading sheets:', err) // Handle errors
    });
  }

  // Fetch materials for a specific sheet by ID
  getMaterialsInSheet(id: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/api/Trainee/getMaterialsInSheet/${id}`);
  }
}
