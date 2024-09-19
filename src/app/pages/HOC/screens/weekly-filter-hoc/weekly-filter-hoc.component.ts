import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { WeeklyFilterService } from '../../services/weekly-filter.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-weekly-filter-hoc',
  standalone: true,
  imports: [NgClass],
  templateUrl: './weekly-filter-hoc.component.html',
  styleUrl: './weekly-filter-hoc.component.scss',
})
export class WeeklyFilterHOCComponent implements OnInit {
  weeklyFilterService = inject(WeeklyFilterService);
  casheService = inject(CasheService);
  filterData: any;
  otherData: any;
  isLoading = signal<boolean>(false);
  activeTab: string = 'tab1';
  selectedIds: number[] = [];

  ngOnInit() {
    this.getToFilter();
  }

  getToFilter(): void {
    this.isLoading.set(true);
    this.weeklyFilterService.getToFilter().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.filterData = res;
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

  toggleItem(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    } else {
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id
      );
    }
    console.log(this.selectedIds);
  }

  selectTab(tab: string) {
    this.activeTab = tab;

    if (this.activeTab !== 'tab1') {
      // this.staffArchiveWithPagination(
      //   1,
      //   10,
      //   this.keywordSearch,
      //   this.sortbyNum
      // );
    } else {
      this.getToFilter();
    }
  }
}
