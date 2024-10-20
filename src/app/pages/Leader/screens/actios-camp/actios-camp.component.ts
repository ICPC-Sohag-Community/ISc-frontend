import { NgClass, SlicePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { CampLeaderService } from '../../services/camp-leader.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actios-camp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgClass,
    RouterLink,
    SlicePipe,
  ],
  templateUrl: './actios-camp.component.html',
  styleUrl: './actios-camp.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ActiosCampComponent implements OnInit {
  campLeaderService = inject(CampLeaderService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  @ViewChild('startDateInput') startDateInput!: ElementRef;
  @ViewChild('endDateInput') endDateInput!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('calendar2') calendar2!: ElementRef;
  @ViewChild('termSelect') termSelect!: NgSelectComponent;
  @ViewChild('mentorsSelect') mentorsSelect!: NgSelectComponent;
  @ViewChild('hocSelect') hocSelect!: NgSelectComponent;

  // selectedDay: number | null | any = null;
  // selectedDayEnd: number | null | any = null;
  // currentDate = new Date();
  // daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // startDays: number[] = [];
  // endDays: number[] = [];
  // startMonthYear: string = '';
  // endMonthYear: string = '';
  // dateStart!: Date;
  // dateEnd!: Date;
  // monthInNumS: string = '';
  // monthInNumE: string = '';
  // yearInNumS: string = '';
  // yearInNumE: string = '';
  dropdownOpen: boolean = false;
  dropdownOpenH: boolean = false;

  allMentors: { id: string; fullName: string; isInCamp?: boolean }[] = [];
  allHeadsOfCamp: { id: string; fullName: string; isInCamp: boolean }[] = [];
  allCamps: { name: string }[] = [];
  selectedCamp: string = '';
  isCampsActive: boolean = false;
  nameForm!: FormGroup;
  campForm!: FormGroup;
  campName: string = '';
  errorMessages: any = [];
  errorMessage: string = '';
  successMessage: string = '';
  foucsTerm: boolean = false;

  submitted: boolean = false;
  isLoading: boolean = false;
  isDeleted: boolean = false;
  id: number = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneCamp(this.id);
    } else {
      this.fetchAllMentors();
      this.fetchAllHeadsOfCamp();
      // this.renderCalendar(this.currentDate, 'start');
      // this.renderCalendar(this.currentDate, 'end');
    }
    this.campForm = this.fb.group({
      id: [''],
      name: [null, [Validators.required]],
      term: [null, [Validators.required]],
      headsIds: [null],
      mentorsIds: [null],
      openForRegister: [false, [Validators.required]],
      durationInWeeks: [
        null,
        [Validators.required, this.positiveNumberValidator],
      ],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });

    this.nameForm = this.fb.group({
      name: ['', [Validators.required]],
    });

    this.fetchAllCamp();
  }

  positiveNumberValidator(control: AbstractControl) {
    const value = control.value;
    if (value !== null && value < 0) {
      return { negativeNumber: true };
    }
    return null;
  }

  selectCamp(item: any): void {
    this.selectedCamp = item.name;
    this.isCampsActive = false;
  }

  deleteCamp(campName: string): void {
    this.isDeleted = true;
    this.campName = campName;
    this.campLeaderService.deleteCampFormDropdown(campName).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          if (campName === this.selectedCamp) {
            this.selectedCamp = '';
          }
          this.allCamps = this.allCamps.filter(
            (camp) => camp.name !== campName
          );
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

  onAddCamp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    keyboardEvent.preventDefault();
    if (this.nameForm.invalid) {
      return;
    }
    const name = this.nameForm.get('name')?.value;
    this.campLeaderService.addCamp(name).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          this.selectedCamp = name;
          this.allCamps.unshift({ name });
          this.nameForm.reset();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleDropdownC(event: MouseEvent) {
    event.stopPropagation();
    this.isCampsActive = !this.isCampsActive;
  }

  @HostListener('window:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.relative.flex.flex-col');
    const inputElement = document.querySelector(
      '.relative.flex.items-center.ps-2 input'
    );
    const deleteIcon = targetElement.closest('.delete-icon');
    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      if (inputElement && inputElement.contains(targetElement)) {
        return;
      }
      if (deleteIcon) {
        return;
      }
      this.isCampsActive = false;
    }
  }

  getOneCamp(id: number): void {
    this.isLoading = true;
    this.campLeaderService.getOneCamp(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.selectedCamp = data.name;
          // this.renderCalendar(data.startDate, 'start');
          // this.renderCalendar(data.endDate, 'end');
          // this.dateStart = new Date(data.startDate);
          // this.dateEnd = new Date(data.endDate);
          // this.selectedDay = this.dateStart.getDate();
          // this.selectedDayEnd = this.dateEnd.getDate();
          this.allMentors = data.mentorsOfCamp;
          this.allHeadsOfCamp = data.headsOfCamp;
          this.campForm.patchValue({
            id: data.id,
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            term: data.term,
            durationInWeeks: data.durationInWeeks,
            openForRegister: data.openForRegister,
            headsIds: this.allHeadsOfCamp
              .filter((item: any) => item.inCamp)
              .map((item: any) => item.id),
            mentorsIds: this.allMentors
              .filter((item: any) => item.inCamp)
              .map((item: any) => item.id),
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  craeteNewCamp(): void {
    this.campForm.get('name')?.setValue(this.selectedCamp);
    this.submitted = true;
    if (this.campForm.invalid) {
      this.isLoading = false;
      this.displayFormErrors();
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.campLeaderService.createCamp(this.campForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.selectedCamp = '';
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/leader/camps']);
          } else if (statusCode === 400) {
            this.successMessage = '';
            this.errorMessage = message;
            this.isLoading = false;
          } else {
            this.handleApiErrors(errors);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.campLeaderService
        .updateCamp(this.id, this.campForm.value)
        .subscribe({
          next: ({ statusCode, message, errors }) => {
            if (statusCode === 200) {
              this.errorMessage = '';
              this.successMessage = message;
              this.isLoading = false;
              this.casheService.clearCache();
              this.router.navigate(['/leader/camps']);
            } else if (statusCode === 400) {
              this.successMessage = '';
              this.errorMessage = message;
              this.isLoading = false;
            } else {
              this.handleApiErrors(errors);
              this.isLoading = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  removeErrorM() {
    this.errorMessage = '';
  }

  handleApiErrors(errors: any) {
    this.errorMessages = [];
    if (errors) {
      this.errorMessages = errors;
    } else {
      this.errorMessages.push(
        'An unknown error occurred. Please try again later.'
      );
    }
    this.errorMessages.forEach((error: any, index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
    });
  }

  removeError(index: number) {
    this.errorMessages.splice(index, 1);
  }

  displayFormErrors() {
    this.errorMessages = [];

    Object.keys(this.campForm.controls).forEach((field) => {
      const control = this.campForm.get(field);

      if (control?.invalid) {
        if (control.errors?.['required']) {
          this.errorMessages.push(`${field} is required`);
        }
      }
    });
    this.errorMessages.forEach((error: any, index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
    });
  }

  fetchAllMentors(): void {
    this.campLeaderService.getAllMentors().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allMentors = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fetchAllHeadsOfCamp(): void {
    this.campLeaderService.getAllHeadsOfCamp().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allHeadsOfCamp = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fetchAllCamp(): void {
    this.campLeaderService.getAllCamps().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allCamps = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // toggleCalendar(name: string) {
  //   if (name === 'start') {
  //     this.calendar.nativeElement.classList.toggle('hidden');
  //   } else {
  //     this.calendar2.nativeElement.classList.toggle('hidden');
  //   }
  // }

  // changeMonth(monthChange: number, name: string) {
  //   if (name === 'start') {
  //     this.currentDate.setMonth(this.currentDate.getMonth() + monthChange);
  //     this.renderCalendar(this.currentDate, name);
  //   } else {
  //     this.currentDate.setMonth(this.currentDate.getMonth() + monthChange);
  //     this.renderCalendar(this.currentDate, name);
  //   }
  // }

  // selectDate(day: number, month: string, year: string, name: string) {
  //   // const year = this.currentDate.getFullYear();
  //   // const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  //   const dayOfMonth = String(day).padStart(2, '0');

  //   if (name === 'start') {
  //     const formattedDate = `${year}-${month}-${dayOfMonth}`;
  //     this.selectedDay = day;
  //     this.campForm.get('startDate')?.setValue(formattedDate);
  //     this.calendar.nativeElement.classList.add('hidden');
  //   } else {
  //     const formattedDate = `${year}-${month}-${dayOfMonth}`;
  //     this.selectedDayEnd = day;
  //     this.campForm.get('endDate')?.setValue(formattedDate);
  //     this.calendar2.nativeElement.classList.add('hidden');
  //   }
  // }

  // renderCalendar(date: Date, name?: string) {
  //   const newDate = new Date(date);
  //   const month = newDate.getMonth();
  //   const year = newDate.getFullYear();
  //   const firstDay = new Date(year, month, 1).getDay();
  //   const lastDate = new Date(year, month + 1, 0).getDate();

  //   if (name === 'start') {
  //     this.startDays = [];
  //     this.startMonthYear = newDate.toLocaleDateString('en-US', {
  //       month: 'long',
  //       year: 'numeric',
  //     });
  //     this.monthInNumS = newDate.toLocaleDateString('en-US', {
  //       month: 'numeric',
  //     });
  //     this.yearInNumS = newDate.toLocaleDateString('en-US', {
  //       year: 'numeric',
  //     });

  //     for (let i = 0; i < firstDay; i++) {
  //       this.startDays.push(0);
  //     }

  //     for (let i = 1; i <= lastDate; i++) {
  //       this.startDays.push(i);
  //     }
  //   } else {
  //     this.endDays = [];
  //     this.endMonthYear = newDate.toLocaleDateString('en-US', {
  //       month: 'long',
  //       year: 'numeric',
  //     });
  //     this.monthInNumE = newDate.toLocaleDateString('en-US', {
  //       month: 'numeric',
  //     });
  //     this.yearInNumE = newDate.toLocaleDateString('en-US', {
  //       year: 'numeric',
  //     });

  //     for (let i = 0; i < firstDay; i++) {
  //       this.endDays.push(0);
  //     }

  //     for (let i = 1; i <= lastDate; i++) {
  //       this.endDays.push(i);
  //     }
  //   }
  // }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.termSelect.dropdownPanel === undefined) {
      this.foucsTerm = false;
    }
    if (this.mentorsSelect.dropdownPanel === undefined) {
      this.dropdownOpen = false;
    }
    if (this.hocSelect.dropdownPanel === undefined) {
      this.dropdownOpenH = false;
    }
  }

  toggleDropdown(mentorsSelect: NgSelectComponent) {
    if (this.dropdownOpen) {
      mentorsSelect.close();
    } else {
      mentorsSelect.open();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }
  onItemClick(mentorsSelect: NgSelectComponent) {
    setTimeout(() => {
      mentorsSelect.open();
    });
  }

  toggleDropdownH(hocSelect: NgSelectComponent) {
    if (this.dropdownOpenH) {
      hocSelect.close();
    } else {
      hocSelect.open();
    }
    this.dropdownOpenH = !this.dropdownOpenH;
  }
  onItemClickH(hocSelect: NgSelectComponent) {
    setTimeout(() => {
      hocSelect.open();
    });
  }

  toggleDropdownT(termSelect: NgSelectComponent) {
    if (this.foucsTerm) {
      termSelect.close();
    } else {
      termSelect.open();
    }
    this.foucsTerm = !this.foucsTerm;
  }
}
