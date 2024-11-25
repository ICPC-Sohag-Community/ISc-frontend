import { Component, inject, OnInit, signal } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { NgClass } from '@angular/common';
import { DataSheet, Names, RootSheet } from '../../model/tracking-hoc';

@Component({
  selector: 'app-trainee-tracking',
  standalone: true,
  imports: [NgClass],
  templateUrl: './trainee-tracking.component.html',
  styleUrl: './trainee-tracking.component.scss',
})
export class TraineeTrackingComponent implements OnInit {
  trackingService = inject(TrackingService);
  allData!: RootSheet;
  allTraniees: DataSheet[] = [];
  dataRequest: RootSheet[] = [];
  allSheets!: Names[];
  currentPage: number = 1;
  pageSize: number = 15;

  allContests!: Names[];
  allDataContests!: RootSheet;
  allContestsData: DataSheet[] = [];
  dataRequestContests: RootSheet[] = [];
  currentPageContests: number = 1;
  pageSizeContests: number = 15;

  isLoading = signal<boolean>(false);
  hoveredRow: number | null = null;
  hoveredCol: number | null = null;
  activeTab: string = 'tab1';

  ngOnInit() {
    this.getSheetNames();
    this.trackingTraineesSheets(this.currentPage, this.pageSize);
  }

  trackingTraineesSheets(currentPage: number, pageSize: number): void {
    this.isLoading.set(true);
    this.trackingService
      .trackingTraineesSheets(currentPage, pageSize)
      .subscribe({
        next: ({ statusCode, data }) => {
          if (statusCode === 200) {
            this.allData = data;
            this.allTraniees = this.allData.data;
            this.dataRequest.push(this.allData);
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

  // trackingTraineesContests(
  //   currentPage: number,
  //   pageSize: number,
  //   keyword?: string
  // ): void {
  //   this.isLoading.set(true);
  //   this.trackingService
  //     .trackingTraineesContests(currentPage, pageSize, keyword)
  //     .subscribe({
  //       next: ({ statusCode, data }) => {
  //         if (statusCode === 200) {
  //           this.allData = data;
  //           this.allTraniees = this.allData.data;
  //           this.dataRequest.push(this.allData);
  //           this.isLoading.update((v) => (v = false));
  //         } else {
  //           this.isLoading.update((v) => (v = false));
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.isLoading.update((v) => (v = false));
  //       },
  //     });
  // }

  getSheetNames(): void {
    this.isLoading.set(true);
    this.trackingService.sheetNames().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allSheets = data;
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
  getContestsNames(): void {
    this.isLoading.set(true);
    this.trackingService.contestsNames().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allContests = data;
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

  loadMoreData(event: any): void {
    const element = event.target;
    const bottomThreshold = 5;
    const atBottom =
      element.scrollTop + element.clientHeight >=
      element.scrollHeight - bottomThreshold;
    if (atBottom && !this.isLoading() && this.allData?.hasNextPage) {
      this.trackingTraineesSheets(++this.currentPage, this.pageSize);
    }
  }

  onHover(rowIndex: number, colIndex: number) {
    this.hoveredRow = rowIndex;
    this.hoveredCol = colIndex;
  }

  onLeave() {
    this.hoveredRow = null;
    this.hoveredCol = null;
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    if (this.activeTab !== 'tab1') {
      this.getContestsNames();
      // this.trackingTraineesContests(this.currentPage, this.pageSize);
    } else {
      this.trackingTraineesSheets(this.currentPage, this.pageSize);
    }
  }
}
