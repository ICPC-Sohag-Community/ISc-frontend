import { Component, inject, OnInit, signal } from '@angular/core';
import { CasheService } from '../../../../shared/services/cashe.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { DropdownRolesComponent } from '../../Components/dropdown-roles/dropdown-roles.component';
import { TraineesLeaderService } from '../../services/trainees-leader.service';
import { OnTraineeInfo, TraineeInfo } from '../../model/trainees-leader';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-trainees-leader',
  standalone: true,
  imports: [
    DropdownRolesComponent,
    NgSelectModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './trainees-leader.component.html',
  styleUrl: './trainees-leader.component.scss',
})
export class TraineesLeaderComponent implements OnInit {
  traineesLeaderService = inject(TraineesLeaderService);
  rolesService = inject(RolesService);
  casheService = inject(CasheService);
  allTraineesInfo!: TraineeInfo;
  TraineeInfo!: OnTraineeInfo;
  showSideInfo: boolean = false;
  hideSideInfo: boolean = true;
  selectedTraineeId: string = '';
  isLoading = signal<boolean>(false);
  isLoadingForSide: boolean = false;
  isDeleted: boolean = false;
  roleInfo: any;
  keywordSearch: string = '';
  sortbyNum: number = 0 | 1 | 2;
  deletedRoles: any[] = [];

  searchForm!: FormGroup;
  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
      sortNumber: new FormControl(null),
    });

    this.traineesWithPagination(1, 10, this.keywordSearch, this.sortbyNum);
  }

  traineesWithPagination(
    currentPage: number,
    pageSize: number,
    KeyWord?: string,
    SortBy?: number
  ): void {
    this.isLoading.set(true);
    this.traineesLeaderService
      .traineesWithPagination(currentPage, pageSize, KeyWord, SortBy)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.allTraineesInfo = res;
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
    this.keywordSearch = searchTerm;
    this.casheService.clearCache();
    this.traineesWithPagination(1, 10, searchTerm, this.sortbyNum);
  }

  sortStaff(item: any): void {
    this.sortbyNum = item;
    this.traineesWithPagination(1, 10, this.keywordSearch, this.sortbyNum);
    this.casheService.clearCache();
  }

  showSideBar(id: string) {
    this.deletedRoles = [];
    this.selectedTraineeId = id;
    this.showSideInfo = true;
    this.hideSideInfo = false;
    this.getTraineeById(id);
  }
  handleClose() {
    this.showSideInfo = false;
    setTimeout(() => (this.hideSideInfo = true), 700);
  }

  getTraineeById(id: string) {
    this.isLoadingForSide = true;
    this.traineesLeaderService.getTraineeById(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.deletedRoles = [];
          this.TraineeInfo = data;
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

  onStaffRequested(id: string) {
    this.getTraineeById(id);
  }

  deleteRole(index: number) {
    const deletedRole = this.TraineeInfo.userRoles.splice(index, 1)[0];
    delete deletedRole.campName;
    this.deletedRoles.push(deletedRole);
    this.roleInfo = {
      userId: this.selectedTraineeId,
      roleInfos: this.deletedRoles,
    };
  }
  restoreRole(index: number) {
    const restoredRole = this.deletedRoles.splice(index, 1)[0];
    this.TraineeInfo.userRoles.push(restoredRole);
  }

  saveDeleteRoles(): void {
    this.isDeleted = true;
    this.rolesService.unAssignToRole(this.roleInfo).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          this.getTraineeById(this.selectedTraineeId);
          this.isDeleted = false;
        } else {
          this.isDeleted = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isDeleted = false;
      },
    });
  }

  nextPage() {
    if (this.allTraineesInfo.hasNextPage) {
      this.traineesWithPagination(
        this.allTraineesInfo.currentPage + 1,
        10,
        this.keywordSearch,
        this.sortbyNum
      );
    }
  }

  previousPage() {
    if (this.allTraineesInfo.hasPreviousPage) {
      this.traineesWithPagination(
        this.allTraineesInfo.currentPage - 1,
        10,
        this.keywordSearch,
        this.sortbyNum
      );
    }
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.handleClose();
    }
  }
}
