import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ChartDashboardComponent } from '../../Components/chart-dashboard/chart-dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { traineesAnalysis } from '../../model/dashboard';
import { TestimonialComponent } from '../../Components/testimonial/testimonial.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    TestimonialComponent,
    ChartDashboardComponent,
    NgClass,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService);
  isLoading = signal<boolean>(false);
  traineesCount: number = 0;
  malesCount: number = 0;
  femalesCount: number = 0;
  collegesAnalisis: { name: string; count: number }[] = [];
  dashboardCamps: {
    id: number;
    name: string;
    dueDate: string;
    progress: number;
  }[] = [];
  percentageCountCollege: number = 0;
  todayName: string = '';
  todayDate!: Date;

  ngOnInit() {
    this.setDates();
    this.fetchTraineesAnalysis();
    this.fetchDashboardCamps();
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

  data = [
    {
      id: 28,
      name: 'ICP17asasas',
      dueDate: '2025-05-27',
      progress: 20,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 70,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 50,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
    {
      id: 28,
      name: 'ICP17',
      dueDate: '2025-05-27',
      progress: 0,
    },
  ];
  fetchDashboardCamps(): void {
    this.isLoading.set(true);
    this.dashboardService.dashboardCamps().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.dashboardCamps = data;
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
