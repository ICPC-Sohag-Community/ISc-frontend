import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CampInfo } from '../../model/dashboard';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-camps-leader',
  standalone: true,
  imports: [NgClass],
  templateUrl: './camps-leader.component.html',
  styleUrl: './camps-leader.component.scss',
})
export class CampsLeaderComponent implements OnInit {
  dashboardService = inject(DashboardService);
  allCampsInfo!: CampInfo;
  isLoading = signal<boolean>(false);
  ngOnInit() {
    this.fetchAllWithPagination(1, 6);
  }

  fetchAllWithPagination(currentPage: number, pageSize: number): void {
    this.isLoading.set(true);
    this.dashboardService
      .getAllWithPagination(currentPage, pageSize)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            console.log(res);
            this.allCampsInfo = res;
            console.log(this.allCampsInfo);
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

  nextPage() {
    if (this.allCampsInfo.hasNextPage) {
      this.fetchAllWithPagination(this.allCampsInfo.currentPage + 1, 6);
    }
  }

  previousPage() {
    if (this.allCampsInfo.hasPreviousPage) {
      this.fetchAllWithPagination(this.allCampsInfo.currentPage - 1, 6);
    }
  }
}
