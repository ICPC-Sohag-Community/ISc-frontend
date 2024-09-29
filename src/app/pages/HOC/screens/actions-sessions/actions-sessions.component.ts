import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SessionsHOCService } from '../../services/sessions-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actions-sessions',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './actions-sessions.component.html',
  styleUrl: './actions-sessions.component.scss',
})
export class ActionsSessionsComponent implements OnInit {
  sessionsHOCService = inject(SessionsHOCService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  @ViewChild('startDateInput') startDateInput!: ElementRef;
  @ViewChild('endDateInput') endDateInput!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('calendar2') calendar2!: ElementRef;
  selectedDay: number | null | any = null;
  selectedDayEnd: number | null | any = null;
  currentDate = new Date();
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  startDays: number[] = [];
  endDays: number[] = [];
  startMonthYear: string = '';
  endMonthYear: string = '';
  dateStart!: Date;
  dateEnd!: Date;
  id: number = 0;
  submitted: boolean = false;
  isLoading: boolean = false;
  sessionForm!: FormGroup;
  error: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneSession(this.id);
    } else {
      this.renderCalendar(this.currentDate, 'start');
      this.renderCalendar(this.currentDate, 'end');
    }
    this.sessionForm = this.fb.group({
      id: [''],
      instructorName: [null, [Validators.required]],
      topic: [null, [Validators.required]],
      locationName: [null, [Validators.required]],
      locationLink: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });
  }

  getOneSession(id: number): void {
    this.isLoading = true;
    this.sessionsHOCService.getOneSession(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.renderCalendar(data.startDate, 'start');
          this.renderCalendar(data.endDate, 'end');
          this.dateStart = new Date(data.startDate);
          this.dateEnd = new Date(data.endDate);
          this.selectedDay = this.dateStart.getDate();
          this.selectedDayEnd = this.dateEnd.getDate();
          this.sessionForm.patchValue({
            id: data.id,
            instructorName: data.instructorName,
            topic: data.topic,
            startDate: data.startDate,
            endDate: data.endDate,
            locationLink: data.locationLink,
            locationName: data.locationName,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  actionsSession(): void {
    this.submitted = true;
    if (this.sessionForm.invalid) {
      console.log('error');
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.sessionsHOCService.createSession(this.sessionForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sessions']);
          } else if (errors) {
            console.log(errors);
          } else {
            this.error = message;
            console.log(this.error);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.sessionsHOCService.updateSession(this.sessionForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sessions']);
            this.isLoading = false;
          } else if (errors) {
            console.log(errors);
            alert(errors);
          } else {
            alert(message);
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

  toggleCalendar(name: string) {
    if (name === 'start') {
      this.calendar.nativeElement.classList.toggle('hidden');
    } else {
      this.calendar2.nativeElement.classList.toggle('hidden');
    }
  }

  changeMonth(monthChange: number, name: string) {
    if (name === 'start') {
      this.dateStart.setMonth(this.dateStart.getMonth() + monthChange);
      this.renderCalendar(this.dateStart, name);
    } else {
      this.dateEnd.setMonth(this.dateEnd.getMonth() + monthChange);
      this.renderCalendar(this.dateEnd, name);
    }
  }

  selectDate(day: number, name: string) {
    // const month2 = this.currentDate.toLocaleString('default', {
    //   month: 'long',
    // });
    // const year2 = this.currentDate.getFullYear();
    // const theDate = `${day} ${month2} ${year2}`;
    // console.log(theDate);

    // // Format the time as "2024 2:42 AM"
    // const hours2 = this.currentDate.getHours() % 12 || 12;
    // const minutes2 = String(this.currentDate.getMinutes()).padStart(2, '0');
    // const ampm = this.currentDate.getHours() >= 12 ? 'PM' : 'AM';
    // const formattedTime = `${hours2}:${minutes2} ${ampm}`;
    // console.log(formattedTime);

    const year = this.currentDate.getFullYear();
    const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const hours = String(this.currentDate.getHours()).padStart(2, '0');
    const minutes = String(this.currentDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    if (name === 'start') {
      this.selectedDay = day;
      this.sessionForm.get('startDate')?.setValue(formattedDate);
      this.calendar.nativeElement.classList.add('hidden');
    } else {
      this.selectedDayEnd = day;
      this.sessionForm.get('endDate')?.setValue(formattedDate);
      this.calendar2.nativeElement.classList.add('hidden');
    }
  }

  renderCalendar(date: Date, name?: string) {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    if (name === 'start') {
      this.startDays = [];
      this.startMonthYear = newDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      for (let i = 0; i < firstDay; i++) {
        this.startDays.push(0);
      }

      for (let i = 1; i <= lastDate; i++) {
        this.startDays.push(i);
      }
    } else {
      this.endDays = [];
      this.endMonthYear = newDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      for (let i = 0; i < firstDay; i++) {
        this.endDays.push(0);
      }

      for (let i = 1; i <= lastDate; i++) {
        this.endDays.push(i);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.startDateInput.nativeElement.contains(event.target) &&
      !this.calendar.nativeElement.contains(event.target)
    ) {
      this.calendar.nativeElement.classList.add('hidden');
    }
    if (
      !this.endDateInput.nativeElement.contains(event.target) &&
      !this.calendar2.nativeElement.contains(event.target)
    ) {
      this.calendar2.nativeElement.classList.add('hidden');
    }
  }
}
