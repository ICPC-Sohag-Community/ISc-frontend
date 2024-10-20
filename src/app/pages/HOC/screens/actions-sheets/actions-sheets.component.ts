import { NgClass } from '@angular/common';
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
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { SheetsHOCService } from '../../services/sheets-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actions-sheets',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass, RouterLink],
  templateUrl: './actions-sheets.component.html',
  styleUrl: './actions-sheets.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ActionsSheetsComponent implements OnInit {
  sheetsHOCService = inject(SheetsHOCService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // @ViewChild('startDateInput') startDateInput!: ElementRef;
  // @ViewChild('endDateInput') endDateInput!: ElementRef;
  // @ViewChild('calendar') calendar!: ElementRef;
  // @ViewChild('calendar2') calendar2!: ElementRef;
  @ViewChild('community') community!: NgSelectComponent;
  @ViewChild('status') status!: NgSelectComponent;
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
  dropdownOpen: boolean = false;
  dropdownOpenS: boolean = false;
  sheetForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  errorMessages: any = [];
  errorMessage: string = '';
  successMessage: string = '';

  id: number = 0;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneSheet(this.id);
    }
    // else {
    //   this.renderCalendar(this.currentDate, 'start');
    //   this.renderCalendar(this.currentDate, 'end');
    // }
    this.sheetForm = this.fb.group({
      id: [''],
      name: [null, [Validators.required]],
      sheetLink: [null, [Validators.required]],
      community: [null, [Validators.required]],
      sheetCodefroceId: [null, [Validators.required]],
      status: [null, [Validators.required]],
      minimumPassingPrecent: [null, [Validators.required]],
      problemCount: [0, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });
  }

  getOneSheet(id: number): void {
    this.isLoading = true;
    this.sheetsHOCService.getOneSheet(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          // this.renderCalendar(data.startDate, 'start');
          // this.renderCalendar(data.endDate, 'end');
          // this.dateStart = new Date(data.startDate);
          // this.dateEnd = new Date(data.endDate);
          // this.selectedDay = this.dateStart.getDate();
          // this.selectedDayEnd = this.dateEnd.getDate();
          this.sheetForm.patchValue({
            id: data.id,
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            sheetLink: data.sheetLink,
            community: data.community,
            sheetCodefroceId: data.sheetCodefroceId,
            status: data.status,
            minimumPassingPrecent: data.minimumPassingPrecent,
            problemCount: data.problemCount,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  actionsSheet(): void {
    this.submitted = true;
    if (this.sheetForm.invalid) {
      console.log('error');
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.sheetsHOCService.createSheet(this.sheetForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sheets']);
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
      this.sheetsHOCService.updateSheet(this.sheetForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sheets']);
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

    Object.keys(this.sheetForm.controls).forEach((field) => {
      const control = this.sheetForm.get(field);

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

  // toggleCalendar(name: string) {
  //   if (name === 'start') {
  //     this.calendar.nativeElement.classList.toggle('hidden');
  //   } else {
  //     this.calendar2.nativeElement.classList.toggle('hidden');
  //   }
  // }

  // changeMonth(monthChange: number, name: string) {
  //   if (name === 'start') {
  //     this.dateStart.setMonth(this.dateStart.getMonth() + monthChange);
  //     this.renderCalendar(this.dateStart, name);
  //   } else {
  //     this.dateEnd.setMonth(this.dateEnd.getMonth() + monthChange);
  //     this.renderCalendar(this.dateEnd, name);
  //   }
  // }

  // selectDate(day: number, name: string) {
  //   const year = this.currentDate.getFullYear();
  //   const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  //   const dayOfMonth = String(day).padStart(2, '0');

  //   const formattedDate = `${year}-${month}-${dayOfMonth}`;
  //   if (name === 'start') {
  //     this.selectedDay = day;
  //     this.sheetForm.get('startDate')?.setValue(formattedDate);
  //     this.calendar.nativeElement.classList.add('hidden');
  //   } else {
  //     this.selectedDayEnd = day;
  //     this.sheetForm.get('endDate')?.setValue(formattedDate);
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

  //     for (let i = 0; i < firstDay; i++) {
  //       this.endDays.push(0);
  //     }

  //     for (let i = 1; i <= lastDate; i++) {
  //       this.endDays.push(i);
  //     }
  //   }
  // }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   if (
  //     !this.startDateInput.nativeElement.contains(event.target) &&
  //     !this.calendar.nativeElement.contains(event.target)
  //   ) {
  //     this.calendar.nativeElement.classList.add('hidden');
  //   }
  //   if (
  //     !this.endDateInput.nativeElement.contains(event.target) &&
  //     !this.calendar2.nativeElement.contains(event.target)
  //   ) {
  //     this.calendar2.nativeElement.classList.add('hidden');
  //   }
  //   if (this.community.dropdownPanel === undefined) {
  //     this.dropdownOpen = false;
  //   }
  //   if (this.status.dropdownPanel === undefined) {
  //     this.dropdownOpenS = false;
  //   }
  // }

  toggleDropdown() {
    if (this.dropdownOpen) {
      this.community.close();
    } else {
      this.community.open();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleDropdownS() {
    if (this.dropdownOpenS) {
      this.status.close();
    } else {
      this.status.open();
    }
    this.dropdownOpenS = !this.dropdownOpenS;
  }

  increase() {
    this.sheetForm
      .get('problemCount')
      ?.setValue(this.sheetForm.get('problemCount')?.value + 1);
  }

  decrease() {
    const current = this.sheetForm.get('problemCount')?.value;
    if (current > 0) {
      this.sheetForm.get('problemCount')?.setValue(current - 1);
    }
  }
}
