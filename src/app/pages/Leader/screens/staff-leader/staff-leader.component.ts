import { Component, inject, OnInit, signal } from '@angular/core';
import { SideInfoComponent } from '../../Components/side-info/side-info.component';
import { CasheService } from '../../../../shared/services/cashe.service';
import { StaffLeaderService } from '../../services/staff-leader.service';
import { OnStaffInfo, StaffInfo } from '../../model/staff';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-staff-leader',
  standalone: true,
  imports: [SideInfoComponent, NgSelectModule, ReactiveFormsModule, NgClass],
  templateUrl: './staff-leader.component.html',
  styleUrl: './staff-leader.component.scss',
})
export class StaffLeaderComponent implements OnInit {
  staffLeaderService = inject(StaffLeaderService);
  casheService = inject(CasheService);
  allStaffInfo!: StaffInfo;
  staffInfo!: OnStaffInfo;
  showSideInfo: boolean = false;
  selectedStaffId: string | null = null;
  isLoading = signal<boolean>(false);
  isLoadingForSide: boolean = false;
  searchForm!: FormGroup;
  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
      sortNumber: new FormControl(null),
    });

    this.staffWithPagination(1, 10);
    // this.getStaffById('0b645888-170b-49d5-80c4-653fd4612377');
  }

  staffWithPagination(
    currentPage: number,
    pageSize: number,
    KeyWord?: string,
    SortBy?: number
  ): void {
    this.isLoading.set(true);
    this.staffLeaderService
      .staffWithPagination(currentPage, pageSize, KeyWord, SortBy)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.allStaffInfo = res;
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

  onSearchInput(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.casheService.clearCache();
    this.staffWithPagination(1, 10, searchTerm);
  }

  sortStaff(item: any): void {
    this.casheService.clearCache();
    this.staffWithPagination(1, 10, '', item);
  }

  showSideBar(id: string) {
    this.selectedStaffId = id;
    this.showSideInfo = true;
    this.getStaffById(id);
  }
  handleClose() {
    this.showSideInfo = false;
  }

  getStaffById(id: string) {
    console.log(id);
    this.isLoadingForSide = true;
    this.staffLeaderService.getStaffById(id).subscribe({
      next: ({ message, statusCode, data }) => {
        if (statusCode === 200) {
          this.staffInfo = data;
          console.log(this.staffInfo);
          this.isLoadingForSide = false;
        } else {
          this.isLoadingForSide = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoadingForSide = false;
      },
    });
  }

  nextPage() {
    if (this.allStaffInfo.hasNextPage) {
      this.staffWithPagination(this.allStaffInfo.currentPage + 1, 10);
    }
  }

  previousPage() {
    if (this.allStaffInfo.hasPreviousPage) {
      this.staffWithPagination(this.allStaffInfo.currentPage - 1, 10);
    }
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.handleClose(); // Close modal when clicking outside content
    }
  }
}
