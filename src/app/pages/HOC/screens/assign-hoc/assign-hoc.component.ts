import { NgClass } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssignHocService } from '../../services/assign-hoc.service';

interface Trainee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  photoUrl: string;
  college: number;
  gender: number;
  grade: number;
}

interface Mentor {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  college: number;
  grade: number;
  trainees: Trainee[];
}
@Component({
  selector: 'app-assign-hoc',
  standalone: true,
  imports: [NgSelectModule, NgClass],
  templateUrl: './assign-hoc.component.html',
  styleUrl: './assign-hoc.component.scss',
})
export class AssignHOCComponent implements OnInit {
  assignHocService = inject(AssignHocService);
  allTrainees: Trainee[] = [];
  allMentor: Mentor[] = [];
  selectedMentor: Mentor | null = null;
  selectedTraineeId: string = '';
  isLoading = signal<boolean>(false);
  isLoading2 = signal<boolean>(false);
  keywordSearch: string = '';
  sortbyNum: number = 0 | 1 | 2;
  focusOrder: boolean = false;

  ngOnInit() {
    this.getAllAssignMentors();
    this.getAllAssignTrainees(this.sortbyNum, this.keywordSearch);
  }

  handleSelectMentor(mentor: any): void {
    this.selectedMentor = mentor;
  }

  getAllAssignTrainees(SortBy?: number, KeyWord?: string): void {
    this.isLoading.set(true);
    this.assignHocService.getAllAssignTrainees(SortBy, KeyWord).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allTrainees = data;
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

  getAllAssignMentors(): void {
    this.isLoading2.set(true);
    this.assignHocService.getAllAssignMentors().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          console.log(this.allMentor);
          this.allMentor = data;
          this.isLoading2.update((v) => (v = false));
        } else {
          this.isLoading2.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading2.update((v) => (v = false));
      },
    });
  }

  addToMentor(trainee: Trainee) {
    const data = {
      traineeId: trainee.id,
      mentorId: this.selectedMentor?.id,
    };
    if (this.selectedMentor) {
      this.assignHocService.assignTraniee(data).subscribe({
        next: ({ statusCode }) => {
          if (statusCode === 200) {
            this.selectedMentor?.trainees.push(trainee);
            this.allTrainees = this.allTrainees.filter(
              (p) => p.id !== trainee.id
            );
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
  }

  removeFromMentor(trainee: Trainee, mentor: Mentor): void {
    this.assignHocService.unAssignTrainee(trainee.id).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          mentor.trainees = mentor.trainees.filter((t) => t.id !== trainee.id);
          this.allTrainees.push(trainee);
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
  sortTrainee(item: number) {
    this.sortbyNum = item;
    this.getAllAssignTrainees(this.sortbyNum, this.keywordSearch);
  }

  onSearchInput(event: any): void {
    this.keywordSearch = event.target.value;
    this.getAllAssignTrainees(this.sortbyNum, this.keywordSearch);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedElement = event.target as HTMLElement;

    const mentorTable = document.querySelector('.mentor-table');
    if (mentorTable && !mentorTable.contains(clickedElement)) {
      this.selectedMentor = null;
    }
  }
}
