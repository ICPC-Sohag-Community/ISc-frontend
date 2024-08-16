import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ChartDashboardComponent } from '../../Components/chart-dashboard/chart-dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { traineesAnalysis } from '../../model/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, ChartDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService);
  isLoading = signal<boolean>(false);
  traineesCount: number = 0;
  malesCount: number = 0;
  femalesCount: number = 0;
  collegesAnalisis: { name: string; count: number }[] = [];
  todayName: string = '';
  todayDate!: Date;

  ngOnInit() {
    this.setDates();
    this.fetchTraineesAnalysis();
  }

  setDates(): void {
    const today = new Date();
    this.todayDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.todayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  }

  fetchTraineesAnalysis(): void {
    this.isLoading.set(true);
    this.dashboardService.traineesAnalysis().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          const traineesAnalysisInfo = data as traineesAnalysis;
          this.traineesCount = traineesAnalysisInfo.traineesCount;
          this.malesCount = traineesAnalysisInfo.malesCount;
          this.femalesCount = traineesAnalysisInfo.femalesCount;
          this.collegesAnalisis = traineesAnalysisInfo.collegesAnalisis;

          this.isLoading.update((v) => (v = false));
        } else {
          this.isLoading.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading.update((v) => (v = false));
      },
    });
  }
}
