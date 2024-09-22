import { Component, inject, OnInit, signal } from '@angular/core';
import { SheetsHOCService } from '../../services/sheets-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';
import { Router } from '@angular/router';
import { DataMaterial, SheetsHoc } from '../../model/sheets-hoc';
import { ConfirmDeleteHocComponent } from '../../components/confirm-delete-hoc/confirm-delete-hoc.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sheets-hoc',
  standalone: true,
  imports: [
    ConfirmDeleteHocComponent,
    DragDropModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './sheets-hoc.component.html',
  styleUrl: './sheets-hoc.component.scss',
})
export class SheetsHOCComponent implements OnInit {
  sheetsHOCService = inject(SheetsHOCService);
  casheService = inject(CasheService);
  router = inject(Router);
  fb = inject(FormBuilder);
  formMaterial!: FormGroup;
  allSheets!: SheetsHoc;
  sheetId: number = 0;
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
  isLoadingMaterialAdd = signal<boolean>(false);
  isDeleted: boolean = false;
  submitted: boolean = false;

  ngOnInit() {
    this.getAllSheets(this.currentPage, this.pageSize);
    this.formMaterial = this.fb.group({
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      sheetId: [''],
    });
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

  addMaterial(): void {
    this.submitted = true;
    if (this.formMaterial.invalid) {
      return;
    }
    this.formMaterial.get('sheetId')?.setValue(this.sheetId);
    console.log(this.formMaterial.value);
    this.isLoadingMaterialAdd.set(true);
    this.sheetsHOCService
      .addMaterialToSheet(this.formMaterial.value)
      .subscribe({
        next: ({ statusCode }) => {
          if (statusCode === 200) {
            this.getMaterailsBySheetId(this.sheetId);
            this.isLoadingMaterialAdd.update((v) => (v = false));
            this.formMaterial.reset();
          } else {
            this.isLoadingMaterialAdd.update((v) => (v = false));
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoadingMaterialAdd.update((v) => (v = false));
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
    this.router.navigate(['head_of_camp/sheets/action-sheets/', id]);
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
    this.sheetId = id;
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

  drop(event: CdkDragDrop<any[]>, sheetId: number) {
    moveItemInArray(
      this.materailsSheet,
      event.previousIndex,
      event.currentIndex
    );
    this.materailsSheet.forEach((item, index) => {
      item.materialOrder = index + 1;
    });
    const extractedData = this.materailsSheet.map((item) => {
      return {
        materialId: item.id,
        order: item.materialOrder,
      };
    });
    const info = {
      sheetId: sheetId,
      materials: extractedData,
    };
    this.updateOrdersMaterails(info);
  }

  updateOrdersMaterails(info: any): void {
    this.sheetsHOCService.updateOrdersMaterails(info).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          // this.isLoadingMaterial.update((v) => (v = false));
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteMaterial(id: number): void {
    this.isDeleted = true;
    this.sheetsHOCService.deleteMaterial(id).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          this.casheService.clearCache();
          this.getMaterailsBySheetId(this.sheetId);
          this.isDeleted = false;
          console.log(this.sheetId);
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

  dropSheet(event: CdkDragDrop<any[]>) {
    // console.log(event);
    moveItemInArray(this.dataRequest, event.previousIndex, event.currentIndex);
    this.dataRequest.forEach((item, index) => {
      item.data.forEach((d: any, i: any) => {
        // item.materialOrder = index + 1;
      });
    });
    // const extractedData = this.materailsSheet.map((item) => {
    //   return {
    //     materialId: item.id,
    //     order: item.materialOrder,
    //   };
    // });
    // const info = {
    //   sheetId: sheetId,
    //   materials: extractedData,
    // };
    // this.updateOrdersMaterails(info);
  }
}
