import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-info',
  standalone: true,
  imports: [NgClass],
  templateUrl: './side-info.component.html',
  styleUrl: './side-info.component.scss',
})
export class SideInfoComponent implements OnInit {
  @Input() staffId: string | null = null;
  @Input('isLoadingForSide') isLoading: boolean = false;
  @Input('showSideInfo') showSideInfo: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  isSideOpen: boolean = false;

  ngOnInit() {
    console.log('first', this.showSideInfo);
  }

  cancel() {
    this.closeModal.emit(true);
  }

  getStaffById(id: string) {
    console.log(id);
    //   this.isLoading.set(true);
    //   this.staffLeaderService.getStaffById(id).subscribe({
    //     next: ({ message, statusCode }) => {
    //       if (statusCode === 200) {
    //         console.log(message);
    //         this.isLoading.update((v) => (v = false));
    //       } else {
    //         this.isLoading.update((v) => (v = false));
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isLoading.update((v) => (v = false));
    //     },
    //   });
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.cancel(); // Close modal when clicking outside content
    }
  }
}
