import { CommonModule, NgClass } from '@angular/common';
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
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CampLeaderService } from '../../services/camp-leader.service';
import { DatePickerComponent } from '../../../mentor/component/date-picker/date-picker.component';

@Component({
  selector: 'app-actios-camp',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass, DatePickerComponent],
  templateUrl: './actios-camp.component.html',
  styleUrl: './actios-camp.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActiosCampComponent implements OnInit {
  campLeaderService = inject(CampLeaderService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  @ViewChild('datepickerInput', { static: true }) datepickerInput!: ElementRef;
  @ViewChild('calendar', { static: true }) calendar!: ElementRef;

  currentDate = new Date();
  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  days: number[] = [];
  monthYear: string = '';
  selectedDay: number = 0;
  allMentors: { id: number; fullName: string }[] = [];
  allHeadsOfCamp: { id: number; fullName: string; isInCamp: boolean }[] = [];
  allCamps: { id: number; name: string }[] = [];
  allTerms: { id: number; name: string }[] = [];
  selectedCamp: string = '';
  isCampsActive: boolean = false;

  error: any = [];
  selectedRole: string = '';

  foucsCollega: boolean = false;
  loadingAdd: boolean = false;

  submitted: boolean = false;
  isLoading: boolean = false;
  imgFile!: File;
  campForm!: FormGroup;
  route = inject(ActivatedRoute);
  id: number = 0;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      // if (this.userId > 0) {
      //   this.fetchUser({
      //     userId: this.userId,
      //   });
      // }
    });
    this.campForm = this.fb.group({
      name: [null, [Validators.required]],
      term: [null, [Validators.required]],
      headsIds: [null, [Validators.required]],
      mentorsIds: [null, [Validators.required]],
      openForRegister: [true, [Validators.required]],
      durationInWeeks: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });

    this.allTerms = [
      {
        id: 1,
        name: 'Term 1',
      },
      {
        id: 2,
        name: 'Term 2',
      },
      {
        id: 3,
        name: 'Term 3',
      },
      {
        id: 4,
        name: 'Term 4',
      },
    ];
    this.fetchAllMentors();
    this.fetchAllHeadsOfCamp();
    this.fetchAllCamp();
    this.renderCalendar(this.currentDate);
  }

  selectCamp(item: any): void {
    console.log(item);
    this.selectedCamp = item.name;
    this.isCampsActive = false;
  }
  deleteCamp(campId: number): void {
    console.log(campId);
    // this.isCampsActive = false;
  }

  craeteUser() {
    // this.submitted = true;
    // if (this.addUserForm.invalid) {
    //   console.log(this.addUserForm.errors);
    //   console.log('error');
    //   return;
    // }
    // this.isLoading = true;

    console.log(this.campForm.value);

    // this.dashboardService.createAccount(formdata).subscribe({
    //   next: ({ statusCode, message, errors }) => {
    //     if (statusCode === 200) {
    //       // this.toastr.success(msg);
    //       alert('done');
    //       this.addUserForm.reset();
    //       this.isLoading = false;
    //       // this.router.navigateByUrl('/admin/tutorial');
    //     } else if (errors) {
    //       this.error = errors;
    //       console.log(errors);
    //       alert(errors);
    //     } else {
    //       alert(message);
    //       // this.toastr.error(msg);

    //       this.isLoading = false;
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.isLoading = false;
    //   },
    // });
  }

  toggleCalendar() {
    this.calendar.nativeElement.classList.toggle('hidden');
  }

  changeMonth(monthChange: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthChange);
    this.renderCalendar(this.currentDate);
  }

  selectDate(day: number) {
    this.selectedDay = day;
    const selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
    this.datepickerInput.nativeElement.value =
      selectedDate.toLocaleDateString('en-US');
    this.calendar.nativeElement.classList.add('hidden');

    console.log(day);
  }

  renderCalendar(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    this.days = [];
    this.monthYear = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    for (let i = 0; i < firstDay; i++) {
      this.days.push(0); // Empty days for padding
    }

    for (let i = 1; i <= lastDate; i++) {
      this.days.push(i);
    }
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

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    console.log(clickedInside);
    if (!clickedInside) {
      this.isCampsActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.datepickerInput.nativeElement.contains(event.target) &&
      !this.calendar.nativeElement.contains(event.target)
    ) {
      this.calendar.nativeElement.classList.add('hidden');
    }
  }
}
