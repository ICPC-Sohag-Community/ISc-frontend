import { Component, inject, OnInit, signal } from '@angular/core';
import { SessionsHOCService } from '../../services/sessions-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';
import { Router } from '@angular/router';
import { Sessions } from '../../model/sessions';
import { ConfirmDeleteHocComponent } from '../../components/confirm-delete-hoc/confirm-delete-hoc.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sessions-hoc',
  standalone: true,
  imports: [ConfirmDeleteHocComponent, DatePipe],
  templateUrl: './sessions-hoc.component.html',
  styleUrl: './sessions-hoc.component.scss',
})
export class SessionsHOCComponent implements OnInit {
  sessionsHOCService = inject(SessionsHOCService);
  casheService = inject(CasheService);
  router = inject(Router);
  allSessions!: Sessions;
  currentPage: number = 1;
  pageSize: number = 15;
  keyword: string = '';
  isLoading = signal<boolean>(false);
  showModal: boolean = false;
  selectedItemId: number | null = null;
  dataRequest: any[] = [];

  ngOnInit() {
    this.getAllContests(this.currentPage, this.pageSize);
  }

  getAllContests(
    currentPage: number,
    pageSize: number,
    keyword?: string
  ): void {
    this.isLoading.set(true);
    this.sessionsHOCService
      .getAllSessions(currentPage, pageSize, keyword)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.allSessions = res;
            this.dataRequest.push(this.allSessions);
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
      this.getAllContests(this.allSessions?.currentPage, this.pageSize);
    }
    this.showModal = false;
  }

  goToActionSession(id: number): void {
    this.router.navigate(['head_of_camp/sessions/action-session/', id]);
  }

  loadMoreData(event: any): void {
    const element = event.target;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom && !this.isLoading() && this.allSessions?.hasNextPage) {
      this.getAllContests(++this.currentPage, this.pageSize);
    }
  }
}