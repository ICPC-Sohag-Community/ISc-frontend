import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CampLeaderService } from '../../services/camp-leader.service';

@Component({
  selector: 'app-empty-camp',
  standalone: true,
  imports: [],
  templateUrl: './empty-camp.component.html',
  styleUrl: './empty-camp.component.scss',
})
export class EmptyCampComponent {
  campLeaderService = inject(CampLeaderService);
  @Input() itemId: number | null = null;
  @Output() closeEmptyModal = new EventEmitter<boolean>();
  isLoading = signal<boolean>(false);
  isEmpty: boolean = false;

  cancel() {
    this.closeEmptyModal.emit(false);
  }
  confirm() {
    if (this.itemId !== null) {
      this.emptyItem(this.itemId);
    }
  }
  emptyItem(id: number) {
    console.log(id);
    this.isLoading.set(true);
    this.campLeaderService.emptyCamp(id).subscribe({
      next: ({ statusCode, data, message }) => {
        if (statusCode === 200) {
          console.log(data);
          console.log(message);
          this.isLoading.update((v) => (v = false));
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.isLoading.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        this.isEmpty = false;
        this.isLoading.update((v) => (v = false));
      },
    });
  }
}
