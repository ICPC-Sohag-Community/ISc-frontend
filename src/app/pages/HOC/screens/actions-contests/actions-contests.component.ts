import { NgClass } from '@angular/common';
import {
  Component,
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
import { ContestsHocService } from '../../services/contests-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actions-contests',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgSelectModule, RouterLink],
  templateUrl: './actions-contests.component.html',
  styleUrl: './actions-contests.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ActionsContestsComponent implements OnInit {
  contestsHocService = inject(ContestsHocService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  @ViewChild('startDateInput') startDateInput!: ElementRef;
  @ViewChild('endDateInput') endDateInput!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('calendar2') calendar2!: ElementRef;
  @ViewChild('community') community!: NgSelectComponent;
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
  foucsTerm: boolean = false;
  id: number = 0;
  submitted: boolean = false;
  isLoading: boolean = false;
  contestForm!: FormGroup;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneContest(this.id);
    } else {
      this.renderCalendar(this.currentDate, 'start');
      this.renderCalendar(this.currentDate, 'end');
    }
    this.contestForm = this.fb.group({
      id: [''],
      name: [null, [Validators.required]],
      link: [null, [Validators.required]],
      community: [null, [Validators.required]],
      problemCount: [0, this.positiveNumberValidator],
      codeForceId: [null, [Validators.required]],
      chiefOfContest: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
    });
  }
  positiveNumberValidator(control: AbstractControl) {
    const value = control.value;
    if (value !== null && value < 0) {
      return { negativeNumber: true };
    }
    return null;
  }

  increase() {
    this.contestForm
      .get('problemCount')
      ?.setValue(this.contestForm.get('problemCount')?.value + 1);
  }

  decrease() {
    const current = this.contestForm.get('problemCount')?.value;
    if (current > 0) {
      this.contestForm.get('problemCount')?.setValue(current - 1);
    }
  }

  getOneContest(id: number): void {
    this.isLoading = true;
    this.contestsHocService.getOneContest(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.renderCalendar(data.startTime, 'start');
          this.renderCalendar(data.endTime, 'end');
          this.dateStart = new Date(data.startTime);
          this.dateEnd = new Date(data.endTime);
          console.log(this.dateStart, this.dateEnd);
          this.selectedDay = this.dateStart.getDate();
          this.selectedDayEnd = this.dateEnd.getDate();
          this.contestForm.patchValue({
            id: data.id,
            name: data.name,
            link: data.link,
            startTime: data.startTime,
            endTime: data.endTime,
            community: data.community,
            chiefOfContest: data.chiefOfContest,
            codeForceId: data.codeForceId,
            problemCount: data.problemCount,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  actionsContext(): void {
    this.submitted = true;
    if (this.contestForm.invalid) {
      console.log('error');
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.contestsHocService.createContest(this.contestForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/contests']);
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
    } else {
      this.contestsHocService.updateContest(this.contestForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/contests']);
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
      this.contestForm.get('startTime')?.setValue(formattedDate);
      this.calendar.nativeElement.classList.add('hidden');
    } else {
      this.selectedDayEnd = day;
      this.contestForm.get('endTime')?.setValue(formattedDate);
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
    if (this.community.dropdownPanel === undefined) {
      this.foucsTerm = false;
    }
  }

  toggleDropdownC(community: NgSelectComponent) {
    if (this.foucsTerm) {
      community.close();
    } else {
      community.open();
    }
    this.foucsTerm = !this.foucsTerm;
  }
}
