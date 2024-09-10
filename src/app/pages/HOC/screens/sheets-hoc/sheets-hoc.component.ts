import { Component, inject, OnInit, signal } from '@angular/core';
import { SheetsHOCService } from '../sheets-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';
import { Router } from '@angular/router';
import { DataMaterial, SheetsHoc } from '../../model/sheets-hoc';
import { ConfirmDeleteHocComponent } from '../../components/confirm-delete-hoc/confirm-delete-hoc.component';

@Component({
  selector: 'app-sheets-hoc',
  standalone: true,
  imports: [ConfirmDeleteHocComponent],
  templateUrl: './sheets-hoc.component.html',
  styleUrl: './sheets-hoc.component.scss',
})
export class SheetsHOCComponent implements OnInit {
  sheetsHOCService = inject(SheetsHOCService);
  casheService = inject(CasheService);
  router = inject(Router);
  allSheets!: SheetsHoc;
  currentPage: number = 1;
  pageSize: number = 15;
  keyword: string = '';
  isLoading = signal<boolean>(false);
  showModal: boolean = false;
  selectedItemId: number | null = null;
  dataRequest: any[] = [];
  expandedRow: number | null = null;
  materailsSheet!: DataMaterial[];
  isLoadingMaterial = signal<boolean>(false);

  ngOnInit() {
    this.getAllSheets(this.currentPage, this.pageSize);
  }

  getAllSheets(currentPage: number, pageSize: number, keyword?: string): void {
    this.isLoading.set(true);
    this.sheetsHOCService
      .getAllSheets(currentPage, pageSize, keyword)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.allSheets = res;
            this.dataRequest.push(this.allSheets);
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

  showConfirmDelete(id: number) {
    this.selectedItemId = id;
    this.showModal = true;
  }

  handleClose(confirmed: boolean) {
    console.log(confirmed);
    if (confirmed && this.selectedItemId !== null) {
      this.dataRequest = [];
      this.casheService.clearCache();
      this.getAllSheets(this.allSheets?.currentPage, this.pageSize);
    }
    this.showModal = false;
  }

  goToActionSheet(id: number): void {
    this.router.navigate(['head_of_camp/sheets/action-session/', id]);
  }

  loadMoreData(event: any): void {
    const element = event.target;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom && !this.isLoading() && this.allSheets?.hasNextPage) {
      this.getAllSheets(++this.currentPage, this.pageSize);
    }
  }

  toggleExpand(id: number) {
    if (this.expandedRow === id) {
      this.expandedRow = null;
    } else {
      this.expandedRow = id;
      this.getMaterailsBySheetId(id);
    }
  }

  getMaterailsBySheetId(id: number): void {
    this.isLoadingMaterial.set(true);
    this.sheetsHOCService.getMaterailsBySheetId(id).subscribe({
      next: ({ data, statusCode }) => {
        if (statusCode === 200) {
          this.materailsSheet = data;
          this.isLoadingMaterial.update((v) => (v = false));
        } else {
          this.isLoadingMaterial.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoadingMaterial.update((v) => (v = false));
      },
    });
  }
}
